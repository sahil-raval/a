import type { Metadata } from "next";
import { sanityFetch } from "./client";
import { urlForImage, urlForImageSized } from "./image";
import { siteUrl } from "./env";
import {
  FALLBACK_SITE,
  FALLBACK_NAV,
  FALLBACK_FOOTER,
  FALLBACK_HOME,
  FALLBACK_ABOUT,
  FALLBACK_CONTACT,
  FALLBACK_HOW_WE_WORK,
  FALLBACK_SERVICES,
  type SiteContent,
  type NavContent,
  type FooterContent,
  type HomeContent,
  type AboutContent,
  type ContactContent,
  type HowWeWorkContent,
  type ServiceContent,
  FALLBACK_BLOG_POSTS,
  FALLBACK_LANDING_PAGES,
  type BlogPostContent,
  type LandingPageContent,
} from "./fallbacks";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

// Merge Sanity data over fallbacks. Only non-empty values from Sanity win.
function merge<T extends Record<string, unknown>>(fallback: T, data: Partial<T> | null | undefined): T {
  if (!data) return fallback;
  const out: Record<string, unknown> = { ...fallback };
  for (const key of Object.keys(fallback) as (keyof T)[]) {
    const incoming = (data as Record<string, unknown>)[key as string];
    if (incoming === undefined || incoming === null) continue;
    if (typeof incoming === "string" && incoming.trim() === "") continue;
    if (Array.isArray(incoming) && incoming.length === 0) continue;
    out[key as string] = incoming;
  }
  return out as T;
}

function imgUrlOrFallback(
  imageRef: unknown,
  externalUrl: string | undefined | null,
  fallback: string,
  width?: number,
  height?: number,
): string {
  if (imageRef) {
    const u = width
      ? urlForImageSized(imageRef as Parameters<typeof urlForImageSized>[0], width, height)
      : urlForImage(imageRef as Parameters<typeof urlForImage>[0]);
    if (u) return u;
  }
  if (externalUrl && externalUrl.trim() !== "") return externalUrl;
  return fallback;
}

/* -------------------------------------------------------------------------- */
/*  Site Settings                                                             */
/* -------------------------------------------------------------------------- */

const SITE_QUERY = `*[_type == "siteSettings"][0]{
  companyName, tagline, shortDescription, abn, email, phone, address,
  businessHours, serviceArea,
  "logo": logo, "favicon": favicon, "netccLogo": netccLogo,
  socialLinks,
  defaultSeo
}`;

