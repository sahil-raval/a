import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  lightMode?: boolean;
  src?: string;
  alt?: string;
}

export function Logo({
  lightMode = false,
  src = "/logo.png",
  alt = "APM Energy",
}: LogoProps) {
  // Use unoptimized for absolute remote URLs we may receive from Sanity.
  const isRemote = src.startsWith("http");
  return (
    <Link href="/" className="flex items-center gap-2 group" data-testid="site-logo">
      <div className="relative w-28 h-28">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={isRemote}
          className={cn(
            "object-contain transform group-hover:rotate-3 transition-transform duration-300",
            lightMode ? "brightness-0 invert" : "",
          )}
        />
      </div>
    </Link>
  );
}
