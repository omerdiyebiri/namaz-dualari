"use client";

import { useState } from "react";
import Link from "next/link";

const kategoriler: Record<string, { ad: string; icon: string }> = {
  dua:  { ad: "Namaz Duaları", icon: "🤲" },
  sure: { ad: "Namaz Sureleri", icon: "📖" },
};

export default function DualarListClient({ dualar }: { dualar: any[] }) {
  const [search, setSearch] = useState("");

  const filteredDualar = dualar.filter((dua) => {
    const term = search.toLowerCase();
    return (
      dua.ad.toLowerCase().includes(term) ||
      dua.transkripsiyon.toLowerCase().includes(term) ||
      dua.meal.toLowerCase().includes(term) ||
      (dua.diger_adlar && dua.diger_adlar.some((d: string) => d.toLowerCase().includes(term)))
    );
  });

  // Kategoriye göre grupla
  const grouped = filteredDualar.reduce<Record<string, any[]>>((acc, dua) => {
    const kat = dua.kategori;
    if (!acc[kat]) acc[kat] = [];
    acc[kat].push(dua);
    return acc;
  }, {});

  return (
    <>
      <div style={{ marginBottom: "var(--space-8)" }}>
        <input
          type="search"
          placeholder="Dua ara... (örn: fatiha, kunut)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "var(--space-4)",
            fontSize: "1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-surface)",
            color: "var(--color-text-primary)",
            outline: "none",
            transition: "border-color var(--transition-fast)"
          }}
          aria-label="Dualarda arama yap"
        />
      </div>

      <div className="stack stack--xl">
        {Object.entries(grouped).length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)", paddingBlock: "var(--space-8)" }}>
            Sonuç bulunamadı: "{search}"
          </p>
        ) : (
          Object.entries(grouped).map(([kat, katDualar]) => {
            const katMeta = kategoriler[kat] ?? { ad: kat, icon: "📋" };
            return (
              <section key={kat} aria-labelledby={`kat-${kat}`}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
                  <span style={{ fontSize: "1.5rem" }} aria-hidden="true">{katMeta.icon}</span>
                  <h2 id={`kat-${kat}`} style={{
                    fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)"
                  }}>
                    {katMeta.ad}
                  </h2>
                  <span className="badge badge--green">{katDualar.length}</span>
                </div>

                <ul className="grid-auto" role="list">
                  {katDualar.map((dua) => (
                    <li key={dua.slug}>
                      <Link href={`/dualar/${dua.slug}`} className="dua-card" id={`dua-link-${dua.slug}`}>
                        <p
                          className="dua-card__arabic"
                          lang="ar"
                          dir="rtl"
                        >
                          {dua.arabca.length > 100 ? dua.arabca.slice(0, 100) + "…" : dua.arabca}
                        </p>
                        <p className="dua-card__name">{dua.ad}</p>
                        <p className="dua-card__transcription">
                          {dua.transkripsiyon.slice(0, 55)}…
                        </p>
                        <p style={{
                          marginTop: "var(--space-3)",
                          fontSize: "0.8rem",
                          color: "var(--color-text-muted)",
                          fontStyle: "italic",
                        }}>
                          {dua.okunma_zamani.slice(0, 60)}…
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </>
  );
}
