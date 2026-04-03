import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/diamonds", label: "Diamonds" },
    { href: "/jewellery", label: "Jewellery" },
    { href: "/trade", label: "Trade" },
    { href: "/investment", label: "Investment" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-widest text-primary">FLX</span>
          <span className="text-xs tracking-[0.2em] text-muted-foreground hidden sm:inline-block">DIAMONDS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide font-medium transition-colors hover:text-accent relative py-2",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="md:hidden text-sm tracking-wide font-medium text-primary hover:text-accent transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
