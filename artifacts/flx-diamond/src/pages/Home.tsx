import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, Gem, Sparkles, Diamond, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const BUYER_TYPES = [
  {
    id: "upgrade",
    icon: "◇",
    headline: "I have IF diamonds I want to upgrade",
    subtext: "You hold stones graded Internally Flawless. Our GIA analysis may unlock Flawless grade — same weight, greater value.",
    answer: {
      title: "Yes — this is precisely what we do.",
      points: [
        "Send us your GIA certificate. We analyse the comments for technical upgrade potential.",
        "If viable, our master craftsman precision-regrounds the surface in micro-millimeters.",
        "The stone is resubmitted to GIA. FL grade achieved. Same carat weight bracket.",
        "Most partners see measurable value uplift without touching their inventory volume."
      ],
      cta: "Discuss Your Stones",
      href: "/contact"
    }
  },
  {
    id: "supply",
    icon: "◈",
    headline: "I need a reliable diamond supplier",
    subtext: "Ethically sourced, GIA-certified natural and lab-grown diamonds for retailers, manufacturers, and jewellers.",
    answer: {
      title: "We supply serious trade buyers — not retail.",
      points: [
        "Natural diamonds: D–K colour, VVS1–SI2 clarity, 0.30ct to 10ct+.",
        "Lab-grown: high precision CVD and HPHT stones at competitive trade pricing.",
        "Minimum orders and pricing available on application — no catalogue, by design.",
        "47 years of sourcing relationships with trusted cutters in Antwerp and Mumbai."
      ],
      cta: "Request Trade Access",
      href: "/trade"
    }
  },
  {
    id: "invest",
    icon: "◆",
    headline: "I want to invest in high-grade diamonds",
    subtext: "Investment-grade stones with verifiable documentation, long-term value, and access to the FL conversion opportunity.",
    answer: {
      title: "Diamonds are tangible, portable, stateless assets.",
      points: [
        "FL and IF clarity in D–F colour represent the top 1% of all stones graded globally.",
        "The IF→FL conversion creates a documented, verifiable upgrade with a new GIA cert.",
        "We advise on stone selection, market timing, and re-sale pathways.",
        "All stones come with full GIA certification — the global standard of trust."
      ],
      cta: "Explore Investment Stones",
      href: "/investment"
    }
  },
  {
    id: "partner",
    icon: "⬡",
    headline: "I want a B2B partnership",
    subtext: "Jewellery businesses, diamond traders, and managing directors — let us be the quiet expert behind your sourcing.",
    answer: {
      title: "We operate as your behind-the-scenes specialist.",
      points: [
        "White-label sourcing: we find and verify, you present to your clients.",
        "IF→FL conversion offered on your client's existing stones.",
        "Trusted by KGK Diamond, Venus Jewellery, and Excell Overseas.",
        "Discretion guaranteed. All agreements under NDA by default."
      ],
      cta: "Discuss a Partnership",
      href: "/contact"
    }
  }
];

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id);
    setTimeout(() => {
      if (answerRef.current && id !== selected) {
        answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const selectedBuyer = BUYER_TYPES.find(b => b.id === selected);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─────────────────────────────────────────────── */}
      {/* 1. HERO — CSS Animated Ocean Waves              */}
      {/* ─────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, #011a36 0%, #02274A 45%, #04385E 75%, #073d5e 100%)" }}
      >
        {/* Deep water shimmer overlay */}
        <div
          className="absolute inset-0 ocean-shimmer pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Radial light from above (surface light) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(28,169,201,0.18) 0%, transparent 70%)"
          }}
        />

        {/* Wave layer 1 — deep, slow */}
        <div
          className="wave-layer"
          style={{ animationDuration: "14s", bottom: "0", height: "220px", opacity: 0.55 }}
        >
          <svg viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path
              d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,220 L0,220 Z"
              fill="rgba(2,39,74,0.85)"
            />
            <path
              d="M1440,80 C1680,140 1920,20 2160,80 C2400,140 2640,20 2880,80 L2880,220 L1440,220 Z"
              fill="rgba(2,39,74,0.85)"
            />
          </svg>
        </div>

        {/* Wave layer 2 — mid, teal tint */}
        <div
          className="wave-layer"
          style={{ animationDuration: "10s", animationDirection: "reverse", bottom: "0", height: "160px", opacity: 0.45 }}
        >
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path
              d="M0,60 C320,120 640,0 960,60 C1280,120 1440,40 1440,60 L1440,160 L0,160 Z"
              fill="rgba(28,169,201,0.12)"
            />
            <path
              d="M1440,60 C1760,120 2080,0 2400,60 C2720,120 2880,40 2880,60 L2880,160 L1440,160 Z"
              fill="rgba(28,169,201,0.12)"
            />
          </svg>
        </div>

        {/* Wave layer 3 — surface, fast, bright teal */}
        <div
          className="wave-layer"
          style={{ animationDuration: "7s", bottom: "0", height: "100px", opacity: 0.6 }}
        >
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path
              d="M0,30 C180,70 360,0 540,35 C720,70 900,10 1080,40 C1260,70 1350,20 1440,30 L1440,100 L0,100 Z"
              fill="rgba(28,169,201,0.18)"
            />
            <path
              d="M1440,30 C1620,70 1800,0 1980,35 C2160,70 2340,10 2520,40 C2700,70 2790,20 2880,30 L2880,100 L1440,100 Z"
              fill="rgba(28,169,201,0.18)"
            />
          </svg>
        </div>

        {/* Floating particles — light on water */}
        {[
          { left: "12%", animationDelay: "0s",   animationDuration: "5s",  width: 3, height: 3 },
          { left: "28%", animationDelay: "1.5s", animationDuration: "7s",  width: 2, height: 2 },
          { left: "45%", animationDelay: "0.8s", animationDuration: "6s",  width: 4, height: 4 },
          { left: "62%", animationDelay: "2.2s", animationDuration: "5.5s",width: 2, height: 2 },
          { left: "78%", animationDelay: "0.3s", animationDuration: "8s",  width: 3, height: 3 },
          { left: "88%", animationDelay: "1.9s", animationDuration: "6.5s",width: 2, height: 2 },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              bottom: "15%",
              width: p.width,
              height: p.height,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}

        {/* Horizontal line accent — horizon */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "22%",
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(28,169,201,0.3) 30%, rgba(28,169,201,0.5) 50%, rgba(28,169,201,0.3) 70%, transparent 100%)"
          }}
        />

        {/* Audio */}
        <audio ref={audioRef} src="https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3" loop />

        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-20 text-white/60 hover:text-[#1CA9C9] transition-colors p-3 bg-black/20 backdrop-blur-sm rounded-full"
          data-testid="btn-toggle-sound"
          aria-label={isMuted ? "Unmute ocean ambience" : "Mute ocean ambience"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Location pill */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#1CA9C9]/80 font-medium">
            Geelong, Victoria, Australia
          </span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[#1CA9C9] uppercase tracking-[0.3em] text-xs md:text-sm font-medium"
            >
              The World's Most Precise Upgrade
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-wide"
              style={{ textShadow: "0 2px 40px rgba(28,169,201,0.25)" }}
            >
              FROM IF TO FL.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/80 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
              Precision regrinding converts Internally Flawless diamonds to Flawless grade —
              preserving carat weight, maximising intrinsic value. Verified by GIA. Available to trade partners only.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link href="/investment">
                <Button
                  className="rounded-none bg-white text-[#02274A] hover:bg-white/90 h-14 px-10 tracking-[0.12em] text-sm uppercase font-medium w-full sm:w-auto"
                  data-testid="hero-cta-investment"
                >
                  Understand the Opportunity
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none border-white/50 text-white hover:bg-white/10 hover:border-white h-14 px-10 tracking-[0.12em] text-sm uppercase w-full sm:w-auto"
                  data-testid="hero-cta-contact"
                >
                  Partner With Us
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="pt-4 flex items-center justify-center gap-2 text-white/40 text-xs tracking-widest uppercase"
            >
              <span>47 Years Combined Expertise</span>
              <span className="text-[#1CA9C9]">·</span>
              <span>GIA Certified</span>
              <span className="text-[#1CA9C9]">·</span>
              <span>B2B Only</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <ChevronDown size={20} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 2. QUALIFIER — "What brings you here today?"   */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-[#1CA9C9] uppercase tracking-[0.25em] text-xs font-medium mb-4">
              Find Your Answer
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-white mb-4">
              What brings you here today?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 text-base max-w-xl mx-auto">
              Select what matches your situation. We'll give you the exact answer you need.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_TYPES.map((bt, i) => (
              <motion.div
                key={bt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`qualifier-card p-6 text-left ${selected === bt.id ? "selected" : ""}`}
                onClick={() => handleSelect(bt.id)}
                data-testid={`qualifier-${bt.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(bt.id)}
              >
                <div className="text-3xl text-[#1CA9C9] mb-4 leading-none">{bt.icon}</div>
                <h3 className="font-serif text-lg text-white mb-3 leading-tight">{bt.headline}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{bt.subtext}</p>
                <div className={`mt-5 flex items-center gap-2 text-xs uppercase tracking-wider transition-colors ${selected === bt.id ? "text-[#1CA9C9]" : "text-white/30"}`}>
                  {selected === bt.id ? (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Selected</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight size={13} />
                      <span>See Answer</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Answer Panel */}
          <div ref={answerRef}>
            <AnimatePresence mode="wait">
              {selectedBuyer && (
                <motion.div
                  key={selectedBuyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 p-8 md:p-10 border border-[#1CA9C9]/30"
                  style={{ background: "rgba(28,169,201,0.06)" }}
                >
                  <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div>
                      <span className="text-[#1CA9C9] text-xs uppercase tracking-[0.2em] font-medium mb-4 block">Our Answer</span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white mb-6">{selectedBuyer.answer.title}</h3>
                      <ul className="space-y-3">
                        {selectedBuyer.answer.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                            <span className="text-[#1CA9C9] mt-0.5 shrink-0">—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between h-full gap-8 md:items-end">
                      <div className="text-white/30 text-sm italic font-serif text-right max-w-xs hidden md:block">
                        "Every answer we give begins with understanding exactly what you need."
                      </div>
                      <Link href={selectedBuyer.answer.href}>
                        <Button
                          className="rounded-none bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 text-white uppercase tracking-wider text-xs px-8 h-12"
                          data-testid={`qualifier-cta-${selectedBuyer.id}`}
                        >
                          {selectedBuyer.answer.cta} →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 3. IF→FL Opportunity                           */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#1CA9C9] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              The Opportunity
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-[#02274A] mb-6">
              Most buyers never know this exists.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
              When a GIA certificate notes specific surface-reaching characteristics on an IF stone,
              there is often a viable path to Flawless grade through precision micro-regrinding —
              without leaving the same carat weight bracket. This is rare, technical, and requires
              47 years of judgment to execute correctly.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                n: "01",
                title: "IDENTIFY THE STONE",
                body: "We read the GIA certificate comments to determine whether the surface characteristic is removable without loss of carat weight bracket.",
                detail: "Not all IF stones qualify — roughly 15–20% carry the right comment type."
              },
              {
                n: "02",
                title: "PRECISION REGRIND",
                body: "Our master craftsman — 47 years in the craft — removes the surface imperfection in micro-millimeters under high-magnification control.",
                detail: "The process takes hours per stone. There are no shortcuts at this level."
              },
              {
                n: "03",
                title: "GIA FL CERTIFICATION",
                body: "The stone is resubmitted to GIA. A new certificate is issued. FL grade is achieved. The same carat weight bracket is documented.",
                detail: "Documented value uplift. A new GIA report. A more valuable stone."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative p-8 border border-border group hover:border-[#1CA9C9]/40 transition-colors"
              >
                <span className="font-serif text-6xl text-[#02274A]/8 absolute top-6 right-6 leading-none select-none">
                  {step.n}
                </span>
                <div className="w-10 h-10 flex items-center justify-center bg-[#02274A] text-white font-serif text-sm mb-6">
                  {step.n}
                </div>
                <h3 className="font-serif text-xl text-[#02274A] mb-3 tracking-wide">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.body}</p>
                <p className="text-[#1CA9C9] text-xs italic">{step.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#02274A] p-10 max-w-4xl mx-auto text-center">
            <p className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2">B2B Partners Only</p>
            <p className="font-serif text-white text-xl md:text-2xl mb-6 leading-relaxed">
              Do you hold IF stones with upgrade potential?
              Send us the GIA certificate number — our analysis is complimentary.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-none bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 text-white uppercase tracking-[0.15em] text-xs px-10 h-12"
                data-testid="btn-if-to-fl-contact"
              >
                Submit for Free Analysis →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 4. Credibility Strip                           */}
      {/* ─────────────────────────────────────────────── */}
      <section className="border-y border-border py-7 bg-[#02274A]/3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-xs font-medium tracking-[0.18em] text-[#02274A] uppercase text-center">
            <span>47 Years of Mastery</span>
            <span className="text-[#1CA9C9]">·</span>
            <span>GIA Certified</span>
            <span className="text-[#1CA9C9]">·</span>
            <span>B2B Specialists</span>
            <span className="text-[#1CA9C9]">·</span>
            <span>Geelong, Victoria, Australia</span>
            <span className="text-[#1CA9C9]">·</span>
            <span>Trusted by KGK · Venus · Excell</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 5. The Craft — Video Section                   */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6 order-2 lg:order-1"
          >
            <motion.span variants={fadeInUp} className="text-[#1CA9C9] text-sm font-bold tracking-[0.2em] uppercase block">
              The Craft Behind the Grade
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl text-[#02274A] leading-tight">
              Mastery in Micro-Millimeters
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
              What separates IF from FL is often less than 0.01mm. Our master craftsman
              Babu Vekariya has spent 47 years developing the judgment to see that difference —
              and the skill to act on it without compromising weight.
            </motion.p>
            <motion.div variants={fadeInUp} className="space-y-3 pt-2">
              {["Started at age 12 in 1978 — diamond cutting was everything", "Trained under master cutters, moved to polishing mastery by his 20s", "Today, trusted by three of Asia's largest diamond houses"].map((fact, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-[#1CA9C9] mt-0.5 shrink-0">—</span>
                  <span>{fact}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href="/about">
                <Button variant="outline" className="rounded-none border-[#02274A] text-[#02274A] hover:bg-[#02274A] hover:text-white h-11 px-8 uppercase tracking-wider text-xs" data-testid="btn-craft-about">
                  Read Babu's Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="aspect-video w-full bg-muted overflow-hidden relative shadow-2xl order-1 lg:order-2">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&mute=0&controls=1"
              title="Diamond Crafting Process"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 6. What We Do                                  */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "#011a36" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#1CA9C9] text-xs uppercase tracking-[0.25em] mb-4">Our Services</motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl text-white mb-4">Three Ways We Work With You</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 max-w-2xl mx-auto text-base">Sourcing, conversion, and advisory — always at the institutional level.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                icon: <Diamond size={28} strokeWidth={1.2} />,
                title: "Diamond Sourcing",
                body: "Natural GIA-certified diamonds. Lab-grown precision stones. D–K colour, VVS1–SI2 clarity, any shape. Trade pricing, no retail. Minimum order requirements apply.",
                link: "/diamonds",
                linkText: "View Diamond Inventory"
              },
              {
                icon: <Gem size={28} strokeWidth={1.2} />,
                title: "IF→FL Conversion",
                body: "Send us any IF stone's GIA cert number. We analyse the comments, assess upgrade viability, and — if suitable — execute the precision regrind. New GIA FL certificate issued.",
                link: "/investment",
                linkText: "Learn About Conversion"
              },
              {
                icon: <Sparkles size={28} strokeWidth={1.2} />,
                title: "B2B Advisory",
                body: "White-label sourcing. Custom specification briefs. Investment stone advisory. Partnership structures available for retailers, jewellers, and institutional buyers.",
                link: "/trade",
                linkText: "Explore Partnership"
              }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-[#02274A] p-10 flex flex-col gap-6 group hover:bg-[#04385E] transition-colors"
              >
                <div className="text-[#1CA9C9]">{svc.icon}</div>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-3">{svc.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{svc.body}</p>
                </div>
                <Link href={svc.link} className="text-[#1CA9C9] text-xs uppercase tracking-wider flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  {svc.linkText} <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 7. Featured Inventory                          */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-[#1CA9C9] text-xs uppercase tracking-[0.2em] mb-2">By Application Only</p>
              <h2 className="font-serif text-4xl text-[#02274A]">Featured Inventory</h2>
            </div>
            <Link href="/diamonds" className="text-[#1CA9C9] hover:text-[#02274A] transition-colors text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              View All Stones <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
              { id: 2, shape: "Oval Cut",        image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1",  cut: "Excellent" },
              { id: 3, shape: "Emerald Cut",     image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "IF",  cut: "Excellent" },
            ].map((diamond) => (
              <DiamondCard
                key={diamond.id}
                image={diamond.image}
                shape={diamond.shape}
                carat={diamond.carat}
                color={diamond.color}
                clarity={diamond.clarity}
                cut={diamond.cut}
                onRequestPrice={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 8. Trust Pillars                               */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#02274A]/5 border-t border-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: "47", label: "Years of Combined Expertise", sub: "Since Babu Vekariya began at age 12 in 1978." },
              { n: "GIA", label: "Certified on Every Stone", sub: "The global standard. Every stone, every time." },
              { n: "3", label: "Trusted Diamond Houses", sub: "KGK Diamond, Venus Jewellery, Excell Overseas." },
              { n: "B2B", label: "Partners Only — By Design", sub: "We don't sell retail. Serious professionals only." },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 border border-border"
              >
                <div className="font-serif text-4xl text-[#02274A] mb-2">{pillar.n}</div>
                <h4 className="text-sm font-medium text-[#02274A] uppercase tracking-wide mb-3">{pillar.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 9. Heritage                                    */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/babu-portrait.png"
              alt="Babu Vekariya — master diamond craftsman"
              className="w-full h-[560px] object-cover grayscale shadow-2xl"
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.span variants={fadeInUp} className="text-[#1CA9C9] text-sm font-bold tracking-[0.2em] uppercase block">Our Heritage</motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl lg:text-5xl text-[#02274A] leading-tight">
              Babu Vekariya.<br />
              <span className="text-[#02274A]/60">Master Craftsman.</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                Babu began cutting diamonds in 1978, aged 12. By his late 20s he was among a small group of craftsmen
                who could reliably identify and execute the IF→FL conversion — a technique that requires seeing the
                difference between Internally Flawless and Flawless with a practiced eye and flawless judgment.
              </p>
              <p>
                Over 47 years, that mastery has been refined into the process behind FLX Diamonds.
                Based in Geelong, Victoria, we bring that level of craft to serious buyers and partners worldwide.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-4 pt-2">
              <Link href="/about">
                <Button variant="outline" className="rounded-none border-[#02274A] text-[#02274A] hover:bg-[#02274A] hover:text-white h-12 px-8 uppercase tracking-wider text-xs" data-testid="btn-heritage-about">
                  Full Story
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="rounded-none bg-[#02274A] hover:bg-[#02274A]/90 text-white h-12 px-8 uppercase tracking-wider text-xs" data-testid="btn-heritage-contact">
                  Work With Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 10. Ocean Quote / Closing Statement            */}
      {/* ─────────────────────────────────────────────── */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #011a36 0%, #02274A 60%, #073d5e 100%)" }}
      >
        {/* Subtle wave at bottom */}
        <div className="wave-layer" style={{ animationDuration: "16s", height: "80px", opacity: 0.3 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,30 C360,70 720,0 1080,35 C1260,55 1350,15 1440,30 L1440,80 L0,80 Z" fill="rgba(28,169,201,0.2)" />
            <path d="M1440,30 C1800,70 2160,0 2520,35 C2700,55 2790,15 2880,30 L2880,80 L1440,80 Z" fill="rgba(28,169,201,0.2)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#1CA9C9] uppercase tracking-[0.3em] text-xs"
          >
            The Quiet Partner Behind Serious Decisions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl text-white leading-snug"
          >
            "Heritage, craftsmanship, and the knowledge to see what others cannot — this is where serious diamond sourcing begins."
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-4"
          >
            <Link href="/contact">
              <Button className="rounded-none bg-white hover:bg-white/90 text-[#02274A] uppercase tracking-[0.15em] text-sm px-10 h-14" data-testid="btn-closing-contact">
                Begin the Conversation →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* 11. Inline Enquiry Form                        */}
      {/* ─────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#1CA9C9] text-xs uppercase tracking-[0.2em] mb-3">Direct Access</p>
            <h2 className="font-serif text-3xl text-[#02274A] mb-3">Send a Direct Enquiry</h2>
            <p className="text-muted-foreground text-sm">
              No automated responses. Every enquiry is read personally by our Geelong office and responded to within 24 hours.
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 border border-border shadow-sm">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <Input className="rounded-none border-border h-11" data-testid="enquiry-name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Company Name</label>
                  <Input className="rounded-none border-border h-11" data-testid="enquiry-company" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input type="email" className="rounded-none border-border h-11" data-testid="enquiry-email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</label>
                  <Input type="tel" className="rounded-none border-border h-11" data-testid="enquiry-phone" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">What are you looking for?</label>
                <select
                  className="flex h-11 w-full rounded-none border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-testid="enquiry-type"
                >
                  <option value="">Select an option...</option>
                  <option value="if-to-fl">IF→FL Conversion (GIA cert upgrade)</option>
                  <option value="natural">Natural Diamond Sourcing</option>
                  <option value="lab-grown">Lab-Grown Diamonds</option>
                  <option value="investment">Investment-Grade Stones</option>
                  <option value="b2b">B2B / Trade Partnership</option>
                  <option value="custom">Custom / Bespoke Brief</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Message / Specification</label>
                <Textarea
                  className="rounded-none border-border min-h-[110px]"
                  placeholder="Include GIA cert numbers, carat range, colour/clarity target, or any specific requirements."
                  data-testid="enquiry-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-none bg-[#02274A] hover:bg-[#02274A]/90 text-white h-14 uppercase tracking-[0.15em] text-sm"
                data-testid="btn-enquiry-submit"
              >
                Submit Enquiry
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                All enquiries are treated in strict confidence. We do not share information with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
