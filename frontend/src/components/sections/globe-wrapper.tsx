"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function GlobeWrapper({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Don't start rendering until the globe actually scrolls into view.
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    let phi = 0;
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    // Cap pixel ratio so we don't render at 3x/4x resolution on high-DPI phones.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 8000,
      mapBrightness: 6,
      baseColor: [0.12, 0.23, 0.54], // Ocean Blue #1E3A8A
      markerColor: [0.29, 0.87, 0.5], // Green #4ade80
      glowColor: [0.12, 0.23, 0.54],
      opacity: 1,
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.03 }, // New York
        { location: [51.5074, -0.1278], size: 0.03 }, // London
        { location: [48.8566, 2.3522], size: 0.03 }, // Paris
        { location: [52.52, 13.405], size: 0.03 }, // Berlin
        { location: [35.6762, 139.6503], size: 0.03 }, // Tokyo
        { location: [31.2304, 121.4737], size: 0.03 }, // Shanghai
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [28.6139, 77.209], size: 0.03 }, // New Delhi
        { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
        { location: [-23.5505, -46.6333], size: 0.03 }, // Sao Paulo
        { location: [-1.2921, 36.8219], size: 0.03 }, // Nairobi
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
        state.width = width * dpr;
        state.height = width * dpr;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full max-w-[600px] aspect-square relative mx-auto", className)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
}