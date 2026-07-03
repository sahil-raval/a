import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, Phone, MapPin } from "lucide-react";
import { getFooter, getSite } from "@/sanity/queries";
import { socialIconMap } from "@/sanity/icons";


export default async function Footer() {
  const [footer, site] = await Promise.all([getFooter(), getSite()]);
  const year = new Date().getFullYear();
  const copyright = (footer.copyrightLine || "").replace("{year}", String(year));

  return (
    <footer
      data-testid="site-footer"
      className="w-full border-t bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Logo src={site.logoUrl} alt={site.companyName} />
            <p className="text-sm text-muted-foreground max-w-xs">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {site.socialLinks?.map((social, i) => {
                const Icon = socialIconMap[social.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={i}
                    href={social.url}
                    aria-label={social.platform}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-social-${social.platform}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            {site.netccLogoUrl && (
              <div className="pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.netccLogoUrl}
                  alt="New Energy Tech Approved Seller"
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}
          </div>

          {footer.linkColumns?.map((col, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-lg font-bold">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            {site.abn && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">ABN: {site.abn}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
