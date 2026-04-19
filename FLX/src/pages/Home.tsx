import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

/* ── FAQ section ────────────────────────────────────── */
const FAQS = [
  {
    q: "Do you work with lab-grown diamonds?",
    a: "Yes. We supply both natural and lab-grown diamonds (CVD and HPHT) at competitive trade pricing. Lab-grown stones go through the same GIA grading process and are presented with full certification."
  },
  {
    q: "Is the IF→FL conversion process confidential?",
    a: "Absolutely. Every engagement is treated as commercially confidential by default. We do not disclose client details, stone specifications, or transaction structures to any third party. NDAs are available on request."
  },
  {
    q: "What carat sizes can you work with?",
    a: "We work primarily with stones from 0.50ct upward for IF→FL conversion. For diamond sourcing, we supply from 0.30ct melee through 10ct+ exceptional stones. Custom briefs welcome."
  },
  {
    q: "How long does the IF→FL conversion take?",
    a: "The free assessment typically takes 2–3 business days after receipt of the GIA certificate number. If the stone qualifies, the regrinding process itself takes 1–3 weeks depending on the stone's characteristics. A new GIA certificate is then issued, which takes an additional 2–4 weeks."
  },
  {
    q: "Do you work with retailers and jewellers directly?",
    a: "Yes, we operate as the quiet specialist behind serious businesses. We offer white-label sourcing and IF→FL conversion for retailers and jewellers who present our work under their own brand. Discretion is guaranteed."
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-6" style={{ background: "#F4F8FC" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="mb-12"
        >
          <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
            Before You Reach Out
          </motion.p>
          <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A]">
            Common questions.
          </motion.h2>
        </motion.div>

        <div className="divide-y" style={{ borderColor: "rgba(2,39,74,0.08)", borderTop: "1px solid rgba(2,39,74,0.08)" }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <button
                className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`faq-${i}`}
              >
                <span className="font-serif text-lg text-[#02274A] leading-snug group-hover:text-[#1CA9C9] transition-colors">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 mt-1 text-[#1CA9C9] transition-transform"
                  style={{ transform: open === i ? "rotate(45deg)" : "none" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden text-sm leading-relaxed pb-6"
                    style={{ color: "rgba(2,39,74,0.5)" }}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Link href="/contact" className="block w-full sm:inline-block sm:w-auto">
            <Button
              className="rounded-none text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
              style={{ background: "#02274A", height: "48px", padding: "0 2rem" }}
              data-testid="faq-cta"
            >
              Still have questions? Get in touch →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Motion presets ─────────────────────────────────── */
const up = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
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
    subtext: "Your GIA certificate may reveal a path to Flawless grade, same carat weight, measurable value uplift.",
    answer: {
      title: "Yes, this is precisely what we do.",
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
      title: "We supply serious trade buyers, not retail.",
      points: [
        "Natural diamonds: D–K colour, VVS1–SI2 clarity, 0.30ct to 10ct+.",
        "Lab-grown: high-precision CVD and HPHT at competitive trade pricing.",
        "Pricing on application. No public catalogue, by design.",
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
        "The IF→FL conversion creates a new GIA certificate with documented uplift.",
        "We advise on stone selection, market timing, and re-sale pathways.",
        "All stones carry full GIA certification, the global standard."
      ],
      cta: "Explore Investment Stones",
      href: "/investment"
    }
  },
  {
    id: "partner",
    num: "04",
    headline: "I want a B2B partnership",
    subtext: "We operate as the quiet expert behind serious businesses, offering white-label sourcing with guaranteed discretion.",
    answer: {
      title: "We are the specialist behind your sourcing.",
      points: [
        "White-label sourcing: we find and verify, you present to your clients.",
        "IF→FL conversion offered on your client's existing stones.",
        "Trusted by KGK Diamond, Venus Jewellery, and Excell Overseas.",
        "All agreements under NDA by default. Discretion is not negotiable."
      ],
      cta: "Discuss a Partnership",
      href: "/contact"
    }
  }
];

/* ── Web Audio API ocean sound generator ────────────────
   Creates realistic layered ocean waves with no file dependency.
   Three noise layers: deep rumble + mid whoosh + foam spray.
   Each layer has its own LFO for a natural wave rhythm.
──────────────────────────────────────────────────────── */
function buildOceanSound(ctx: AudioContext): () => void {
  const SR = ctx.sampleRate;

  const makeNoise = (seconds = 4) => {
    const len = seconds * SR;
    const buf = ctx.createBuffer(1, len, SR);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop   = true;
    return src;
  };

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.35;
  masterGain.connect(ctx.destination);

  // ── Layer 1: deep ocean rumble (lowpass ~350Hz) ──
  const n1   = makeNoise(6);
  const lp1  = ctx.createBiquadFilter();
  lp1.type            = "lowpass";
  lp1.frequency.value = 350;
  lp1.Q.value         = 0.6;
  const g1 = ctx.createGain();
  g1.gain.value = 0.7;
  n1.connect(lp1); lp1.connect(g1); g1.connect(masterGain);

  // LFO-1: slow wave swell ~0.07 Hz
  const lfo1 = ctx.createOscillator();
  lfo1.type            = "sine";
  lfo1.frequency.value = 0.07;
  const lfoG1 = ctx.createGain();
  lfoG1.gain.value = 0.22;
  lfo1.connect(lfoG1); lfoG1.connect(g1.gain);

  // ── Layer 2: mid-range whoosh (bandpass ~700Hz) ──
  const n2  = makeNoise(5);
  const bp  = ctx.createBiquadFilter();
  bp.type            = "bandpass";
  bp.frequency.value = 700;
  bp.Q.value         = 0.9;
  const g2 = ctx.createGain();
  g2.gain.value = 0.18;
  n2.connect(bp); bp.connect(g2); g2.connect(masterGain);

  // LFO-2: slightly faster, offset phase ~0.11 Hz
  const lfo2 = ctx.createOscillator();
  lfo2.type            = "sine";
  lfo2.frequency.value = 0.11;
  const lfoG2 = ctx.createGain();
  lfoG2.gain.value = 0.12;
  lfo2.connect(lfoG2); lfoG2.connect(g2.gain);

  // ── Layer 3: foam / spray texture (highpass ~2200Hz) ──
  const n3  = makeNoise(3);
  const hp  = ctx.createBiquadFilter();
  hp.type            = "highpass";
  hp.frequency.value = 2200;
  hp.Q.value         = 0.4;
  const g3 = ctx.createGain();
  g3.gain.value = 0.045;
  n3.connect(hp); hp.connect(g3); g3.connect(masterGain);

  // LFO-3: fastest, foam bursts ~0.17 Hz
  const lfo3 = ctx.createOscillator();
  lfo3.type            = "sine";
  lfo3.frequency.value = 0.17;
  const lfoG3 = ctx.createGain();
  lfoG3.gain.value = 0.04;
  lfo3.connect(lfoG3); lfoG3.connect(g3.gain);

  // Start everything
  [n1, n2, n3, lfo1, lfo2, lfo3].forEach(n => n.start());

  // Fade in over 3 seconds
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 3);

  return () => {
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => [n1, n2, n3, lfo1, lfo2, lfo3].forEach(n => { try { n.stop(); } catch {} }), 1600);
  };
}

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function Home() {
  const [isMuted, setIsMuted]   = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const ctxRef    = useRef<AudioContext | null>(null);
  const stopRef   = useRef<(() => void) | null>(null);

  /* Start ocean sound on first user gesture */
  useEffect(() => {
    let started = false;
    const tryStart = () => {
      if (started) return;
      started = true;
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        ctxRef.current = ctx;
        stopRef.current = buildOceanSound(ctx);
        setIsMuted(false);
      } catch (e) {
        console.warn("Web Audio not available", e);
      }
      document.removeEventListener("click",      tryStart);
      document.removeEventListener("scroll",     tryStart);
      document.removeEventListener("touchstart", tryStart);
    };
    document.addEventListener("click",      tryStart);
    document.addEventListener("scroll",     tryStart);
    document.addEventListener("touchstart", tryStart);
    return () => {
      document.removeEventListener("click",      tryStart);
      document.removeEventListener("scroll",     tryStart);
      document.removeEventListener("touchstart", tryStart);
    };
  }, []);

  const toggleMute = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "running") {
      ctx.suspend();
      setIsMuted(true);
    } else {
      ctx.resume();
      setIsMuted(false);
    }
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

        {/* Video background — 4K UHD (3840×2160) */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-ocean-4k.mp4" type="video/mp4" />
          <source src="/hero-ocean.mp4" type="video/mp4" />
        </video>

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

        {/* Hero copy — bottom-left editorial */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-24 pb-12 sm:pb-20 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl space-y-4 sm:space-y-7"
          >
            <motion.p
              variants={up}
              className="text-[10px] uppercase tracking-[0.45em] font-medium"
              style={{ color: "#1CA9C9" }}
            >
              Geelong, Victoria, Australia, Est. 1978
            </motion.p>

            <motion.h1
              variants={up}
              className="font-serif text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] lg:text-[6.5rem] text-white leading-none"
              style={{ letterSpacing: "-0.02em" }}
            >
              From IF<br />to FL.
            </motion.h1>

            <motion.div variants={up}>
              <span className="ocean-line tide-pulse" />
            </motion.div>

            <motion.p
              variants={up}
              className="text-white/65 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              Your trusted B2B diamond partner for natural, lab-grown, and custom stones,
              sourced with precision. The only house performing IF→FL conversion at trade scale.
            </motion.p>

            <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Link href="/diamonds">
                <Button
                  className="rounded-none h-[52px] px-10 text-xs uppercase tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
                  style={{ background: "#1CA9C9" }}
                  data-testid="hero-cta-source"
                >
                  I Need to Source Diamonds
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none h-[52px] px-10 text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8 w-full sm:w-auto"
                  style={{ borderColor: "rgba(28,169,201,0.5)" }}
                  data-testid="hero-cta-if-stone"
                >
                  I Have an IF Stone
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={up}
              className="pt-2 text-[9px] uppercase tracking-[0.28em] text-white/25 leading-relaxed"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px" }}
            >
              45+ years of expertise · Natural &amp; lab-grown · Served KGK Diamond, Venus Jewellery
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
          2b. CLIENT LOGO STRIP — Instant social proof
      ══════════════════════════════════════════════════ */}
      <section className="py-10 px-6" style={{ background: "#F4F8FC", borderBottom: "1px solid rgba(2,39,74,0.07)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[8px] uppercase tracking-[0.55em] mb-8" style={{ color: "rgba(2,39,74,0.3)" }}>
            Trusted by leading diamond houses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
            {[
              { name: "KGK Diamond",       sub: "Jaipur · Dubai · Hong Kong" },
              { name: "Venus Jewellery",   sub: "Mumbai · Antwerp"           },
              { name: "Excell Overseas",   sub: "Surat · Singapore"          },
            ].map((co, i) => (
              <motion.div
                key={co.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center gap-1"
              >
                <span
                  className="font-serif text-xl md:text-2xl"
                  style={{ color: "#02274A", letterSpacing: "-0.01em" }}
                >
                  {co.name}
                </span>
                <span className="text-[8px] uppercase tracking-[0.35em]" style={{ color: "rgba(2,39,74,0.3)" }}>
                  {co.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2c. FL DIAMOND SHOWCASE — Visual proof
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#02274A" }}>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(28,169,201,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,169,201,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">

          {/* Label */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="space-y-4">
              <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
                FL Certified Craftsmanship
              </motion.p>
              <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-none">
                Flawless.<br />In every sense.
              </motion.h2>
            </div>
            <motion.p variants={up} className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Every stone we convert reaches the highest clarity grade recognised by the GIA —
              the only grade with zero inclusions and zero blemishes.
            </motion.p>
          </motion.div>

          {/* Image grid — editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

            {/* Main hero image — left, tall */}
            <motion.div
              className="md:col-span-7 relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="relative aspect-[4/3] md:aspect-[4/3] overflow-hidden">
                <img
                  src="/fl-diamond-tweezers.png"
                  alt="FL-grade diamond held in precision tweezers"
                  className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(1,13,26,0.85) 100%)" }} />
                {/* Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5" style={{ background: "rgba(1,13,26,0.7)", border: "1px solid rgba(28,169,201,0.35)", backdropFilter: "blur(8px)" }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1CA9C9" }} />
                  <span className="text-[9px] uppercase tracking-[0.35em] font-medium" style={{ color: "#1CA9C9" }}>GIA FL Grade</span>
                </div>
                {/* Bottom label */}
                <div className="absolute bottom-5 left-5">
                  <p className="text-white text-xs uppercase tracking-[0.3em]">Precision Regrind</p>
                  <p className="text-white/40 text-[10px] tracking-wider mt-0.5">Micro-millimetre surface correction</p>
                </div>
              </div>
            </motion.div>

            {/* Right column — two stacked images */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">

              <motion.div
                className="relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                <div className="relative aspect-square md:aspect-[5/4] overflow-hidden">
                  <img
                    src="/fl-diamond-overhead.png"
                    alt="Overhead view of a flawless round brilliant diamond showing perfect facet pattern"
                    className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(1,13,26,0.75) 100%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-[11px] uppercase tracking-[0.3em]">Facet Perfection</p>
                    <p className="text-white/40 text-[9px] tracking-wider mt-0.5">Zero inclusions · Zero blemishes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                <div className="relative aspect-square md:aspect-[5/4] overflow-hidden">
                  <img
                    src="/fl-diamond-certificate.png"
                    alt="FL diamond alongside GIA grading certificate"
                    className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(1,13,26,0.75) 100%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-[11px] uppercase tracking-[0.3em]">GIA Certified</p>
                    <p className="text-white/40 text-[9px] tracking-wider mt-0.5">Documented · Verifiable · Transferable</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Stat strip below images */}
          <motion.div
            className="mt-8 md:mt-10 grid grid-cols-3 gap-px overflow-hidden"
            style={{ border: "1px solid rgba(28,169,201,0.12)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { stat: "FL", label: "Highest GIA Clarity Grade" },
              { stat: "D–F", label: "Colour Range Available" },
              { stat: "0.01mm", label: "Regrind Precision Tolerance" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center py-6 px-4 gap-1"
                style={{ background: "rgba(28,169,201,0.04)", borderRight: i < 2 ? "1px solid rgba(28,169,201,0.12)" : undefined }}
              >
                <span className="text-2xl md:text-3xl text-white font-light tabular-nums">{item.stat}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. IF → FL OPPORTUNITY
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          {/* Left — copy */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              IF→FL Conversion
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none">
              Unlock hidden value<br />in your IF stone.
            </motion.h2>
            <motion.div variants={up}><span className="ocean-line" /></motion.div>
            <motion.p variants={up} className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-lg">
              When a GIA certificate notes specific surface characteristics on an Internally Flawless
              stone, there is often a viable path to Flawless grade, without leaving the same
              carat weight bracket.
            </motion.p>
            <motion.p variants={up} className="text-white/35 text-sm leading-relaxed max-w-lg">
              This requires reading GIA comments with precision, then executing a micro-regrind
              under 0.01mm, removing the surface characteristic without touching the body of the stone.
              It is not a shortcut. It is 47 years of judgment applied to one stone at a time.
            </motion.p>
            <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link href="/investment" className="block">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.18em] font-medium text-white hover:opacity-90 w-full sm:w-auto"
                  style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                  data-testid="btn-iftfl-learn"
                >
                  How It Works
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button
                  variant="outline"
                  className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8 w-full sm:w-auto"
                  style={{ borderColor: "rgba(28,169,201,0.4)", height: "48px", padding: "0 2rem" }}
                  data-testid="btn-iftfl-submit"
                >
                  Submit a GIA Cert →
                </Button>
              </Link>
            </motion.div>
            <motion.p variants={up} className="text-[10px] italic text-white/25 pt-1">
              Ask us about your stone's potential. Assessment is always free.
            </motion.p>
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
                body: "We read the GIA certificate comments. Roughly 15–20% of IF stones carry comment types indicating a removable surface characteristic. This assessment is provided at no cost."
              },
              {
                n: "02",
                title: "Precision regrinding",
                body: "Under high-magnification, Babu Vekariya removes the surface imperfection in micro-millimeters. Hours per stone, no automation, no margin for error. The carat weight remains within the same bracket."
              },
              {
                n: "03",
                title: "New GIA FL certificate",
                body: "The stone is resubmitted to GIA independently. A new Flawless certificate is issued. The stone is now Flawless, verifiably, globally, permanently."
              },
            ].map((step, i) => (
              <motion.div key={i} variants={up} className="py-8 flex items-start gap-8 group">
                <span
                  className="text-3xl shrink-0 leading-none transition-colors font-light tabular-nums"
                  style={{ color: "#1CA9C9", opacity: 0.5 }}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
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
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-14">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              Find Your Answer
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A] mb-3">
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
                <div className="text-3xl text-[#02274A]/15 mb-5 leading-none font-light tabular-nums">{bt.num}</div>
                <h3 className="font-serif text-lg text-[#02274A] mb-3 leading-snug">{bt.headline}</h3>
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
                      <h3 className="font-serif text-2xl md:text-3xl text-[#02274A] mb-6">
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
                      <Link href={selectedBuyer.answer.href} className="block w-full sm:w-auto">
                        <Button
                          className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:opacity-90 font-medium w-full sm:w-auto"
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
          6. CRAFT — Mastery in micro-millimeters
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
              The Craft
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A] leading-tight">
              Mastery in<br />micro-millimeters.
            </motion.h2>
            <motion.div variants={up}><span className="ocean-line" /></motion.div>
            <motion.p variants={up} className="text-[#02274A]/50 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              What separates IF from FL is often less than 0.01mm. Babu Vekariya has spent
              47 years developing the judgment to see that difference, and the precision
              to act on it without compromising carat weight.
            </motion.p>
            <motion.ul variants={up} className="space-y-3 pt-2">
              {[
                "Began cutting diamonds at age 12 in 1978, Surat, India",
                "Developed the IF→FL regrinding technique across four decades",
                "Trusted by KGK Diamond, Venus Jewellery, Excell Overseas",
                "Now operating from Geelong, Victoria, serving the world"
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
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
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
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-white">
              Three ways we work with you.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              {
                num: "01",
                title: "Diamond Sourcing",
                body: "Natural GIA-certified diamonds. Lab-grown precision stones. D–K colour, VVS1–SI2 clarity, any shape, any size. Trade pricing only, no retail. Minimum order requirements apply.",
                sub: "Natural · Lab-Grown · Melee",
                link: "/diamonds",
                linkText: "View Diamond Inventory"
              },
              {
                num: "02",
                title: "IF→FL Conversion",
                body: "Send any IF stone's GIA cert number. We analyse the comments, assess viability at no cost, and if the stone qualifies, execute the precision regrind. New GIA FL certificate issued.",
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
                <span className="text-4xl font-light tabular-nums" style={{ color: "#1CA9C9", opacity: 0.4 }}>{svc.num}</span>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-1">{svc.title}</h3>
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
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] mb-2 font-medium" style={{ color: "#1CA9C9" }}>
                By Application Only
              </p>
              <h2 className="font-serif text-4xl text-[#02274A]">Featured Inventory</h2>
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
            { n: "B2B", label: "Trade Partners Only, by Design", sub: "No retail. No public pricing. Serious professionals only." },
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
              <div className="text-4xl mb-2 font-light tabular-nums" style={{ color: "#1CA9C9" }}>{p.n}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#02274A] mb-3 font-medium">{p.label}</div>
              <p className="text-xs text-[#02274A]/40 leading-relaxed">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9b. SOCIAL PROOF — Anonymised testimonials
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="mb-14 text-center"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>
              From Our Partners
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-white">
              What the trade says.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Unlocked significant value from a 2.4ct IF stone we'd held for two years. The GIA FL certificate came back within the same carat bracket. Remarkable.",
                role: "Senior Diamond Buyer",
                location: "Dubai",
              },
              {
                quote: "We've used FLXDIAMONDS for white-label sourcing across three collections. Their discretion is absolute. Our clients never know the source, and the quality speaks for itself.",
                role: "Head of Procurement",
                location: "Mumbai",
              },
              {
                quote: "The assessment was free, the process was explained clearly, and the result exceeded expectations. For anyone holding IF stones, the conversation costs nothing.",
                role: "Private Investor",
                location: "Singapore",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="p-8 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(28,169,201,0.12)" }}
              >
                <span style={{ color: "#1CA9C9", fontSize: "2rem", lineHeight: 1, opacity: 0.5, fontFamily: "serif" }}>&ldquo;</span>
                <p className="text-white/65 text-sm leading-relaxed font-light italic flex-1">
                  {t.quote}
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px" }}>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{t.role}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] mt-0.5" style={{ color: "#1CA9C9", opacity: 0.6 }}>{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center mt-10 text-[9px] uppercase tracking-[0.3em] text-white/20"
          >
            All testimonials are anonymised by request. Full references available to verified trade partners.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. HERITAGE — Babu Vekariya
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-16 items-start"
          >
            {/* Left — label + heading */}
            <div className="space-y-6 lg:col-span-1">
              <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#1CA9C9" }}>
                Our Heritage
              </motion.p>
              <motion.h2 variants={up} className="font-serif text-4xl lg:text-5xl text-[#02274A] leading-tight">
                Babu Vekariya.<br />
                <span className="text-[#02274A]/30">Master Craftsman.</span>
              </motion.h2>
              <motion.div variants={up}><span className="ocean-line" /></motion.div>
              <motion.div variants={up} className="space-y-2 pt-2">
                {[
                  { label: "Born into the craft", value: "1978, Age 12" },
                  { label: "Years of mastery",    value: "47 Years" },
                  { label: "Based in",            value: "Geelong, VIC" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-baseline border-b py-3" style={{ borderColor: "#02274A0f" }}>
                    <span className="text-[10px] uppercase tracking-widest text-[#02274A]/35">{s.label}</span>
                    <span className="text-base text-[#02274A]">{s.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — narrative */}
            <motion.div variants={up} className="lg:col-span-2 space-y-6 pt-2 lg:pt-14">
              <p className="text-[#02274A]/55 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Babu began cutting diamonds in 1978, aged 12, in the diamond ateliers of Surat, India.
                By his late 20s he was among a small group of craftsmen who could reliably identify
                and execute the IF→FL conversion, a technique requiring decades of practiced eye and
                flawless judgment to see what is invisible to most.
              </p>
              <p className="text-[#02274A]/40 text-sm sm:text-base leading-relaxed">
                The conversion is not a trick of grading. It requires reading the specific language
                of a GIA certificate, understanding which surface characteristics are removable, and
                then executing a micro-regrind of under 0.01mm, a margin where most hands simply
                cannot operate with confidence.
              </p>
              <p className="text-[#02274A]/40 text-sm sm:text-base leading-relaxed">
                Over four decades that mastery refined into the process behind FLX Diamonds.
                Now based in Geelong, Victoria, we bring that level of craft to serious buyers
                and trade partners worldwide, quietly and without fanfare.
              </p>
              <div className="flex gap-4 pt-4">
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10b. FAQ — Kill final objections
      ══════════════════════════════════════════════════ */}
      <FaqSection />

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
            <motion.h2 variants={up} className="font-serif text-3xl md:text-5xl text-white leading-snug">
              "The finest diamonds are not found.<br />
              They are understood."
            </motion.h2>
            <motion.div variants={up} className="flex justify-center">
              <span className="ocean-line tide-pulse" />
            </motion.div>
            <motion.div variants={up}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none text-xs uppercase tracking-[0.22em] font-medium text-white hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.4)", height: "52px", padding: "0 2.5rem" }}
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
          12. B2B REASSURANCE + ENQUIRY FORM
      ══════════════════════════════════════════════════ */}
      <div className="py-5 px-6 text-center" style={{ background: "#F4F8FC", borderTop: "1px solid rgba(2,39,74,0.07)" }}>
        <p className="text-[9px] uppercase tracking-[0.38em]" style={{ color: "rgba(2,39,74,0.35)" }}>
          No commitment · Full discretion · Response within 24 hours
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          13. ENQUIRY FORM
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "#1CA9C9" }}>Direct Access</p>
            <h2 className="font-serif text-3xl text-white mb-3">Send a Direct Enquiry</h2>
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
