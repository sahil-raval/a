import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

/* ── Motion presets ─────────────────────────────────── */
const up = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16 } }
};

/* ── Wave particles config ──────────────────────────── */
const PARTICLES = [
  { left: "6%",  bottom: "18%", delay: "0s",   dur: "8s",  size: 3 },
  { left: "14%", bottom: "12%", delay: "1.8s", dur: "10s", size: 2 },
  { left: "28%", bottom: "20%", delay: "0.6s", dur: "7s",  size: 2 },
  { left: "42%", bottom: "10%", delay: "2.4s", dur: "9s",  size: 3 },
  { left: "58%", bottom: "16%", delay: "1.1s", dur: "6.5s",size: 2 },
  { left: "71%", bottom: "22%", delay: "3.2s", dur: "8.5s",size: 2 },
  { left: "84%", bottom: "14%", delay: "0.3s", dur: "7.5s",size: 3 },
  { left: "93%", bottom: "18%", delay: "1.7s", dur: "9.5s",size: 2 },
];

/* ── Buyer qualifier data ───────────────────────────── */
const BUYER_TYPES = [
  {
    id: "upgrade",
    num: "01",
    headline: "I hold IF diamonds I want to upgrade",
    subtext: "Your GIA certificate may reveal a path to Flawless grade — same carat weight, measurable value uplift.",
    answer: {
      title: "Yes — this is precisely what we do.",
      points: [
        "Send us your GIA certificate number. We read the comments for surface-characteristic indicators.",
        "If the stone qualifies, our master craftsman precision-regrounds in micro-millimeters.",
        "The stone is resubmitted to GIA. FL grade achieved. Same carat weight bracket documented.",
        "Most partners see measurable value uplift without changing their inventory volume."
      ],
      cta: "Discuss Your Stones",
      href: "/contact"
    }
  },
  {
    id: "supply",
    num: "02",
    headline: "I need a reliable diamond supplier",
    subtext: "Natural and lab-grown, GIA certified, trade pricing. No retail. Sourced through 47 years of trusted relationships.",
    answer: {
      title: "We supply serious trade buyers — not retail.",
      points: [
        "Natural diamonds: D–K colour, VVS1–SI2 clarity, 0.30ct to 10ct+.",
        "Lab-grown: high-precision CVD and HPHT at competitive trade pricing.",
        "Pricing on application — no public catalogue, by design.",
        "47 years of relationships with cutters in Antwerp, Mumbai, and Surat."
      ],
      cta: "Request Trade Access",
      href: "/trade"
    }
  },
  {
    id: "invest",
    num: "03",
    headline: "I want investment-grade diamonds",
    subtext: "FL and IF clarity with complete GIA documentation. The IF→FL conversion creates a documented, verifiable uplift.",
    answer: {
      title: "Diamonds are tangible, portable, stateless assets.",
      points: [
        "FL and IF in D–F colour represent the top 1% of all GIA-graded stones globally.",
        "The IF→FL conversion creates a new GIA certificate — documented uplift.",
        "We advise on stone selection, market timing, and re-sale pathways.",
        "All stones carry full GIA certification — the global standard."
      ],
      cta: "Explore Investment Stones",
      href: "/investment"
    }
  },
  {
    id: "partner",
    num: "04",
    headline: "I want a B2B partnership",
    subtext: "We operate as the quiet expert behind serious businesses — white-label sourcing, discretion guaranteed.",
    answer: {
      title: "We are the specialist behind your sourcing.",
      points: [
        "White-label sourcing: we find and verify, you present to your clients.",
        "IF→FL conversion offered on your client's existing stones.",
        "Trusted by KGK Diamond, Venus Jewellery, and Excell Overseas.",
        "All agreements under NDA by default — discretion is not negotiable."
      ],
      cta: "Discuss a Partnership",
      href: "/contact"
    }
  }
];

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function Home() {
  const [isMuted, setIsMuted]           = useState(true);
  const [soundReady, setSoundReady]     = useState(false);
  const [selected, setSelected]         = useState<string | null>(null);
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);

  /* Start ocean audio on first user gesture */
  useEffect(() => {
    let started = false;
    const tryPlay = () => {
      if (started) return;
      started = true;
      if (audioRef.current) {
        audioRef.current.volume = 0.28;
        audioRef.current.play().then(() => {
          setIsMuted(false);
          setSoundReady(true);
        }).catch(() => {
          setSoundReady(true); // show toggle even if blocked
        });
      }
      document.removeEventListener("click",  tryPlay);
      document.removeEventListener("scroll", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
    document.addEventListener("click",      tryPlay);
    document.addEventListener("scroll",     tryPlay);
    document.addEventListener("touchstart", tryPlay);
    return () => {
      document.removeEventListener("click",      tryPlay);
      document.removeEventListener("scroll",     tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(m => {
      const next = !m;
      if (audioRef.current) {
        if (!next) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return next;
    });
  }, []);

  const handleSelect = (id: string) => {
    setSelected(prev => {
      const next = prev === id ? null : id;
      if (next && answerRef.current) {
        setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 130);
      }
      return next;
    });
  };

  const selectedBuyer = BUYER_TYPES.find(b => b.id === selected);

  return (
    <div className="flex flex-col min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════════════
          1. HERO — Ocean video + wave layers
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-end overflow-hidden" style={{ background: "#010d1a" }}>

        {/* Video background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-ocean.mp4"
          poster="/great-ocean-road_1.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Deep ocean overlays — layered for depth */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(1,13,26,0.25) 0%, rgba(1,13,26,0.08) 30%, rgba(1,13,26,0.55) 70%, rgba(1,13,26,0.88) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(1,13,26,0.6) 0%, transparent 60%, rgba(1,13,26,0.3) 100%)" }}
        />

        {/* Sweeping depth shimmer */}
        <div className="depth-shimmer" />

        {/* Ocean shimmer strip */}
        <div className="absolute inset-0 ocean-shimmer" style={{ opacity: 0.7 }} />

        {/* Three animated wave layers at bottom */}
        <div className="wave-layer" style={{ animationDuration: "14s", height: "110px", opacity: 0.55 }}>
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,40 C200,80 400,15 600,45 C800,75 1000,20 1200,50 C1320,65 1380,35 1440,40 L1440,110 L0,110 Z"
              fill="rgba(28,169,201,0.22)" />
            <path d="M1440,40 C1640,80 1840,15 2040,45 C2240,75 2440,20 2640,50 C2760,65 2820,35 2880,40 L2880,110 L1440,110 Z"
              fill="rgba(28,169,201,0.22)" />
          </svg>
        </div>
        <div className="wave-layer-swell" style={{ animationDuration: "10s", height: "70px", opacity: 0.35 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,25 C300,55 600,5 900,30 C1100,48 1280,18 1440,25 L1440,70 L0,70 Z"
              fill="rgba(28,169,201,0.3)" />
            <path d="M1440,25 C1740,55 2040,5 2340,30 C2540,48 2720,18 2880,25 L2880,70 L1440,70 Z"
              fill="rgba(28,169,201,0.3)" />
          </svg>
        </div>
        <div className="wave-layer" style={{ animationDuration: "19s", animationDirection: "reverse", height: "50px", opacity: 0.2 }}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,18 C240,40 480,5 720,20 C960,35 1200,10 1440,18 L1440,50 L0,50 Z"
              fill="rgba(255,255,255,0.5)" />
            <path d="M1440,18 C1680,40 1920,5 2160,20 C2400,35 2640,10 2880,18 L2880,50 L1440,50 Z"
              fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              background: "rgba(28,169,201,0.7)",
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

        {/* Sound toggle — top right */}
        <button
          onClick={toggleMute}
          className="absolute top-24 right-8 z-20 flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-wider transition-all"
          style={{ color: isMuted ? "rgba(255,255,255,0.4)" : "#1CA9C9", border: "1px solid", borderColor: isMuted ? "rgba(255,255,255,0.12)" : "rgba(28,169,201,0.4)" }}
          data-testid="btn-toggle-sound"
          aria-label={isMuted ? "Unmute ocean" : "Mute ocean"}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          <span className="hidden sm:inline">{isMuted ? "Hear the Ocean" : "Ocean Sound On"}</span>
        </button>

        {/* Hidden audio */}
        <audio
          ref={audioRef}
          src="https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3"
          loop
          preload="auto"
        />

        {/* Hero copy — bottom-left editorial */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-20 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl space-y-7"
          >
            <motion.p
              variants={up}
              className="text-[10px] uppercase tracking-[0.45em] font-medium"
              style={{ color: "#1CA9C9" }}
            >
              Geelong, Victoria, Australia · Est. 1978
            </motion.p>

            <motion.h1
              variants={up}
              className="font-serif text-[3.6rem] md:text-[5rem] lg:text-[6.5rem] text-white leading-none font-light"
              style={{ letterSpacing: "-0.02em" }}
            >
              From IF<br />to FL.
            </motion.h1>

            <motion.div variants={up}>
              <span className="ocean-line tide-pulse" />
            </motion.div>

            <motion.p
              variants={up}
              className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              Precision regrinding converts Internally Flawless diamonds to Flawless grade —
              preserving carat weight, maximising intrinsic value. Verified by GIA.
              Available to trade partners only.
            </motion.p>

            <motion.div variants={up} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/investment">
                <Button
                  className="rounded-none h-[52px] px-10 text-xs uppercase tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
                  style={{ background: "#1CA9C9" }}
                  data-testid="hero-cta-investment"
                >
                  Understand the Opportunity
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none h-[52px] px-10 text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8 w-full sm:w-auto"
                  style={{ borderColor: "rgba(28,169,201,0.5)" }}
                  data-testid="hero-cta-contact"
                >
                  Partner With Us
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={up} className="flex items-center gap-8 pt-1">
              {["47 Years Mastery", "GIA Certified", "B2B Only"].map((t, i) => (
                <span key={i} className="text-[9px] uppercase tracking-[0.3em] text-white/30">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.2 }}
        >
          <ChevronDown size={16} className="animate-bounce" style={{ color: "rgba(28,169,201,0.55)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. SIGNAL STRIP — Trust at a glance
      ══════════════════════════════════════════════════ */}
      <section className="py-5 px-6 border-b border-white/5" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] text-white/35">
          {["47 Years of Combined Expertise", "GIA-Certified on Every Stone", "B2B Trade Partners Only", "Geelong, Victoria, Australia", "Trusted by KGK Diamond · Venus Jewellery · Excell Overseas"].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="hidden md:block w-px h-3" style={{ background: "rgba(28,169,201,0.3)" }} />}
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. IF → FL OPPORTUNITY
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          {/* Left — copy */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              The Opportunity
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none font-light">
              The world's most<br />precise upgrade.
            </motion.h2>
            <motion.div variants={up}><span className="ocean-line" /></motion.div>
            <motion.p variants={up} className="text-white/55 text-lg leading-relaxed font-light max-w-lg">
              When a GIA certificate notes specific surface characteristics on an Internally Flawless
              stone, there is often a viable path to Flawless grade — without leaving the same
              carat weight bracket.
            </motion.p>
            <motion.p variants={up} className="text-white/35 text-sm leading-relaxed max-w-lg">
              This requires reading GIA comments with precision, then executing a micro-regrind
              under 0.01mm — removing the surface characteristic without touching the body of the stone.
              It is not a shortcut. It is 47 years of judgment applied to one stone at a time.
            </motion.p>
            <motion.div variants={up} className="flex gap-4 pt-2">
              <Link href="/investment">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.18em] font-medium text-white hover:opacity-90"
                  style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                  data-testid="btn-iftfl-learn"
                >
                  How It Works
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8"
                  style={{ borderColor: "rgba(28,169,201,0.4)", height: "48px", padding: "0 2rem" }}
                  data-testid="btn-iftfl-submit"
                >
                  Submit a GIA Cert →
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — 3-step process */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="divide-y"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {[
              {
                n: "01",
                title: "Identify the stone",
                body: "We read the GIA certificate comments — roughly 15–20% of IF stones carry comment types indicating a removable surface characteristic. This assessment is provided at no cost."
              },
              {
                n: "02",
                title: "Precision regrinding",
                body: "Under high-magnification, Babu Vekariya removes the surface imperfection in micro-millimeters. Hours per stone, no automation, no margin for error. The carat weight remains within the same bracket."
              },
              {
                n: "03",
                title: "New GIA FL certificate",
                body: "The stone is resubmitted to GIA independently. A new Flawless certificate is issued. The stone is now Flawless — verifiably, globally, permanently."
              },
            ].map((step, i) => (
              <motion.div key={i} variants={up} className="py-8 flex items-start gap-8 group">
                <span
                  className="font-serif text-3xl font-light shrink-0 leading-none transition-colors"
                  style={{ color: "#1CA9C9", opacity: 0.5 }}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-white mb-2 font-light">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. QUALIFIER — "What brings you here today?"
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-14">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              Find Your Answer
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A] font-light mb-3">
              What brings you here today?
            </motion.h2>
            <motion.p variants={up} className="text-[#02274A]/40 text-base max-w-md">
              Select the situation that matches yours. We'll give you the exact answer.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_TYPES.map((bt, i) => (
              <motion.div
                key={bt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`qualifier-card p-8 border ${selected === bt.id ? "selected" : "border-[#02274A]/10"}`}
                style={{ background: selected === bt.id ? "rgba(28,169,201,0.06)" : "white" }}
                onClick={() => handleSelect(bt.id)}
                data-testid={`qualifier-${bt.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(bt.id)}
              >
                <div className="font-serif text-3xl text-[#02274A]/15 mb-5 leading-none">{bt.num}</div>
                <h3 className="font-serif text-lg text-[#02274A] mb-3 leading-snug font-light">{bt.headline}</h3>
                <p className="text-[#02274A]/45 text-xs leading-relaxed">{bt.subtext}</p>
                <div
                  className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-wider font-medium"
                  style={{ color: selected === bt.id ? "#1CA9C9" : "rgba(2,39,74,0.25)" }}
                >
                  {selected === bt.id
                    ? <><CheckCircle2 size={11} /><span>Selected</span></>
                    : <><ArrowRight size={11} /><span>See Answer</span></>
                  }
                </div>
              </motion.div>
            ))}
          </div>

          {/* Answer panel */}
          <div ref={answerRef}>
            <AnimatePresence mode="wait">
              {selectedBuyer && (
                <motion.div
                  key={selectedBuyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 p-8 md:p-12 border border-[#1CA9C9]/30"
                  style={{ background: "white" }}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>Our Answer</p>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#02274A] mb-6 font-light">
                        {selectedBuyer.answer.title}
                      </h3>
                      <ul className="space-y-3">
                        {selectedBuyer.answer.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#02274A]/55 leading-relaxed">
                            <span className="shrink-0 mt-0.5" style={{ color: "#1CA9C9" }}>—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6 md:items-end">
                      <p className="text-[#02274A]/25 text-sm italic font-serif leading-relaxed text-right hidden md:block max-w-xs">
                        "Every answer begins with understanding exactly what you need."
                      </p>
                      <Link href={selectedBuyer.answer.href}>
                        <Button
                          className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:opacity-90 font-medium"
                          style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
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

      {/* ══════════════════════════════════════════════════
          5. GREAT OCEAN ROAD — Geelong identity
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#02274A" }}>
        {/* Wide hero shot */}
        <div className="relative overflow-hidden" style={{ height: "55vh", minHeight: "340px" }}>
          <img
            src="/great-ocean-road_4.jpg"
            alt="Twelve Apostles, Great Ocean Road, Victoria"
            className="w-full h-full object-cover object-center hero-img-zoom"
            style={{ filter: "saturate(0.9) brightness(0.7)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(1,13,26,0.15) 0%, rgba(1,13,26,0.08) 35%, rgba(2,39,74,0.8) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-10 md:px-16 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: "#1CA9C9" }}>
                Geelong, Victoria, Australia
              </p>
              <h2 className="font-serif text-2xl md:text-4xl text-white font-light max-w-2xl leading-tight">
                Where the Southern Ocean shapes our perspective — and our standards.
              </h2>
            </motion.div>
          </div>
        </div>

        {/* 3-image grid */}
        <div className="grid grid-cols-3" style={{ height: "28vh", minHeight: "170px" }}>
          {[
            { src: "/great-ocean-road_3.jpg", alt: "London Arch",       label: "London Arch" },
            { src: "/great-ocean-road_1.jpg", alt: "Twelve Apostles",   label: "Twelve Apostles" },
            { src: "/great-ocean-road_6.jpg", alt: "Port Fairy",        label: "Port Fairy" },
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                style={{ filter: "saturate(0.8) brightness(0.68)" }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                style={{ background: "rgba(1,13,26,0.3)" }}
              />
              <span className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest text-white/50">
                {img.label}
              </span>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="py-10 px-6 text-center border-t border-white/5">
          <p className="text-white/30 text-sm max-w-2xl mx-auto leading-relaxed">
            The same patient forces that carved these limestone cliffs over millennia inform our approach:
            precision measured not in haste, but in decades of practice, grain by grain.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CRAFT — Mastery in micro-millimeters
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              The Craft
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A] leading-tight font-light">
              Mastery in<br />micro-millimeters.
            </motion.h2>
            <motion.div variants={up}><span className="ocean-line" /></motion.div>
            <motion.p variants={up} className="text-[#02274A]/50 text-lg leading-relaxed font-light">
              What separates IF from FL is often less than 0.01mm. Babu Vekariya has spent
              47 years developing the judgment to see that difference — and the precision
              to act on it without compromising carat weight.
            </motion.p>
            <motion.ul variants={up} className="space-y-3 pt-2">
              {[
                "Began cutting diamonds at age 12 in 1978 — Surat, India",
                "Developed the IF→FL regrinding technique across four decades",
                "Trusted by KGK Diamond, Venus Jewellery, Excell Overseas",
                "Now operating from Geelong, Victoria — serving the world"
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#02274A]/45">
                  <span className="shrink-0" style={{ color: "#1CA9C9" }}>—</span>
                  <span>{f}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={up}>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-[#02274A] hover:bg-[#02274A] hover:text-white transition-colors"
                  style={{ borderColor: "#02274A", height: "46px", padding: "0 1.75rem" }}
                  data-testid="btn-craft-about"
                >
                  Read Babu's Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Video */}
          <div className="w-full overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9", background: "#011a36" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&controls=1"
              title="Diamond Crafting — FLX Diamonds"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. THREE SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "#1CA9C9" }}>
              Our Services
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-white font-light">
              Three ways we work with you.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              {
                num: "01",
                title: "Diamond Sourcing",
                body: "Natural GIA-certified diamonds. Lab-grown precision stones. D–K colour, VVS1–SI2 clarity, any shape, any size. Trade pricing only — no retail. Minimum order requirements apply.",
                sub: "Natural · Lab-Grown · Melee",
                link: "/diamonds",
                linkText: "View Diamond Inventory"
              },
              {
                num: "02",
                title: "IF→FL Conversion",
                body: "Send any IF stone's GIA cert number. We analyse the comments, assess viability at no cost, and — if the stone qualifies — execute the precision regrind. New GIA FL certificate issued.",
                sub: "Assessment · Regrinding · New Certificate",
                link: "/investment",
                linkText: "Learn About Conversion"
              },
              {
                num: "03",
                title: "B2B Advisory",
                body: "White-label sourcing. Investment stone advisory. Custom specification briefs. Partnership structures designed for retailers, jewellers, private clients, and institutional buyers.",
                sub: "White-Label · Investment · Bespoke",
                link: "/trade",
                linkText: "Explore Partnership"
              }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="p-10 flex flex-col gap-5 group cursor-default transition-colors"
                style={{ background: "#02274A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#04385E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#02274A")}
              >
                <span className="font-serif text-4xl font-light" style={{ color: "#1CA9C9", opacity: 0.4 }}>{svc.num}</span>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-1 font-light">{svc.title}</h3>
                  <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: "rgba(28,169,201,0.5)" }}>{svc.sub}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{svc.body}</p>
                </div>
                <Link
                  href={svc.link}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium group-hover:gap-3 transition-all mt-auto"
                  style={{ color: "#1CA9C9" }}
                >
                  {svc.linkText} <ArrowRight size={11} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. FEATURED INVENTORY
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] mb-2 font-medium" style={{ color: "#1CA9C9" }}>
                By Application Only
              </p>
              <h2 className="font-serif text-4xl text-[#02274A] font-light">Featured Inventory</h2>
            </div>
            <Link href="/diamonds" className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium text-[#02274A]/35 hover:text-[#02274A] transition-colors">
              View All Stones <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
              { id: 2, shape: "Oval Cut",        image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1",  cut: "Excellent" },
              { id: 3, shape: "Emerald Cut",     image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "IF",   cut: "Excellent" },
            ].map((d) => (
              <DiamondCard
                key={d.id}
                image={d.image}
                shape={d.shape}
                carat={d.carat}
                color={d.color}
                clarity={d.clarity}
                cut={d.cut}
                onRequestPrice={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. TRUST PILLARS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-[#02274A]/8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: "47", label: "Years of Combined Expertise",    sub: "Since Babu Vekariya began at age 12 in Surat, India, 1978." },
            { n: "GIA", label: "Certified on Every Stone",       sub: "The global standard. Every stone, every time." },
            { n: "3",   label: "Trusted Diamond Houses",         sub: "KGK Diamond, Venus Jewellery, Excell Overseas." },
            { n: "B2B", label: "Trade Partners Only — by Design",sub: "No retail. No public pricing. Serious professionals only." },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 border border-[#02274A]/8"
              style={{ background: "#F4F8FC" }}
            >
              <div className="font-serif text-4xl font-light mb-2" style={{ color: "#1CA9C9" }}>{p.n}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#02274A] mb-3 font-medium">{p.label}</div>
              <p className="text-xs text-[#02274A]/40 leading-relaxed">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. HERITAGE — Babu Vekariya
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="overflow-hidden shadow-xl order-2 lg:order-1">
            <img
              src="/babu-portrait.png"
              alt="Babu Vekariya — master diamond craftsman, 47 years"
              className="w-full object-cover"
              style={{ height: "540px", filter: "grayscale(20%) contrast(1.05)" }}
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-6 order-1 lg:order-2"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              Our Heritage
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl lg:text-5xl text-[#02274A] leading-tight font-light">
              Babu Vekariya.<br />
              <span className="text-[#02274A]/35">Master Craftsman.</span>
            </motion.h2>
            <motion.div variants={up}><span className="ocean-line" /></motion.div>
            <motion.div variants={up} className="space-y-4 text-[#02274A]/50 leading-relaxed text-base">
              <p>
                Babu began cutting diamonds in 1978, aged 12, in the diamond ateliers of Surat, India.
                By his late 20s he was among a small group of craftsmen who could reliably identify
                and execute the IF→FL conversion — a technique requiring decades of practiced eye
                and flawless judgment.
              </p>
              <p>
                Over four decades, that mastery refined into the process behind FLX Diamonds.
                Now based in Geelong, Victoria, we bring that level of craft to serious buyers
                and trade partners worldwide — quietly, without fanfare.
              </p>
            </motion.div>
            <motion.div variants={up} className="flex gap-4 pt-2">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-[#02274A] hover:bg-[#02274A] hover:text-white transition-colors"
                  style={{ borderColor: "#02274A", height: "46px", padding: "0 1.75rem" }}
                  data-testid="btn-heritage-about"
                >
                  Full Story
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-90 font-medium"
                  style={{ background: "#1CA9C9", height: "46px", padding: "0 1.75rem" }}
                  data-testid="btn-heritage-contact"
                >
                  Work With Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          11. CLOSING — Ocean panorama + CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "65vh", minHeight: "420px" }}>
        <img
          src="/great-ocean-road_2.jpg"
          alt="Twelve Apostles — Great Ocean Road, Victoria"
          className="absolute inset-0 w-full h-full object-cover object-center hero-img-zoom"
          style={{ filter: "saturate(0.85) brightness(0.55)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: "rgba(1,13,26,0.5)" }} />

        {/* Wave accent */}
        <div className="wave-layer" style={{ animationDuration: "17s", height: "90px", opacity: 0.3 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,30 C360,70 720,5 1080,35 C1260,52 1360,18 1440,30 L1440,90 L0,90 Z" fill="rgba(28,169,201,0.5)" />
            <path d="M1440,30 C1800,70 2160,5 2520,35 C2700,52 2800,18 2880,30 L2880,90 L1440,90 Z" fill="rgba(28,169,201,0.5)" />
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center space-y-7 max-w-3xl"
          >
            <motion.p variants={up} className="text-[9px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>
              Precision. Trust. Excellence.
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl md:text-5xl text-white font-light leading-snug">
              "The finest diamonds are not found.<br />
              They are understood."
            </motion.h2>
            <motion.div variants={up} className="flex justify-center">
              <span className="ocean-line tide-pulse" />
            </motion.div>
            <motion.div variants={up}>
              <Link href="/contact">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.22em] font-medium text-white hover:opacity-90"
                  style={{ background: "#1CA9C9", height: "52px", padding: "0 2.5rem" }}
                  data-testid="btn-closing-contact"
                >
                  Begin the Conversation →
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          12. ENQUIRY FORM
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>Direct Access</p>
            <h2 className="font-serif text-3xl text-white mb-3 font-light">Send a Direct Enquiry</h2>
            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
              No automated responses. Every enquiry is read personally and responded to
              within 24 hours from our Geelong office.
            </p>
          </div>

          <div className="p-8 md:p-12 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(28,169,201,0.2)" }}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Full Name</label>
                  <Input
                    className="rounded-none bg-transparent text-white border-white/12 focus:border-[#1CA9C9]/60 h-11 placeholder:text-white/18"
                    data-testid="enquiry-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Company</label>
                  <Input
                    className="rounded-none bg-transparent text-white border-white/12 focus:border-[#1CA9C9]/60 h-11 placeholder:text-white/18"
                    data-testid="enquiry-company"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Email Address</label>
                  <Input
                    type="email"
                    className="rounded-none bg-transparent text-white border-white/12 focus:border-[#1CA9C9]/60 h-11 placeholder:text-white/18"
                    data-testid="enquiry-email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Phone / WhatsApp</label>
                  <Input
                    type="tel"
                    className="rounded-none bg-transparent text-white border-white/12 focus:border-[#1CA9C9]/60 h-11 placeholder:text-white/18"
                    data-testid="enquiry-phone"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Enquiry Type</label>
                <select
                  className="flex h-11 w-full border bg-transparent text-white/60 px-3 py-2 text-sm"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  data-testid="enquiry-type"
                >
                  <option value="" style={{ background: "#02274A" }}>Select an option...</option>
                  <option value="if-to-fl"   style={{ background: "#02274A" }}>IF→FL Conversion</option>
                  <option value="natural"    style={{ background: "#02274A" }}>Natural Diamond Sourcing</option>
                  <option value="lab-grown"  style={{ background: "#02274A" }}>Lab-Grown Diamonds</option>
                  <option value="investment" style={{ background: "#02274A" }}>Investment-Grade Stones</option>
                  <option value="b2b"        style={{ background: "#02274A" }}>B2B / Trade Partnership</option>
                  <option value="custom"     style={{ background: "#02274A" }}>Custom / Bespoke Brief</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-white/35">Message / Specification</label>
                <Textarea
                  className="rounded-none bg-transparent text-white border-white/12 focus:border-[#1CA9C9]/60 min-h-[110px] placeholder:text-white/18"
                  placeholder="Include GIA cert numbers, carat range, colour/clarity target, or any specific requirements."
                  data-testid="enquiry-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-none text-sm uppercase tracking-[0.18em] font-medium text-white hover:opacity-90"
                style={{ background: "#1CA9C9", height: "54px" }}
                data-testid="btn-enquiry-submit"
              >
                Submit Enquiry
              </Button>
              <p className="text-center text-[10px] text-white/20 tracking-wider">
                All enquiries treated in strict confidence. We do not share information with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
