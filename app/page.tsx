'use client';

import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { exportToExcel } from './api/utils/excelExporter';
import { useDomainStore } from './store/domainStore';
import * as XLSX from 'xlsx';

interface Result {
  domain: string;
  provider: string;
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
  error?: string;
}

export default function Home() {
  const [domains, setDomains] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { domains: savedDomains, clearDomains } = useDomainStore();

  useEffect(() => {
    if (savedDomains.length > 0) {
      setDomains(savedDomains.join('\n'));
    }
  }, [savedDomains]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const domainList = domains
      .split('\n')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domains: domainList }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API hatası');
      }

      const results = await response.json();
      setResults(results.map((result: any, index: number) => ({
        domain: domainList[index],
        provider: result.name,
        confidence: result.confidence,
        mxRecords: result.mxRecords,
        spfRecords: result.spfRecords,
        ispInfo: result.ispInfo,
        error: result.error
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        // DOMAIN kolonundaki değerleri al ve benzersiz yap
        const uniqueDomains = [...new Set(
          jsonData
            .map((row: any) => {
              // DOMAIN kolonunu büyük/küçük harf duyarsız olarak kontrol et
              const domainKey = Object.keys(row).find(key => key.toUpperCase() === 'DOMAIN');
              return domainKey ? row[domainKey]?.toString().trim() : null;
            })
            .filter((domain): domain is string => !!domain)
        )];
        
        if (uniqueDomains.length > 0) {
          setDomains(uniqueDomains.join('\n'));
        } else {
          setError('Excel dosyasında DOMAIN kolonu bulunamadı veya boş');
        }
      } catch (err) {
        console.error('Excel okuma hatası:', err);
        setError('Excel dosyası okunurken bir hata oluştu');
      } finally {
        setImportLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Dosya okuma hatası');
      setImportLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container fluid className="flex-grow-1 py-5 px-4">
        <h1 className="mb-4">Mail Provider Tespit Aracı</h1>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">Domain Listesi</h2>
          <div className="d-flex gap-2">
            <div className="position-relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="d-none"
                id="excelUpload"
              />
              <label
                htmlFor="excelUpload"
                className="btn btn-outline-primary btn-sm"
                style={{ cursor: 'pointer' }}
              >
                {importLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-excel me-1"></i>
                    Excel'den İçe Aktar
                  </>
                )}
              </label>
            </div>
            {savedDomains.length > 0 && (
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => {
                  clearDomains();
                  setDomains('');
                }}
              >
                <i className="bi bi-trash me-1"></i>
                Listeyi Temizle
              </Button>
            )}
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Domain Listesi (Her satıra bir domain)</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
              placeholder="example.com&#10;example.org"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Analiz Ediliyor...
                </>
              ) : (
                'Analiz Et'
              )}
            </Button>
          </div>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {results.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Sonuçlar</h2>
              <Button 
                variant="success" 
                onClick={() => {
                  const validResults = results
                    .filter(result => !result.error)
                    .map(result => ({
                      domain: result.domain,
                      name: result.provider,
                      confidence: result.confidence,
                      mxRecords: result.mxRecords,
                      spfRecords: result.spfRecords,
                      ispInfo: result.ispInfo
                    }));
                  exportToExcel(validResults);
                }}
              >
                Excel'e Aktar
              </Button>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>MX Kayıtları</th>
                  <th>SPF Kayıtları</th>
                  <th>Güven Skoru</th>
                  <th>Mail Provider</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.domain}</td>
                    <td>
                      <ul className="list-unstyled mb-0">
                        {result.mxRecords.map((record, i) => (
                          <li key={i} className="mb-2">
                            <div>{record.exchange}</div>
                            <small className="text-muted d-block">
                              Öncelik: {record.priority}
                              {result.ispInfo && result.ispInfo[i] && (
                                <>
                                  <br />
                                  ISP: {result.ispInfo[i].isp}
                                  {result.ispInfo[i].country && ` (${result.ispInfo[i].country})`}
                                </>
                              )}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {result.spfRecords.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {result.spfRecords.map((spf, i) => (
                            <li key={i} className="text-muted">
                              <small>{spf}</small>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      {!result.error && (
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${result.confidence * 100}%` }}
                            aria-valuenow={result.confidence * 100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            {Math.round(result.confidence * 100)}%
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      {result.error ? (
                        <Alert variant="danger" className="mb-0 p-2">
                          {result.error}
                        </Alert>
                      ) : (
                        result.provider
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
} 