import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const SERVICES = [
  {
    id: "conversion",
    number: "01",
    label: "Core Service",
    title: "IF → FL Conversion",
    tagline: "The conversion that redefines a stone's commercial ceiling.",
    body: [
      "We assess Internally Flawless (IF) diamonds for the specific surface characteristics that hold them below FL grade. Where removal is viable — without meaningful carat loss — we execute a precision micro-regrind of the affected facet and re-submit the stone to GIA for FL certification.",
      "The result is a GIA-certified Flawless diamond with verified carat weight, documented conversion history, and a new certificate. For the buyer or portfolio holder, FL carries a material premium over IF that justifies the conversion cost many times over at commercial scale.",
    ],
    qualifies: [
      "IF diamonds with surface-only characteristics (naturals, extra facets, surface graining)",
      "Minimum 0.50ct — conversion economics justify from this threshold upward",
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
    bg: "#02274A",
    textColor: "white",
    accent: "#1CA9C9",
  },
  {
    id: "supply",
    number: "02",
    label: "Diamond Supply",
    title: "Premium FL Inventory",
    tagline: "GIA-certified Flawless diamonds. Verified, consistent, and available to trade.",
    body: [
      "Beyond conversion, we maintain a curated inventory of GIA-certified FL and IF diamonds sourced through our established trade network. Each stone is individually verified before we make it available — we do not list stones we have not handled.",
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
    turnaround: "Subject to current inventory — typically 1–3 weeks for in-stock stones",
    bg: "#F4F8FC",
    textColor: "#02274A",
    accent: "#1CA9C9",
  },
  {
    id: "investment",
    number: "03",
    label: "Investment Advisory",
    title: "Diamonds as a Store of Value",
    tagline: "For buyers approaching diamonds as a capital asset rather than a product.",
    body: [
      "FL-grade diamonds at meaningful carat weights have historically functioned as a portable, non-correlated store of value. The IF→FL conversion represents a specific arbitrage: the cost of regrinding is predictable, the FL premium over IF is documented, and the GIA certification makes the value transparent.",
      "We advise a small number of private buyers and family offices on diamond acquisition strategy — helping them understand what they are buying, at what price relative to the market, and what realistic exit routes look like.",
    ],
    qualifies: [
      "Private buyers considering diamonds as a component of a broader asset strategy",
      "Family offices and wealth managers seeking guidance on diamond valuation",
      "Buyers with budgets from AUD $50,000 upward per engagement",
      "Referral or introduction preferred; direct enquiry welcomed",
    ],
    delivers: [
      "Honest assessment of diamonds as an investment class — including limitations",
      "Acquisition sourcing at trade-adjacent pricing where possible",
      "Documentation of purchase rationale for portfolio records",
      "Ongoing relationship for future acquisition or disposition advisory",
    ],
    turnaround: "Advisory engagements structured individually — initial call within one week",
    bg: "#02274A",
    textColor: "white",
    accent: "#1CA9C9",
  },
  {
    id: "partnership",
    number: "04",
    label: "Trade Partnership",
    title: "Structured B2B Relationships",
    tagline: "For serious buyers who need a reliable, long-term supply relationship.",
    body: [
      "We work with a limited number of trade partners on an ongoing basis — typically jewellery manufacturers, diamond traders, or high-end retailers who need consistent access to our conversion service or FL inventory across production seasons.",
      "A trade partnership is not a subscription or a volume discount scheme. It is an agreement to communicate directly, work within agreed parameters, and handle commercial matters with the discretion that the diamond trade demands.",
    ],
    qualifies: [
      "Established businesses with verifiable trade history",
      "Buyers requiring regular volume — at least 4 engagements per year",
      "Partners willing to operate within agreed NDA and confidentiality terms",
      "Businesses where a direct, personal relationship with the principal is appropriate",
    ],
    delivers: [
      "Priority access to conversion slots ahead of spot enquiries",
      "Standing allocation from inventory ahead of general listing",
      "Direct communication with Babu Vekariya on technical questions",
      "Flexible commercial terms negotiated individually",
    ],
    turnaround: "Partnership terms agreed within 2–3 weeks of initial conversation",
    bg: "#F4F8FC",
    textColor: "#02274A",
    accent: "#1CA9C9",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-28 px-6" style={{ background: "#02274A" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-end"
        >
          <div className="space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              What We Do
            </motion.p>
            <motion.h1 variants={up} className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Four services.<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>One standard.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.p variants={up} className="text-white/40 text-base leading-relaxed max-w-lg lg:pb-3">
            Every service we offer is built around a single principle: the buyer should know exactly
            what they are getting before they commit. We describe our work with precision because
            imprecision in this industry costs people money.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Service Sections ── */}
      {SERVICES.map((s) => (
        <section key={s.id} className="py-28 px-6" style={{ background: s.bg }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid lg:grid-cols-3 gap-16"
            >
              {/* Left — identity */}
              <div className="space-y-5">
                <motion.span variants={up} className="font-serif text-6xl" style={{ color: s.accent, opacity: 0.35 }}>
                  {s.number}
                </motion.span>
                <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: s.accent }}>
                  {s.label}
                </motion.p>
                <motion.h2 variants={up} className="font-serif text-3xl leading-tight" style={{ color: s.textColor }}>
                  {s.title}
                </motion.h2>
                <motion.span variants={up} className="block w-8 h-px" style={{ background: s.accent }} />
                <motion.p variants={up} className="text-sm leading-relaxed italic" style={{ color: s.textColor === "white" ? "rgba(255,255,255,0.4)" : "rgba(2,39,74,0.4)" }}>
                  {s.tagline}
                </motion.p>
                {s.turnaround && (
                  <motion.div variants={up} className="pt-4 border-t" style={{ borderColor: s.textColor === "white" ? "rgba(255,255,255,0.08)" : "rgba(2,39,74,0.08)" }}>
                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: s.accent }}>Typical Turnaround</p>
                    <p className="text-sm" style={{ color: s.textColor === "white" ? "rgba(255,255,255,0.55)" : "rgba(2,39,74,0.55)" }}>{s.turnaround}</p>
                  </motion.div>
                )}
              </div>

              {/* Middle — description */}
              <motion.div variants={up} className="space-y-5">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium mb-6" style={{ color: s.accent }}>Overview</p>
                {s.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: s.textColor === "white" ? "rgba(255,255,255,0.48)" : "rgba(2,39,74,0.5)" }}>
                    {para}
                  </p>
                ))}
              </motion.div>

              {/* Right — who qualifies + delivers */}
              <motion.div variants={stagger} className="space-y-8">
                <motion.div variants={up} className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: s.accent }}>Who This Suits</p>
                  <ul className="space-y-3">
                    {s.qualifies.map((q, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: s.textColor === "white" ? "rgba(255,255,255,0.45)" : "rgba(2,39,74,0.5)" }}>
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: s.accent }} />
                        {q}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={up} className="space-y-4 pt-4 border-t" style={{ borderColor: s.textColor === "white" ? "rgba(255,255,255,0.08)" : "rgba(2,39,74,0.08)" }}>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: s.accent }}>What You Receive</p>
                  <ul className="space-y-3">
                    {s.delivers.map((d, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: s.textColor === "white" ? "rgba(255,255,255,0.45)" : "rgba(2,39,74,0.5)" }}>
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: s.accent }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={up} className="pt-2">
                  <Link href="/contact">
                    <Button
                      className="rounded-none text-[10px] uppercase tracking-[0.22em] text-white hover:opacity-90"
                      style={{ background: s.accent, height: "44px", padding: "0 1.75rem" }}
                      data-testid={`btn-services-${s.id}-enquire`}
                    >
                      Enquire About This Service
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── Qualification note ── */}
      <section className="py-20 px-6 text-center border-t" style={{ background: "#F4F8FC", borderColor: "rgba(2,39,74,0.06)" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto space-y-6"
        >
          <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#1CA9C9" }}>
            All Enquiries
          </motion.p>
          <motion.p variants={up} className="font-serif text-2xl text-[#02274A] leading-relaxed">
            We handle all enquiries directly and under strict commercial confidence.
            There is no sales process — only an honest conversation about whether we are the right fit.
          </motion.p>
          <motion.div variants={up} className="flex justify-center gap-4 flex-wrap pt-4">
            <Link href="/contact">
              <Button
                className="rounded-none text-[10px] uppercase tracking-[0.25em] text-white hover:opacity-90"
                style={{ background: "#1CA9C9", height: "48px", padding: "0 2rem" }}
                data-testid="btn-services-contact"
              >
                Begin the Conversation
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                className="rounded-none text-[10px] uppercase tracking-[0.25em] text-[#02274A] hover:bg-[#02274A] hover:text-white transition-colors"
                style={{ borderColor: "#02274A", height: "48px", padding: "0 2rem" }}
                data-testid="btn-services-faq"
              >
                Common Questions
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
