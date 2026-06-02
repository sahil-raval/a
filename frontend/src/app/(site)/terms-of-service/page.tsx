import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { buildMetadata, getLegalPage } from "@/sanity/queries";

const FALLBACK = {
  title: "Terms of Service",
  body: [
    {
      heading: "1. Acceptance of Terms",
      paragraph:
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.",
    },
    {
      heading: "2. Service Description",
      paragraph:
        "APM Energy provides sustainable energy solutions, including solar, battery, heating, cooling, and electrical maintenance services. We reserve the right to modify, suspend or discontinue the service with or without notice at any time and without any liability to you.",
    },
    {
      heading: "3. User Conduct",
      paragraph:
        "You agree to use the website only for lawful purposes. You agree not to take any action that might compromise the security of the website, render the website inaccessible to others or otherwise cause damage to the website or the Content.",
    },
    {
      heading: "4. Intellectual Property",
      paragraph:
        "All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of APM Energy or its content suppliers and protected by international copyright laws.",
    },
    {
      heading: "5. Limitation of Liability",
      paragraph:
        "In no event shall APM Energy be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use of or inability to use the service.",
    },
    {
      heading: "6. Governing Law",
      paragraph:
        "These Terms shall be governed and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getLegalPage("terms")) as { seo?: unknown } | null;
  // @ts-expect-error - shape from sanity may vary
  return buildMetadata(page?.seo, "Terms of Service", "Terms of Service for APM Energy.", "/terms-of-service");
}

export default async function TermsOfService() {
  const page = (await getLegalPage("terms")) as
    | { title?: string; body?: unknown; lastUpdated?: string }
    | null;

  const hasSanityBody = page?.body && Array.isArray(page.body) && page.body.length > 0;
  const title = page?.title || FALLBACK.title;
  const lastUpdated = page?.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-4xl" data-testid="terms-page">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        {hasSanityBody ? (
          // @ts-expect-error - Portable Text blocks
          <PortableText value={page.body} />
        ) : (
          FALLBACK.body.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
              <p>{section.paragraph}</p>
            </section>
          ))
        )}
      </div>

      <div className="mt-12 pt-8 border-t">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
