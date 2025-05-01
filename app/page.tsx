'use client';

import { useState } from 'react';
import { Container, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { exportToExcel } from './api/utils/excelExporter';

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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const domainList = domains
      .split('\n')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);

    const newResults: Result[] = [];

    for (const domain of domainList) {
      try {
        const response = await fetch('/api/detect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'API hatası');
        }

        const provider = await response.json();
        newResults.push({
          domain,
          provider: provider.name,
          confidence: provider.confidence,
          mxRecords: provider.mxRecords,
          spfRecords: provider.spfRecords,
          ispInfo: provider.ispInfo,
        });
      } catch (err) {
        newResults.push({
          domain,
          provider: 'Hata',
          confidence: 0,
          mxRecords: [],
          spfRecords: [],
          ispInfo: [],
          error: err instanceof Error ? err.message : 'Bilinmeyen hata',
        });
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Mail Provider Tespit Aracı</h1>
      
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
                    {!result.error && (
                      <div className="progress" style={{ width: '100%', height: '20px' }}>
                        <div
                          className="progress-bar bg-primary"
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
  );
} 