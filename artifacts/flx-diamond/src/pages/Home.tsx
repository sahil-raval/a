import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiamondCard } from "@/components/DiamondCard";
import { Volume2, VolumeX, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

/* ── Motion presets ─────────────────────────────────── */
const up = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18 } }
};

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
        "47 years of relationships with cutters in Antwerp and Mumbai."
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

/* ── Component ──────────────────────────────────────── */
export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.22;
  }, []);

  const toggleMute = () => {
    setIsMuted(m => {
      const next = !m;
      if (audioRef.current) {
        if (next === false) audioRef.current.play().catch(() => {});
        else audioRef.current.pause();
      }
      return next;
    });
  };

  const handleSelect = (id: string) => {
    setSelected(prev => {
      const next = prev === id ? null : id;
      if (next && answerRef.current) {
        setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
      return next;
    });
  };

  const selectedBuyer = BUYER_TYPES.find(b => b.id === selected);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ══════════════════════════════════════════════════
          1. HERO — Brand imagery / luxury office
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden" style={{ background: "#0a0806" }}>

        {/* Background — brand office image (zooming slowly) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/brand-office-3.jpg"
            alt="FLX Diamonds — private advisory studio"
            className="w-full h-full object-cover object-center hero-img-zoom"
            aria-hidden="true"
          />
        </div>

        {/* Ocean video — plays silently over image when loaded */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          src="/hero-ocean.mp4"
          autoPlay muted loop playsInline
          onCanPlay={() => { if (videoRef.current) videoRef.current.style.opacity = "1"; }}
          style={{ transition: "opacity 2s ease" }}
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(2,10,20,0.72) 0%, rgba(2,10,20,0.35) 55%, rgba(2,10,20,0.65) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,10,20,0.90) 0%, transparent 55%)" }} />

        {/* CSS wave accent at bottom */}
        <div className="wave-layer" style={{ animationDuration: "18s", height: "100px", opacity: 0.18 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,35 C240,75 480,10 720,40 C960,70 1200,15 1440,35 L1440,100 L0,100 Z" fill="rgba(201,162,39,0.4)" />
            <path d="M1440,35 C1680,75 1920,10 2160,40 C2400,70 2640,15 2880,35 L2880,100 L1440,100 Z" fill="rgba(201,162,39,0.4)" />
          </svg>
        </div>

        {/* Floating gold particles */}
        {[
          { left: "8%",  delay: "0s",   dur: "7s",  s: 3 },
          { left: "22%", delay: "2.1s", dur: "9s",  s: 2 },
          { left: "55%", delay: "1.2s", dur: "6s",  s: 2 },
          { left: "78%", delay: "0.4s", dur: "8s",  s: 3 },
          { left: "91%", delay: "3s",   dur: "7.5s",s: 2 },
        ].map((p, i) => (
          <div key={i} className="particle" style={{ left: p.left, bottom: "12%", width: p.s, height: p.s, animationDelay: p.delay, animationDuration: p.dur }} />
        ))}

        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-24 right-8 z-20 p-3 transition-colors"
          style={{ color: isMuted ? "rgba(255,255,255,0.35)" : "#C9A227" }}
          data-testid="btn-toggle-sound"
          aria-label={isMuted ? "Unmute ocean ambience" : "Mute ocean ambience"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <audio ref={audioRef} src="https://www.soundjay.com/nature/sounds/ocean-waves-1.mp3" loop />

        {/* Hero text — bottom-left, editorial */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 md:pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl space-y-6">

            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: "#C9A227" }}>
              Geelong, Victoria, Australia · Est. 1978
            </motion.p>

            <motion.h1 variants={up} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none font-light">
              Precision.<br />
              Trust.<br />
              Excellence.
            </motion.h1>

            <motion.div variants={up}>
              <span className="gold-line" />
            </motion.div>

            <motion.p variants={up} className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-xl">
              Private wealth gem advisory. IF→FL diamond conversion. Bespoke B2B sourcing.
              47 years of master craftsmanship — Geelong to the world.
            </motion.p>

            <motion.div variants={up} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/investment">
                <Button
                  className="rounded-none h-13 px-10 text-xs uppercase tracking-[0.18em] font-medium text-[#02274A] hover:opacity-90 w-full sm:w-auto"
                  style={{ background: "#C9A227", height: "52px" }}
                  data-testid="hero-cta-investment"
                >
                  Understand the Opportunity
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none h-13 px-10 text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8 w-full sm:w-auto"
                  style={{ borderColor: "rgba(201,162,39,0.5)", height: "52px" }}
                  data-testid="hero-cta-contact"
                >
                  Partner With Us
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={up} className="flex items-center gap-6 pt-2">
              {["47 Years Mastery", "GIA Certified", "B2B Only"].map((t, i) => (
                <span key={i} className="text-[9px] uppercase tracking-[0.25em] text-white/35">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 right-1/2 translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <ChevronDown size={18} className="animate-bounce" style={{ color: "rgba(201,162,39,0.5)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. FROM IF TO FL — The service statement
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.35em] font-medium" style={{ color: "#C9A227" }}>
              The Opportunity
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none font-light">
              From IF<br />to FL.
            </motion.h2>
            <motion.div variants={up}><span className="gold-line" /></motion.div>
            <motion.p variants={up} className="text-white/60 text-lg leading-relaxed max-w-lg font-light">
              When a GIA certificate notes specific surface characteristics on an Internally Flawless stone,
              there is often a viable path to Flawless grade — without leaving the same carat weight bracket.
            </motion.p>
            <motion.p variants={up} className="text-white/40 text-sm leading-relaxed max-w-lg">
              This requires reading GIA comments with precision, then executing a micro-regrind of
              under 0.01mm. It is not a shortcut. It is 47 years of judgment applied to a single stone.
            </motion.p>
            <motion.div variants={up} className="flex gap-4 pt-2">
              <Link href="/investment">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.18em] font-medium text-[#02274A] hover:opacity-90"
                  style={{ background: "#C9A227", height: "48px", paddingLeft: "2rem", paddingRight: "2rem" }}
                  data-testid="btn-if-to-fl-learn"
                >
                  Learn More
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-none text-xs uppercase tracking-[0.18em] text-white hover:bg-white/8"
                  style={{ borderColor: "rgba(201,162,39,0.4)", height: "48px", paddingLeft: "2rem", paddingRight: "2rem" }}
                  data-testid="btn-if-to-fl-submit"
                >
                  Submit a GIA Cert →
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* 3 steps */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-0 divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {[
              { n: "01", title: "Identify the Stone", body: "We read the GIA certificate comments. Roughly 15–20% of IF stones carry comment types indicating a removable surface characteristic." },
              { n: "02", title: "Precision Regrinding", body: "Under high-magnification, Babu Vekariya removes the surface imperfection in micro-millimeters. Hours per stone. No shortcuts." },
              { n: "03", title: "GIA FL Certificate", body: "The stone is resubmitted to GIA. A new Flawless certificate is issued. Same carat weight bracket. Documented value." },
            ].map((step, i) => (
              <motion.div key={i} variants={up} className="py-8 flex items-start gap-8">
                <span className="font-serif text-4xl font-light shrink-0 leading-none" style={{ color: "#C9A227", opacity: 0.6 }}>{step.n}</span>
                <div>
                  <h3 className="font-serif text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. QUALIFIER — What brings you here today?
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#FAF8F5" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="mb-14">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: "#C9A227" }}>Find Your Answer</motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-[#02274A] mb-3 font-light">What brings you here today?</motion.h2>
            <motion.p variants={up} className="text-[#02274A]/45 text-base max-w-lg">Select what matches your situation. We'll give you the exact answer you need.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_TYPES.map((bt, i) => (
              <motion.div
                key={bt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`qualifier-card p-7 border ${selected === bt.id ? "selected" : "border-[#02274A]/12"}`}
                style={{ background: selected === bt.id ? "rgba(201,162,39,0.05)" : "white" }}
                onClick={() => handleSelect(bt.id)}
                data-testid={`qualifier-${bt.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(bt.id)}
              >
                <div className="font-serif text-3xl text-[#02274A]/20 mb-5 leading-none">{bt.num}</div>
                <h3 className="font-serif text-lg text-[#02274A] mb-3 leading-snug">{bt.headline}</h3>
                <p className="text-[#02274A]/50 text-xs leading-relaxed">{bt.subtext}</p>
                <div className={`mt-6 flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium transition-colors ${selected === bt.id ? "" : "text-[#02274A]/30"}`} style={{ color: selected === bt.id ? "#C9A227" : undefined }}>
                  {selected === bt.id ? <><CheckCircle2 size={12} /><span>Selected</span></> : <><ArrowRight size={12} /><span>See Answer</span></>}
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
                  className="mt-6 p-8 md:p-12 border"
                  style={{ background: "white", borderColor: "rgba(201,162,39,0.3)" }}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: "#C9A227" }}>Our Answer</p>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#02274A] mb-6 font-light">{selectedBuyer.answer.title}</h3>
                      <ul className="space-y-3">
                        {selectedBuyer.answer.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#02274A]/60 leading-relaxed">
                            <span className="shrink-0 mt-0.5 font-serif" style={{ color: "#C9A227" }}>—</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-6 md:items-end">
                      <p className="text-[#02274A]/30 text-sm italic font-serif leading-relaxed text-right hidden md:block max-w-xs">
                        "Every answer begins with understanding exactly what you need."
                      </p>
                      <Link href={selectedBuyer.answer.href}>
                        <Button
                          className="rounded-none text-xs uppercase tracking-[0.18em] text-[#02274A] hover:opacity-90 font-medium"
                          style={{ background: "#C9A227", height: "48px", paddingLeft: "2rem", paddingRight: "2rem" }}
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
          4. BRAND STATEMENT — Full-bleed office imagery
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "80vh", minHeight: "520px" }}>
        <img
          src="/brand-office-1.jpg"
          alt="FLX Diamonds private advisory studio"
          className="absolute inset-0 w-full h-full object-cover object-center hero-img-zoom"
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(2,10,20,0.78) 0%, rgba(2,10,20,0.45) 60%, rgba(2,10,20,0.65) 100%)" }} />

        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center space-y-6 max-w-3xl"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#C9A227" }}>
              Private Wealth · Gem Expertise · Bespoke Advisory
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-none font-light">
              The Quiet Partner<br />Behind Serious<br />Decisions.
            </motion.h2>
            <motion.div variants={up} className="flex justify-center">
              <span className="gold-line" />
            </motion.div>
            <motion.p variants={up} className="text-white/55 text-base md:text-lg leading-relaxed font-light">
              We don't advertise. We don't operate retail. Every partner engagement begins
              with a direct conversation — no chatbots, no catalogues, no delays.
            </motion.p>
            <motion.div variants={up} className="pt-2">
              <Link href="/contact">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.2em] font-medium text-[#02274A] hover:opacity-90"
                  style={{ background: "#C9A227", height: "52px", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  data-testid="btn-statement-contact"
                >
                  Begin the Conversation →
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. CRAFT — Mastery in micro-millimeters
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.35em] font-medium" style={{ color: "#C9A227" }}>The Craft Behind the Grade</motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl md:text-5xl text-white leading-tight font-light">Mastery in<br />Micro-Millimeters</motion.h2>
            <motion.div variants={up}><span className="gold-line" /></motion.div>
            <motion.p variants={up} className="text-white/55 text-lg leading-relaxed font-light">
              What separates IF from FL is often less than 0.01mm. Babu Vekariya has spent
              47 years developing the judgment to see that difference — and the skill to act on
              it without compromising carat weight.
            </motion.p>
            <motion.ul variants={up} className="space-y-3 pt-2">
              {[
                "Began cutting diamonds at age 12, 1978 — Surat, India",
                "Developed IF→FL regrinding technique through decades of practice",
                "Now trusted by KGK Diamond, Venus Jewellery, Excell Overseas",
                "Based in Geelong, Victoria — serving serious buyers worldwide"
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/45">
                  <span className="shrink-0 font-serif" style={{ color: "#C9A227" }}>—</span>
                  <span>{f}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={up}>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white/8"
                  style={{ borderColor: "rgba(201,162,39,0.4)", height: "46px", paddingLeft: "1.75rem", paddingRight: "1.75rem" }}
                  data-testid="btn-craft-about"
                >
                  Read Babu's Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="aspect-video w-full overflow-hidden shadow-2xl" style={{ background: "#011a36" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&mute=0&controls=1"
              title="Diamond Crafting — FLX Diamonds"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. GREAT OCEAN ROAD — Our Home
      ══════════════════════════════════════════════════ */}
      <section className="overflow-hidden" style={{ background: "#FAF8F5" }}>
        {/* Wide hero shot */}
        <div className="relative overflow-hidden" style={{ height: "52vh", minHeight: "320px" }}>
          <img
            src="/great-ocean-road_4.jpg"
            alt="The Great Ocean Road — Victoria, Australia"
            className="w-full h-full object-cover object-center hero-img-zoom"
            style={{ filter: "saturate(0.85) brightness(0.75)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(2,10,20,0.2) 0%, rgba(2,10,20,0.1) 40%, rgba(2,10,20,0.75) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 px-10 md:px-16 pb-10">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
              <p className="text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: "#C9A227" }}>Geelong, Victoria, Australia</p>
              <h2 className="font-serif text-2xl md:text-4xl text-white font-light max-w-2xl leading-tight">
                Where the Southern Ocean shapes our perspective — and our standards.
              </h2>
            </motion.div>
          </div>
        </div>

        {/* 3-image grid */}
        <div className="grid grid-cols-3" style={{ height: "30vh", minHeight: "180px" }}>
          {[
            { src: "/great-ocean-road_3.jpg", alt: "London Arch", label: "London Arch" },
            { src: "/great-ocean-road_1.jpg", alt: "Twelve Apostles", label: "Twelve Apostles" },
            { src: "/great-ocean-road_6.jpg", alt: "Port Fairy Lighthouse", label: "Port Fairy" },
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: "saturate(0.8) brightness(0.72)" }}
              />
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" style={{ background: "rgba(2,10,20,0.28)" }} />
              <span className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest text-white/55">{img.label}</span>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="py-10 px-6 text-center border-b border-[#02274A]/8">
          <p className="text-[#02274A]/45 text-sm max-w-2xl mx-auto leading-relaxed">
            Based in Geelong — the gateway to the Great Ocean Road. The same patient forces that carved these
            limestone cliffs over millennia inform our approach: precision measured not in haste, but in decades.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. THREE SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="mb-16">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: "#C9A227" }}>Our Services</motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl text-white font-light">Three ways we work with you.</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              {
                num: "01",
                title: "Diamond Sourcing",
                body: "Natural GIA-certified diamonds. Lab-grown precision stones. D–K colour, VVS1–SI2 clarity, any shape. Trade pricing only — no retail. Minimum order requirements apply.",
                link: "/diamonds",
                linkText: "View Diamond Inventory"
              },
              {
                num: "02",
                title: "IF→FL Conversion",
                body: "Send any IF stone's GIA cert number. We analyse comments, assess viability, and — if suitable — execute the precision regrind. New GIA FL certificate issued.",
                link: "/investment",
                linkText: "Learn About Conversion"
              },
              {
                num: "03",
                title: "B2B Advisory",
                body: "White-label sourcing. Investment stone advisory. Custom specification briefs. Partnership structures for retailers, jewellers, and institutional buyers.",
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
                className="p-10 flex flex-col gap-6 group transition-colors"
                style={{ background: "#02274A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#04385E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#02274A")}
              >
                <span className="font-serif text-4xl font-light" style={{ color: "#C9A227", opacity: 0.45 }}>{svc.num}</span>
                <div>
                  <h3 className="font-serif text-2xl text-white mb-3 font-light">{svc.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{svc.body}</p>
                </div>
                <Link href={svc.link} className="flex items-center gap-2 text-[10px] uppercase tracking-wider group-hover:gap-3 transition-all font-medium" style={{ color: "#C9A227" }}>
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
      <section className="py-24 px-6" style={{ background: "#FAF8F5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-medium" style={{ color: "#C9A227" }}>By Application Only</p>
              <h2 className="font-serif text-4xl text-[#02274A] font-light">Featured Inventory</h2>
            </div>
            <Link href="/diamonds" className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium text-[#02274A]/40 hover:text-[#02274A] transition-colors">
              View All Stones <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, shape: "Round Brilliant", image: "/diamond-1.png", carat: "1.52", color: "D", clarity: "VVS1", cut: "Excellent" },
              { id: 2, shape: "Oval Cut",        image: "/diamond-2.png", carat: "2.01", color: "E", clarity: "VS1",  cut: "Excellent" },
              { id: 3, shape: "Emerald Cut",     image: "/diamond-3.png", carat: "3.15", color: "F", clarity: "IF",  cut: "Excellent" },
            ].map((d) => (
              <DiamondCard key={d.id} image={d.image} shape={d.shape} carat={d.carat} color={d.color} clarity={d.clarity} cut={d.cut} onRequestPrice={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. TRUST PILLARS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t" style={{ background: "white", borderColor: "#02274A0f" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { n: "47", label: "Years of Combined Expertise", sub: "Since Babu Vekariya began at age 12 in 1978." },
            { n: "GIA", label: "Certified on Every Stone", sub: "The global standard. Every stone, every time. No exceptions." },
            { n: "3", label: "Trusted Diamond Houses", sub: "KGK Diamond, Venus Jewellery, Excell Overseas." },
            { n: "B2B", label: "Partners Only — By Design", sub: "We don't sell retail. Serious professionals only." },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 border border-[#02274A]/8"
              style={{ background: "#FAF8F5" }}
            >
              <div className="font-serif text-4xl font-light mb-2" style={{ color: "#C9A227" }}>{p.n}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#02274A] mb-3 font-medium">{p.label}</div>
              <p className="text-xs text-[#02274A]/45 leading-relaxed">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. HERITAGE — Babu Vekariya
      ══════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: "#FAF8F5" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/babu-portrait.png"
              alt="Babu Vekariya — master diamond craftsman"
              className="w-full object-cover grayscale"
              style={{ height: "560px", filter: "grayscale(30%) contrast(1.05)" }}
            />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-6 order-1 lg:order-2">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.35em] font-medium" style={{ color: "#C9A227" }}>Our Heritage</motion.p>
            <motion.h2 variants={up} className="font-serif text-4xl lg:text-5xl text-[#02274A] leading-tight font-light">
              Babu Vekariya.<br />
              <span className="text-[#02274A]/40">Master Craftsman.</span>
            </motion.h2>
            <motion.div variants={up}><span className="gold-line" /></motion.div>
            <motion.div variants={up} className="space-y-4 text-[#02274A]/55 leading-relaxed">
              <p>Babu began cutting diamonds in 1978, aged 12. By his late 20s he was among a
              small group of craftsmen who could reliably identify and execute the IF→FL conversion —
              a technique requiring 47 years of practiced eye and flawless judgment.</p>
              <p>Over four decades, that mastery refined into the process behind FLX Diamonds.
              Based in Geelong, Victoria, we bring that level of craft to serious buyers and
              partners worldwide — quietly, without fanfare.</p>
            </motion.div>
            <motion.div variants={up} className="flex gap-4 pt-2">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] text-[#02274A] hover:bg-[#02274A] hover:text-white transition-colors"
                  style={{ borderColor: "#02274A", height: "46px", paddingLeft: "1.75rem", paddingRight: "1.75rem" }}
                  data-testid="btn-heritage-about"
                >
                  Full Story
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="rounded-none text-[10px] uppercase tracking-[0.2em] hover:opacity-90 font-medium text-[#02274A]"
                  style={{ background: "#C9A227", height: "46px", paddingLeft: "1.75rem", paddingRight: "1.75rem" }}
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
          11. CLOSING — Brand image + quote + CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "70vh", minHeight: "480px" }}>
        <img
          src="/brand-office-2.jpg"
          alt="FLX Diamonds"
          className="absolute inset-0 w-full h-full object-cover object-center hero-img-zoom"
          aria-hidden="true"
          style={{ filter: "brightness(0.55) saturate(0.85)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(2,10,20,0.55)" }} />

        {/* Animated wave accent */}
        <div className="wave-layer" style={{ animationDuration: "20s", height: "80px", opacity: 0.15 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path d="M0,25 C360,65 720,0 1080,30 C1260,50 1350,10 1440,25 L1440,80 L0,80 Z" fill="rgba(201,162,39,0.5)" />
            <path d="M1440,25 C1800,65 2160,0 2520,30 C2700,50 2790,10 2880,25 L2880,80 L1440,80 Z" fill="rgba(201,162,39,0.5)" />
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
            <motion.p variants={up} className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#C9A227" }}>
              The Quiet Partner Behind Serious Decisions
            </motion.p>
            <motion.h2 variants={up} className="font-serif text-3xl md:text-5xl text-white font-light leading-snug">
              "Heritage, craftsmanship, and the knowledge to see what others cannot —
              this is where serious diamond sourcing begins."
            </motion.h2>
            <motion.div variants={up} className="flex justify-center">
              <span className="gold-line" />
            </motion.div>
            <motion.div variants={up}>
              <Link href="/contact">
                <Button
                  className="rounded-none text-xs uppercase tracking-[0.22em] font-medium text-[#02274A] hover:opacity-90"
                  style={{ background: "#C9A227", height: "52px", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
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
      <section className="py-24 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: "#C9A227" }}>Direct Access</p>
            <h2 className="font-serif text-3xl text-white mb-3 font-light">Send a Direct Enquiry</h2>
            <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
              No automated responses. Every enquiry is read personally and responded to within 24 hours from our Geelong office.
            </p>
          </div>
          <div className="p-8 md:p-12 border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(201,162,39,0.2)" }}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">Full Name</label>
                  <Input className="rounded-none bg-transparent text-white border-white/15 focus:border-[#C9A227]/60 h-11 placeholder:text-white/20" data-testid="enquiry-name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">Company Name</label>
                  <Input className="rounded-none bg-transparent text-white border-white/15 focus:border-[#C9A227]/60 h-11 placeholder:text-white/20" data-testid="enquiry-company" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">Email Address</label>
                  <Input type="email" className="rounded-none bg-transparent text-white border-white/15 focus:border-[#C9A227]/60 h-11 placeholder:text-white/20" data-testid="enquiry-email" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">Phone / WhatsApp</label>
                  <Input type="tel" className="rounded-none bg-transparent text-white border-white/15 focus:border-[#C9A227]/60 h-11 placeholder:text-white/20" data-testid="enquiry-phone" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">What are you looking for?</label>
                <select
                  className="flex h-11 w-full border bg-transparent text-white/70 px-3 py-2 text-sm focus-visible:outline-none"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  data-testid="enquiry-type"
                >
                  <option value="" style={{ background: "#02274A" }}>Select an option...</option>
                  <option value="if-to-fl" style={{ background: "#02274A" }}>IF→FL Conversion</option>
                  <option value="natural" style={{ background: "#02274A" }}>Natural Diamond Sourcing</option>
                  <option value="lab-grown" style={{ background: "#02274A" }}>Lab-Grown Diamonds</option>
                  <option value="investment" style={{ background: "#02274A" }}>Investment-Grade Stones</option>
                  <option value="b2b" style={{ background: "#02274A" }}>B2B / Trade Partnership</option>
                  <option value="custom" style={{ background: "#02274A" }}>Custom / Bespoke Brief</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-white/40">Message / Specification</label>
                <Textarea
                  className="rounded-none bg-transparent text-white border-white/15 focus:border-[#C9A227]/60 min-h-[110px] placeholder:text-white/20"
                  placeholder="Include GIA cert numbers, carat range, colour/clarity target, or any specific requirements."
                  data-testid="enquiry-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-none text-sm uppercase tracking-[0.18em] font-medium text-[#02274A] hover:opacity-90"
                style={{ background: "#C9A227", height: "54px" }}
                data-testid="btn-enquiry-submit"
              >
                Submit Enquiry
              </Button>
              <p className="text-center text-[10px] text-white/25 tracking-wider">
                All enquiries treated in strict confidence. We do not share information with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
