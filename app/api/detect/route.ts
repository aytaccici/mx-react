import { NextResponse } from 'next/server';
import { detectMailProvider } from '../utils/mailProviderDetector';

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();
    
    if (!domain) {
      return NextResponse.json(
        { error: 'Domain gerekli' },
        { status: 400 }
      );
    }

    const result = await detectMailProvider(domain);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
} 