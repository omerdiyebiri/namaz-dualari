"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/namazlar", label: "Namazlar" },
  { href: "/dualar",   label: "Dualar ve Sureler" },
  { href: "/vakitler", label: "Vakitler" },
  { href: "/esmaul-husna", label: "Esmaül Hüsna" },
  { href: "/tesbihat", label: "Tesbihat" },
  { href: "/kaza-hesaplayici", label: "Kaza Takip" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar" role="banner">
      <div className="container navbar__inner">
        {/* Premium SVG Logo */}
        <Link href="/" className="navbar__logo" aria-label="Namaz Duaları Ana Sayfa" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="navbar__logo-icon" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(46,169,111,0.2) 0%, rgba(46,169,111,0.05) 100%)", border: "1px solid rgba(46,169,111,0.3)", boxShadow: "0 4px 12px rgba(46,169,111,0.15)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--color-primary)" />
              <path d="M15 9l1.5 1.5L18 10.5l-1.5 1.5L15 13.5l1.5-1.5L15 10.5z" fill="var(--color-gold)" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>Namaz Duaları</span>
        </Link>

        {/* Navigasyon */}
        <nav className="navbar__nav" aria-label="Ana navigasyon">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
