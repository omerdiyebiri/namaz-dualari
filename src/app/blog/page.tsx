import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import blog from "@/data/blog.json";

export const metadata: Metadata = {
  title: "Blog ve İslami Rehberler - Namaz Duaları",
  description: "Namaz kılınışı, duaların faziletleri ve dini rehberler hakkında aradığınız her şey Namaz Duaları Blog sayfasında.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ padding: "var(--space-12) 0 var(--space-20) 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <header style={{ marginBottom: "var(--space-12)", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "var(--space-4)" }}>
              Dini Rehberler & Blog
            </h1>
            <p style={{ fontSize: "1.2rem", color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
              İbadetlerinizi derinleştirecek, sure ve duaların ardındaki muazzam hikmetleri keşfedeceğiniz rehber arşivi.
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-6)" }}>
            {blog.map((makale) => (
              <Link key={makale.slug} href={`/blog/${makale.slug}`} className="blog-index-card" style={{ display: "flex", flexDirection: "column", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "32px", padding: "var(--space-8)", textDecoration: "none", transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)" }}>
                <div style={{ flex: "0 0 auto", fontSize: "3rem", marginBottom: "var(--space-6)", width: "80px", height: "80px", background: "rgba(46,169,111,0.1)", borderRadius: "24px", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
                  {makale.icon}
                </div>
                <div style={{ flex: "1 1 auto" }}>
                  <p style={{ color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "var(--space-3)" }}>
                    Okuma Süresi: {makale.read_time}
                  </p>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, marginBottom: "var(--space-3)" }}>
                    {makale.title}
                  </h2>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
                    {makale.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .blog-index-card:hover {
            transform: translateY(-4px) scale(1.01);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(46,169,111,0.15);
            background: rgba(255, 255, 255, 0.04);
          }
        `}} />
      </main>
    </>
  );
}
