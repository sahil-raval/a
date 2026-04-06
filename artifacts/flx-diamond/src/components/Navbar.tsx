import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const links = [
    { href: "/diamonds",   label: "Diamonds" },
    { href: "/services",   label: "Services" },
    { href: "/investment", label: "Investment" },
    { href: "/about",      label: "About" },
    { href: "/faq",        label: "FAQ" },
    { href: "/journal",    label: "Journal" },
    { href: "/contact",    label: "Contact" },
  ];

  /* On home: transparent until scrolled.
     On inner pages: always solid navy. */
  const solid = !isHome || scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solid
          ? "border-b"
          : "border-b border-transparent"
      )}
      style={{
        background: solid ? "rgba(2,39,74,0.96)" : "transparent",
        borderColor: solid ? "rgba(28,169,201,0.12)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" data-testid="nav-logo">
          <img
            src="/flx-logo-v2-trimmed.png"
            alt="FLX Diamond"
            style={{ height: "44px", width: "auto", mixBlendMode: "screen" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={cn(
                "text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-200 relative py-2",
                location === link.href
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              )}
            >
              {link.label}
              {location === link.href && (
                <span
                  className="absolute bottom-0 left-0 w-full h-px"
                  style={{ background: "#1CA9C9" }}
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
                className="text-white/70 hover:text-white p-2 transition-colors"
                data-testid="btn-mobile-menu"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#02274A] border-none text-white w-full sm:max-w-sm p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b flex items-center" style={{ borderColor: "rgba(28,169,201,0.12)" }}>
                  <img src="/flx-logo-v2-trimmed.png" alt="FLX Diamond" style={{ height: "40px", width: "auto", mixBlendMode: "screen" }} />
                </div>
                <div className="flex-1 py-10 px-6 flex flex-col gap-7">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "font-serif text-2xl tracking-wide transition-colors",
                        location === link.href ? "text-white" : "text-white/50"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="p-6 border-t space-y-2" style={{ borderColor: "rgba(28,169,201,0.1)" }}>
                  <p className="text-[9px] tracking-widest text-white/30 uppercase">Geelong, VIC, Australia</p>
                  <p className="text-xs tracking-wide" style={{ color: "rgba(28,169,201,0.7)" }}>help@flxdiamond.com</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
