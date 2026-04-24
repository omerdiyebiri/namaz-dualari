import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import tesbihatData from "@/data/tesbihat.json";

export const metadata: Metadata = {
  title: "Adım Adım Namaz Tesbihatı Rehberi",
  description: "Farz namazlardan sonra yapılan tesbihatın sırası, okunacak duaların Türkçe okunuşları ve anlamları.",
  alternates: { canonical: "/tesbihat" },
};

export default function TesbihatPage() {
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
        "name": "Tesbihat",
        "item": "https://namazdualari.org/tesbihat"
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
        <header className="container" style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
          <span style={{ fontSize: "3rem", display: "inline-block", marginBottom: "var(--space-4)" }}>📿</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" }}>
            Namaz Tesbihatı Nasıl Yapılır?
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
            Namazı kılıp selam verdikten sonra sırasıyla yapılması gereken tesbihat (zikir) adımları. Peygamber Efendimiz'in (s.a.v) sünneti olan bu dualar, namazın nurunu ve feyzini tamamlar.
          </p>
        </header>

        {/* Adım Adım Liste */}
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ position: "relative" }}>
            
            {/* Sol taraftaki dikey çizgi (Timeline Line) */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "24px", width: "2px", background: "rgba(255,255,255,0.05)", zIndex: 0 }}></div>

            {tesbihatData.map((adim, index) => (
              <div key={adim.step} style={{ position: "relative", paddingLeft: "80px", marginBottom: "var(--space-12)", zIndex: 1 }}>
                
                {/* Adım Numarası (Timeline Noktası) */}
                <div style={{ position: "absolute", left: "0", top: "0", width: "50px", height: "50px", borderRadius: "50%", background: "var(--color-bg)", border: "2px solid var(--color-primary)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, boxShadow: "0 0 20px rgba(46,169,111,0.3)" }}>
                  {adim.step}
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "var(--space-8)", backdropFilter: "blur(24px)", position: "relative", overflow: "hidden" }} className="tesbihat-card">
                  
                  {/* Dekoratif numara arka plan */}
                  <div style={{ position: "absolute", top: "-20px", right: "10px", fontSize: "8rem", fontWeight: 900, color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none", zIndex: 0 }}>
                    0{adim.step}
                  </div>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 style={{ fontSize: "1.5rem", color: "#fff", fontWeight: 700, marginBottom: "var(--space-2)" }}>{adim.title}</h2>
                    <p style={{ color: "var(--color-primary)", fontSize: "0.95rem", fontWeight: 600, marginBottom: "var(--space-6)" }}>Talimat: {adim.instruction}</p>

                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "var(--space-6)", borderRadius: "16px", marginBottom: "var(--space-4)" }}>
                      <p style={{ fontSize: "1.8rem", color: "var(--color-gold)", textAlign: "right", fontFamily: "'Scheherazade New', serif", lineHeight: 1.6, marginBottom: "var(--space-4)" }} dir="rtl">
                        {adim.arabic}
                      </p>
                      <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "var(--space-4)" }}>
                        {adim.reading}
                      </p>
                    </div>

                    <div style={{ background: "rgba(46,169,111,0.05)", borderLeft: "3px solid var(--color-primary)", padding: "var(--space-4)", borderRadius: "0 12px 12px 0" }}>
                      <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", lineHeight: 1.6, fontStyle: "italic" }}>
                        "{adim.meaning}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .tesbihat-card {
            transition: all 0.3s ease;
          }
          .tesbihat-card:hover {
            border-color: rgba(46,169,111,0.2) !important;
            transform: translateX(5px);
          }
          @media (max-width: 600px) {
            .tesbihat-card { padding: var(--space-6); }
          }
        `}} />

      </main>

      <section style={{ padding: "var(--space-12) 0 var(--space-20) 0" }}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FaqSection faqs={[
            {
              soru: "Namaz tesbihatı yapmak farz mıdır?",
              cevap: "Hayır, namaz tesbihatı farz değildir. Ancak Peygamber Efendimizin (s.a.v) çokça tavsiye ettiği, sevabı çok yüksek kuvvetli bir sünnettir (müstehap)."
            },
            {
              soru: "33'lük tesbihler hangi sırayla çekilir?",
              cevap: "Namaz sonrası Ayet-el Kürsi okunduktan sonra sırasıyla; 33 defa Sübhanallah, 33 defa Elhamdülillah ve 33 defa Allahuekber denilir."
            },
            {
              soru: "Namaz tesbihatının dindeki önemi nedir?",
              cevap: "Hadis-i şeriflere göre, farz namazlardan sonra yapılan bu zikirler ve tesbihatlar, günahların deniz köpüğü kadar çok olsa bile bağışlanmasına vesile olur ve kulun Allah'a yakınlaşmasını sağlar."
            }
          ]} />
        </div>
      </section>
    </>
  );
}
