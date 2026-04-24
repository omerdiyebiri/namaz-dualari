import type { MetadataRoute } from "next";
import namazlar from "@/data/namazlar.json";
import dualar from "@/data/dualar.json";
import blog from "@/data/blog.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://namazdualari.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const namazlarUrls = namazlar.map((n) => ({
    url: `${siteUrl}/namazlar/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const dualarUrls = dualar.map((d) => ({
    url: `${siteUrl}/dualar/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = blog.map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/namazlar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/dualar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/vakitler`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/esmaul-husna`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tesbihat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/kaza-hesaplayici`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...namazlarUrls,
    ...dualarUrls,
    ...blogUrls,
  ];
}