export async function getSite(): Promise<SiteContent> {
  const raw = await sanityFetch<Record<string, unknown> | null>(SITE_QUERY, {}, null);
  if (!raw) return FALLBACK_SITE;
  const data = raw as Record<string, unknown>;
  const logoUrl = imgUrlOrFallback(data.logo, null, FALLBACK_SITE.logoUrl, 400);
  const netccLogoUrl = imgUrlOrFallback(
    data.netccLogo,
    null,
    FALLBACK_SITE.netccLogoUrl,
    200,
  );
  const defaultSeoRaw = (data.defaultSeo || {}) as Record<string, unknown>;
  return merge(FALLBACK_SITE, {
    ...data,
    logoUrl,
    netccLogoUrl,
    defaultSeo: merge(FALLBACK_SITE.defaultSeo, {
      ...defaultSeoRaw,
      ogImageUrl: imgUrlOrFallback(
        defaultSeoRaw.ogImage,
        null,
        FALLBACK_SITE.defaultSeo.ogImageUrl,
        1200,
        630,
      ),
    }),
  } as Partial<SiteContent>);
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

const NAV_QUERY = `*[_type == "navigation"][0]{ primaryLinks, servicesMenuItems, ctaLabel, ctaHref }`;

export async function getNavigation(): Promise<NavContent> {
  const raw = await sanityFetch<Partial<NavContent> | null>(NAV_QUERY, {}, null);
  const nav = merge(FALLBACK_NAV, raw);
  // Guarantee a Blog link exists in the primary navigation, regardless of CMS data.
  const links = [...(nav.primaryLinks || [])];
  if (!links.some((l) => l.href === "/blog")) {
    const contactIdx = links.findIndex((l) => l.href === "/contact");
    const blogLink = { label: "Blog", href: "/blog" };
    if (contactIdx >= 0) links.splice(contactIdx, 0, blogLink);
    else links.push(blogLink);
  }
  return { ...nav, primaryLinks: links };
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

const FOOTER_QUERY = `*[_type == "footer"][0]{ description, linkColumns, copyrightLine }`;

export async function getFooter(): Promise<FooterContent> {
  const raw = await sanityFetch<Partial<FooterContent> | null>(FOOTER_QUERY, {}, null);
  const footer = merge(FALLBACK_FOOTER, raw);
  // Guarantee a Blog link appears in a footer column (prefer the "Company" column).
  const columns = (footer.linkColumns || []).map((c) => ({ ...c, links: [...(c.links || [])] }));
  const hasBlog = columns.some((c) => c.links.some((l) => l.href === "/blog"));
  if (!hasBlog && columns.length) {
    const target =
      columns.find((c) => c.links.some((l) => l.href === "/about" || l.href === "/contact")) ||
      columns[columns.length - 1];
    const aboutIdx = target.links.findIndex((l) => l.href === "/about");
    const blogLink = { label: "Blog", href: "/blog" };
    if (aboutIdx >= 0) target.links.splice(aboutIdx + 1, 0, blogLink);
    else target.links.push(blogLink);
  }
  return { ...footer, linkColumns: columns };
}

/* -------------------------------------------------------------------------- */
/*  Home                                                                      */
/* -------------------------------------------------------------------------- */

const HOME_QUERY = `*[_type == "homePage"][0]`;

export async function getHome(): Promise<HomeContent> {
  const raw = await sanityFetch<Partial<HomeContent> | null>(HOME_QUERY, {}, null);
  return merge(FALLBACK_HOME, raw);
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

const ABOUT_QUERY = `*[_type == "aboutPage"][0]{
  ...,
  "heroImageUrl": coalesce(heroImage.asset->url, heroImage.externalUrl)
}`;

export async function getAbout(): Promise<AboutContent> {
  const raw = await sanityFetch<(Partial<AboutContent> & { heroImageUrl?: string }) | null>(
    ABOUT_QUERY,
    {},
    null,
  );
  if (!raw) return FALLBACK_ABOUT;
  const heroImageUrl = raw.heroImageUrl || FALLBACK_ABOUT.heroImageUrl;
  return merge(FALLBACK_ABOUT, { ...raw, heroImageUrl } as Partial<AboutContent>);
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

const CONTACT_QUERY = `*[_type == "contactPage"][0]`;

export async function getContact(): Promise<ContactContent> {
  const raw = await sanityFetch<Partial<ContactContent> | null>(CONTACT_QUERY, {}, null);
  return merge(FALLBACK_CONTACT, raw);
}

/* -------------------------------------------------------------------------- */
/*  How We Work                                                               */
/* -------------------------------------------------------------------------- */

const HWW_QUERY = `*[_type == "howWeWorkPage"][0]{
  ...,
  "heroImageUrl": coalesce(heroImage.asset->url, heroImage.externalUrl)
}`;

export async function getHowWeWork(): Promise<HowWeWorkContent> {
  const raw = await sanityFetch<
    (Partial<HowWeWorkContent> & { heroImageUrl?: string }) | null
  >(HWW_QUERY, {}, null);
  if (!raw) return FALLBACK_HOW_WE_WORK;
  const heroImageUrl = raw.heroImageUrl || FALLBACK_HOW_WE_WORK.heroImageUrl;
  return merge(FALLBACK_HOW_WE_WORK, {
    ...raw,
    heroImageUrl,
  } as Partial<HowWeWorkContent>);
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

const SERVICES_QUERY = `*[_type == "service"] | order(order asc, title asc){
  title,
  "slug": slug.current,
  icon, shortDescription, longDescription, navDescription, order, showOnHome,
  "imageUrl": coalesce(image.asset->url, image.externalUrl)
}`;

export async function getServices(): Promise<ServiceContent[]> {
  const raw = await sanityFetch<ServiceContent[] | null>(SERVICES_QUERY, {}, null);
  if (!raw || raw.length === 0) return FALLBACK_SERVICES;
  return raw.map((s, i) => ({
    ...FALLBACK_SERVICES[i % FALLBACK_SERVICES.length],
    ...s,
    imageUrl: s.imageUrl || FALLBACK_SERVICES[i % FALLBACK_SERVICES.length]?.imageUrl,
  }));
}

const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  icon, shortDescription, longDescription, navDescription, order,
  heroTitle, heroSubtitle,
  "heroImageUrl": coalesce(heroImage.asset->url, heroImage.externalUrl),
  body, highlights,
  "imageUrl": coalesce(image.asset->url, image.externalUrl),
  seo
}`;

export async function getServiceBySlug(slug: string) {
  return sanityFetch(SERVICE_BY_SLUG_QUERY, { slug }, null as null);
}

const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current)][].slug.current`;
export async function getAllServiceSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[] | null>(SERVICE_SLUGS_QUERY, {}, null);
  if (slugs && slugs.length > 0) return slugs;
  return FALLBACK_SERVICES.map((s) => s.slug);
}

/* -------------------------------------------------------------------------- */
/*  Legal Pages                                                               */
/* -------------------------------------------------------------------------- */

const LEGAL_BY_KIND_QUERY = `*[_type == "legalPage" && kind == $kind][0]{
  title, kind, body, lastUpdated, seo
}`;

export async function getLegalPage(kind: "privacy" | "terms") {
  return sanityFetch(LEGAL_BY_KIND_QUERY, { kind }, null as null);
}

/* -------------------------------------------------------------------------- */
/*  SEO Metadata helpers                                                      */
/* -------------------------------------------------------------------------- */

type SeoLike = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: unknown;
  ogImageUrl?: string;
  noIndex?: boolean;
};

export async function buildMetadata(
  pageSeo: SeoLike | undefined | null,
  fallbackTitle: string,
  fallbackDescription: string,
  path: string,
): Promise<Metadata> {
  const site = await getSite();
  const titleRaw = pageSeo?.title || fallbackTitle;
  const description =
    pageSeo?.description || fallbackDescription || site.defaultSeo.description;
  const keywords = pageSeo?.keywords?.length
    ? pageSeo.keywords
    : site.defaultSeo.keywords;
  const ogImageUrl = pageSeo?.ogImage
    ? urlForImageSized(pageSeo.ogImage as Parameters<typeof urlForImageSized>[0], 1200, 630)
    : pageSeo?.ogImageUrl || site.defaultSeo.ogImageUrl;
  const fullUrl = `${siteUrl}${path}`;
  const title =
    titleRaw === site.defaultSeo.title
      ? titleRaw
      : `${titleRaw} | ${site.companyName}`;
  return {
    title: titleRaw,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: fullUrl },
    robots: pageSeo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: site.companyName,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : undefined,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    icons: { icon: "/icon.png", apple: "/icon.png" },
  };
}

export async function getSiteSeoMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: {
      default: site.defaultSeo.title,
      template: `%s | ${site.companyName}`,
    },
    description: site.defaultSeo.description,
    keywords: site.defaultSeo.keywords,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: site.defaultSeo.title,
      description: site.defaultSeo.description,
      url: siteUrl,
      siteName: site.companyName,
      images: site.defaultSeo.ogImageUrl
        ? [
            {
              url: site.defaultSeo.ogImageUrl,
              width: 1200,
              height: 630,
              alt: site.companyName,
            },
          ]
        : undefined,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultSeo.title,
      description: site.defaultSeo.description,
      images: site.defaultSeo.ogImageUrl ? [site.defaultSeo.ogImageUrl] : undefined,
    },
    icons: { icon: "/icon.png", apple: "/icon.png" },
  };
}


