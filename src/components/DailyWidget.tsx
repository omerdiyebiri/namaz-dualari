"use client";

import { useEffect, useState } from "react";
import gununSozu from "@/data/gunun-sozu.json";

export default function DailyWidget() {
  const [soz, setSoz] = useState(gununSozu[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Select a deterministic verse based on the current day of the year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const index = dayOfYear % gununSozu.length;
    setSoz(gununSozu[index]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="daily-widget-wrapper">
      <div className="daily-widget-content">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{ fontSize: "1.5rem" }}>{soz.icon}</div>
          <p style={{ color: "var(--color-primary)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
            Günün {soz.type}
          </p>
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "#fff", lineHeight: 1.4, fontStyle: "italic", margin: "0" }}>
          "{soz.content}" <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontStyle: "normal", marginLeft: "8px" }}>— {soz.source}</span>
        </h3>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .daily-widget-wrapper {
          position: relative;
          max-width: 800px;
          margin: 0 auto var(--space-8) auto;
          border-radius: 100px;
          padding: 1px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
        }
        
        .daily-widget-wrapper::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent 70%, var(--color-primary) 100%);
          animation: rotateLight 4s linear infinite;
          z-index: 0;
        }

        .daily-widget-content {
          position: relative;
          z-index: 1;
          background: #0d1117; /* Dark background to cover the light */
          border-radius: 100px;
          padding: var(--space-3) var(--space-6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        @keyframes rotateLight {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .daily-widget-content {
            flex-direction: column;
            text-align: center;
            gap: var(--space-2);
            border-radius: 24px;
            padding: var(--space-4);
          }
          .daily-widget-wrapper {
            border-radius: 24px;
          }
        }
      `}} />
    </div>
  );
}
