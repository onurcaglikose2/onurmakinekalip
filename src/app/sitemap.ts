import type { MetadataRoute } from "next";
import { company } from "@/content/company";

const routes = [
  "",
  "/uretim-kabiliyetleri",
  "/makine-parkuru",
  "/uretim-ornekleri",
  "/sektorler",
  "/kalite-ve-surec",
  "/hakkimizda",
  "/teklif-al",
  "/iletisim",
  "/kvkk",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${company.domain}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/teklif-al" ? 0.9 : 0.7,
  }));
}
