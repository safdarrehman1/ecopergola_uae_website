import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { servicesData } from "@/data/services";
import { pergolaTypesData } from "@/data/pergola-types";
import { projectsData } from "@/data/projects";
import { blogData } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;
  const now = new Date().toISOString();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/products",
    "/pergola-types",
    "/projects",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/credits",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    const localePrefix = locale === "en" ? "" : `/${locale}`;

    // Static pages
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }

    // Dynamic Services (8)
    for (const service of servicesData) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }

    // Dynamic Pergola Types (19)
    for (const pergola of pergolaTypesData) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/pergola-types/${pergola.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }

    // Dynamic Projects (6)
    for (const project of projectsData) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // Dynamic Blog Posts (3)
    for (const post of blogData) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/blog/${post.slug}`,
        lastModified: post.publishedAt,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  return sitemapEntries;
}
