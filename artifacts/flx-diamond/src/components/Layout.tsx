import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-white">
      <Navbar />
      {/* Home hero fills the full viewport — no top padding. All other pages pad below the fixed navbar. */}
      <main className={`flex-1 ${isHome ? "" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
