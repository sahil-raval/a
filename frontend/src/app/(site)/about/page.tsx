import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SubpageHero } from "@/components/sections/subpage-hero";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAbout, buildMetadata } from "@/sanity/queries";
import { getIcon } from "@/sanity/icons";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return buildMetadata(
    about.seo,
    about.seo?.title || "About Us",
    about.seo?.description || "",
    "/about",
  );
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="min-h-screen pb-20" data-testid="about-page">
      <SubpageHero
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        image={about.heroImageUrl}
        icon={<CheckCircle className="w-6 h-6" />}
      />

      {/* Who We Are */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full -z-10" />
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 md:p-10 space-y-6">
                <h3 className="text-2xl font-bold">{about.approachTitle}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {about.approachBody}
                </p>
                <div className="h-px w-16 bg-primary" />
                <h3 className="text-2xl font-bold">{about.differentiatorTitle}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {about.differentiatorBody}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{about.whoWeAreTitle}</h2>
              {about.whoWeAreParagraphs?.map((p, i) => (
                <p key={i} className="text-base text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
              <div className="pt-2 space-y-4">
                {about.bulletPoints?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="text-base text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.stats?.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-950">
                  <CardContent className="pt-6 text-center space-y-3 pb-6">
                    <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-xl">{s.heading}</h3>
                    <p className="text-base text-muted-foreground leading-snug">{s.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.ctaHeading}</h2>
            <p className="text-base text-primary-foreground/80 leading-relaxed mb-8">
              {about.ctaBody}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-primary font-bold">
              <Link href={about.ctaHref}>
                {about.ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
