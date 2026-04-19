import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Link } from "wouter";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const SERVICES = [
  {
    id: "conversion",
    number: "01",
    label: "Core Service",
    title: "IF → FL\nConversion",
    tagline: "The conversion that redefines a stone's commercial ceiling.",
    body: [
      "We assess Internally Flawless (IF) diamonds for the specific surface characteristics that hold them below FL grade. Where removal is viable, with no meaningful carat loss, we execute a precision micro-regrind of the affected facet and re-submit the stone to GIA for FL certification.",
      "The result is a GIA-certified Flawless diamond with verified carat weight, documented conversion history, and a new certificate. For the buyer or portfolio holder, FL carries a material premium over IF that justifies the conversion cost many times over at commercial scale.",
    ],
    qualifies: [
      "IF diamonds with surface-only characteristics (naturals, extra facets, surface graining)",
      "Minimum 0.50ct; conversion economics justify from this threshold upward",
      "Round brilliant or other standard cuts with accessible facet geometry",
      "Stones accompanied by current GIA grading report",
    ],
    delivers: [
      "Written assessment with conversion viability and projected outcome",
      "Precision micro-regrind within 0.01mm material removal",
      "GIA re-submission and new FL certificate",
      "Full documentation of the conversion for your records",
    ],
    turnaround: "3–6 weeks from stone receipt to FL certificate",
    dark: true,
  },
  {
    id: "supply",
    number: "02",
    label: "Diamond Supply",
    title: "Premium FL\nInventory",
    tagline: "GIA-certified Flawless diamonds. Verified, consistent, available to trade.",
    body: [
      "Beyond conversion, we maintain a curated inventory of GIA-certified FL and IF diamonds sourced through our established trade network. Each stone is individually verified before we make it available. We do not list stones we have not handled.",
      "Supply arrangements can be structured as one-off purchases, ongoing allocation agreements, or standing requests against specific parameters (carat range, shape, colour, fluorescence).",
    ],
    qualifies: [
      "Established jewellers, manufacturers, and diamond traders",
      "Buyers seeking consistent FL supply rather than one-time sourcing",
      "Minimum enquiry: 0.50ct, no minimum number of stones per enquiry",
      "New trade partners subject to a brief qualification process",
    ],
    delivers: [
      "Individual stone listings with GIA report numbers on request",
      "Accurate representation of colour, clarity, and cut grade",
      "Discreet delivery with appropriate commercial documentation",
      "Standing availability alerts for buyers with specific brief",
    ],
    turnaround: "Typically 1–3 weeks for in-stock stones",
    dark: false,
  },
  {
    id: "investment",
    number: "03",
    label: "Investment Advisory",
    title: "Diamonds as a\nStore of Value",
    tagline: "For buyers approaching diamonds as a capital asset rather than a product.",
    body: [
      "FL-grade diamonds at meaningful carat weights have historically functioned as a portable, non-correlated store of value. The IF→FL conversion represents a specific arbitrage: the cost of regrinding is predictable, the FL premium over IF is documented, and the GIA certification makes the value transparent.",
      "We advise a small number of private buyers and family offices on diamond acquisition strategy, helping them understand what they are buying, at what price relative to the market, and what realistic exit routes look like.",
    ],
    qualifies: [
      "Private buyers considering diamonds as a component of a broader asset strategy",
      "Family offices and wealth managers seeking guidance on diamond valuation",
      "Buyers with budgets from AUD $50,000 upward per engagement",
      "Referral or introduction preferred; direct enquiry welcomed",
    ],
    delivers: [
      "Honest assessment of diamonds as an investment class, including its limitations",
      "Acquisition sourcing at trade-adjacent pricing where possible",
      "Documentation of purchase rationale for portfolio records",
      "Ongoing relationship for future acquisition or disposition advisory",
    ],
    turnaround: "Initial call within one week; advisory structured individually",
    dark: true,
  },
  {
    id: "partnership",
    number: "04",
    label: "Trade Partnership",
    title: "Structured B2B\nRelationships",
    tagline: "For serious buyers who need a reliable, long-term supply relationship.",
    body: [
      "We work with a limited number of trade partners on an ongoing basis, typically jewellery manufacturers, diamond traders, or high-end retailers who need consistent access to our conversion service or FL inventory across production seasons.",
      "A trade partnership is not a subscription or a volume discount scheme. It is an agreement to communicate directly, work within agreed parameters, and handle commercial matters with the discretion that the diamond trade demands.",
    ],
    qualifies: [
      "Established businesses with verifiable trade history",
      "Buyers requiring regular volume, at least 4 engagements per year",
      "Partners willing to operate within agreed NDA and confidentiality terms",
      "Businesses where a direct relationship with the principal is appropriate",
    ],
    delivers: [
      "Priority access to conversion slots ahead of spot enquiries",
      "Standing allocation from inventory ahead of general listing",
      "Direct communication with Babu Vekariya on technical questions",
      "Flexible commercial terms negotiated individually",
    ],
    turnaround: "Partnership terms agreed within 2–3 weeks of initial conversation",
    dark: false,
  },
];

