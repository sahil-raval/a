import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const links = [
    { href: "/diamonds", label: "Diamonds" },
    { href: "/jewellery", label: "Jewellery" },
    { href: "/trade", label: "Trade" },
    { href: "/investment", label: "Investment" },
    { href: "/about", label: "About" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  const isScrolledOrNotHome = scrolled || location !== "/";

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolledOrNotHome 
          ? "bg-[#02274A]/95 backdrop-blur-md border-white/10" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="nav-logo">
          <span className="font-serif text-2xl font-bold tracking-widest text-white">FLX</span>
          <span className="text-xs tracking-[0.2em] text-white/70 hidden sm:inline-block">DIAMONDS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={cn(
                "text-sm tracking-wide font-medium transition-colors hover:text-accent relative py-2",
                location === link.href ? "text-accent" : "text-white/80"
              )}
            >
              {link.label}
              {location === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button 
                className="text-white p-2" 
                data-testid="btn-mobile-menu"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#02274A] border-none text-white w-full sm:max-w-md p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <span className="font-serif text-2xl font-bold tracking-widest text-white">FLX</span>
                    <span className="text-xs tracking-[0.2em] text-white/70">DIAMONDS</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-xl font-serif tracking-wide transition-colors",
                        location === link.href ? "text-accent" : "text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-6 border-t border-white/10 text-sm text-white/50">
                  <p>Geelong, VIC, Australia</p>
                  <p className="mt-2">help@flxdiamond.com</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
