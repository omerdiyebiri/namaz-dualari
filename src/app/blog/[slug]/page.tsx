import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import blog from "@/data/blog.json";

export function generateStaticParams() {
  return blog.map((m) => ({ slug: m.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const makale = blog.find((m) => m.slug === slug);
  if (!makale) return {};

  return {
    title: makale.title,
    description: makale.description,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const makale = blog.find((m) => m.slug === slug);
  if (!makale) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ padding: "var(--space-12) 0" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <nav aria-label="Breadcrumb" className="breadcrumb" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "inline-flex", padding: "6px 16px", borderRadius: "100px", fontSize: "0.85rem" }}>
            <ol className="cluster cluster--sm" role="list" style={{ listStyle: "none", display: "flex", gap: "8px", margin: 0, padding: 0 }}>
              <li>
                <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Ana Sayfa</Link>
                <span aria-hidden="true" style={{ margin: "0 8px", color: "var(--color-text-muted)" }}>/</span>
              </li>
              <li>
                <Link href="/blog" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Blog</Link>
                <span aria-hidden="true" style={{ margin: "0 8px", color: "var(--color-text-muted)" }}>/</span>
              </li>
              <li>
                <span aria-current="page" style={{ color: "var(--color-text-secondary)" }}>{makale.title}</span>
              </li>
            </ol>
          </nav>

          <header style={{ marginTop: "var(--space-8)", marginBottom: "var(--space-12)", textAlign: "center" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "var(--space-4)" }}>{makale.icon}</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, color: "#fff", marginBottom: "var(--space-4)" }}>
              {makale.title}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
              <span>⏱️ {makale.read_time}</span>
              <span>📝 Namaz Duaları Editör</span>
            </div>
          </header>

          <div 
            className="long-form-content" 
            style={{ 
              fontSize: "1.15rem", 
              lineHeight: 1.85, 
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "32px",
              padding: "var(--space-8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 24px 64px -12px rgba(0, 0, 0, 0.2)"
            }}
            dangerouslySetInnerHTML={{ __html: makale.content }} 
          />

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "var(--space-12) 0" }} />

          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--space-6)", color: "#fff" }}>Diğer Blog Yazıları</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--space-4)" }}>
              {blog.filter(m => m.slug !== slug).map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="blog-card" style={{ display: "block", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "var(--space-5)", textDecoration: "none", transition: "all 0.3s ease" }}>
                  <p style={{ fontSize: "1.5rem", marginBottom: "var(--space-2)" }}>{m.icon}</p>
                  <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "var(--space-2)", fontWeight: 600 }}>{m.title}</h3>
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.description}</p>
                </Link>
              ))}
            </div>
          </section>

        </article>

        <style dangerouslySetInnerHTML={{__html: `
          .long-form-content h2 {
            font-size: 1.8rem;
            color: var(--color-primary);
            margin: var(--space-8) 0 var(--space-4) 0;
            line-height: 1.3;
          }
          .long-form-content h3 {
            font-size: 1.4rem;
            color: var(--color-gold);
            margin: var(--space-6) 0 var(--space-3) 0;
          }
          .long-form-content p {
            margin-bottom: var(--space-5);
          }
          .long-form-content strong {
            color: #fff;
          }
          .blog-card:hover {
            border-color: var(--color-primary) !important;
            background: rgba(46,169,111,0.05) !important;
            transform: translateY(-2px);
          }
        `}} />
      </main>
    </>
  );
}
