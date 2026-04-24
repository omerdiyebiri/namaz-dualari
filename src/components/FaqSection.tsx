"use client";

import React from "react";

export type FaqItem = {
  soru: string;
  cevap: string;
};

type Props = {
  faqs: FaqItem[];
};

export default function FaqSection({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null;

  // Generate JSON-LD for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.soru,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.cevap,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-title" style={{ marginTop: "var(--space-12)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 id="faq-title" style={{
        fontSize: "1.5rem", fontWeight: 700,
        color: "var(--color-primary)", marginBottom: "var(--space-6)"
      }}>
        Sıkça Sorulan Sorular
      </h2>
      <div className="stack stack--sm">
        {faqs.map((faq, index) => (
           <details key={index} className="faq-item" style={{
             background: "rgba(22, 27, 34, 0.35)",
             backdropFilter: "blur(12px)",
             WebkitBackdropFilter: "blur(12px)",
             border: "1px solid rgba(255, 255, 255, 0.04)",
             borderRadius: "var(--radius-lg)",
             overflow: "hidden",
             boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)"
           }}>
             <summary style={{
               padding: "var(--space-4) var(--space-5)",
               fontWeight: 600,
               fontSize: "1.05rem",
               color: "var(--color-text-primary)",
               cursor: "pointer",
               listStyle: "none",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center"
             }}>
               {faq.soru}
               <span aria-hidden="true" style={{ color: "var(--color-primary)", fontSize: "1.2rem" }}>↓</span>
             </summary>
             <div style={{
               padding: "0 var(--space-5) var(--space-5) var(--space-5)",
               color: "var(--color-text-secondary)",
               lineHeight: 1.8
             }}>
               <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.05)", margin: "0 0 var(--space-3) 0" }} />
               {faq.cevap}
             </div>
           </details>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] summary span { transform: rotate(180deg); transition: transform 0.3s ease; }
        .faq-item summary span { transition: transform 0.3s ease; }
      `}} />
    </section>
  );
}
