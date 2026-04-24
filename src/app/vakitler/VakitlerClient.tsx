"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Timings = Record<string, string>;

const vakitlerDef = [
  { ad: "İmsak", key: "Imsak", arabca: "الإمساك", icon: "⭐", aciklama: "Orucun başlangıcı", renk: "#5b7fa6" },
  { ad: "Sabah", key: "Fajr", arabca: "صلاة الفجر", icon: "🌅", aciklama: "Fajr vakti", renk: "#7c9cbf" },
  { ad: "Güneş", key: "Sunrise", arabca: "الشروق", icon: "🌄", aciklama: "Güneşin doğuşu", renk: "#b8895a" },
  { ad: "Öğle", key: "Dhuhr", arabca: "صلاة الظهر", icon: "☀️", aciklama: "Dhuhr vakti", renk: "#d4a94a" },
  { ad: "İkindi", key: "Asr", arabca: "صلاة العصر", icon: "🌤️", aciklama: "Asr vakti", renk: "#c97b3a" },
  { ad: "Akşam", key: "Maghrib", arabca: "صلاة المغرب", icon: "🌆", aciklama: "Maghrib vakti", renk: "#9b6fa8" },
  { ad: "Yatsı", key: "Isha", arabca: "صلاة العشاء", icon: "🌙", aciklama: "Isha vakti", renk: "#4a6fa8" },
];

export default function VakitlerClient() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("İstanbul, Türkiye");
  const [searchInput, setSearchInput] = useState("");

  const fetchTimingsByCoords = async (lat: number, lng: number, fallbackName?: string) => {
    try {
      setLoading(true);
      setError(null);
      // Diyanet İşleri Başkanlığı method is 13
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=13`
      );
      if (!res.ok) throw new Error("Vakitler yüklenemedi.");
      const data = await res.json();
      setTimings(data.data.timings);
      if (fallbackName) setLocationName(fallbackName);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTimingsByAddress = async (address: string) => {
    try {
      setLoading(true);
      setError(null);
      // Diyanet İşleri Başkanlığı method is 13
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=13`
      );
      if (!res.ok) throw new Error("Geçerli bir lokasyon bulunamadı. Lütfen tekrar deneyin.");
      const data = await res.json();
      setTimings(data.data.timings);
      // API'dan dönen adresi isterseniz kullanabilirsiniz ancak kullanıcı gridiği adresi formatlamak daha temiz:
      // Capitalize first letter logic etc format.
      // For simplicity let's stick to what user searched
      setLocationName(address.toUpperCase());
    } catch (err: any) {
      setError(err.message || "Geçerli bir lokasyon bulunamadı.");
      setTimings(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchTimingsByCoords(position.coords.latitude, position.coords.longitude, "Bulunduğunuz Konum");
          setSearchInput("");
        },
        () => {
          // Fallback to coordinates of Istanbul
          fetchTimingsByCoords(41.0082, 28.9784, "İSTANBUL, TÜRKİYE");
          setSearchInput("");
        }
      );
    } else {
      fetchTimingsByCoords(41.0082, 28.9784, "İSTANBUL, TÜRKİYE");
      setSearchInput("");
    }
  };

  useEffect(() => {
    // Component mounted, auto fetch
    handleAutoLocation();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    fetchTimingsByAddress(searchInput.trim());
  };

  return (
    <>
      <div className="section-header" style={{ marginBottom: "var(--space-6)" }}>
        <p className="section-header__eyebrow" style={{ color: "var(--color-primary)", fontWeight: 700, letterSpacing: "1px" }}>{locationName}</p>
        <h1 className="section-header__title" id="vakitler-title">
          Bugünün Namaz Vakitleri
        </h1>
        <p className="section-header__desc">
          Diyanet İşleri Başkanlığı'nın hesaplama yöntemine göre konumunuza özel vakitler.
        </p>
      </div>

      {/* Adres / Konum Arama Alanı (Manual Override) */}
      <form 
        onSubmit={handleSearchSubmit} 
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-10)",
          background: "rgba(22, 27, 34, 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "var(--space-2)",
          borderRadius: "var(--radius-full)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="İl, İlçe veya Ülke adı girin..."
          aria-label="Konum arama"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "var(--color-text-primary)",
            padding: "var(--space-2) var(--space-4)",
            fontSize: "1rem",
            outline: "none"
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !searchInput.trim()}
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-full)",
            padding: "var(--space-2) var(--space-6)",
            cursor: loading || !searchInput.trim() ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: loading || !searchInput.trim() ? 0.6 : 1,
            transition: "all var(--transition-fast)"
          }}
        >
          Ara
        </button>
        <button 
          type="button" 
          onClick={handleAutoLocation}
          title="Otomatik Konumumu Bul"
          style={{
            background: "rgba(255,255,255, 0.05)",
            color: "var(--color-text-primary)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-full)",
            width: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all var(--transition-fast)"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          📍
        </button>
      </form>

      <div aria-label="Namaz vakitleri listesi">
        {loading && (
          <div style={{ textAlign: "center", padding: "var(--space-8)", color: "var(--color-text-secondary)" }}>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite", marginRight: "8px" }}>⏳</span>
            Vakitler hesaplanıyor...
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin { 100% { transform: rotate(360deg); } }
            `}} />
          </div>
        )}
        
        {error && !loading && (
          <div style={{ 
            textAlign: "center", 
            padding: "var(--space-6)", 
            color: "var(--color-bg)", 
            background: "rgba(255, 100, 100, 0.8)",
            borderRadius: "var(--radius-md)",
            fontWeight: 600
          }}>
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && timings && (
          <ul className="stack stack--sm" role="list">
            {vakitlerDef.map((vakit) => (
              <li key={vakit.ad}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-4)",
                  padding: "var(--space-4) var(--space-5)",
                  background: "rgba(22, 27, 34, 0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
                  borderLeft: `4px solid ${vakit.renk}`,
                }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }} aria-hidden="true">{vakit.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{vakit.ad}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{vakit.aciklama}</p>
                  </div>
                  <p lang="ar" dir="rtl" style={{
                    fontFamily: "var(--font-arabic)",
                    fontSize: "1.1rem",
                    color: vakit.renk,
                  }}>
                    {vakit.arabca}
                  </p>
                  <div style={{
                    minWidth: 80,
                    textAlign: "right",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {timings[vakit.key] || "— : —"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "var(--space-12)", textAlign: "center" }}>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
          Namaz kılmaya hazır mısınız?
        </p>
        <Link href="/namazlar" className="btn btn--primary" id="vakitler-namazlar-cta">
          <span aria-hidden="true">🕌</span>
          Namaz Rehberine Git
        </Link>
      </div>
    </>
  );
}
