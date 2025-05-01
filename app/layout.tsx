import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Firma Listesi',
  description: 'İstanbul\'daki firmaların listesi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <Link className="navbar-brand" href="/">
              <i className="bi bi-building me-2"></i>
              MX Checker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    <i className="bi bi-house-door me-1"></i>
                    Ana Sayfa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/companies">
                    <i className="bi bi-building me-1"></i>
                    Firmalar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          <div className="container text-center text-muted">
            <small>Powered By Team Composer @2025</small>
          </div>
        </footer>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
} 