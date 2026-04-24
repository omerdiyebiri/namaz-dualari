import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import dualar from "@/data/dualar.json";
import DualarListClient from "./DualarListClient";

export const metadata: Metadata = {
  title: "Dualar ve Sureler",
  description:
    "Okunan namaz duaları ve namaz surelerinin Arapça metni, Türkçe okunuşu ve detaylı meali. Dualar listesinde arama yapın ve hemen öğrenin.",
  keywords: ["namaz duaları", "namaz sureleri", "sübhaneke", "fatiha", "namazda okunan dualar"],
  alternates: { canonical: "/dualar" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://namazdualari.org" },
    { "@type": "ListItem", position: 2, name: "Namaz Duaları ve Sureleri", item: "https://namazdualari.org/dualar" },
  ],
};

export default function DualPage() {
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
            <span className="breadcrumb__current">Namaz Duaları ve Sureleri</span>
          </nav>
        </div>

        {/* Header */}
        <section className="section section--sm" aria-labelledby="dualar-page-title">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">{dualar.length} Dua ve Sure</p>
              <h1 className="section-header__title" id="dualar-page-title">
                Namaz Duaları ve Sureleri
              </h1>
              <p className="section-header__desc">
                En faziletli Namaz Duaları ve Namaz Sureleri — Arapça metin, Türkçe okunuş ve Türkçe anlamlarıyla kategoriye özel sıralı liste.
              </p>
            </div>

            {/* Arama ve Liste Bileşeni */}
            <DualarListClient dualar={dualar} />
          </div>
        </section>
      </main>
    </>
  );
}
