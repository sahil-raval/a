import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/contact-page-client";
import { buildMetadata, getContact, getSite } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return buildMetadata(
    contact.seo,
    contact.seo?.title || "Contact Us",
    contact.seo?.description || "",
    "/contact",
  );
}

export default async function ContactPage() {
  const [contact, site] = await Promise.all([getContact(), getSite()]);
  return <ContactPageClient contact={contact} site={site} />;
}
