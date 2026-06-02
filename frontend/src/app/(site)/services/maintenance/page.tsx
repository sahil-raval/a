import { Button } from "@/components/ui/button";
import { Wrench, ShieldAlert, Clock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop" 
            alt="Electrical Maintenance" 
            fill 
            className="object-cover opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-8 rounded-full bg-primary/20 text-white backdrop-blur-md border border-white/10">
             <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Electrical Maintenance
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Comprehensive electrical maintenance and safety checks to keep your systems running smoothly, safely, and compliantly.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-lg bg-primary hover:bg-primary/90 border-none">
               <Link href="/contact">Book Service</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg bg-transparent border-white text-white hover:bg-white hover:text-black">
               <Link href="tel:+61300123456">Emergency Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 -mt-10 relative z-30">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <ShieldAlert className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Preventative Care</h3>
                 <p className="text-muted-foreground leading-relaxed">Regular inspections identify potential faults before they become dangerous or costly hazards.</p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Clock className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Rapid Response</h3>
                 <p className="text-muted-foreground leading-relaxed">Fast turnaround times for urgent repairs to minimize downtime for your home or business.</p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Compliance Checks</h3>
                 <p className="text-muted-foreground leading-relaxed">Ensure your property meets all Australian electrical standards and safety regulations.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Safety First</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Electrical faults can be dangerous. Our licensed electricians provide thorough testing and maintenance to give you total peace of mind.
                  </p>
                  <ul className="space-y-4">
                     {[
                        "Switchboard safety upgrades",
                        "Smoke alarm testing and compliance",
                        "RCD (Safety Switch) testing",
                        "Fault finding and repair",
                        "Appliance testing and tagging"
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                           <span className="font-medium">{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                    alt="Electrician Working"
                    fill
                    className="object-cover"
                  />
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/10 z-0"></div>
         <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Don't Wait for a Breakdown</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
               Schedule a safety inspection or maintenance service today.
            </p>
            <div className="flex justify-center">
               <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-slate-900 hover:bg-slate-100">
                  <Link href="/contact">Book Service <ArrowRight className="ml-2 h-5 w-5" /></Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
