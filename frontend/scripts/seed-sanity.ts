/**
 * One-shot script to push all existing hardcoded content into Sanity.
 *
 * Usage:
 *   1. Fill in your Sanity credentials in /app/frontend/.env (project id, dataset, write token)
 *   2. cd /app/frontend && yarn seed
 *
 * Re-running is safe: documents use deterministic IDs and `createOrReplace`.
 */

import { createClient } from "@sanity/client";
import {
  FALLBACK_SITE,
  FALLBACK_NAV,
  FALLBACK_FOOTER,
  FALLBACK_HOME,
  FALLBACK_ABOUT,
  FALLBACK_CONTACT,
  FALLBACK_HOW_WE_WORK,
  FALLBACK_SERVICES,
} from "../src/sanity/fallbacks";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error(
    "✗ NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to /app/frontend/.env first.",
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "✗ SANITY_API_WRITE_TOKEN is not set. Create a write token in Sanity dashboard and add to /app/frontend/.env first.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

function k(): string {
  return Math.random().toString(36).slice(2, 14);
}

async function seed() {
  console.log(`→ Seeding Sanity project ${projectId} / dataset ${dataset}`);

  // 1. Site Settings -------------------------------------------------------
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: FALLBACK_SITE.companyName,
    tagline: FALLBACK_SITE.tagline,
    shortDescription: FALLBACK_SITE.shortDescription,
    abn: FALLBACK_SITE.abn,
    email: FALLBACK_SITE.email,
    phone: FALLBACK_SITE.phone,
    address: FALLBACK_SITE.address,
    businessHours: FALLBACK_SITE.businessHours,
    serviceArea: FALLBACK_SITE.serviceArea,
    socialLinks: FALLBACK_SITE.socialLinks.map((s) => ({ _key: k(), ...s })),
    defaultSeo: {
      title: FALLBACK_SITE.defaultSeo.title,
      description: FALLBACK_SITE.defaultSeo.description,
      keywords: FALLBACK_SITE.defaultSeo.keywords,
    },
  });
  console.log("  ✓ Site Settings");

  // 2. Navigation ----------------------------------------------------------
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    primaryLinks: FALLBACK_NAV.primaryLinks.map((l) => ({ _key: k(), ...l })),
    servicesMenuItems: FALLBACK_NAV.servicesMenuItems.map((m) => ({ _key: k(), ...m })),
    ctaLabel: FALLBACK_NAV.ctaLabel,
    ctaHref: FALLBACK_NAV.ctaHref,
  });
  console.log("  ✓ Navigation");

  // 3. Footer --------------------------------------------------------------
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    description: FALLBACK_FOOTER.description,
    copyrightLine: FALLBACK_FOOTER.copyrightLine,
    linkColumns: FALLBACK_FOOTER.linkColumns.map((c) => ({
      _key: k(),
      title: c.title,
      links: c.links.map((l) => ({ _key: k(), ...l })),
    })),
  });
  console.log("  ✓ Footer");

  // 4. Home Page -----------------------------------------------------------
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    ...FALLBACK_HOME,
    heroChips: FALLBACK_HOME.heroChips.map((c) => ({ _key: k(), ...c })),
    globeStats: FALLBACK_HOME.globeStats.map((s) => ({ _key: k(), ...s })),
    features: FALLBACK_HOME.features.map((f) => ({ _key: k(), ...f })),
    testimonials: FALLBACK_HOME.testimonials.map((t) => ({ _key: k(), ...t })),
  });
  console.log("  ✓ Home Page");

  // 5. About Page ----------------------------------------------------------
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: FALLBACK_ABOUT.heroTitle,
    heroSubtitle: FALLBACK_ABOUT.heroSubtitle,
    heroImage: { externalUrl: FALLBACK_ABOUT.heroImageUrl },
    approachTitle: FALLBACK_ABOUT.approachTitle,
    approachBody: FALLBACK_ABOUT.approachBody,
    differentiatorTitle: FALLBACK_ABOUT.differentiatorTitle,
    differentiatorBody: FALLBACK_ABOUT.differentiatorBody,
    whoWeAreTitle: FALLBACK_ABOUT.whoWeAreTitle,
    whoWeAreParagraphs: FALLBACK_ABOUT.whoWeAreParagraphs,
    bulletPoints: FALLBACK_ABOUT.bulletPoints.map((b) => ({ _key: k(), ...b })),
    stats: FALLBACK_ABOUT.stats.map((s) => ({ _key: k(), ...s })),
    ctaHeading: FALLBACK_ABOUT.ctaHeading,
    ctaBody: FALLBACK_ABOUT.ctaBody,
    ctaLabel: FALLBACK_ABOUT.ctaLabel,
    ctaHref: FALLBACK_ABOUT.ctaHref,
    seo: FALLBACK_ABOUT.seo,
  });
  console.log("  ✓ About Page");

  // 6. Contact Page --------------------------------------------------------
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...FALLBACK_CONTACT,
    serviceOptions: FALLBACK_CONTACT.serviceOptions.map((o) => ({ _key: k(), ...o })),
  });
  console.log("  ✓ Contact Page");

  // 7. How We Work Page ----------------------------------------------------
  await client.createOrReplace({
    _id: "howWeWorkPage",
    _type: "howWeWorkPage",
    heroTitle: FALLBACK_HOW_WE_WORK.heroTitle,
    heroSubtitle: FALLBACK_HOW_WE_WORK.heroSubtitle,
    heroImage: { externalUrl: FALLBACK_HOW_WE_WORK.heroImageUrl },
    introTitle: FALLBACK_HOW_WE_WORK.introTitle,
    introParagraphs: FALLBACK_HOW_WE_WORK.introParagraphs,
    processTitle: FALLBACK_HOW_WE_WORK.processTitle,
    processSubtitle: FALLBACK_HOW_WE_WORK.processSubtitle,
    journey: FALLBACK_HOW_WE_WORK.journey.map((j) => ({ _key: k(), ...j })),
    systemsTitle: FALLBACK_HOW_WE_WORK.systemsTitle,
    systemsSubtitle: FALLBACK_HOW_WE_WORK.systemsSubtitle,
    businessSystems: FALLBACK_HOW_WE_WORK.businessSystems.map((b) => ({ _key: k(), ...b })),
    complaintsBadge: FALLBACK_HOW_WE_WORK.complaintsBadge,
    complaintsTitle: FALLBACK_HOW_WE_WORK.complaintsTitle,
    complaintsIntro: FALLBACK_HOW_WE_WORK.complaintsIntro,
    complaintTimelines: FALLBACK_HOW_WE_WORK.complaintTimelines.map((c) => ({ _key: k(), ...c })),
    lodgeTitle: FALLBACK_HOW_WE_WORK.lodgeTitle,
    lodgeIntro: FALLBACK_HOW_WE_WORK.lodgeIntro,
    lodgeFooter: FALLBACK_HOW_WE_WORK.lodgeFooter,
    netccTitle: FALLBACK_HOW_WE_WORK.netccTitle,
    netccBody: FALLBACK_HOW_WE_WORK.netccBody,
    netccCtaLabel: FALLBACK_HOW_WE_WORK.netccCtaLabel,
    netccCtaHref: FALLBACK_HOW_WE_WORK.netccCtaHref,
    seo: FALLBACK_HOW_WE_WORK.seo,
  });
  console.log("  ✓ How We Work Page");

  // 8. Services ------------------------------------------------------------
  for (const s of FALLBACK_SERVICES) {
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { current: s.slug, _type: "slug" },
      icon: s.icon,
      shortDescription: s.shortDescription,
      longDescription: s.longDescription,
      navDescription: s.navDescription,
      image: { externalUrl: s.imageUrl },
      order: s.order,
      showOnHome: s.showOnHome,
    });
    console.log(`  ✓ Service: ${s.title}`);
  }

  // 9. Legal Pages ---------------------------------------------------------
  await client.createOrReplace({
    _id: "legalPage-privacy",
    _type: "legalPage",
    kind: "privacy",
    title: "Privacy Policy",
    lastUpdated: new Date().toISOString().split("T")[0],
  });
  await client.createOrReplace({
    _id: "legalPage-terms",
    _type: "legalPage",
    kind: "terms",
    title: "Terms of Service",
    lastUpdated: new Date().toISOString().split("T")[0],
  });
  console.log("  ✓ Legal Pages");

  console.log("\n✅ Seed complete!");
  console.log(`   Open the studio at /studio to edit content.`);
}

seed().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
