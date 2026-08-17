import { getSite } from "@/sanity/queries";
import { siteUrl } from "@/sanity/env";

/**
 * Best-effort parse of a free-text address string into PostalAddress parts.
 * Expected shape: "<street>, <suburb> <STATE>, <postcode>"
 * e.g. "West 6, 33 Mackey Street, North Geelong VIC, 3215"
 * Falls back gracefully if the format doesn't match.
 */
function parseAddress(address: string) {
  const parts = address.split(",").map((p) => p.trim());
  const postalCode = parts.at(-1) ?? "";
  const localityAndRegion = parts.at(-2) ?? "";
  const streetAddress = parts.slice(0, -2).join(", ") || address;

  const regionMatch = localityAndRegion.match(/^(.*)\s+([A-Z]{2,3})$/);
  const addressLocality = regionMatch ? regionMatch[1].trim() : localityAndRegion;
  const addressRegion = regionMatch ? regionMatch[2] : "";

  return { streetAddress, addressLocality, addressRegion, postalCode };
}

/**
 * Renders site-wide LocalBusiness JSON-LD structured data so Google can
 * surface rich results (business info, hours, service area) for APM Energy.
 * Data is sourced from the same Sanity siteSettings singleton used for SEO
 * metadata, so it stays in sync with the CMS.
 */
export default async function StructuredData() {
  const site = await getSite();
  const { streetAddress, addressLocality, addressRegion, postalCode } =
    parseAddress(site.address);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteUrl}/#business`,
    name: site.companyName,
    description: site.shortDescription,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    image: site.logoUrl?.startsWith("http") ? site.logoUrl : `${siteUrl}${site.logoUrl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry: "AU",
    },
    areaServed: site.serviceArea,
    ...(site.abn ? { identifier: site.abn } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}