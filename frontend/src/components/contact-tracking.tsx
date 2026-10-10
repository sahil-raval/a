"use client";

import { useEffect } from "react";

export default function ContactTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a");
      if (!link || typeof window.gtag !== "function") return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        window.gtag("event", "click_phone", { page_path: window.location.pathname });
      } else if (href.startsWith("mailto:")) {
        window.gtag("event", "click_email", { page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}