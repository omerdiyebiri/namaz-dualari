import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const amiri = Amiri({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-amiri",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://namazdualari.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - Namaz Duaları ve Namaz Sureleri 2026",
    default: "Namaz Duaları ve Namaz Vakitleri - Türkçe Arapça Namaz Sureleri",
  },
  description:
    "Beş vakit namaz, sureler, dualar ve anlamları üzerine sade, reklamsız ve hızlı Türkçe kaynak. Günlük namaz vakitleri ve adım adım namaz rehberi.",
  keywords: [
    "namaz duaları",
    "namaz vakitleri",
    "sübhaneke",
    "fatiha suresi",
    "namaz nasıl kılınır",
    "namaz sureleri",
    "Türkçe Arapça okunuş"
  ],
  authors: [{ name: "Namaz Duaları" }],
  creator: "Namaz Duaları",
  publisher: "Namaz Duaları",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Namaz Duaları",
    title: "Namaz Duaları ve Namaz Vakitleri - Türkçe Arapça Namaz Sureleri",
    description:
      "Beş vakit namaz, sureler, dualar ve anlamları üzerine sade, reklamsız ve hızlı Türkçe kaynak.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaz Duaları ve Namaz Sureleri 2026",
    description: "Hızlı ve kullanıcı odaklı namaz rehberi.",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "_NRDhqWN2lpI9kP7E9p7wgwW_ARh7PJKwXsVgZEMRxE",
  },
};

// Ana sayfa JSON-LD
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Namaz Duaları",
  url: siteUrl,
  description:
    "Beş vakit namaz duaları, Arapça metinler, Türkçe anlamlar ve günlük namaz vakitleri.",
  inLanguage: "tr",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/dualar?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Namaz Duaları",
  url: siteUrl,
  description: "Türkçe namaz rehberi — hızlı, reklamsız, kullanıcı odaklı.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${amiri.variable}`}>
      <head>
        {/* SVG Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
