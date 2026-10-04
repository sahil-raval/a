"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { getIcon } from "@/sanity/icons";
import type { HomeContent } from "@/sanity/fallbacks";
import { HeroQuoteForm } from "@/components/sections/hero-quote-form";

interface HeroProps {
  data: Pick<
    HomeContent,
    | "heroBadge"
    | "heroHeadingLine1"
    | "heroHeadingLine2"
    | "heroSubheading"
    | "heroPrimaryCtaLabel"
    | "heroPrimaryCtaHref"
    | "heroSecondaryCtaLabel"
    | "heroSecondaryCtaHref"
    | "heroChips"
  >;
  /** Pass contact.serviceOptions from Sanity so the dropdown matches the contact page */
  serviceOptions?: { value: string; label: string }[];
}

export function Hero({ data, serviceOptions }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      data-testid="hero-section"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          src="/hero_video_3.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* pt-28 clears the fixed h-16 navbar */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-28 pb-16 md:pt-32 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* Left: pitch */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            {data.heroBadge && (
              <div className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm text-white shadow-lg">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                {data.heroBadge}
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight text-white drop-shadow-lg">
              {data.heroHeadingLine1} <br className="hidden sm:block" />
              <span className="text-sky-400 relative inline-block drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                {data.heroHeadingLine2}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-100 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md font-medium">
              {data.heroSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button
                asChild
                size="lg"
                className="h-12 sm:h-14 px-8 text-base sm:text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-white border-none"
                data-testid="hero-primary-cta"
              >
                <Link href={data.heroPrimaryCtaHref}>
                  {data.heroPrimaryCtaLabel}{" "}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 sm:h-14 px-8 text-base sm:text-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm hover:scale-105"
                data-testid="hero-secondary-cta"
              >
                <Link href={data.heroSecondaryCtaHref}>{data.heroSecondaryCtaLabel}</Link>
              </Button>
            </div>

            {data.heroChips?.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 pt-2 text-sm sm:text-base font-medium text-white/90">
                {data.heroChips.map((chip, i) => {
                  const Icon = getIcon(chip.icon);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-3 py-2 sm:px-4 rounded-full border border-white/20 shadow-lg"
                    >
                      <div className="p-1.5 rounded-full bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/50">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-semibold tracking-wide">{chip.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: quote form */}
          <div id="quote" className="w-full max-w-md mx-auto lg:max-w-none scroll-mt-28">
            <HeroQuoteForm serviceOptions={serviceOptions} />
          </div>
        </div>
      </div>
    </section>
  );
}