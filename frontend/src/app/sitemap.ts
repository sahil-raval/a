import type { MetadataRoute } from "next";
import { siteUrl } from "@/sanity/env";
import { getAllServiceSlugs, getAllBlogSlugs, getAllLandingSlugs, getBlogCategories } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, blogSlugs, landingSlugs, categories] = await Promise.all([
    getAllServiceSlugs(),
    getAllBlogSlugs(),
    getAllLandingSlugs(),
    getBlogCategories(),
  ]);
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/how-we-work",
    "/services",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const serviceRoutes = slugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const landingRoutes = landingSlugs.map((slug) => ({
    url: `${siteUrl}/landing/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/blog/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...landingRoutes, ...categoryRoutes];
}
