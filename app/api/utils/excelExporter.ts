import { MailProvider } from './mailProviderDetector';

export function exportToExcel(results: MailProvider[]) {
  // Excel dosyası oluştur
  const workbook = new (require('exceljs')).Workbook();
  const worksheet = workbook.addWorksheet('Mail Provider Analysis');

  // Başlıkları ekle
  worksheet.columns = [
    { header: 'Domain', key: 'domain', width: 30 },
    { header: 'MX Kaydı ve ISP', key: 'mx', width: 50 },
    { header: 'Mail Provider', key: 'provider', width: 30 },
    { header: 'Güven Skoru', key: 'confidence', width: 15 }
  ];

  // Stil tanımlamaları
  const headerStyle = {
    font: { bold: true, color: { argb: 'FFFFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } },
    alignment: { vertical: 'middle', horizontal: 'center' }
  };

  const rowStyle = {
    alignment: { vertical: 'middle', horizontal: 'left' }
  };

  // Başlık satırına stil uygula
  worksheet.getRow(1).font = headerStyle.font;
  worksheet.getRow(1).fill = headerStyle.fill;
  worksheet.getRow(1).alignment = headerStyle.alignment;

  // Tüm sonuçları ekle
  results.forEach(result => {
    const mxRecords = result.mxRecords.map((record, index) => {
      const ispInfo = result.ispInfo?.[index];
      return {
        domain: result.domain,
        mx: `${record.exchange}${ispInfo ? `\nISP: ${ispInfo.isp}${ispInfo.country ? ` (${ispInfo.country})` : ''}` : ''}`,
        provider: result.name,
        confidence: `${(result.confidence * 100).toFixed(2)}%`
      };
    });

    // Satırları ekle ve stilleri uygula
    mxRecords.forEach((record, index) => {
      const row = worksheet.addRow(record);
      row.alignment = rowStyle.alignment;
      
      // MX hücresine otomatik satır yüksekliği ayarla
      if (record.mx.includes('\n')) {
        row.height = 40;
      }
    });

    // Domainler arasına boş satır ekle
    worksheet.addRow({});
  });

  // Excel dosyasını indir
  workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mail-analysis-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
} 