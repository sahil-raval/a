import Link from "next/link";
import Image from "next/image";
import { Zap, Home, Building2, Shield, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubpageHero } from "@/components/sections/subpage-hero";

const services = [
  {
    icon: Home,
    title: "Residential EV Charging",
    description: "Home charging solutions designed for convenience and efficiency. We supply and install smart EV chargers that integrate with your existing solar and battery system.",
  },
  {
    icon: Building2,
    title: "Commercial EV Charging",
    description: "Scalable EV charging infrastructure for businesses, car parks, and commercial properties. We design and deliver solutions to meet your load requirements and future growth.",
  },
  {
    icon: Shield,
    title: "Compliance & Safety",
    description: "All installations are completed by qualified and accredited electricians in accordance with Australian Standards, AS/NZS 3000, and relevant network requirements.",
  },
  {
    icon: Wrench,
    title: "Ongoing Support",
    description: "Post-installation support for fault identification, warranty management, and system performance. A clear point of contact is maintained after every installation.",
  },
];

const process = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "We assess your property, existing electrical infrastructure, and charging requirements to determine the right solution for your needs.",
  },
  {
    step: "02",
    title: "System Selection",
    desc: "We recommend the most suitable EV charger based on your vehicle, usage patterns, load capacity, and whether solar integration is required.",
  },
  {
    step: "03",
    title: "Proposal & Quote",
    desc: "You receive a clear, detailed proposal with full scope, pricing, and timeline before any commitment.",
  },
  {
    step: "04",
    title: "Installation",
    desc: "Our qualified electricians complete the installation to the agreed scope, with quality checks conducted throughout to verify standards and safety.",
  },
  {
    step: "05",
    title: "Commissioning & Handover",
    desc: "The charger is tested and commissioned on completion. We walk you through operation, app setup, and any smart charging features.",
  },
  {
    step: "06",
    title: "After-Sales Support",
    desc: "We remain your point of contact for any performance queries, warranty claims, or future upgrades.",
  },
];

const highlights = [
  "Compatible with all major EV brands",
  "Solar and battery integration available",
  "Single and three-phase installations",
  "Smart charging and load management",
  "Residential and commercial",
  "Fully compliant with Australian Standards",
];

export default function EVChargersPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SubpageHero
        title="EV Chargers"
        subtitle="Supply and installation of electric vehicle charging solutions for homes and businesses across Australia."
        image="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop"
        icon={<Zap className="w-6 h-6" />}
      />

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our EV Charging Services</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              From single residential chargers to multi-bay commercial installations, we deliver EV charging solutions with the same precision and accountability applied to every APM Energy project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base leading-relaxed">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose APM Energy for EV Charging?</h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                We take the same project management mindset to EV charger installations as we do to solar and battery systems - ensuring every job is delivered on time, compliant, and built to last.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-base text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2070&auto=format&fit=crop"
                alt="EV Charger Installation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Installation Journey</h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              A straightforward, structured process from first contact to a fully operational charger.
            </p>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {process.map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}