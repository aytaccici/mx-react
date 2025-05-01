interface IpInfo {
  ip: string;
  org: string;
  country: string;
  region: string;
  city: string;
  loc: string;
}

interface MxInfo {
  host: string;
  ip: string[];
}

interface CompInfo {
  domain: string;
  ipInfo: IpInfo | null;
  mxRecord: MxInfo[];
}

const API_URL = 'https://ipinfo.io';
const TOKEN = process.env.IPINFO_TOKEN || '0e70bc383f9ed7';

export async function getIpInfo(ip: string): Promise<IpInfo | null> {
  try {
    const response = await fetch(`${API_URL}/${ip}/json`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as IpInfo;
  } catch (error) {
    console.error('IP bilgisi alınırken hata:', error);
    return null;
  }
}

export async function getMxData(domain: string): Promise<MxInfo[]> {
  try {
    const dns = require('dns');
    const { promisify } = require('util');
    const resolveMx = promisify(dns.resolveMx);
    const resolve4 = promisify(dns.resolve4);

    const mxRecords = await resolveMx(domain);
    const mxInfoList: MxInfo[] = [];

    for (const mx of mxRecords) {
      const ips = await resolve4(mx.exchange);
      mxInfoList.push({
        host: mx.exchange,
        ip: ips
      });
    }

    return mxInfoList;
  } catch (error) {
    console.error('MX kayıtları alınırken hata:', error);
    return [];
  }
}

export async function getCompInfo(domain: string): Promise<CompInfo> {
  const compInfo: CompInfo = {
    domain,
    ipInfo: null,
    mxRecord: []
  };

  try {
    const mxData = await getMxData(domain);
    if (mxData.length === 0) {
      throw new Error(`No MX records found for ${domain}`);
    }

    compInfo.mxRecord = mxData;
    const firstIp = mxData[0].ip[0];
    const ipInfo = await getIpInfo(firstIp);
    compInfo.ipInfo = ipInfo;

    return compInfo;
  } catch (error) {
    console.error('Domain bilgisi alınırken hata:', error);
    return compInfo;
  }
}

export function getProviderType(provider: string): string {
  const lowerProvider = provider.toLowerCase();

  if (lowerProvider.includes('google')) {
    return 'GSuite';
  }

  if (lowerProvider.includes('microsoft')) {
    return 'Exchange / Office 365';
  }

  if (lowerProvider.includes('yandex')) {
    return 'Yandex';
  }

  if (lowerProvider.includes('yahoo')) {
    return 'Yahoo';
  }

  return 'Unknown';
}

export async function reverseDns(ip: string): Promise<string> {
  try {
    const dns = require('dns');
    const { promisify } = require('util');
    const reverse = promisify(dns.reverse);

    const names = await reverse(ip);
    return names.join(',');
  } catch (error) {
    console.error('Reverse DNS sorgusu yapılırken hata:', error);
    return '';
  }
} 