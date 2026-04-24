import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import FaqSection from "@/components/FaqSection";
import dualar from "@/data/dualar.json";

export function generateStaticParams() {
  return dualar.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dua = dualar.find((d) => d.slug === slug);
  if (!dua) return {};
  return {
    title: dua.meta.title,
    description: dua.meta.description,
    keywords: dua.meta.keywords,
    alternates: { canonical: `/dualar/${slug}` },
  };
}

export default async function DuaDetayPage({ params }: Props) {
  const { slug } = await params;
  const dua = dualar.find((d) => d.slug === slug);
  if (!dua) notFound();

  const renderWithHover = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index}>
        <span className="hover-word">{word}</span>{" "}
      </span>
    ));
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://namazdualari.org";

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Dualar",    item: `${siteUrl}/dualar` },
      { "@type": "ListItem", position: 3, name: dua.ad,      item: `${siteUrl}/dualar/${slug}` },
    ],
  };

  // Article JSON-LD (dua içeriği için)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dua.meta.title,
    description: dua.meta.description,
    inLanguage: "tr",
    url: `${siteUrl}/dualar/${slug}`,
    author: { "@type": "Organization", name: "Namaz Duaları" },
    publisher: { "@type": "Organization", name: "Namaz Duaları" },
    about: {
      "@type": "Thing",
      name: dua.ad,
      description: dua.meal,
      inLanguage: "ar",
    },
    keywords: dua.meta.keywords.join(", "),
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="container">
          <nav className="breadcrumb" aria-label="Ekmek kırıntısı">
            <Link href="/">Ana Sayfa</Link>
            <span className="breadcrumb__separator" aria-hidden="true">›</span>
            <Link href="/dualar">Dualar</Link>
            <span className="breadcrumb__separator" aria-hidden="true">›</span>
            <span className="breadcrumb__current">{dua.ad}</span>
          </nav>
        </div>

        <article className="container--narrow" style={{ paddingBlock: "var(--space-10)" }}>
          {/* Başlık */}
          <header style={{ marginBottom: "var(--space-10)" }}>
            {dua.diger_adlar && dua.diger_adlar.length > 0 && (
              <div className="cluster" style={{ marginBottom: "var(--space-4)" }}>
                {dua.diger_adlar.map((ad) => (
                  <span key={ad} className="badge badge--gold">{ad}</span>
                ))}
              </div>
            )}
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-4)",
            }}>
              {dua.ad}
            </h1>
            <p style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              padding: "var(--space-4) var(--space-5)",
              background: "var(--color-bg-surface)",
              borderRadius: "var(--radius-md)",
              borderLeft: "3px solid var(--color-primary)",
            }}>
              <strong>Ne zaman okunur?</strong> {dua.okunma_zamani}
            </p>
          </header>

          <AudioPlayer slug={slug} kategori={dua.kategori} />

          {/* Arapça Metin */}
          <section aria-labelledby="arabic-title" style={{ marginBottom: "var(--space-10)" }}>
            <h2 id="arabic-title" style={{
              fontSize: "0.85rem", fontWeight: 600,
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Arapça Metin
            </h2>
            <div className="arabic-text-block">
              <p lang="ar" dir="rtl">{renderWithHover(dua.arabca)}</p>
            </div>
          </section>

          {/* Transkripsiyon */}
          <section aria-labelledby="trans-title" style={{ marginBottom: "var(--space-10)" }}>
            <h2 id="trans-title" style={{
              fontSize: "0.85rem", fontWeight: 600,
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Türkçe Okunuşu (Transkripsiyon)
            </h2>
            <div style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
            }}>
              <p style={{
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "var(--color-text-primary)",
                lineHeight: 1.9,
                letterSpacing: "0.01em",
              }}>
                {renderWithHover(dua.transkripsiyon)}
              </p>
            </div>
          </section>

          {/* Türkçe Meali */}
          <section aria-labelledby="meal-title" style={{ marginBottom: "var(--space-10)" }}>
            <h2 id="meal-title" style={{
              fontSize: "0.85rem", fontWeight: 600,
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Türkçe Anlamı (Meal)
            </h2>
            <blockquote style={{
              background: "linear-gradient(135deg, rgba(46,169,111,.08), rgba(212,169,74,.05))",
              border: "1px solid var(--color-border)",
              borderLeft: "4px solid var(--color-gold)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6) var(--space-8)",
              margin: 0,
            }}>
              <p style={{
                fontSize: "1.1rem",
                color: "var(--color-text-primary)",
                lineHeight: 1.9,
              }}>
                {renderWithHover(dua.meal)}
              </p>
            </blockquote>
          </section>

          <hr className="divider" />

          {/* Diğer Dualar */}
          <nav aria-label="Diğer dualar">
            <h2 style={{
              fontSize: "1.1rem", fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-5)",
            }}>
              Diğer Dualar
            </h2>
            <ul className="cluster" role="list">
              {dualar
                .filter((d) => d.slug !== slug)
                .slice(0, 6)
                .map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/dualar/${d.slug}`}
                      id={`other-dua-${d.slug}`}
                      className="btn btn--secondary"
                      style={{ fontSize: "0.875rem", padding: "var(--space-2) var(--space-4)" }}
                    >
                      {d.ad}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          
          <FaqSection faqs={dua.faq} />
        </article>
      </main>
    </>
  );
}
