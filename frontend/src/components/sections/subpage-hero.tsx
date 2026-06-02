import type { ReactNode } from "react";

interface SubpageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  icon?: ReactNode;
  accentColor?: "primary" | "green";
}

export function SubpageHero({ title, subtitle, image, icon, accentColor = "primary" }: SubpageHeroProps) {
  const isGreen = accentColor === "green";
  return (
    <section className="relative h-[480px] md:h-[540px] flex items-center bg-slate-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover scale-105"
        />
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Subtle top edge glow */}
      <div className={`absolute top-0 left-0 right-0 h-px z-10 ${isGreen ? "bg-gradient-to-r from-transparent via-green-500/60 to-transparent" : "bg-gradient-to-r from-transparent via-primary/60 to-transparent"}`} />

      <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
        {icon && (
          <div className="flex justify-center mb-5">
            <div className={`relative inline-flex items-center justify-center p-3.5 rounded-full backdrop-blur-md border shadow-lg ${isGreen ? "bg-green-500/15 text-green-400 border-green-400/30 shadow-green-500/20" : "bg-primary/15 text-white border-white/20 shadow-primary/20"}`}>
              {/* Outer glow ring */}
              <span className={`absolute inset-0 rounded-full animate-pulse opacity-40 ${isGreen ? "ring-1 ring-green-400/50" : "ring-1 ring-white/30"}`} />
              {icon}
            </div>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Decorative accent line */}
        <div className={`mx-auto mb-5 h-0.5 w-12 rounded-full ${isGreen ? "bg-green-400/70" : "bg-primary/70"}`} />

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
