import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Namaz Duaları ve Namaz Sureleri platformunun gizlilik prensipleri. Kişisel veri toplamadan ve izleme yapmadan sunduğumuz hizmetin detayları.",
};

export default function GizlilikPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container" style={{ paddingBlock: "var(--space-12)", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "var(--space-6)", color: "var(--color-primary)" }}>
          Gizlilik Politikası
        </h1>
        <div className="stack stack--md" style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, maxWidth: "800px" }}>
          <p>
            Namaz Duaları olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu metin, platformumuzu kullanırken verilerinizin nasıl (ya da nasıl işlenmediği) hakkında bilgi verir.
          </p>
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-text-primary)", marginTop: "var(--space-4)" }}>1. Veri Toplama</h2>
          <p>
            Namaz Duaları uygulamasında herhangi bir kullanıcı hesabı açılmaz, e-posta adresi veya kişisel kimlik bilgileriniz talep edilmez.
          </p>
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-text-primary)", marginTop: "var(--space-4)" }}>2. Konum Servisleri (Vakitler)</h2>
          <p>
            "Vakitler" sayfası, tam bulunduğunuz yere ait ezan vakitlerini gösterebilmek için cihazınızın tarayıcısına yerleşik konum (geolocation) servislerini kullanır. Konum izni tamamen sizin isteğinize bağlıdır ve alınan konum verileri <strong>hiçbir şekilde sunucularımıza kaydedilmez</strong>. Doğrudan tarayıcınızdan Aladhan API'sine iletilir.
          </p>
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-text-primary)", marginTop: "var(--space-4)" }}>3. Çerezler (Cookies)</h2>
          <p>
            Ziyaretçilerimizi izlemek (tracking) veya reklam göstermek amacıyla herhangi bir 3. parti çerez veya analiz aracı kullanılmaz. Arayüz seçimleriniz (olası karanlık mod/yazı boyutu ayarları) sadece tarayıcınızın yerel depolamasında (LocalStorage) tutulur.
          </p>
        </div>
      </main>
    </>
  );
}
