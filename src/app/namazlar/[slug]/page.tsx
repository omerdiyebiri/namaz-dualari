import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import namazlar from "@/data/namazlar.json";
import dualar from "@/data/dualar.json";

// Statik parametreler — build time'da tüm slug'lar üretilir
export function generateStaticParams() {
  return namazlar.map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const namaz = namazlar.find((n) => n.slug === slug);
  if (!namaz) return {};
  return {
    title: namaz.meta.title,
    description: namaz.meta.description,
    keywords: namaz.meta.keywords,
    alternates: { canonical: `/namazlar/${slug}` },
  };
}

const vakitMeta: Record<string, { color: string; icon: string; bg: string }> = {
  sabah:  { color: "#7c9cbf", icon: "🌅", bg: "rgba(124,156,191,.08)" },
  ogle:   { color: "#d4a94a", icon: "☀️",  bg: "rgba(212,169,74,.08)"  },
  ikindi: { color: "#c97b3a", icon: "🌤️", bg: "rgba(201,123,58,.08)"  },
  aksam:  { color: "#9b6fa8", icon: "🌆", bg: "rgba(155,111,168,.08)" },
  yatsi:  { color: "#4a6fa8", icon: "🌙", bg: "rgba(74,111,168,.08)"  },
};

export default async function NamazDetayPage({ params }: Props) {
  const { slug } = await params;
  const namaz = namazlar.find((n) => n.slug === slug);
  if (!namaz) notFound();

  const meta = vakitMeta[slug] ?? { color: "#2ea96f", icon: "🕌", bg: "rgba(46,169,111,.08)" };

  // Bu namazda okunan duaları filtrele
  const namazDualari = namaz.dualar
    .map((duaSlug) => dualar.find((d) => d.slug === duaSlug))
    .filter(Boolean) as typeof dualar;

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://namazdualari.com" },
      { "@type": "ListItem", position: 2, name: "Namazlar",  item: "https://namazdualari.com/namazlar" },
      { "@type": "ListItem", position: 3, name: namaz.ad,    item: `https://namazdualari.com/namazlar/${slug}` },
    ],
  };

  // Rekat adımları
  const rekatAdimları: { etiket: string; rekat: number; tur: "sunnet" | "farz" | "vitir" }[] = [];
  if (namaz.sunnet.once > 0)
    rekatAdimları.push({ etiket: "İlk Sünnet", rekat: namaz.sunnet.once, tur: "sunnet" });
  rekatAdimları.push({ etiket: "Farz", rekat: namaz.farza, tur: "farz" });
  if (namaz.sunnet.sonra > 0)
    rekatAdimları.push({ etiket: "Son Sünnet", rekat: namaz.sunnet.sonra, tur: "sunnet" });
  if ("vitir" in namaz && namaz.vitir)
    rekatAdimları.push({ etiket: "Vitir", rekat: namaz.vitir, tur: "vitir" });

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
            <Link href="/namazlar">Namazlar</Link>
            <span className="breadcrumb__separator" aria-hidden="true">›</span>
            <span className="breadcrumb__current">{namaz.ad}</span>
          </nav>
        </div>

        {/* Namaz Hero */}
        <section
          style={{
            background: meta.bg,
            borderBottom: `1px solid var(--color-border-subtle)`,
            paddingBlock: "var(--space-12) var(--space-10)",
          }}
          aria-labelledby="namaz-title"
        >
          <div className="container--narrow">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
              <span style={{ fontSize: "3rem" }} aria-hidden="true">{meta.icon}</span>
              <div>
                <span className="badge badge--green" style={{ marginBottom: "var(--space-2)" }}>
                  {namaz.vakitAdi}
                </span>
                <h1 id="namaz-title" style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.15
                }}>
                  {namaz.ad}
                </h1>
              </div>
              <p lang="ar" dir="rtl" style={{
                fontFamily: "var(--font-arabic)",
                fontSize: "2rem",
                color: meta.color,
                marginLeft: "auto",
              }}>
                {namaz.arabca}
              </p>
            </div>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              {namaz.aciklama}
            </p>
          </div>
        </section>

        <div className="container--narrow" style={{ paddingBlock: "var(--space-10)" }}>
          {/* Rekat Yapısı */}
          <section aria-labelledby="rekat-title" style={{ marginBottom: "var(--space-12)" }}>
            <h2 id="rekat-title" style={{
              fontSize: "1.5rem", fontWeight: 700,
              color: "var(--color-text-primary)", marginBottom: "var(--space-6)"
            }}>
              Rekat Yapısı
            </h2>
            <ol style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", listStyle: "none" }}>
              {rekatAdimları.map((adim, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                    background: "var(--color-bg-surface)",
                    border: `1px solid ${adim.tur === "farz" ? meta.color : "var(--color-border-subtle)"}`,
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-4) var(--space-5)",
                  }}
                >
                  <span style={{
                    width: 32, height: 32,
                    borderRadius: "50%",
                    background: adim.tur === "farz" ? meta.color : "var(--color-bg-elevated)",
                    color: adim.tur === "farz" ? "#fff" : "var(--color-text-secondary)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "0.9rem", flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{adim.etiket}</p>
                  </div>
                  <span style={{
                    fontSize: "1.5rem", fontWeight: 800,
                    color: adim.tur === "farz" ? meta.color : "var(--color-text-secondary)"
                  }}>
                    {adim.rekat}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>rekat</span>
                </li>
              ))}
            </ol>
            <p style={{
              marginTop: "var(--space-4)",
              padding: "var(--space-3) var(--space-5)",
              background: "var(--color-bg-elevated)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
            }}>
              Toplam: <strong style={{ color: meta.color }}>{namaz.rekat} rekat</strong>
            </p>
          </section>

          <hr className="divider" />

          {/* Nasıl Kılınır? */}
          <section aria-labelledby="nasil-kilinir-title" style={{ marginBottom: "var(--space-12)" }}>
            <h2 id="nasil-kilinir-title" style={{
              fontSize: "1.5rem", fontWeight: 700,
              color: "var(--color-text-primary)", marginBottom: "var(--space-6)"
            }}>
              Adım Adım Nasıl Kılınır?
            </h2>
            
            <div className="stack stack--md">
              <div className="card">
                <h3 style={{ fontSize: "1.1rem", color: meta.color, marginBottom: "var(--space-2)" }}>1. Rekat</h3>
                <ol style={{ paddingLeft: "var(--space-5)", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                  <li>Niyet edilir ve "Allahu Ekber" diyerek İftitah Tekbiri alınır.</li>
                  <li><Link href="/dualar/subhaneke" style={{ textDecoration: "underline", color: "inherit" }}>Sübhaneke</Link> duası okunur.</li>
                  <li>Eûzü Besmele çekilir ve <Link href="/dualar/fatiha-suresi" style={{ textDecoration: "underline", color: "inherit" }}>Fatiha Suresi</Link> okunur.</li>
                  <li>Zamm-ı Sure (<Link href="/dualar" style={{ textDecoration: "underline", color: "inherit" }}>Kur'an'dan kısa bir sure</Link>) okunur.</li>
                  <li>"Allahu Ekber" diyerek Rükû'ya gidilir (3 kez "Sübhâne Rabbiye'l-Azîm").</li>
                  <li>"Semi'allahü limen hamideh" diyerek doğrulunur ("Rabbenâ leke'l-hamd").</li>
                  <li>"Allahu Ekber" diyerek Secde'ye gidilir (3 kez "Sübhâne Rabbiye'l-A'lâ"), oturulur ve tekrar secdeye gidilir.</li>
                  <li>Ayağa kalkılarak (Kıyam) 2. rekata geçilir.</li>
                </ol>
              </div>

              <div className="card">
                <h3 style={{ fontSize: "1.1rem", color: meta.color, marginBottom: "var(--space-2)" }}>2. Rekat ve Sonrası</h3>
                <ol style={{ paddingLeft: "var(--space-5)", color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                  <li>Sadece Besmele çekilir ve <Link href="/dualar/fatiha-suresi" style={{ textDecoration: "underline", color: "inherit" }}>Fatiha Suresi</Link> okunur (Sübhaneke okunmaz).</li>
                  <li>Zamm-ı Sure okunur (Farzların 3. ve 4. rekatlarında sadece Fatiha okunur).</li>
                  <li>Aynı şekilde Rükû ve Secdeler yapılarak oturuşa (Kade) geçilir.</li>
                  <li>İlk oturuşta sadece <Link href="/dualar/ettahiyyatu" style={{ textDecoration: "underline", color: "inherit" }}>Ettehiyyatü</Link> okunup ayağa kalkılır.</li>
                  <li>Son oturuşta <Link href="/dualar/ettahiyyatu" style={{ textDecoration: "underline", color: "inherit" }}>Ettehiyyatü</Link>, <Link href="/dualar/allahumme-salli" style={{ textDecoration: "underline", color: "inherit" }}>Salli</Link>-<Link href="/dualar/allahumme-barik" style={{ textDecoration: "underline", color: "inherit" }}>Barik</Link> ve <Link href="/dualar/rabbena-dualari" style={{ textDecoration: "underline", color: "inherit" }}>Rabbena duaları</Link> okunur.</li>
                  <li>"Esselâmü aleyküm ve rahmetullâh" diyerek önce sağa, sonra sola selam verilerek namaz tamamlanır.</li>
                </ol>
                <p style={{ marginTop: "var(--space-3)", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  <em>* Vitir namazının 3. rekatında Fatiha ve Zamm-ı Sureden sonra tekbir alınıp <Link href="/dualar/kunut-dualari" style={{ textDecoration: "underline", color: "inherit" }}>Kunut duaları</Link> okunur.</em>
                </p>
              </div>
            </div>
          </section>

          <hr className="divider" />

          {/* Bu Namazda Okunan Dualar */}
          <section aria-labelledby="dualar-title">
            <h2 id="dualar-title" style={{
              fontSize: "1.5rem", fontWeight: 700,
              color: "var(--color-text-primary)", marginBottom: "var(--space-6)"
            }}>
              Okunan Dualar
            </h2>
            <ul className="stack stack--md" role="list">
              {namazDualari.map((dua, i) => (
                <li key={dua.slug}>
                  <Link href={`/dualar/${dua.slug}`} className="dua-card" id={`dua-${dua.slug}`}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-3)" }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "var(--color-bg-elevated)",
                        color: "var(--color-text-muted)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ color: "var(--color-text-muted)", fontSize: "1rem" }} aria-hidden="true">→</span>
                    </div>
                    <p
                      className="dua-card__arabic"
                      lang="ar"
                      dir="rtl"
                    >
                      {dua.arabca.length > 120 ? dua.arabca.slice(0, 120) + "…" : dua.arabca}
                    </p>
                    <p className="dua-card__name">{dua.ad}</p>
                    <p className="dua-card__transcription">{dua.transkripsiyon.slice(0, 60)}…</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <FaqSection faqs={namaz.faq} />
        </div>
      </main>
    </>
  );
}
