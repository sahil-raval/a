import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { DiamondCard } from "@/components/DiamondCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Diamond on stone" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-wide mb-6"
          >
            PRECISION. TRUST. EXCELLENCE.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base mb-12 font-medium"
          >
            Private Wealth &nbsp;|&nbsp; Gem Expertise &nbsp;|&nbsp; Bespoke Advisory
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/diamonds">
              <Button className="rounded-none bg-white text-primary hover:bg-white/90 h-14 px-8 tracking-wider text-sm uppercase">
                Explore Inventory
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white/10 h-14 px-8 tracking-wider text-sm uppercase">
                Request Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Credibility Strip */}
      <section className="border-b border-border py-6 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs md:text-sm font-medium tracking-wider text-muted-foreground uppercase text-center">
            <span>47 Years Combined Expertise</span>
            <span className="hidden md:inline text-border">•</span>
            <span>GIA Certified Stones</span>
            <span className="hidden md:inline text-border">•</span>
            <span>Trusted By Industry Leaders</span>
            <span className="hidden lg:inline text-border">•</span>
            <span className="hidden lg:inline">Natural & Lab-Grown</span>
          </div>
        </div>
      </section>

      {/* ... Add the rest of the homepage sections following similar minimalist aesthetic ... */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-primary mb-16">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-primary">Natural Diamonds</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Ethically sourced, GIA certified natural diamonds of exceptional quality for discerning buyers.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-primary">Lab-Grown Diamonds</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Premium lab-created stones offering exceptional value and precision craftsmanship.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-primary">Custom & Bespoke</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Tailored advisory and sourcing for specific investment or manufacturing requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Diamonds */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl text-primary">Featured Inventory</h2>
            <Link href="/diamonds" className="text-accent hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
              { id: 2, shape: "Oval Cut", image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1", cut: "Excellent" },
              { id: 3, shape: "Emerald Cut", image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "VVS2", cut: "Excellent" },
            ].map((diamond) => (
              <DiamondCard
                key={diamond.id}
                image={diamond.image}
                shape={diamond.shape}
                carat={diamond.carat}
                color={diamond.color}
                clarity={diamond.clarity}
                cut={diamond.cut}
                onRequestPrice={() => console.log('Request Price')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Specialised Mastery */}
      <section className="py-32 bg-primary text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-white/90 leading-tight">
            "One of our strongest areas of expertise is working on IF to FL diamond conversion opportunities, based on GIA certificate comments, while maintaining the same weight wherever technically achievable."
          </h2>
          <p className="uppercase tracking-[0.2em] text-accent text-sm font-medium">Specialised Mastery</p>
        </div>
      </section>
      
      {/* 8. Heritage */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="/heritage.png" alt="Diamond craftsmanship" className="w-full h-[600px] object-cover grayscale-[20%]" />
          </div>
          <div className="space-y-8">
            <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight">Heritage. Mastery.<br/>Quiet Confidence.</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Built on 47 years of collective diamond expertise, FLX Diamonds represents the pinnacle of sourcing and advisory.</p>
              <p>Led by founder Babu Vekariya, who began his journey in 1978 at age 12, we bring unparalleled insight to every stone we evaluate.</p>
              <p>We are a private wealth office for diamonds—prioritising precision, trust, and excellence above all else.</p>
            </div>
            <Link href="/about">
              <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 uppercase tracking-wider text-xs mt-4">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
