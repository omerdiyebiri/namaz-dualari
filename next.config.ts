import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Coolify & Docker uyumu için standalone output
  output: "standalone",

  // Gereksiz X-Powered-By başlığını kaldır
  poweredByHeader: false,

  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Namaz vakitleri API cache: 15 dakika
      {
        source: "/api/vakitler",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=900, stale-while-revalidate=1800",
          },
        ],
      },
    ];
  },

  // SVG'yi dangerouslyAllowSVG ile next/image'dan geçirmeden direkt kullan
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
