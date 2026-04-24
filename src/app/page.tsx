import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import blog from "@/data/blog.json";
import DailyWidget from "@/components/DailyWidget";

export const metadata: Metadata = {
  title: {
    absolute: "Namaz Duaları ve Namaz Vakitleri - Türkçe Arapça Namaz Sureleri",
  },
  description:
    "Namaz duaları, rekatları, namaz sureleri ve namaz vakitleri hakkında en kapsamlı Türkçe ve Arapça rehberi sayfası. Her şey 2 tıklama uzağınızda.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    soru: "Namaz Duaları uygulaması internet olmadan kullanılabilir mi?",
    cevap: "Evet. Tüm metinler, sure okunuşları ve rehberler cihazınıza anında kaydedilir ve çevrimdışı dahi olsanız pürüzsüz çalışır."
  },
  {
    soru: "Namaz Vakitleri hesaplama algoritması neye dayanıyor?",
    cevap: "Diyanet İşleri Başkanlığı'nın resmi veritabanı uçlarıyla entegre olarak tam uyumlu saatleri anlık koordinatlarınız üzerinden hesaplıyoruz."
  },
  {
    soru: "Surelerde sesli dinleme ve kelime takibi nasıl açılır?",
    cevap: "Seçtiğiniz surenin içerisine girdiğinizde doğrudan mp3 oynatıcı belirir. Fare ile dilediğiniz kelimenin üzerine gelerek sesle eşzamanlı Türkçe/Arapça takibini kolayca yapabilirsiniz."
  }
];

export default function HomePage() {

  return (
    <>
      <Navbar />

      <main id="main-content" style={{ paddingBottom: "var(--space-20)" }}>
        
        {/* CSS for Bento Grid and Ultra Premium Styling */}
        <style dangerouslySetInnerHTML={{__html: `
          .hero-premium {
            text-align: center;
            padding: var(--space-16) var(--space-4) var(--space-12) var(--space-4);
          }
          .hero-title-premium {
            font-family: var(--font-sans);
            font-size: clamp(3rem, 7vw, 5.5rem);
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: -0.04em;
            color: #ffffff;
            margin-bottom: var(--space-6);
            background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 4px 40px rgba(46,169,111,0.2);
          }
          .hero-subtitle-premium {
            font-size: 1.25rem;
            color: rgba(255,255,255,0.6);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .bento-container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--space-5);
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--space-4);
          }

          .bento-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 32px;
            padding: var(--space-8);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }

          .bento-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .bento-card:hover {
            transform: translateY(-4px) scale(1.01);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(46,169,111,0.15);
          }
          .bento-card:hover::before {
            opacity: 1;
          }

          .span-8 { grid-column: span 8; }
          .span-4 { grid-column: span 4; }
          .span-3 { grid-column: span 3; }
          .span-6 { grid-column: span 6; }

          .bento-list-card:hover {
            background: rgba(255,255,255,0.04) !important;
            border-color: rgba(46,169,111,0.3) !important;
          }
          
          .bento-action-card:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 40px rgba(46,169,111,0.2);
          }

          @media (max-width: 992px) {
            .span-12, .span-8, .span-6 { grid-column: span 12; }
            .span-4 { grid-column: span 6; }
            .span-3 { grid-column: span 6; }
          }
          @media (max-width: 600px) {
            .span-4, .span-3 { grid-column: span 12; }
            .bento-card { border-radius: 24px; padding: var(--space-6); }
          }
        `}} />

        {/* ── Ultra Premium Hero ────────────────────────────────────────────── */}
        <section className="hero-premium">
          <p style={{ color: "var(--color-primary)", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "var(--space-4)" }}>
            Kapsamlı İslami Rehber
          </p>
          <h1 className="hero-title-premium">
            Namaz Duaları ve Sureleri
          </h1>
          <p className="hero-subtitle-premium">
            Namaz vakitleri, dua ezberleme asistanı, rehberler ve sure dinletileri; 
            tümüyle reklamsız ve sade bir deneyim sunmak için tasarlandı.
          </p>
        </section>

        {/* ── Günün Ayeti / Hadisi (Slim Banner) ────────────────────────────── */}
        <div style={{ padding: "0 var(--space-4)" }}>
          <DailyWidget />
        </div>

        {/* ── Bento Grid ────────────────────────────────────────────────────── */}
        <div className="bento-container">

          {/* Vakitler Widget - Büyük Sol Kutu */}
          <Link href="/vakitler" className="bento-card span-8" style={{ minHeight: "380px", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "var(--space-2)" }}>Canlı İzleyici</p>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-2)" }}>Günün Vakitleri</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "400px" }}>Şehrinize veya girdiğiniz adrese özel Diyanet uyumlu tam koordinatlı namaz saatleri.</p>
            </div>
            
            <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", marginTop: "var(--space-8)" }}>
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "var(--space-4) var(--space-6)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "4px" }}>Hesaplama Yöntemi</p>
                <p style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>Diyanet Uyumlu 🕌</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--space-6)", background: "var(--color-primary)", color: "#fff", borderRadius: "20px", fontWeight: 600, fontSize: "1.1rem" }}>
                Vakitlere Göz At →
              </div>
            </div>
            {/* Soft decorative glow behind text */}
            <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(46,169,111,0.2) 0%, transparent 70%)", pointerEvents: "none" }}></div>
          </Link>

          {/* Hızlı Başlangıç - Sağ Üst Kutu */}
          <Link href="/blog/adim-adim-namaz-kilinisi" className="bento-card span-4" style={{ minHeight: "380px" }}>
            <div style={{ position: "absolute", top: "var(--space-8)", right: "var(--space-8)", width: "40px", height: "40px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              🕌
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "var(--space-2)" }}>Rehber</p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" }}>Namaz Nasıl Kılınır?</h2>
            
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "var(--space-6)", flex: 1 }}>
              5 vakit namazın adım adım resimsiz, saf ve dikkat dağıtmayan anlatımı. Rekatlara göre ayrılmış şema dizilimi.
            </p>
            
            <div style={{ color: "var(--color-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              Adımları İncele <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>›</span>
            </div>
          </Link>

          {/* Populer Blog / Rehber Kartlari */}
          {blog.map((makale) => (
            <Link key={makale.slug} href={`/blog/${makale.slug}`} className="bento-card span-6" style={{ minHeight: "220px", flexDirection: "row", gap: "var(--space-6)", alignItems: "center" }}>
              <div style={{ flex: "0 0 80px", height: "80px", background: "rgba(46,169,111,0.1)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>
                {makale.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "var(--space-2)" }}>Rehber • {makale.read_time}</p>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", marginBottom: "var(--space-2)", lineHeight: 1.3 }}>{makale.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {makale.description}
                </p>
              </div>
            </Link>
          ))}

        </div>

        {/* ── SSS (FAQ Section) ────────────────────────────────────────────── */}
        <section aria-labelledby="sss-title" style={{ padding: "var(--space-16) 0 0 0" }}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <FaqSection faqs={homeFaqs} />
          </div>
        </section>
      </main>
    </>
  );
}
