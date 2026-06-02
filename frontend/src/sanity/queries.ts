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
  return merge(FALLBACK_NAV, raw);
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

const FOOTER_QUERY = `*[_type == "footer"][0]{ description, linkColumns, copyrightLine }`;

export async function getFooter(): Promise<FooterContent> {
  const raw = await sanityFetch<Partial<FooterContent> | null>(FOOTER_QUERY, {}, null);
  return merge(FALLBACK_FOOTER, raw);
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
