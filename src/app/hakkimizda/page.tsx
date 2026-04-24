import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Namaz Duaları projesi hakkında bilgiler. Amacımız, reklamsız ve sade bir arayüzle en doğru namaz sureleri ve namaz duaları kaynağını sunmaktır.",
};

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container" style={{ paddingBlock: "var(--space-12)", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "var(--space-6)", color: "var(--color-primary)" }}>
          Hakkımızda
        </h1>
        <div className="stack stack--md" style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "800px" }}>
          <p>
            <strong>Namaz Duaları</strong>, günlük ibadetlerinizi daha kolay, doğru ve huzurlu bir şekilde yerine getirebilmeniz için tasarlanmış bağımsız bir Türkçe rehberdir. Namaz kılmayı yeni öğrenenler için yapılandırdığımız detaylı <Link href="/namazlar" style={{ textDecoration: "underline", fontWeight: 500, color: "var(--color-text-primary)" }}>namaz rehberimize</Link> veya ibadetlerinizi eksiksiz yapmak için <Link href="/dualar" style={{ textDecoration: "underline", fontWeight: 500, color: "var(--color-text-primary)" }}>dualar ve sureler</Link> sayfalarımıza saniyeler içinde ulaşabilirsiniz.
          </p>
          <p>
            Amacımız karmaşık tasarımlardan, dikkat dağıtıcı reklamlardan ve gereksiz içeriklerden arındırılmış, sadece "namaz ve dua" odaklı temiz bir kaynak oluşturmaktır. Duaların hem orijinal Arapça metinlerini, hem Latin harfli okunuşlarını hem de Türkçe meallerini en doğru haliyle sizlere ulaştırmayı hedefliyoruz. Metinlerimiz ağırlıklı olarak <a href="https://kuran.diyanet.gov.tr/" target="_blank" rel="nofollow noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 500, color: "var(--color-text-primary)" }}>Diyanet İşleri Başkanlığı Kur’an-ı Kerim Portalı</a> referans alınarak özenle derlenmektedir.
          </p>
          <p>
            Projemiz tamamen ücretsiz ve reklamsız olarak sürdürülmektedir. İbretlik hikayeler veya haber pop-up'ları olmadan sadeliği korumaya devam edeceğiz.
          </p>
        </div>
      </main>
    </>
  );
}
