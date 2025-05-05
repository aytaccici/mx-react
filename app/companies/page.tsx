'use client';

import { useState } from 'react';
import istanbulData from '../../db/istanbul.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDomainStore } from '../store/domainStore';
import { Container } from 'react-bootstrap';

type Company = {
  id: string;
  ADRES: string;
  EPOSTA1: string;
  ILCE_TANIMI: string;
  IL_TANIMI: string;
  ISCI_SAYISI: string;
  NACE_KODU_TANIMI: string;
  POSTA_KODU: string;
  SEKTOR: string;
  TELEFON1_TUM: string;
  TIC_SCL_NO: string;
  UNVAN: string;
  WEB_ADRES: string;
};

const companies: Company[] = istanbulData as Company[];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyWithWebsite, setShowOnlyWithWebsite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;
  const { addDomain, domains: savedDomains } = useDomainStore();

  // Filtreleme
  const filteredCompanies = companies.filter((company: Company) => {
    const matchesSearch = 
      company.UNVAN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ADRES.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.EPOSTA1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.TELEFON1_TUM.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.SEKTOR.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ILCE_TANIMI.toLowerCase().includes(searchTerm.toLowerCase());

    const hasWebsite = company.WEB_ADRES && company.WEB_ADRES.trim() !== '';

    return matchesSearch && (!showOnlyWithWebsite || hasWebsite);
  });

  // Sayfalama
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const currentCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddDomain = (domain: string) => {
    const cleanDomain = domain.replace('www.', '').replace('http://', '').replace('https://', '');
    addDomain(cleanDomain);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container fluid className="flex-grow-1 py-5 px-4">
        <h1 className="mb-4">Şirketler</h1>
        
        {/* Arama ve Filtreler */}
        <div className="card border-light shadow-sm mb-4">
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg border-light"
                placeholder="🔍 Firma adı, adres, e-posta, telefon, sektör veya ilçe ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="websiteFilter"
                checked={showOnlyWithWebsite}
                onChange={(e) => {
                  setShowOnlyWithWebsite(e.target.checked);
                  setCurrentPage(1);
                }}
              />
              <label className="form-check-label text-muted" htmlFor="websiteFilter">
                🌐 Sadece web sitesi olan firmaları göster
              </label>
            </div>
          </div>
        </div>

        {/* Firma Listesi */}
        <div className="row">
          {currentCompanies.map((company: Company) => {
            const isEmailDomainMatch = company.EPOSTA1 && company.WEB_ADRES && 
              company.EPOSTA1.split('@')[1] === company.WEB_ADRES.replace('www.', '').replace('http://', '').replace('https://', '');

            const domain = company.WEB_ADRES?.replace('www.', '').replace('http://', '').replace('https://', '');
            const isDomainSaved = domain && savedDomains.includes(domain);

            return (
              <div key={company.id} className="col-md-3 mb-4">
                <div className={`card h-100 ${isEmailDomainMatch ? 'border-success shadow' : 'border-light shadow-sm'} hover-shadow transition-all`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title text-dark mb-0">{company.UNVAN}</h5>
                      {isEmailDomainMatch && (
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle-fill me-1"></i>
                          Potansiyel Firma
                        </span>
                      )}
                    </div>
                    {/* Sektör bilgisi */}
                    {company.SEKTOR && (
                      <span className="badge bg-primary mb-3 d-block w-100 text-wrap p-2" style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.3 }}>{company.SEKTOR}</span>
                    )}
                    <p className="card-subtitle text-muted mb-3">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      {company.ILCE_TANIMI}, {company.IL_TANIMI}
                    </p>
                    
                    {company.WEB_ADRES && (
                      <div className="mb-3 d-flex align-items-center gap-2">
                        <a 
                          href={company.WEB_ADRES.startsWith('http') ? company.WEB_ADRES : `https://${company.WEB_ADRES}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-light btn-sm border"
                        >
                          <i className="bi bi-globe me-1"></i>
                          {company.WEB_ADRES}
                        </a>
                        {!isDomainSaved && (
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleAddDomain(company.WEB_ADRES)}
                          >
                            <i className="bi bi-plus-circle me-1"></i>
                            Listeye Ekle
                          </button>
                        )}
                        {isDomainSaved && (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Listeye Eklendi
                          </span>
                        )}
                      </div>
                    )}

                    <div className="card-text">
                      {company.EPOSTA1 && (
                        <p className="mb-2">
                          <i className="bi bi-envelope-fill text-muted me-2"></i>
                          <a href={`mailto:${company.EPOSTA1}`} className="text-decoration-none text-dark">
                            {company.EPOSTA1}
                          </a>
                        </p>
                      )}
                      {company.TELEFON1_TUM && (
                        <p className="mb-2">
                          <i className="bi bi-telephone-fill text-muted me-2"></i>
                          <a href={`tel:${company.TELEFON1_TUM}`} className="text-decoration-none text-dark">
                            {company.TELEFON1_TUM}
                          </a>
                        </p>
                      )}
                      {company.ADRES && (
                        <p className="mb-2">
                          <i className="bi bi-geo-alt-fill text-muted me-2"></i>
                          {company.ADRES}, {company.ILCE_TANIMI}, {company.IL_TANIMI}
                        </p>
                      )}
                      {company.ISCI_SAYISI && (
                        <span className="badge bg-light text-muted border">
                          <i className="bi bi-people-fill me-1"></i>
                          {company.ISCI_SAYISI} Çalışan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sayfalama */}
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i> Önceki
          </button>
          <span className="mx-2 text-muted">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sonraki <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </Container>
    </div>
  );
} 