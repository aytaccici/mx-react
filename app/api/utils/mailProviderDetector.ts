import dns from 'dns';
import { promisify } from 'util';
import { getIpInfo} from './ipInfo';
import { providerPatterns } from './mailProviderPatterns';

const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolve4 = promisify(dns.resolve4);

export interface MailProvider {
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
  domain?: string;
}

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
        patterns.mx.some(pattern => record.exchange.toLowerCase().includes(pattern.toLowerCase()))
      );
      if (mxMatch) {
        
        confidence += 0.6;
      }

      // SPF kayıtlarını kontrol et
      const spfMatch = spfRecords.some(record =>
        patterns.spf.some(pattern => record.toLowerCase().includes(pattern.toLowerCase()))
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