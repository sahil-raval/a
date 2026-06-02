import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getIcon } from "@/sanity/icons";
import type { ServiceContent } from "@/sanity/fallbacks";

interface ServicesOverviewProps {
  title: string;
  subtitle: string;
  services: ServiceContent[];
}

export function ServicesOverview({ title, subtitle, services }: ServicesOverviewProps) {
  return (
    <section
      className="py-12 sm:py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50"
      data-testid="services-overview-section"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{subtitle}</p>
          </div>
          <Button asChild variant="ghost" className="group pl-0 md:pl-4 self-start md:self-auto">
            <Link href="/services">
              View All Services{" "}
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services
            .filter((s) => s.showOnHome !== false)
            .map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={`${service.slug}-${index}`}
                  className="group relative overflow-hidden border-none h-64"
                  data-testid={`service-card-${service.slug}`}
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      unoptimized={service.imageUrl?.startsWith("http")}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <CardHeader className="p-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/10 text-white backdrop-blur-sm border border-white/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-white">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <p className="text-sm md:text-base text-gray-200">
                        {service.shortDescription}
                      </p>
                    </CardContent>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="absolute inset-0 z-20 focus:outline-none"
                  >
                    <span className="sr-only">View {service.title}</span>
                  </Link>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
}
