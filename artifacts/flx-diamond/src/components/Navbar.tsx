import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 60);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const links = [
    { href: "/diamonds",   label: "Diamonds" },
    { href: "/jewellery",  label: "Jewellery" },
    { href: "/trade",      label: "Trade" },
    { href: "/investment", label: "Investment" },
    { href: "/about",      label: "About" },
    { href: "/journal",    label: "Journal" },
    { href: "/contact",    label: "Contact" },
  ];

  const isScrolledOrNotHome = scrolled || location !== "/";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolledOrNotHome
          ? "bg-[#02274A]/96 backdrop-blur-md border-b border-white/8"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" data-testid="nav-logo">
          <span
            className="font-serif text-2xl font-semibold tracking-[0.18em]"
            style={{ color: "#C9A227" }}
          >
            FLX
          </span>
          <span
            className="text-[9px] tracking-[0.35em] font-medium hidden sm:inline-block"
            style={{ color: "rgba(201,162,39,0.65)" }}
          >
            DIAMONDS
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={cn(
                "text-[11px] tracking-[0.15em] uppercase font-medium transition-colors relative py-2",
                location === link.href
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
              {location === link.href && (
                <span
                  className="absolute bottom-0 left-0 w-full h-px"
                  style={{ background: "#C9A227" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="text-white/80 hover:text-white p-2 transition-colors"
                data-testid="btn-mobile-menu"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#02274A] border-none text-white w-full sm:max-w-sm p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/8 flex items-center">
                  <span className="font-serif text-2xl font-semibold tracking-[0.18em]" style={{ color: "#C9A227" }}>FLX</span>
                  <span className="ml-3 text-[9px] tracking-[0.35em]" style={{ color: "rgba(201,162,39,0.65)" }}>DIAMONDS</span>
                </div>
                <div className="flex-1 py-10 px-6 flex flex-col gap-7">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "font-serif text-2xl tracking-wide transition-colors",
                        location === link.href ? "text-white" : "text-white/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-6 border-t border-white/8 space-y-1">
                  <p className="text-xs tracking-widest text-white/40 uppercase">Geelong, VIC, Australia</p>
                  <p className="text-xs tracking-wide" style={{ color: "rgba(201,162,39,0.7)" }}>help@flxdiamond.com</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
