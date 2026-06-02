"use client";

import dynamic from "next/dynamic";
import type { HomeContent } from "@/sanity/fallbacks";

const Globe = dynamic(() => import("./globe-wrapper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center text-white/20">
      Loading Globe...
    </div>
  ),
});

interface EnergyGlobeProps {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  stats: HomeContent["globeStats"];
}

export function EnergyGlobe({
  badge,
  headingLine1,
  headingLine2,
  description,
  stats,
}: EnergyGlobeProps) {
  return (
    <section
      className="w-full py-20 bg-slate-950 relative overflow-hidden"
      data-testid="energy-globe-section"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative flex justify-center items-center min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
            <Globe />
          </div>

          <div className="order-1 md:order-2 text-left">
            {badge && (
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 backdrop-blur-md mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                {badge}
              </div>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              {headingLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                {headingLine2}
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed drop-shadow-md max-w-lg">
              {description}
            </p>

            {stats?.length > 0 && (
              <div className="grid grid-cols-2 gap-6 text-slate-200">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
