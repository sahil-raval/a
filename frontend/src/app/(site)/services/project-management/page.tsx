import Link from "next/link"
import { ClipboardList, Users, Clock, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubpageHero } from "@/components/sections/subpage-hero";

const services = [
  {
    icon: ClipboardList,
    title: "End-to-End Coordination",
    description: "We manage the entire project lifecycle, from initial consultation and design through procurement, installation, compliance, and client handover.",
  },
  {
    icon: Users,
    title: "Stakeholder Management",
    description: "Clear communication with all stakeholders including clients, installers, DNSPs, and regulators, keeping everyone informed at every stage.",
  },
  {
    icon: Clock,
    title: "Timeline & Schedule Management",
    description: "Defined milestones and proactive schedule management to ensure your project is delivered on time, every time.",
  },
  {
    icon: Shield,
    title: "Compliance & Quality Assurance",
    description: "All work is delivered in accordance with Australian standards, NETCC requirements, and relevant workplace health and safety obligations.",
  },
];

const process = [
  { step: "01", title: "Initial Consultation", desc: "We assess your energy needs, site conditions, and goals to develop a tailored solution." },
  { step: "02", title: "System Design", desc: "Our team prepares a fit-for-purpose design based on your specific requirements and site data." },
  { step: "03", title: "Proposal & Agreement", desc: "You receive a clear, detailed proposal with full pricing, scope, and timeline before any commitment." },
  { step: "04", title: "Procurement", desc: "Equipment is sourced from trusted suppliers and scheduled for delivery aligned with your install date." },
  { step: "05", title: "Installation", desc: "Our qualified team delivers the installation to the agreed scope, with quality checks at every stage." },
  { step: "06", title: "Grid Connection & Commissioning", desc: "We manage all DNSP approvals and compliance, and commission the system once it's verified as operational." },
  { step: "07", title: "Handover & Support", desc: "Full system orientation, monitoring platform access, and ongoing after-sales support from our team." },
];

export default function ProjectManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SubpageHero
        title="Project Management"
        subtitle="End-to-end project delivery with the precision, transparency, and accountability your investment deserves."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
        icon={<ClipboardList className="w-6 h-6" />}
      />

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Project Management Approach</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We don't just install systems. We own outcomes. Every project is managed with a project management mindset, from first contact to final handover.
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
                  <p className="text-muted-foreground">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Project Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A structured, transparent process, so you always know where your project stands.
            </p>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {process.map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-lg">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/contact">Start Your Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
