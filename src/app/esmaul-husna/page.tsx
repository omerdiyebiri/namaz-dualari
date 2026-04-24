import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import esmaulHusna from "@/data/esmaul-husna.json";

export const metadata: Metadata = {
  title: "Esmaül Hüsna: Allah'ın 99 İsmi, Anlamları ve Faziletleri",
  description: "Allah'ın en güzel 99 isminin (Esmaül Hüsna) Türkçe anlamları, ebced değerleri ve zikir faziletleri rehberi.",
  alternates: { canonical: "/esmaul-husna" },
};

export default function EsmaulHusnaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://namazdualari.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Esmaül Hüsna",
        "item": "https://namazdualari.org/esmaul-husna"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main id="main-content" style={{ padding: "var(--space-12) 0 var(--space-20) 0" }}>
        
        {/* Header Alanı */}
        <header className="container" style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <span style={{ fontSize: "3rem", display: "inline-block", marginBottom: "var(--space-4)" }}>✨</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" }}>
            Esmaül Hüsna
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
            "En güzel isimler (Esmaül Hüsna) Allah'ındır. O halde O'na o güzel isimlerle dua edin." (A'râf Suresi, 180). Allah'ın (c.c) mucizevi isimlerinin anlamları ve sırları.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            {esmaulHusna.map((isim, index) => (
              <div key={isim.id} style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "24px",
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }} className="bento-hover-effect">
                
                {/* Numara */}
                <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "6rem", fontWeight: 900, color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none" }}>
                  {isim.id}
                </div>

                <div style={{ marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(46,169,111,0.1)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 700 }}>
                    {index + 1}
                  </div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-gold)", margin: 0 }}>
                    {isim.name}
                  </h2>
                </div>

                <p style={{ color: "#fff", fontSize: "1.05rem", lineHeight: 1.5, marginBottom: "var(--space-4)", fontWeight: 500 }}>
                  {isim.meaning}
                </p>

                <div style={{ marginTop: "auto", background: "rgba(0,0,0,0.2)", padding: "var(--space-4)", borderRadius: "16px", borderLeft: "3px solid var(--color-primary)" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", fontWeight: 600 }}>Fazileti</p>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {isim.virtue}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .bento-hover-effect:hover {
            transform: translateY(-5px);
            border-color: rgba(46,169,111,0.3) !important;
            box-shadow: 0 10px 40px rgba(46,169,111,0.1);
            background: rgba(255,255,255,0.04) !important;
          }
        `}} />

      </main>

      <section style={{ padding: "var(--space-12) 0 var(--space-20) 0" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FaqSection faqs={[
            {
              soru: "Esmaül Hüsna nedir ve kaç tanedir?",
              cevap: "Esmaül Hüsna, Allah'ın (c.c.) 'En Güzel İsimleri' anlamına gelir. Kur'an ve hadislerde geçen, her birinin farklı derin anlamları ve manevi faziletleri bulunan toplam 99 adet isimden oluşmaktadır."
            },
            {
              soru: "Esmaül Hüsna okumanın faziletleri nelerdir?",
              cevap: "Peygamber Efendimiz (s.a.v) bu 99 ismin ezberlenmesi ve manasının bilinerek zikredilmesi halinde kişinin cennetle müjdeleneceğini bildirmiştir. Ayrıca her ismin şifa, bereket, huzur ve sıkıntıların def'i gibi özel faziletleri vardır."
            },
            {
              soru: "Bu sayfadaki Esmaül Hüsna zikirleri nasıl uygulanmalıdır?",
              cevap: "İsmin başına 'Ya' nidası getirilerek (Örn: Ya Rahman, Ya Rahim) kalpten, samimiyetle ve anlamı tefekkür edilerek günlük olarak zikredilebilir. Abdestli olmak efdaldir."
            }
          ]} />
        </div>
      </section>
    </>
  );
}
