import { Button } from "@/components/ui/button";
import { Sun, Battery, Zap, ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SolarPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2064&auto=format&fit=crop" 
            alt="Solar Panels" 
            fill 
            className="object-cover opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-8 rounded-full bg-primary/20 text-white backdrop-blur-md border border-white/10">
             <Sun className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Solar & Battery Solutions
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Generate your own clean energy and store it for when you need it most. Reduce reliance on the grid and slash your bills.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-lg bg-primary hover:bg-primary/90 border-none">
               <Link href="/contact">Get a Solar Quote</Link>
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
                    <BarChart3 className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Lower Energy Bills</h3>
                 <p className="text-muted-foreground leading-relaxed">Significantly reduce or even eliminate your electricity costs from day one with high-efficiency panels.</p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Energy Independence</h3>
                 <p className="text-muted-foreground leading-relaxed">Protect yourself from rising energy prices and grid outages with advanced battery storage systems.</p>
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <Battery className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Smart Storage</h3>
                 <p className="text-muted-foreground leading-relaxed">Store excess solar energy during the day to power your home through the night.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Switch to Solar?</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    The benefits go beyond just saving money. It's about security, sustainability, and making a smart investment in your property's future.
                  </p>
                  <ul className="space-y-4">
                     {[
                        "Reduce carbon footprint immediately",
                        "Increase property value",
                        "Government rebates available",
                        "25-year performance warranty",
                        "Real-time monitoring via app"
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
                    src="https://images.pexels.com/photos/8853537/pexels-photo-8853537.jpeg"
                    alt="Solar Installation"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to go solar?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
               Get a free, no-obligation assessment of your property's solar potential today.
            </p>
            <div className="flex justify-center">
               <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-slate-900 hover:bg-slate-100">
                  <Link href="/contact">Request Assessment <ArrowRight className="ml-2 h-5 w-5" /></Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
