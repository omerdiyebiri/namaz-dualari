"use client";

import { useState, useRef, useEffect } from "react";

const surahMap: Record<string, number> = {
  "fatiha-suresi": 1,
  "fil-suresi": 105,
  "kureys-suresi": 106,
  "maun-suresi": 107,
  "kevser-suresi": 108,
  "kafirun-suresi": 109,
  "nasr-suresi": 110,
  "tebbet-suresi": 111,
  "ihlas-suresi": 112,
  "felak-suresi": 113,
  "nas-suresi": 114,
};

type Props = {
  kategori: string;
  slug: string;
};

export default function AudioPlayer({ kategori, slug }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Component mounted, setup Audio
    let src = "";
    if (kategori === "sure" && surahMap[slug]) {
      // Alafasy recitation from islamic.network CDN
      src = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahMap[slug]}.mp3`;
    } else {
      // Local fallback for dualar
      src = `/audio/${slug}.mp3`;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("error", handleError);
    };
  }, [slug, kategori]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      // Reset error state if trying again
      setError(false);
      audioRef.current.play().catch(() => setError(true));
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-3)",
      background: "rgba(22, 27, 34, 0.4)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
      borderRadius: "var(--radius-lg)",
      marginBottom: "var(--space-6)"
    }}>
      <button
        onClick={togglePlay}
        disabled={isLoading && !isPlaying}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          background: "var(--color-primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "transform var(--transition-fast) ease",
          transform: isPlaying ? "scale(0.95)" : "none",
        }}
        aria-label={isPlaying ? "Durdur" : "Dinle"}
      >
        {isLoading && !isPlaying ? (
          <span style={{ fontSize: "1.2rem", animation: "spin 1s linear infinite" }}>⏳</span>
        ) : isPlaying ? (
          <span aria-hidden="true" style={{ fontSize: "1.2rem", marginLeft: -2 }}>⏸</span>
        ) : (
          <span aria-hidden="true" style={{ fontSize: "1.2rem", marginLeft: 3 }}>▶</span>
        )}
      </button>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 2 }}>
          {kategori === "sure" ? "Hafız Mishary Rashid Alafasy" : "Sesli Okunuş"}
        </p>
        <p style={{ fontSize: "0.8rem", color: error ? "var(--color-invalid)" : "var(--color-text-muted)" }}>
          {error 
            ? (kategori === "dua" ? "Bu dua için henüz ses dosyası yüklenmemiş." : "Ses dosyasına ulaşılamadı. Lütfen internetinizi kontrol edin.") 
            : isPlaying ? "Şu an dinliyorsunuz..." : "Dinlemek için dokunun"}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
