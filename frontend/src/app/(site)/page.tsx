import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { EnergyGlobe } from "@/components/sections/energy-globe";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  buildMetadata,
  getHome,
  getServices,
} from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return buildMetadata(
    home.seo,
    home.seo?.title || "Home",
    home.seo?.description || "",
    "/",
  );
}

export default async function Home() {
  const [home, services] = await Promise.all([getHome(), getServices()]);

  return (
    <div className="flex flex-col min-h-screen" data-testid="home-page">
      <Hero data={home} />
      <ServicesOverview
        title={home.servicesTitle}
        subtitle={home.servicesSubtitle}
        services={services}
      />
      <EnergyGlobe
        badge={home.globeBadge}
        headingLine1={home.globeHeadingLine1}
        headingLine2={home.globeHeadingLine2}
        description={home.globeDescription}
        stats={home.globeStats}
      />
      <Features
        title={home.featuresTitle}
        subtitle={home.featuresSubtitle}
        features={home.features}
      />
      <Testimonials
        title={home.testimonialsTitle}
        subtitle={home.testimonialsSubtitle}
        testimonials={home.testimonials}
      />

      {/* Call to Action Section */}
      <section
        className="py-12 sm:py-20 md:py-32 bg-primary relative overflow-hidden"
        data-testid="home-cta-section"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
            {home.ctaHeading}
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
            {home.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-primary font-bold px-8 h-12 text-base w-full sm:w-auto"
              data-testid="home-cta-primary"
            >
              <Link href={home.ctaPrimaryHref}>{home.ctaPrimaryLabel}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 px-8 h-12 text-base w-full sm:w-auto"
              data-testid="home-cta-secondary"
            >
              <Link href={home.ctaSecondaryHref}>{home.ctaSecondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
