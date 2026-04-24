import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="grid-auto" style={{ gap: "var(--space-8)", paddingBottom: "var(--space-12)" }}>
          {/* Logo ve Hakkında */}
          <div className="stack stack--md">
            <Link href="/" className="navbar__logo" style={{ marginBottom: "var(--space-2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="navbar__logo-icon" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(46,169,111,0.2) 0%, rgba(46,169,111,0.05) 100%)", border: "1px solid rgba(46,169,111,0.3)", boxShadow: "0 4px 12px rgba(46,169,111,0.15)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="var(--color-primary)" />
                  <path d="M15 9l1.5 1.5L18 10.5l-1.5 1.5L15 13.5l1.5-1.5L15 10.5z" fill="var(--color-gold)" />
                </svg>
              </div>
              <span style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>Namaz Duaları</span>
            </Link>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Beş vakit namaz, sureler, dualar ve anlamları üzerine sade, reklamsız ve hızlı Türkçe kaynak.
            </p>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="stack stack--sm">
            <h4 style={{ color: "#fff", fontWeight: 600, marginBottom: "var(--space-2)" }}>Hızlı Bağlantılar</h4>
            <Link href="/namazlar" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Namazlar</Link>
            <Link href="/dualar" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Dualar ve Sureler</Link>
            <Link href="/vakitler" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Vakitler</Link>
            <Link href="/esmaul-husna" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Esmaül Hüsna</Link>
            <Link href="/tesbihat" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Tesbihat Rehberi</Link>
          </div>

          {/* Kurumsal */}
          <div className="stack stack--sm">
            <h3 style={{ fontSize: "1.1rem", color: "var(--color-text-primary)", marginBottom: "var(--space-3)" }}>Kurumsal</h3>
            <Link href="/hakkimizda" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Hakkımızda</Link>
            <Link href="/gizlilik-politikasi" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Gizlilik Politikası</Link>
            <Link href="/iletisim" className="nav-link" style={{ padding: "var(--space-1) 0" }}>Bize Ulaşın</Link>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--color-border-subtle)",
          paddingTop: "var(--space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)"
        }}>
          <p className="footer__text">
            © {new Date().getFullYear()} Namaz Duaları. Tüm hakları saklıdır.
          </p>
          <p className="footer__text" style={{ fontSize: "0.8rem" }}>
            Türkiye'den <span style={{ color: "var(--color-primary)" }}>❤</span> ile geliştirildi.
          </p>
        </div>
      </div>
    </footer>
  );
}
