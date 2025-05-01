import { NextResponse } from 'next/server';
import { detectMailProvider } from '../utils/mailProviderDetector';

export async function POST(request: Request) {
  try {
    const { domains } = await request.json();
    
    if (!domains || !Array.isArray(domains)) {
      return NextResponse.json(
        { error: 'Geçerli bir domain listesi gönderilmedi' },
        { status: 400 }
      );
    }

    // Tüm domainler için paralel olarak işlem yap
    const results = await Promise.all(
      domains.map(async (domain) => {
        try {
          return await detectMailProvider(domain);
        } catch (error) {
          return {
            name: 'Hata',
            confidence: 0,
            mxRecords: [],
            spfRecords: [],
            error: error instanceof Error ? error.message : 'Bilinmeyen hata'
          };
        }
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
} 