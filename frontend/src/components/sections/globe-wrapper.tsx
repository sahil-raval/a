"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function GlobeWrapper({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.12, 0.23, 0.54], // Ocean Blue #1E3A8A
      markerColor: [0.29, 0.87, 0.5], // Green #4ade80
      glowColor: [0.12, 0.23, 0.54],
      opacity: 1,
      markers: [
        // North America
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.03 }, // New York
        // Europe
        { location: [51.5074, -0.1278], size: 0.03 }, // London
        { location: [48.8566, 2.3522], size: 0.03 }, // Paris
        { location: [52.52, 13.405], size: 0.03 }, // Berlin
        // Asia
        { location: [35.6762, 139.6503], size: 0.03 }, // Tokyo
        { location: [31.2304, 121.4737], size: 0.03 }, // Shanghai
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [28.6139, 77.209], size: 0.03 }, // New Delhi
        // Australia
        { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
        // South America
        { location: [-23.5505, -46.6333], size: 0.03 }, // Sao Paulo
        // Africa
        { location: [-1.2921, 36.8219], size: 0.03 }, // Nairobi
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={cn("w-full max-w-[600px] aspect-square relative mx-auto", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 ease-in-out"
      />
    </div>
  );
}

