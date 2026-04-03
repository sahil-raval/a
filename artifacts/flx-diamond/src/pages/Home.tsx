import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, Gem, Sparkles, Diamond } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // subtle ambient sound
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO — Immersive Ocean Waves */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#02274A]">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-ocean-waves-1569/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[#02274A]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02274A]/40 via-transparent to-[#02274A]/80" />
        
        <audio ref={audioRef} src="https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3" loop />

        <button 
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 text-white/70 hover:text-white transition-colors p-3 bg-black/20 backdrop-blur-sm rounded-full"
          data-testid="btn-toggle-sound"
          aria-label={isMuted ? "Unmute background sound" : "Mute background sound"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-wide mb-6"
          >
            FROM IF TO FL.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light leading-relaxed"
          >
            The hidden upgrade opportunity in diamond grading — precision regrinding that converts Internally Flawless to Flawless, preserving weight, maximising value.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-accent uppercase tracking-widest text-xs md:text-sm font-medium mb-12"
          >
            Geelong, Victoria, Australia | 47 Years Combined Expertise | GIA Certified
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/investment">
              <Button className="rounded-none bg-white text-primary hover:bg-white/90 h-14 px-8 tracking-wider text-sm uppercase w-full sm:w-auto" data-testid="hero-cta-investment">
                Understand the Opportunity →
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-none border-white text-white hover:bg-white/10 h-14 px-8 tracking-wider text-sm uppercase w-full sm:w-auto" data-testid="hero-cta-contact">
                Partner With Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3A. IF→FL Opportunity */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">The Opportunity</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Most buyers never know this opportunity exists.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Based on GIA certificate comments, select IF (Internally Flawless) diamonds can be precision-reground to achieve FL (Flawless) grade — while maintaining the same weight wherever technically achievable. This creates measurable value uplift for the right stones, in the right hands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-muted/20 p-8 border border-border text-center group hover:border-accent transition-colors">
              <div className="w-12 h-12 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <span className="font-serif text-2xl text-primary">1</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-4">SELECT THE STONE</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Identify IF stones with suitable GIA comment indicators that present technical potential for upgrade.</p>
            </div>
            <div className="bg-muted/20 p-8 border border-border text-center group hover:border-accent transition-colors">
              <div className="w-12 h-12 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <span className="font-serif text-2xl text-primary">2</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-4">PRECISION REGRINDING</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Master craftsmanship meticulously reworks the surface, addressing microscopic imperfections.</p>
            </div>
            <div className="bg-muted/20 p-8 border border-border text-center group hover:border-accent transition-colors">
              <div className="w-12 h-12 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <span className="font-serif text-2xl text-primary">3</span>
              </div>
              <h3 className="font-serif text-xl text-primary mb-4">FL UPGRADE</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">The stone is re-submitted to GIA. FL grade achieved. Same weight bracket. Greater intrinsic value.</p>
            </div>
          </div>

          <div className="text-center bg-[#02274A] p-8 max-w-3xl mx-auto">
            <p className="text-white/90 text-sm md:text-base font-medium tracking-wide mb-6">
              <span className="text-accent mr-2">FOR B2B PARTNERS:</span> 
              We offer partnership opportunities for diamond traders, suppliers, and jewellers to access this conversion service.
            </p>
            <Link href="/contact">
              <Button className="rounded-none bg-accent hover:bg-accent/90 text-white uppercase tracking-wider text-xs px-8 h-10" data-testid="btn-partner-with-us">
                Partner With Us →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3B. Credibility Strip */}
      <section className="border-y border-border py-8 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs md:text-sm font-medium tracking-[0.15em] text-primary uppercase text-center">
            <span>47 Years Combined Mastery</span>
            <span className="hidden md:inline text-accent">•</span>
            <span>GIA Certified</span>
            <span className="hidden md:inline text-accent">•</span>
            <span>B2B Specialists</span>
            <span className="hidden lg:inline text-accent">•</span>
            <span>Geelong, Australia</span>
            <span className="hidden lg:inline text-accent">•</span>
            <span>Natural & Lab-Grown</span>
          </div>
        </div>
      </section>

      {/* 3C. Diamond Crafting — Video Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">The Craft Behind the Grade</span>
            <h2 className="font-serif text-4xl text-primary leading-tight">Mastery in Micro-Millimeters</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              What separates an IF from an FL is often less than 0.01mm. Our master craftsman has spent 47 years developing the judgment to see that difference — and the skill to act on it.
            </p>
          </div>
          <div className="aspect-video w-full bg-muted overflow-hidden relative shadow-2xl">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&mute=0&controls=1" 
              title="Diamond Crafting Process"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3D. What We Do */}
      <section className="py-24 bg-muted/30 border-t border-border px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-primary mb-16">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-border text-primary shadow-sm mb-2">
                <Diamond size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-primary">Natural Diamonds</h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs text-center">
                Ethically sourced, GIA certified natural diamonds of exceptional quality for discerning buyers.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-border text-primary shadow-sm mb-2">
                <Gem size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-primary">Lab-Grown Diamonds</h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs text-center">
                Premium lab-created stones offering exceptional value and high-precision craftsmanship.
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-border text-primary shadow-sm mb-2">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-primary">Custom & Bespoke</h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs text-center">
                Tailored advisory, highly specialised sourcing, and custom regrinding for exact client requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3E. Featured Diamonds */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-6">
            <h2 className="font-serif text-4xl text-primary text-center sm:text-left">Featured Inventory</h2>
            <Link href="/diamonds" className="text-accent hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">
              View All Stones →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
              { id: 2, shape: "Oval Cut", image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1", cut: "Excellent" },
              { id: 3, shape: "Emerald Cut", image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "IF", cut: "Excellent" },
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

      {/* 3F. Trust Pillars */}
      <section className="py-24 bg-muted/20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-primary mb-4">Why FLX Diamonds</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A foundation built on discretion, expertise, and measurable results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 border border-border text-center">
              <h4 className="font-serif text-xl text-primary mb-3">47 Years of Mastery</h4>
              <p className="text-sm text-muted-foreground">Babu Vekariya's deep expertise since 1978 drives our technical decisions.</p>
            </div>
            <div className="bg-white p-8 border border-border text-center">
              <h4 className="font-serif text-xl text-primary mb-3">GIA Certified Process</h4>
              <p className="text-sm text-muted-foreground">Rigorous, verified certification on all stones providing complete assurance.</p>
            </div>
            <div className="bg-white p-8 border border-border text-center">
              <h4 className="font-serif text-xl text-primary mb-3">B2B Partnership Model</h4>
              <p className="text-sm text-muted-foreground">Structured specifically for serious trade professionals and jewellery manufacturers.</p>
            </div>
            <div className="bg-white p-8 border border-border text-center">
              <h4 className="font-serif text-xl text-primary mb-3">Australian Based</h4>
              <p className="text-sm text-muted-foreground">Headquartered in Geelong, VIC, serving discerning buyers and partners worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3G. Heritage Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img src="/heritage-new.png" alt="Diamond craftsmanship" className="w-full h-[600px] object-cover grayscale-[20%] shadow-xl" />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">Our Heritage</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight">Mastery.<br/>Quiet Confidence.</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Built on 47 years of collective diamond expertise, FLX Diamonds represents the pinnacle of sourcing and technical regrinding.</p>
              <p>Based in Geelong, Victoria, we combine traditional knowledge with high-precision processes, serving as a trusted partner to serious industry professionals globally.</p>
              <p>We prioritise precision, trust, and excellence above all else, ensuring every stone we handle meets exceptional standards.</p>
            </div>
            <Link href="/about">
              <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white h-12 px-8 uppercase tracking-wider text-xs mt-4" data-testid="btn-heritage-about">
                Read Our Full Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3H. Closing Statement */}
      <section className="py-32 bg-[#02274A] text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
            "FLXDIAMONDS is where heritage, craftsmanship, and innovation come together — carrying forward a reputation built over decades and shaping it into the future of serious diamond sourcing."
          </h2>
          <p className="text-accent tracking-widest text-sm uppercase font-medium">The quiet partner behind serious decisions.</p>
          <div className="pt-8">
            <Link href="/contact">
              <Button className="rounded-none bg-white hover:bg-white/90 text-primary uppercase tracking-wider text-sm px-10 h-14" data-testid="btn-closing-contact">
                Begin the Conversation →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3I. Enquiry Form Section */}
      <section className="py-24 bg-muted/20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 border border-border shadow-sm">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-primary mb-4">Direct Enquiry</h2>
            <p className="text-muted-foreground text-sm">Contact our Geelong office for sourcing, IF→FL conversion, or B2B partnerships.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input className="rounded-none border-border" data-testid="enquiry-name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Company</label>
                <Input className="rounded-none border-border" data-testid="enquiry-company" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input type="email" className="rounded-none border-border" data-testid="enquiry-email" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input type="tel" className="rounded-none border-border" data-testid="enquiry-phone" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">What are you looking for?</label>
              <select className="flex h-10 w-full rounded-none border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" data-testid="enquiry-type">
                <option value="">Select an option...</option>
                <option value="if-to-fl">IF→FL Conversion</option>
                <option value="natural">Natural Diamonds</option>
                <option value="lab-grown">Lab-Grown</option>
                <option value="custom">Custom / Bespoke</option>
                <option value="investment">Investment Grade</option>
                <option value="b2b">B2B Partnership</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
              <Textarea className="rounded-none border-border min-h-[100px]" data-testid="enquiry-message" />
            </div>
            <Button type="submit" className="w-full rounded-none bg-primary hover:bg-primary/90 text-white h-14 uppercase tracking-wider text-sm" data-testid="btn-enquiry-submit">
              Submit Enquiry
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
}
