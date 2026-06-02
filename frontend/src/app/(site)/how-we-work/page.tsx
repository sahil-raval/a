import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubpageHero } from "@/components/sections/subpage-hero";
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowRight,
} from "lucide-react";
import { buildMetadata, getHowWeWork, getSite } from "@/sanity/queries";
import { getIcon } from "@/sanity/icons";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHowWeWork();
  return buildMetadata(
    data.seo,
    data.seo?.title || "How We Work",
    data.seo?.description || "",
    "/how-we-work",
  );
}

export default async function HowWeWorkPage() {
  const [data, site] = await Promise.all([getHowWeWork(), getSite()]);

  return (
    <div className="min-h-screen pb-20" data-testid="how-we-work-page">
      <SubpageHero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        image={data.heroImageUrl}
        icon={<ClipboardList className="w-6 h-6" />}
      />

      {/* Introduction */}
      <section className="py-14 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">{data.introTitle}</h2>
          {data.introParagraphs?.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground mb-3">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 9-Step Journey */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.processTitle}</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {data.processSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {data.journey?.map((item, i) => {
              const isLast = i === (data.journey?.length || 0) - 1;
              const Icon = getIcon(item.icon);
              return (
                <div key={i} className="flex gap-0">
                  <div className="flex flex-col items-center" style={{ minWidth: 52 }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-sm z-10 bg-primary/10 text-primary">
                      {item.step}
                    </div>
                    {!isLast && (
                      <div
                        className="w-px flex-1 bg-border mt-1 mb-1"
                        style={{ minHeight: 28 }}
                      />
                    )}
                  </div>

                  <div className={`flex-1 ml-4 ${!isLast ? "mb-5" : ""}`}>
                    <div className="rounded-2xl p-5 md:p-6 border bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded-md shrink-0 bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="font-semibold text-base">{item.title}</h3>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Systems */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.systemsTitle}</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {data.systemsSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.businessSystems?.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <Card key={i} className="border-none shadow-md">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complaints */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5">
                <AlertTriangle className="h-4 w-4" />
                {data.complaintsBadge}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.complaintsTitle}</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {data.complaintsIntro}
              </p>
              <div className="space-y-5">
                {data.complaintTimelines?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-base font-medium mb-1">{item.title}</p>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 space-y-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold">{data.lodgeTitle}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{data.lodgeIntro}</p>
              <div className="space-y-3">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: site.email,
                    href: `mailto:${site.email}`,
                    external: true,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: site.phone,
                    href: `tel:${site.phone.replace(/\s+/g, "")}`,
                    external: true,
                  },
                  {
                    icon: Globe,
                    label: "Website",
                    value: "Contact Form",
                    href: "/contact",
                    external: false,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                      {item.external ? (
                        <a
                          href={item.href}
                          className="text-base text-primary hover:underline font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-base text-primary hover:underline font-medium"
                        >
                          {item.value}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 flex items-center gap-2 text-base text-muted-foreground">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>{data.lodgeFooter}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETCC */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="flex justify-center mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.netccLogoUrl}
              alt="NETCC Approved Seller"
              className="w-20 h-20 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.netccTitle}</h2>
          <p className="text-base text-blue-100 leading-relaxed mb-8">{data.netccBody}</p>
          <Button asChild size="lg" variant="secondary" className="text-primary font-bold">
            <Link href={data.netccCtaHref}>
              {data.netccCtaLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
