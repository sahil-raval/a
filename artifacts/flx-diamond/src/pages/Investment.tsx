import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Link } from "wouter";

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const PILLARS = [
  {
    title: "Wealth Preservation",
    body: "Tangible, highly concentrated value resistant to inflation and currency fluctuations. FL diamonds at meaningful carat weights have demonstrated resilience across economic cycles.",
  },
  {
    title: "Rarity Premium",
    body: "FL clarity at 1ct+ is among the rarest intersections in the diamond market. The IF→FL conversion allows buyers to access this tier at a cost basis below prevailing FL spot pricing.",
  },
  {
    title: "Value Transparency",
    body: "GIA certification provides an objective, globally recognised benchmark. The conversion process is documented and verifiable, eliminating the opacity that characterises many alternative asset classes.",
  },
];

const PROCESS = [
  { step: "01", title: "Initial Conversation", body: "We discuss your acquisition objectives, budget, and timeline. No obligation. All conversations are under commercial confidence from the first contact." },
  { step: "02", title: "Strategy Alignment", body: "We outline a diamond acquisition approach specific to your parameters: carat range, colour, conversion candidacy, and expected hold period." },
  { step: "03", title: "Stone Identification", body: "We source and assess candidates from our network. Where conversion is viable, we provide an assessment of projected FL outcome and associated pricing." },
  { step: "04", title: "Acquisition & Documentation", body: "Stones are acquired and converted or supplied with full GIA certification, provenance documentation, and written acquisition rationale for portfolio records." },
];

export default function Investment() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end"
        >
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              Investment Advisory
            </motion.p>
            <motion.h1
              variants={up}
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "rgba(255,255,255,0.9)" }}
            >
              Diamonds as a<br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>Store of Value.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.div variants={up} className="space-y-4">
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              FL-grade diamonds at meaningful carat weights have historically functioned as a portable,
              non-correlated store of value. The IF→FL conversion represents a specific, documentable arbitrage:
              buy IF, convert to FL, hold or sell at FL pricing.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              We advise a small number of private buyers and family offices on diamond acquisition strategy.
              Referral or introduction preferred, though direct enquiry is also welcomed.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── The Opportunity ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-5 md:space-y-6"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>
              The Arbitrage
            </motion.p>
            <motion.h2
              variants={up}
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.88)" }}
            >
              The IF → FL<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>Opportunity.</span>
            </motion.h2>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
            <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              GIA-certified FL diamonds command a material premium over IF at commercial scale.
              The cost of conversion (regrind, GIA re-submission, and handling) is predictable
              and substantially below that premium in the majority of viable cases.
            </motion.p>
            <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              For a buyer who acquires IF at a market rate, commissions conversion, and receives back
              a FL-certified stone, the capital gain is structurally embedded in the process.
              GIA certification makes the outcome verifiable and the exit path straightforward.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              { label: "Premium of FL over IF (1ct, D–F colour)", value: "15–35%" },
              { label: "Typical conversion cost as % of FL premium", value: "< 30%" },
              { label: "GIA certification: objective exit benchmark", value: "Yes" },
              { label: "Minimum engagement (AUD)", value: "$50,000" },
              { label: "Typical hold period", value: "12–36 months" },
            ].map((row) => (
              <motion.div
                key={row.label}
                variants={up}
                className="flex items-baseline justify-between gap-6 py-4 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>{row.label}</span>
                <span className="text-sm shrink-0 tabular-nums" style={{ color: "rgba(255,255,255,0.8)" }}>{row.value}</span>
              </motion.div>
            ))}
            <p className="text-[9px] mt-3" style={{ color: "rgba(255,255,255,0.2)" }}>
              All figures are indicative and vary by stone parameters. Past performance does not guarantee future returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Diamonds ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-xl space-y-4"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>
              The Asset Case
            </motion.p>
            <motion.h2
              variants={up}
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#02274A" }}
            >
              Why FL diamonds<br />
              <span style={{ color: "rgba(2,39,74,0.3)" }}>hold their value.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={up}
                className="p-7 md:p-8 space-y-4 border-t-2"
                style={{ background: "white", borderTopColor: "#1CA9C9" }}
              >
                <h3 className="font-serif text-xl" style={{ color: "#02274A" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#02274A" }}>
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-xl space-y-4"
          >
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em]" style={{ color: "#1CA9C9" }}>
              How It Works
            </motion.p>
            <motion.h2
              variants={up}
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.88)" }}
            >
              From first conversation<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>to certified acquisition.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROCESS.map((s) => (
              <motion.div
                key={s.step}
                variants={up}
                className="p-6 space-y-4 border"
                style={{ borderColor: "rgba(28,169,201,0.12)", background: "rgba(28,169,201,0.04)" }}
              >
                <span className="font-serif text-3xl" style={{ color: "rgba(28,169,201,0.35)" }}>{s.step}</span>
                <h3 className="text-sm font-medium text-white">{s.title}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{s.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center space-y-6 md:space-y-8"
        >
          <motion.h2
            variants={up}
            className="font-serif leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "#02274A" }}
          >
            Ready to explore<br />
            <span style={{ color: "rgba(2,39,74,0.3)" }}>diamond as an asset?</span>
          </motion.h2>
          <motion.p variants={up} className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.45)" }}>
            We work with a limited number of private buyers and family offices.
            All enquiries are handled directly and under strict commercial confidence.
          </motion.p>
          <motion.div variants={up} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link href="/contact" data-testid="btn-investment-consultation">
              <button
                className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-80"
                style={{ background: "#1CA9C9", height: "50px", padding: "0 2.25rem", border: "none" }}
              >
                Begin a Conversation
              </button>
            </Link>
            <Link href="/faq" data-testid="btn-investment-faq">
              <button
                className="w-full sm:w-auto text-[10px] uppercase tracking-[0.3em] transition-all hover:border-[#02274A]"
                style={{
                  height: "50px",
                  padding: "0 2.25rem",
                  border: "1px solid rgba(2,39,74,0.2)",
                  color: "rgba(2,39,74,0.55)",
                  background: "transparent",
                }}
              >
                Common Questions
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
