import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildMetadata, getLandingPage, getAllLandingSlugs } from "@/sanity/queries";
import { getIcon } from "@/sanity/icons";
import { PortableTextRenderer } from "@/components/portable-text";

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getAllLandingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) return { title: "Page not found" };
  return buildMetadata((page as any).seo, page.heroHeading || page.title, page.heroSubheading || "", `/landing/${slug}`);
}

export default async function LandingPageView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getLandingPage(slug);
  if (!page) notFound();

  const sections = ((page as any).sections || []) as any[];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950" data-testid="landing-page">
      {/* Hero */}
      <section className="relative flex items-center min-h-[70vh] pt-24 pb-16 bg-slate-900 text-white overflow-hidden">
        {page.heroImageUrl && (
          <>
            <Image src={page.heroImageUrl} alt={page.heroHeading} fill unoptimized className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900" />
          </>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">{page.heroHeading}</h1>
          {page.heroSubheading && (
            <p className="mt-6 text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed">{page.heroSubheading}</p>
          )}
          {page.heroCtaLabel && (
            <div className="mt-10">
              <Link
                href={page.heroCtaHref || "/contact"}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-white font-bold px-8 py-4 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                data-testid="landing-hero-cta"
              >
                {page.heroCtaLabel} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, i) => {
        if (section._type === "richText") {
          return (
            <section key={section._key || i} className="py-16 md:py-24" data-testid="landing-section-richtext">
              <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                {section.heading && (
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">{section.heading}</h2>
                )}
                <PortableTextRenderer value={section.body} />
              </div>
            </section>
          );
        }
        if (section._type === "featureGrid") {
          return (
            <section key={section._key || i} className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900" data-testid="landing-section-features">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  {section.heading && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{section.heading}</h2>}
                  {section.subheading && <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{section.subheading}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(section.items || []).map((item: any, j: number) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <div key={item._key || j} className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }
        if (section._type === "ctaBanner") {
          return (
            <section key={section._key || i} className="py-16 md:py-24" data-testid="landing-section-cta">
              <div className="container mx-auto px-4 md:px-6">
                <div className="p-10 md:p-16 rounded-3xl bg-primary text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    {section.heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.heading}</h2>}
                    {section.description && <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">{section.description}</p>}
                    {section.buttonLabel && (
                      <Link href={section.buttonHref || "/contact"} className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-8 py-4 hover:bg-slate-100 transition-colors">
                        {section.buttonLabel} <ArrowRight className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }
        return null;
      })}
    </div>
  );
}
