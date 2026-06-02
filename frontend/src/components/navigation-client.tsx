"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getIcon } from "@/sanity/icons";
import type { NavContent, SiteContent } from "@/sanity/fallbacks";

interface NavigationClientProps {
  nav: NavContent;
  site: SiteContent;
}

export function NavigationClient({ nav, site }: NavigationClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isTransparentPage = location === "/";
  const isDark = !isScrolled && isTransparentPage;
  const linkClass = cn(
    "text-sm font-medium transition-colors px-3 py-2 rounded-md",
    isDark
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-foreground hover:text-primary hover:bg-muted",
  );

  const services = nav.servicesMenuItems;
  // Render primary links with the Services dropdown inserted after "About"
  const links = nav.primaryLinks;

  const renderLink = (link: { label: string; href: string }) => (
    <Link
      key={`${link.href}-${link.label}`}
      href={link.href}
      className={linkClass}
      data-testid={`nav-link-${link.label?.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {link.label}
    </Link>
  );

  const servicesDropdown = (
    <NavigationMenu key="services-menu">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "bg-transparent h-auto text-sm font-medium transition-colors",
              isDark
                ? "text-white/90 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                : "text-foreground hover:text-primary data-[state=open]:bg-muted",
            )}
            data-testid="nav-services-trigger"
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-80 p-2">
              {services.map((service) => {
                const Icon = getIcon(service.icon);
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {service.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
              <div className="border-t mt-1 pt-1">
                <Link
                  href="/services"
                  className="block p-3 text-sm font-semibold text-center text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Insert Services dropdown after the link whose label is "About" (or after index 1 as fallback)
  const aboutIdx = links.findIndex((l) => l.label?.toLowerCase() === "about");
  const insertAfter = aboutIdx >= 0 ? aboutIdx : 1;

  return (
    <header
      data-testid="site-navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled || !isTransparentPage
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Logo lightMode={isDark} src={site.logoUrl} alt={site.companyName} />

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <span key={`${link.href}-${i}`} className="contents">
              {renderLink(link)}
              {i === insertAfter && servicesDropdown}
            </span>
          ))}
          <Button asChild size="sm" className="ml-3" data-testid="nav-cta-button">
            <Link href={nav.ctaHref}>{nav.ctaLabel}</Link>
          </Button>
        </nav>

        <button
          className={cn("md:hidden p-2 rounded-md", isDark ? "text-white" : "text-foreground")}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pl-3">
              <p className="py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Services
              </p>
              {services.map((s) => {
                const Icon = getIcon(s.icon);
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-2.5 py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    {s.title}
                  </Link>
                );
              })}
              <Link
                href="/services"
                className="py-2 px-3 text-sm font-medium text-primary block hover:bg-muted rounded-md transition-colors"
              >
                View All Services
              </Link>
            </div>

            <div className="pt-2">
              <Button asChild size="sm" className="w-full">
                <Link href={nav.ctaHref}>{nav.ctaLabel}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
