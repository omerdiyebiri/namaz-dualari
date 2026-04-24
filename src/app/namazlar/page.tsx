import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import namazlar from "@/data/namazlar.json";

export const metadata: Metadata = {
  title: "Beş Vakit Namaz",
  description:
    "Beş vakit namaz nasıl kılınır? Sabah, Öğle, İkindi, Akşam ve Yatsı namazlarının rekatları, kılınış adımları ve okunan namaz sureleri ile namaz duaları hakkında detaylı rehber.",
  alternates: { canonical: "/namazlar" },
};

const vakitMeta: Record<string, { color: string; icon: string; aciklama: string }> = {
  sabah:  { color: "#7c9cbf", icon: "🌅", aciklama: "Gün doğumundan önce" },
  ogle:   { color: "#d4a94a", icon: "☀️",  aciklama: "Güneşin tepesinden sonra" },
  ikindi: { color: "#c97b3a", icon: "🌤️", aciklama: "Öğleden sonra" },
  aksam:  { color: "#9b6fa8", icon: "🌆", aciklama: "Güneşin batmasıyla" },
  yatsi:  { color: "#4a6fa8", icon: "🌙", aciklama: "Yatsı vaktinde" },
};

// BreadcrumbList JSON-LD
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://namazdualari.com" },
    { "@type": "ListItem", position: 2, name: "Namazlar",  item: "https://namazdualari.com/namazlar" },
  ],
};

export default function NamazlarPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="container">
          <nav className="breadcrumb" aria-label="Ekmek kırıntısı">
            <Link href="/">Ana Sayfa</Link>
            <span className="breadcrumb__separator" aria-hidden="true">›</span>
            <span className="breadcrumb__current">Namazlar</span>
          </nav>
        </div>

        {/* Header */}
        <section className="section section--sm" aria-labelledby="namazlar-page-title">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">Beş Vakit</p>
              <h1 className="section-header__title" id="namazlar-page-title">
                Namaz Vakitleri
              </h1>
              <p className="section-header__desc">
                Her namaz vakti için rekat sayısı, okunan sureler ve dualar ile
                adım adım kılınış rehberine tek tıklamayla ulaşın.
              </p>
            </div>

            <nav aria-label="Namaz vakitlerinin listesi">
              <ul className="stack stack--md" role="list">
                {namazlar.map((namaz) => {
                  const meta = vakitMeta[namaz.slug] ?? { color: "#2ea96f", icon: "🕌", aciklama: "" };
                  const toplamSunnet = (namaz.sunnet?.once ?? 0) + (namaz.sunnet?.sonra ?? 0);

                  return (
                    <li key={namaz.slug}>
                      <Link
                        href={`/namazlar/${namaz.slug}`}
                        id={`namaz-link-${namaz.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-6)",
                          background: "var(--color-bg-surface)",
                          border: "1px solid var(--color-border-subtle)",
                          borderRadius: "var(--radius-lg)",
                          padding: "var(--space-6)",
                          color: "inherit",
                          textDecoration: "none",
                          transition: "border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease",
                          borderLeft: `4px solid ${meta.color}`,
                        }}
                        className="namaz-list-item"
                        aria-label={`${namaz.ad} — ${namaz.rekat} rekat, dualarını gör`}
                      >
                        {/* İkon + vakit */}
                        <div style={{ flexShrink: 0, textAlign: "center", minWidth: 64 }}>
                          <div style={{ fontSize: "2.5rem", lineHeight: 1 }} aria-hidden="true">{meta.icon}</div>
                          <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", marginTop: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {namaz.vakitAdi}
                          </p>
                        </div>

                        {/* İçerik */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", flexWrap: "wrap", marginBottom: "var(--space-2)" }}>
                            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                              {namaz.ad}
                            </h2>
                            <span lang="ar" dir="rtl" style={{ fontFamily: "var(--font-arabic)", fontSize: "1.1rem", color: meta.color }}>
                              {namaz.arabca}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>
                            {meta.aciklama} — {namaz.aciklama.slice(0, 80)}…
                          </p>
                          {/* Rekat özeti */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                            {namaz.sunnet.once > 0 && (
                              <span className="badge badge--green">{namaz.sunnet.once} Rekat Sünnet (önce)</span>
                            )}
                            <span className="badge badge--gold">{namaz.farza} Rekat Farz</span>
                            {namaz.sunnet.sonra > 0 && (
                              <span className="badge badge--green">{namaz.sunnet.sonra} Rekat Sünnet (sonra)</span>
                            )}
                            {"vitir" in namaz && namaz.vitir && (
                              <span className="badge badge--green">{namaz.vitir} Rekat Vitir</span>
                            )}
                          </div>
                        </div>

                        {/* Toplam + ok */}
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <p style={{ fontSize: "2rem", fontWeight: 800, color: meta.color, lineHeight: 1 }}>
                            {namaz.rekat}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "var(--space-3)" }}>
                            toplam rekat
                          </p>
                          <span style={{ color: "var(--color-text-muted)", fontSize: "1.25rem" }} aria-hidden="true">→</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
