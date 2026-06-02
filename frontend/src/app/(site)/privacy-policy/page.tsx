import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { buildMetadata, getLegalPage } from "@/sanity/queries";

const FALLBACK = {
  title: "Privacy Policy",
  body: [
    {
      heading: "1. Introduction",
      paragraphs: [
        "At APM Energy, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
      ],
    },
    {
      heading: "2. Information We Collect",
      paragraphs: [
        "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:",
      ],
      bullets: [
        "Identity Data: includes first name, last name, username or similar identifier.",
        "Contact Data: includes billing address, delivery address, email address and telephone numbers.",
        "Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.",
      ],
    },
    {
      heading: "3. How We Use Your Personal Data",
      paragraphs: [
        "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
      ],
      bullets: [
        "Where we need to perform the contract we are about to enter into or have entered into with you.",
        "Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.",
        "Where we need to comply with a legal or regulatory obligation.",
      ],
    },
    {
      heading: "4. Data Security",
      paragraphs: [
        "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
      ],
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getLegalPage("privacy")) as { seo?: unknown } | null;
  // @ts-expect-error - shape from sanity may vary
  return buildMetadata(page?.seo, "Privacy Policy", "Privacy Policy for APM Energy.", "/privacy-policy");
}

export default async function PrivacyPolicy() {
  const page = (await getLegalPage("privacy")) as
    | { title?: string; body?: unknown; lastUpdated?: string }
    | null;

  const hasSanityBody = page?.body && Array.isArray(page.body) && page.body.length > 0;
  const title = page?.title || FALLBACK.title;
  const lastUpdated = page?.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-4xl" data-testid="privacy-page">
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
              {section.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
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
