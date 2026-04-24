import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bize Ulaşın",
  description: "Namaz Duaları ve Namaz Sureleri rehberi iletişim bilgileri. Soru, öneri ve hata bildirimleri için bize ulaşın.",
};

export default function IletisimPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container" style={{ paddingBlock: "var(--space-12)", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "var(--space-6)", color: "var(--color-primary)" }}>
          Bize Ulaşın
        </h1>
        <div className="stack stack--md" style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "800px" }}>
          <p>
            Herhangi bir hata bildirimi, tavsiye veya genel iletişim için bize aşağıdaki kanallardan ulaşabilirsiniz:
          </p>
          <div className="card" style={{ marginTop: "var(--space-4)" }}>
            <p style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-2)" }}>E-posta</p>
            <p>
              <a href="mailto:info@namazdualari.org" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
                info@namazdualari.org
              </a>
            </p>
          </div>
          <div className="card">
            <p style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-2)" }}>Github (Açık Kaynak Katkısı)</p>
            <p>
              Hataları doğrudan raporlamak veya projeye geliştirici olarak katkı sağlamak isterseniz Github repositorimizi ziyaret edebilirsiniz (yakında).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
