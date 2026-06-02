import Link from "next/link"
import { HardHat, Cpu, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubpageHero } from "@/components/sections/subpage-hero";

const capabilities = [
  {
    icon: Cpu,
    title: "System Design & Feasibility",
    description: "Site-specific solar and battery system designs using industry-standard tools, accounting for roof orientation, shading, load profiles, and DNSP constraints.",
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    description: "Preparation of engineering reports, single-line diagrams, compliance documentation, and network pre-approval applications.",
  },
  {
    icon: HardHat,
    title: "Structural & Electrical Engineering",
    description: "Structural assessments for mounting systems and electrical engineering for grid-connected systems, including export limit management.",
  },
];

const expertise = [
  "Solar PV system design (residential & commercial)",
  "Battery storage integration and sizing",
  "Single and three-phase system configurations",
  "Load profile analysis and tariff optimisation",
  "Network constraint identification and DNSP coordination",
  "AS/NZS standards compliance verification",
  "Engineering certificates for mounting systems",
  "Performance modelling and financial projections",
];

export default function EngineeringPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SubpageHero
        title="Engineering Services"
        subtitle="Technical design and engineering excellence, from feasibility through to commissioning, built on Australian standards and best practice."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
        icon={<HardHat className="w-6 h-6" />}
      />

      {/* Capabilities */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every project starts with a sound engineering foundation, designed fit-for-purpose, compliant, and built to last.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((c, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{c.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
                alt="Engineering design"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Areas of Expertise</h2>
              <ul className="space-y-3">
                {expertise.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contact">Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Engineering Matters */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Done Right, From Day One</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Our designs are prepared using industry-standard tools and reviewed prior to installation. We account for roof orientation, shading, available space, electrical configuration, and network constraints, so your system performs as expected, every day.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-primary font-bold">
            <Link href="/contact">Get a Technical Assessment</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
