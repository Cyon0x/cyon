import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/#builds`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/#proof`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/#network`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
