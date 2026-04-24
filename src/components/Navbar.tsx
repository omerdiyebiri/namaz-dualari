"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar" role="banner" style={{ overflow: "visible" }}>
      <div className="container navbar__inner" style={{ overflow: "visible" }}>
        
        {/* Premium SVG Logo */}
        <Link href="/" className="navbar__logo" aria-label="Namaz Duaları Ana Sayfa" style={{ display: "flex", alignItems: "center", gap: "10px", zIndex: 101 }}>
          <div className="navbar__logo-icon" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(46,169,111,0.2) 0%, rgba(46,169,111,0.05) 100%)", border: "1px solid rgba(46,169,111,0.3)", boxShadow: "0 4px 12px rgba(46,169,111,0.15)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--color-primary)" />
              <path d="M15 9l1.5 1.5L18 10.5l-1.5 1.5L15 13.5l1.5-1.5L15 10.5z" fill="var(--color-gold)" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Namaz Duaları</span>
        </Link>

        {/* Desktop Mega Dropdown Navigasyon */}
        <nav className="mega-nav" aria-label="Ana Menü">
          
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Ana Sayfa</Link>
          
          {/* Namaz & Dualar Dropdown */}
          <div className="mega-group">
            <button className="nav-link mega-trigger">
              İçerikler <span className="arrow">▼</span>
            </button>
            <div className="mega-dropdown">
              <div className="mega-grid">
                <Link href="/namazlar" className="mega-card">
                  <span className="icon">🕌</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Namazlar</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>5 vakit farz ve nafile namazlar kılınışı.</span>
                  </div>
                </Link>
                <Link href="/dualar" className="mega-card">
                  <span className="icon">🤲</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Dualar ve Sureler</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Kur'an'dan ezberlenmesi gereken temel sureler.</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* İslami Araçlar Dropdown */}
          <div className="mega-group">
            <button className="nav-link mega-trigger">
              Rehber & Araçlar <span className="arrow">▼</span>
            </button>
            <div className="mega-dropdown mega-dropdown-large">
              <div className="mega-grid two-cols">
                <Link href="/vakitler" className="mega-card">
                  <span className="icon">⏳</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Namaz Vakitleri</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Günlük ezan saatleri ve kıble.</span>
                  </div>
                </Link>
                <Link href="/esmaul-husna" className="mega-card">
                  <span className="icon">✨</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Esmaül Hüsna</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>99 İsim, anlamları ve zikirleri.</span>
                  </div>
                </Link>
                <Link href="/tesbihat" className="mega-card">
                  <span className="icon">📿</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Namaz Tesbihatı</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Namaz sonrası okunacak dualar.</span>
                  </div>
                </Link>
                <Link href="/kaza-hesaplayici" className="mega-card">
                  <span className="icon">📊</span>
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Kaza Takip Sistemi</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Geçmiş borçlarınızı hesaplayın.</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </nav>

        {/* CTA & Hamburger */}
        <div className="navbar__actions" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", zIndex: 101 }}>
          <Link href="/kaza-hesaplayici" className="btn btn--primary desktop-cta">
            Kaza Hesapla
          </Link>
          
          <button 
            className={`hamburger ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>

      </div>

      {/* Mobil Menü Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu__inner">
          <Link href="/" className="mobile-menu__link">Ana Sayfa</Link>
          <div className="mobile-menu__group-title">İçerikler</div>
          <Link href="/namazlar" className="mobile-menu__link">🕌 Namazlar</Link>
          <Link href="/dualar" className="mobile-menu__link">🤲 Dualar ve Sureler</Link>
          <div className="mobile-menu__group-title">Rehber & Araçlar</div>
          <Link href="/vakitler" className="mobile-menu__link">⏳ Namaz Vakitleri</Link>
          <Link href="/esmaul-husna" className="mobile-menu__link">✨ Esmaül Hüsna</Link>
          <Link href="/tesbihat" className="mobile-menu__link">📿 Namaz Tesbihatı</Link>
          <Link href="/kaza-hesaplayici" className="mobile-menu__link">📊 Kaza Takip Sistemi</Link>
        </div>
      </div>

      {/* CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .navbar {
          overflow: visible !important;
        }
        .mega-nav {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }
        .mega-group {
          position: relative;
        }
        .mega-trigger {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mega-trigger .arrow {
          font-size: 0.6rem;
          opacity: 0.6;
          transition: transform 0.3s ease;
        }
        .mega-group:hover .mega-trigger .arrow {
          transform: rotate(180deg);
        }
        .mega-dropdown {
          position: absolute;
          top: 120%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(15, 20, 25, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: var(--space-4);
          min-width: 300px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.05) inset;
          z-index: 100;
        }
        .mega-dropdown-large {
          min-width: 600px;
        }
        .mega-group:hover .mega-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .mega-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .mega-grid.two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }
        .mega-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-4);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.2s ease;
          background: rgba(255, 255, 255, 0.02);
        }
        .mega-card:hover {
          background: rgba(46, 169, 111, 0.08);
          border-color: rgba(46, 169, 111, 0.2);
        }
        .mega-card .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(46, 169, 111, 0.1);
          border-radius: 10px;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        /* Hamburger Menu */
        .hamburger {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 101;
        }
        .hamburger-box {
          width: 24px;
          height: 20px;
          display: inline-block;
          position: relative;
        }
        .hamburger-inner {
          display: block;
          top: 50%;
          margin-top: -1px;
        }
        .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
          width: 24px;
          height: 2px;
          background-color: var(--color-text-primary);
          border-radius: 2px;
          position: absolute;
          transition: transform 0.15s ease;
        }
        .hamburger-inner::before, .hamburger-inner::after {
          content: "";
          display: block;
        }
        .hamburger-inner::before {
          top: -8px;
        }
        .hamburger-inner::after {
          bottom: -8px;
        }

        .hamburger.is-active .hamburger-inner {
          transform: rotate(45deg);
        }
        .hamburger.is-active .hamburger-inner::before {
          top: 0;
          opacity: 0;
        }
        .hamburger.is-active .hamburger-inner::after {
          bottom: 0;
          transform: rotate(-90deg);
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(9, 14, 19, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu.is-open {
          opacity: 1;
          visibility: visible;
        }
        .mobile-menu__inner {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 320px;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        .mobile-menu.is-open .mobile-menu__inner {
          transform: translateY(0);
        }
        .mobile-menu__link {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .mobile-menu__link:hover, .mobile-menu__link:active {
          background: rgba(46, 169, 111, 0.15);
          color: var(--color-primary);
        }
        .mobile-menu__group-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-secondary);
          margin-top: 15px;
          margin-bottom: 5px;
          padding-left: 20px;
        }

        @media (max-width: 900px) {
          .desktop-cta {
            display: none !important;
          }
          .mega-nav {
            display: none;
          }
          .hamburger {
            display: block;
          }
        }
      `}} />
    </header>
  );
}