function ServiceBlock({ s, index }: { s: typeof SERVICES[number]; index: number }) {
  const bg       = s.dark ? "#02274A" : "#F4F8FC";
  const text     = s.dark ? "rgba(255,255,255,0.85)" : "rgba(2,39,74,0.85)";
  const muted    = s.dark ? "rgba(255,255,255,0.36)" : "rgba(2,39,74,0.38)";
  const border   = s.dark ? "rgba(255,255,255,0.07)" : "rgba(2,39,74,0.07)";
  const tagColor = s.dark ? "rgba(255,255,255,0.28)" : "rgba(2,39,74,0.3)";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      style={{ background: bg, fontFamily: "'Inter', sans-serif" }}
      className="relative overflow-hidden"
    >
      {/* Watermark number — hidden on mobile, subtle on desktop */}
      <div
        className="absolute select-none pointer-events-none hidden md:block"
        style={{
          fontSize: "clamp(160px, 22vw, 340px)",
          fontFamily: "'Playfair Display', serif",
          color: s.dark ? "rgba(255,255,255,0.04)" : "rgba(2,39,74,0.04)",
          lineHeight: 1,
          right: s.dark ? "-1%" : "auto",
          left: s.dark ? "auto" : "-1%",
          top: "50%",
          transform: "translateY(-50%)",
          letterSpacing: "-0.04em",
          fontWeight: 400,
        }}
        aria-hidden="true"
      >
        {s.number}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">

        {/* Label breadcrumb row */}
        <motion.div variants={fade} className="flex items-center gap-4 mb-10 md:mb-16">
          <span className="text-[9px] uppercase tracking-[0.55em] font-medium" style={{ color: "#1CA9C9" }}>
            {s.label}
          </span>
          <span className="w-8 md:w-12 h-px" style={{ background: "rgba(28,169,201,0.3)" }} />
          <span className="text-sm tabular-nums" style={{ color: muted }}>
            {s.number}
          </span>
        </motion.div>

        {/* Main grid — single col mobile → 12-col desktop */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-start">

          {/* LEFT — heading block */}
          <motion.div variants={stagger} className="md:col-span-4 space-y-5">
            <motion.h2
              variants={fade}
              className="font-serif leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                color: text,
                whiteSpace: "pre-line",
              }}
            >
              {s.title}
            </motion.h2>
            <motion.span variants={fade} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            <motion.p variants={fade} className="text-sm leading-relaxed italic" style={{ color: tagColor }}>
              {s.tagline}
            </motion.p>

            {/* Turnaround */}
            <motion.div variants={fade} className="flex items-start gap-3 pt-3">
              <div className="mt-0.5 w-px" style={{ background: "rgba(28,169,201,0.4)", minHeight: "36px" }} />
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "#1CA9C9" }}>
                  Typical Turnaround
                </p>
                <p className="text-[12px] leading-snug" style={{ color: muted }}>
                  {s.turnaround}
                </p>
              </div>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div variants={fade} className="pt-2 md:hidden">
              <Link href="/contact" data-testid={`btn-services-${s.id}-enquire`}>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#1CA9C9" }}>
                  Enquire → 
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* MIDDLE — body text (full width on mobile, col 5-8 on desktop) */}
          <motion.div variants={stagger} className="md:col-span-4 space-y-5">
            <motion.p variants={fade} className="text-[9px] uppercase tracking-[0.45em] mb-5" style={{ color: "#1CA9C9" }}>
              Overview
            </motion.p>
            {s.body.map((para, i) => (
              <motion.p key={i} variants={fade} className="text-sm leading-relaxed" style={{ color: muted }}>
                {para}
              </motion.p>
            ))}

            {/* Desktop CTA */}
            <motion.div variants={fade} className="pt-6 hidden md:block">
              <Link href="/contact" data-testid={`btn-services-${s.id}-enquire`} className="inline-flex items-center gap-3 group">
                <span
                  className="text-[10px] uppercase tracking-[0.3em] border-b pb-0.5 transition-all duration-300 group-hover:border-[#1CA9C9]"
                  style={{ color: "#1CA9C9", borderColor: "rgba(28,169,201,0.35)" }}
                >
                  Enquire About This Service
                </span>
                <span className="text-[#1CA9C9] transition-transform duration-300 group-hover:translate-x-1 text-[11px]">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — qualifies + delivers */}
          <motion.div variants={stagger} className="md:col-span-4 space-y-8">

            <motion.div variants={fade} className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#1CA9C9" }}>Who This Suits</p>
              <ul className="space-y-3">
                {s.qualifies.map((q, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: "#1CA9C9", opacity: 0.6 }} />
                    <span className="text-[12px] leading-relaxed" style={{ color: muted }}>{q}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fade} className="w-full h-px" style={{ background: border }} />

            <motion.div variants={fade} className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#1CA9C9" }}>What You Receive</p>
              <ul className="space-y-3">
                {s.delivers.map((d, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 shrink-0 text-[10px]" style={{ color: "#1CA9C9", opacity: 0.7 }}>✓</span>
                    <span className="text-[12px] leading-relaxed" style={{ color: muted }}>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Services() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══ HERO ══ */}
      <section
        className="relative overflow-hidden pt-28 md:pt-40 pb-20 md:pb-36 px-8 md:px-14 lg:px-20"
        style={{ background: "#02274A" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(28,169,201,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(28,169,201,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Desktop watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
          style={{
            fontSize: "clamp(120px, 18vw, 220px)",
            fontFamily: "'Playfair Display', serif",
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          Services
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto"
        >
          <motion.p variants={fade} className="text-[10px] uppercase tracking-[0.55em] mb-6 md:mb-8" style={{ color: "#1CA9C9" }}>
            What We Do
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            <div>
              <motion.h1
                variants={fade}
                className="font-serif leading-[1.05] mb-6 md:mb-8"
                style={{
                  fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                Four services.<br />
                <span style={{ color: "rgba(255,255,255,0.22)" }}>One standard.</span>
              </motion.h1>
              <motion.span variants={fade} className="block w-12 h-px" style={{ background: "#1CA9C9" }} />
            </div>
            <motion.div variants={stagger} className="space-y-5 md:pb-4">
              <motion.p variants={fade} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.36)" }}>
                Every service we offer is built around a single principle: the buyer should know
                exactly what they are getting before they commit. We describe our work with precision
                because imprecision in this industry costs people money.
              </motion.p>
              {/* Service index pills */}
              <motion.div variants={fade} className="flex flex-wrap gap-2 pt-1">
                {SERVICES.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 hover:border-[#1CA9C9] group"
                    style={{ borderColor: "rgba(28,169,201,0.2)", background: "rgba(28,169,201,0.04)" }}
                  >
                    <span className="text-[8px] font-medium" style={{ color: "rgba(28,169,201,0.5)" }}>{s.number}</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] group-hover:text-[#1CA9C9] transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {s.label}
                    </span>
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Separator */}
          <motion.div
            variants={fade}
            className="mt-12 md:mt-20 w-full h-px"
            style={{ background: "linear-gradient(90deg, #1CA9C9 0%, rgba(28,169,201,0.2) 40%, transparent 100%)" }}
          />
        </motion.div>
      </section>

      {/* ══ SERVICE BLOCKS ══ */}
      {SERVICES.map((s, i) => (
        <div key={s.id} id={s.id}>
          <ServiceBlock s={s} index={i} />
        </div>
      ))}

      {/* ══ CLOSING CTA ══ */}
      <section
        className="relative overflow-hidden py-24 md:py-36 px-6"
        style={{ background: "#02274A" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(28,169,201,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-3xl mx-auto text-center space-y-6 md:space-y-8"
        >
          <motion.p variants={fade} className="text-[10px] uppercase tracking-[0.55em]" style={{ color: "#1CA9C9" }}>
            All Enquiries
          </motion.p>
          <motion.h2
            variants={fade}
            className="font-serif leading-snug"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "rgba(255,255,255,0.85)" }}
          >
            We handle all enquiries directly and under strict commercial confidence.
          </motion.h2>
          <motion.p variants={fade} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
            There is no sales process, only an honest conversation about whether we are the right fit.
          </motion.p>

          <motion.div variants={fade} className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact" data-testid="btn-services-contact">
              <button
                className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-200 hover:opacity-80"
                style={{ background: "#1CA9C9", height: "50px", padding: "0 2.25rem", border: "none" }}
              >
                Begin the Conversation
              </button>
            </Link>
            <Link href="/faq" data-testid="btn-services-faq">
              <button
                className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] transition-all duration-200 hover:border-[#1CA9C9] hover:text-[#1CA9C9]"
                style={{
                  background: "transparent",
                  height: "50px",
                  padding: "0 2.25rem",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Common Questions
              </button>
            </Link>
          </motion.div>

          <motion.div variants={fade} className="pt-8 md:pt-12 flex justify-center gap-5 md:gap-8 flex-wrap">
            {["B2B Only", "47 Years Mastery", "GIA Certified", "Commercial Confidence"].map(tag => (
              <span key={tag} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: "rgba(28,169,201,0.4)" }} />
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.18)" }}>{tag}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
