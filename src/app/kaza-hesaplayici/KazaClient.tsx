"use client";

import { useState, useEffect } from "react";

type KazaState = {
  sabah: number;
  ogle: number;
  ikindi: number;
  aksam: number;
  yatsi: number;
  vitir: number;
  totalCalculated: number;
};

const INITIAL_STATE: KazaState = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0, totalCalculated: 0 };

export default function KazaClient() {
  const [mounted, setMounted] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [state, setState] = useState<KazaState>(INITIAL_STATE);
  
  // Setup inputs
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("namaz-kaza-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(parsed);
      setIsConfigured(parsed.totalCalculated > 0);
    }
    setMounted(true);
  }, []);

  const saveState = (newState: KazaState) => {
    setState(newState);
    localStorage.setItem("namaz-kaza-state", JSON.stringify(newState));
  };

  const handleCalculate = () => {
    const totalDays = (years * 365) + (months * 30) + days;
    if (totalDays <= 0) return;

    const newState: KazaState = {
      sabah: totalDays,
      ogle: totalDays,
      ikindi: totalDays,
      aksam: totalDays,
      yatsi: totalDays,
      vitir: totalDays,
      totalCalculated: totalDays
    };
    saveState(newState);
    setIsConfigured(true);
  };

  const resetData = () => {
    if(confirm("Tüm kaza verileriniz silinecek. Emin misiniz?")) {
      saveState(INITIAL_STATE);
      setIsConfigured(false);
      setYears(0);
      setMonths(0);
      setDays(0);
    }
  };

  const decrease = (key: keyof KazaState) => {
    if (state[key] > 0) {
      saveState({ ...state, [key]: state[key] - 1 });
    }
  };

  if (!mounted) return null;

  if (!isConfigured) {
    return (
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "32px", padding: "var(--space-10)", maxWidth: "500px", margin: "0 auto", textAlign: "center", backdropFilter: "blur(24px)" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "var(--space-6)" }}>Hesaplama Aracı</h2>
        
        <div style={{ marginBottom: "var(--space-4)", textAlign: "left" }}>
          <label style={{ display: "block", color: "var(--color-text-secondary)", marginBottom: "8px", fontSize: "0.9rem" }}>Kılınmayan Yıl</label>
          <input type="number" min="0" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "1.1rem", outline: "none" }} />
        </div>

        <div style={{ marginBottom: "var(--space-4)", textAlign: "left" }}>
          <label style={{ display: "block", color: "var(--color-text-secondary)", marginBottom: "8px", fontSize: "0.9rem" }}>Kılınmayan Ay (30 Gün)</label>
          <input type="number" min="0" value={months} onChange={(e) => setMonths(Number(e.target.value))} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "1.1rem", outline: "none" }} />
        </div>

        <div style={{ marginBottom: "var(--space-8)", textAlign: "left" }}>
          <label style={{ display: "block", color: "var(--color-text-secondary)", marginBottom: "8px", fontSize: "0.9rem" }}>Kılınmayan Gün</label>
          <input type="number" min="0" value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "1.1rem", outline: "none" }} />
        </div>

        <button onClick={handleCalculate} style={{ width: "100%", background: "var(--color-primary)", color: "#fff", border: "none", padding: "16px", borderRadius: "16px", fontSize: "1.1rem", fontWeight: 600, cursor: "pointer", transition: "all 0.3s ease" }}>
          Sistemi Başlat
        </button>
      </div>
    );
  }

  const items: { label: string; key: keyof KazaState; total: number }[] = [
    { label: "Sabah", key: "sabah", total: state.sabah },
    { label: "Öğle", key: "ogle", total: state.ogle },
    { label: "İkindi", key: "ikindi", total: state.ikindi },
    { label: "Akşam", key: "aksam", total: state.aksam },
    { label: "Yatsı", key: "yatsi", total: state.yatsi },
    { label: "Vitir", key: "vitir", total: state.vitir },
  ];

  const totalRemaining = items.reduce((acc, curr) => acc + curr.total, 0);
  const totalOriginal = state.totalCalculated * 6;
  const progressPercent = totalOriginal > 0 ? ((totalOriginal - totalRemaining) / totalOriginal) * 100 : 0;

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, rgba(46,169,111,0.15) 0%, rgba(22,27,34,0.4) 100%)", border: "1px solid rgba(46,169,111,0.2)", borderRadius: "32px", padding: "var(--space-8)", marginBottom: "var(--space-8)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
        <div>
          <p style={{ color: "var(--color-primary)", fontWeight: 600, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "8px" }}>Genel İlerleme</p>
          <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>%{progressPercent.toFixed(1)}</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "4px" }}>Kalan Toplam Vakit</p>
          <h3 style={{ color: "#fff", fontSize: "1.5rem" }}>{totalRemaining.toLocaleString("tr-TR")}</h3>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
        {items.map((item) => (
          <div key={item.key} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "var(--space-6)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600 }}>{item.label}</h3>
              <div style={{ color: "var(--color-gold)", fontWeight: 600, fontSize: "1.1rem" }}>{item.total} kaldı</div>
            </div>
            
            <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden", marginBottom: "var(--space-6)" }}>
              <div style={{ height: "100%", width: (((state.totalCalculated - item.total) / state.totalCalculated) * 100) + "%", background: "var(--color-primary)", transition: "width 0.3s ease" }}></div>
            </div>

            <button 
              onClick={() => decrease(item.key)}
              disabled={item.total === 0}
              style={{ width: "100%", marginTop: "auto", background: item.total === 0 ? "rgba(255,255,255,0.05)" : "rgba(46,169,111,0.1)", color: item.total === 0 ? "rgba(255,255,255,0.3)" : "var(--color-primary)", border: item.total === 0 ? "1px solid transparent" : "1px solid rgba(46,169,111,0.2)", padding: "12px", borderRadius: "12px", fontSize: "1rem", fontWeight: 600, cursor: item.total === 0 ? "not-allowed" : "pointer", transition: "all 0.2s" }}
            >
              {item.total === 0 ? "Tamamlandı" : "Kıldım (-1)"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
        <button onClick={resetData} style={{ background: "transparent", border: "none", color: "var(--color-danger, #e74c3c)", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }}>
          Sistemi Sıfırla
        </button>
      </div>
    </div>
  );
}
