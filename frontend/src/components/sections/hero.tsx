"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { getIcon } from "@/sanity/icons";
import type { HomeContent } from "@/sanity/fallbacks";

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
}

export function Hero({ data }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden h-screen flex items-center" data-testid="hero-section">
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

      <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {data.heroBadge && (
            <div className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm text-white shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              {data.heroBadge}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight text-white drop-shadow-lg">
            {data.heroHeadingLine1} <br className="hidden sm:block" />
            <span className="text-sky-400 relative inline-block drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              {data.heroHeadingLine2}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium px-4 sm:px-0">
            {data.heroSubheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-4 sm:px-0">
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
            <div className="flex flex-wrap justify-center gap-4 md:gap-12 pt-8 md:pt-12 text-sm sm:text-base font-medium text-white/90">
              {data.heroChips.map((chip, i) => {
                const Icon = getIcon(chip.icon);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 sm:gap-3 backdrop-blur-md bg-white/10 px-3 py-2 sm:px-4 rounded-full border border-white/20 shadow-lg"
                  >
                    <div className="p-1.5 sm:p-2 rounded-full bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/50">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="font-semibold tracking-wide">{chip.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}
