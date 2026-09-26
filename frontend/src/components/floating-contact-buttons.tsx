"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  // Inline glyph so we don't need an extra icon-set dependency for one brand icon.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.002 2.003c-5.522 0-10 4.477-10 10 0 1.762.464 3.484 1.345 5.001L2 22l5.11-1.334A9.947 9.947 0 0 0 12.002 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm.001 18.153a8.14 8.14 0 0 1-4.145-1.131l-.297-.176-3.03.79.81-2.955-.194-.303a8.146 8.146 0 0 1-1.24-4.338c0-4.507 3.667-8.173 8.174-8.173 4.507 0 8.173 3.666 8.173 8.173 0 4.507-3.666 8.173-8.173 8.173z" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export default function FloatingContactButtons({
  whatsappHref,
  telHref,
}: {
  whatsappHref?: string;
  telHref?: string;
}) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!whatsappHref && !telHref) return null;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3 sm:bottom-8 sm:right-6">
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
      {telHref && (
        <a
          href={telHref}
          aria-label="Call us"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" fill="currentColor" />
        </a>
      )}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
