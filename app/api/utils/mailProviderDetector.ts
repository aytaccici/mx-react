import dns from 'dns';
import { promisify } from 'util';
import { getIpInfo, getMxData, getProviderType } from './ipInfo';

const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolve4 = promisify(dns.resolve4);

interface MailProvider {
  name: string;
  confidence: number;
  mxRecords: Array<{
    exchange: string;
    priority: number;
  }>;
  spfRecords: string[];
  ispInfo?: {
    mx: string;
    isp: string;
    country?: string;
  }[];
}

const providerPatterns = {
  google: {
    mx: ['aspmx.l.google.com', 'alt1.aspmx.l.google.com', 'alt2.aspmx.l.google.com'],
    spf: ['_spf.google.com', 'include:_spf.google.com'],
  },
  microsoft: {
    mx: ['protection.outlook.com', 'mail.protection.outlook.com'],
    spf: ['spf.protection.outlook.com', 'include:spf.protection.outlook.com'],
  },
  yandex: {
    mx: ['mx.yandex.net'],
    spf: ['include:_spf.yandex.net'],
  },
  zoho: {
    mx: ['mx.zoho.com'],
    spf: ['include:zoho.com'],
  },
  protonmail: {
    mx: ['mail.protonmail.ch'],
    spf: ['include:_spf.protonmail.ch'],
  },
  amazon: {
    mx: ['inbound-smtp.us-east-1.amazonaws.com'],
    spf: ['include:amazonses.com'],
  },
  mailgun: {
    mx: ['mxa.mailgun.org', 'mxb.mailgun.org'],
    spf: ['include:mailgun.org'],
  },
  sendgrid: {
    mx: ['mx.sendgrid.net'],
    spf: ['include:sendgrid.net'],
  },
  godaddy: {
    mx: ['smtp.secureserver.net'],
    spf: ['include:secureserver.net'],
  },
  yahoo: {
    mx: ['mta5.am0.yahoodns.net', 'mta6.am0.yahoodns.net'],
    spf: ['include:_spf.yahoo.com'],
  },
};

// AS numaralarına göre ISP bilgileri
const asnToIsp: { [key: string]: string } = {
  '15169': 'Google',
  '8075': 'Microsoft',
  '13238': 'Yandex',
  '132203': 'Zoho',
  '200589': 'ProtonMail',
  '16509': 'Amazon',
  '395747': 'Mailgun',
  '13335': 'Cloudflare',
  '14618': 'Amazon',
  '209242': 'SendGrid',
  '26496': 'GoDaddy',
  '36561': 'Yahoo',
  '3356': 'Level 3',
  '701': 'Verizon',
  '7922': 'Comcast',
  '7018': 'AT&T',
  '1239': 'Sprint',
  '174': 'Cogent',
  '2914': 'NTT',
  '3257': 'Tinet',
  '1299': 'Telia',
  '6830': 'Liberty Global',
  '3320': 'Deutsche Telekom',
  '2856': 'BT',
  '3215': 'Orange',
  '1273': 'Vodafone',
  '9121': 'Türk Telekom',
  '34984': 'Superonline',
  '47331': 'TTNET',
};

async function getIspInfo(mxRecord: string): Promise<{ mx: string; isp: string; country?: string }> {
  try {
    const dns = require('dns');
    const { promisify } = require('util');
    const resolve4 = promisify(dns.resolve4);

    // Önce host adresini IP adresine çöz
    const ips = await resolve4(mxRecord);
    if (!ips || ips.length === 0) {
      return { mx: mxRecord, isp: 'Bilinmiyor' };
    }

    // İlk IP adresini kullan
    const ipInfo = await getIpInfo(ips[0]);
    if (!ipInfo) {
      return { mx: mxRecord, isp: 'Bilinmiyor' };
    }

    return {
      mx: mxRecord,
      isp: ipInfo.org || 'Bilinmiyor',
      country: ipInfo.country || undefined
    };
  } catch (error) {
    console.error('ISP bilgisi alınırken hata:', error);
    return { mx: mxRecord, isp: 'Bilinmiyor' };
  }
}

export async function detectMailProvider(domain: string): Promise<MailProvider> {
  try {
    const [mxRecords, txtRecords] = await Promise.all([
      resolveMx(domain),
      resolveTxt(domain),
    ]);

    const spfRecords = txtRecords.flat().filter(record => record.includes('v=spf1'));
    
    // MX kayıtlarını öncelik sırasına göre sırala
    const sortedMxRecords = mxRecords
      .sort((a, b) => a.priority - b.priority)
      .map(record => ({
        exchange: record.exchange,
        priority: record.priority
      }));

    // MX kayıtlarının ISP bilgilerini al
    const ispInfoPromises = sortedMxRecords.map(mx => getIspInfo(mx.exchange));
    const ispInfo = await Promise.all(ispInfoPromises);

    let bestMatch: MailProvider = {
      name: 'Özel Mail Sunucusu',
      confidence: 0,
      mxRecords: sortedMxRecords,
      spfRecords: spfRecords,
      ispInfo,
    };

    for (const [providerName, patterns] of Object.entries(providerPatterns)) {
      let confidence = 0;
      
      // MX kayıtlarını kontrol et
      const mxMatch = sortedMxRecords.some(record => 
        patterns.mx.some(pattern => record.exchange.includes(pattern))
      );
      if (mxMatch) confidence += 0.6;

      // SPF kayıtlarını kontrol et
      const spfMatch = spfRecords.some(record =>
        patterns.spf.some(pattern => record.includes(pattern))
      );
      if (spfMatch) confidence += 0.4;

      if (confidence > bestMatch.confidence) {
        bestMatch = {
          name: providerName.charAt(0).toUpperCase() + providerName.slice(1),
          confidence,
          mxRecords: sortedMxRecords,
          spfRecords,
          ispInfo,
        };
      }
    }

    return bestMatch;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Domain analiz edilirken hata oluştu: ${error.message}`);
    }
    throw new Error('Domain analiz edilirken bilinmeyen bir hata oluştu');
  }
} 