/* -------------------------------------------------------------------------- */
/*  Blog                                                                      */
/* -------------------------------------------------------------------------- */

const BLOG_LIST_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  excerpt, author, publishedAt, tags, category,
  "coverImageUrl": coalesce(coverImage.asset->url, coverImage.externalUrl)
}`;

export async function getBlogPosts(): Promise<BlogPostContent[]> {
  const raw = await sanityFetch<BlogPostContent[] | null>(BLOG_LIST_QUERY, {}, null);
  if (!raw || raw.length === 0) return FALLBACK_BLOG_POSTS as unknown as BlogPostContent[];
  return raw;
}

const BLOG_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt, author, publishedAt, tags, category, body,
  "coverImageUrl": coalesce(coverImage.asset->url, coverImage.externalUrl),
  seo
}`;

export async function getBlogPost(slug: string): Promise<BlogPostContent | null> {
  const raw = await sanityFetch<BlogPostContent | null>(BLOG_BY_SLUG_QUERY, { slug }, null);
  if (raw) return raw;
  const fb = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
  return (fb as unknown as BlogPostContent) || null;
}

const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)][].slug.current`;
export async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[] | null>(BLOG_SLUGS_QUERY, {}, null);
  if (slugs && slugs.length > 0) return slugs;
  return FALLBACK_BLOG_POSTS.map((p) => p.slug);
}

export function categorySlug(name: string): string {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export type BlogCategory = { name: string; slug: string; count: number };

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const posts = await getBlogPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    const c = (p as any).category;
    if (c) counts.set(c, (counts.get(c) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getPostsByCategory(slug: string): Promise<{ name: string; posts: BlogPostContent[] }> {
  const posts = await getBlogPosts();
  const matched = posts.filter((p) => categorySlug((p as any).category || "") === slug);
  const name = (matched[0] as any)?.category || slug.replace(/-/g, " ");
  return { name, posts: matched };
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPostContent[]> {
  const posts = await getBlogPosts();
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  const curCat = (current as any).category;
  const curTags: string[] = (current as any).tags || [];
  const scored = posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      if ((p as any).category && (p as any).category === curCat) score += 3;
      const tags: string[] = (p as any).tags || [];
      score += tags.filter((t) => curTags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

/* -------------------------------------------------------------------------- */
/*  Landing Pages                                                             */
/* -------------------------------------------------------------------------- */

const LANDING_BY_SLUG_QUERY = `*[_type == "landingPage" && slug.current == $slug && published == true][0]{
  title,
  "slug": slug.current,
  published, heroHeading, heroSubheading, heroCtaLabel, heroCtaHref,
  "heroImageUrl": coalesce(heroImage.asset->url, heroImage.externalUrl),
  sections, seo
}`;

export async function getLandingPage(slug: string): Promise<LandingPageContent | null> {
  const raw = await sanityFetch<LandingPageContent | null>(LANDING_BY_SLUG_QUERY, { slug }, null);
  if (raw) return raw;
  const fb = FALLBACK_LANDING_PAGES.find((p) => p.slug === slug);
  return (fb as unknown as LandingPageContent) || null;
}

const LANDING_SLUGS_QUERY = `*[_type == "landingPage" && published == true && defined(slug.current)][].slug.current`;
export async function getAllLandingSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[] | null>(LANDING_SLUGS_QUERY, {}, null);
  if (slugs && slugs.length > 0) return slugs;
  return FALLBACK_LANDING_PAGES.map((p) => p.slug);
}
