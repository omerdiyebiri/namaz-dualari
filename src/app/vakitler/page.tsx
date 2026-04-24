import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Namaz Vakitleri",
  description:
    "Bugünkü canlı namaz vakitleri. Bulunduğunuz konuma özel Sabah, Öğle, İkindi, Akşam ve Yatsı namaz saatlerini hemen görüntüleyin.",
  alternates: { canonical: "/vakitler" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://namazdualari.com" },
    { "@type": "ListItem", position: 2, name: "Vakitler",  item: "https://namazdualari.com/vakitler" },
  ],
};

import VakitlerClient from "./VakitlerClient";

export default function VakitlerPage() {
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
            <span className="breadcrumb__current">Vakitler</span>
          </nav>
        </div>

        <section className="section section--sm" aria-labelledby="vakitler-title">
          <div className="container">
            <VakitlerClient />
            
            <div style={{ marginTop: "var(--space-8)", textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Canlı namaz vakitleri <a href="https://aladhan.com" target="_blank" rel="nofollow noopener noreferrer" style={{ textDecoration: "underline", color: "var(--color-text-secondary)", fontWeight: 500 }}>Aladhan API</a> altyapısı kullanılarak konumunuza göre hesaplanmaktadır.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
