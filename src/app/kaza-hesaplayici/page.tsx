import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import KazaClient from "./KazaClient";

export const metadata: Metadata = {
  title: "Kaza Namazı Hesaplayıcı ve Takip",
  description: "Kaç yıllık/aylık kaza namazı borcunuz olduğunu hesaplayın ve interaktif bir panel ile gün gün takip ederek kaza borçlarınızı bitirin.",
  alternates: { canonical: "/kaza-hesaplayici" },
};

export default function KazaHesaplayiciPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ padding: "var(--space-12) 0 var(--space-20) 0" }}>
        
        <header style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" }}>
            Kaza Namazı Takip
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Geçmiş kaza namazlarınızı hesaplayın, tarayıcınıza güvenle kaydedin ve ilerlemenizi estetik bir panelle takip edin.
          </p>
        </header>

        <div className="container" style={{ maxWidth: "1000px" }}>
          <KazaClient />
        </div>

      </main>
    </>
  );
}
