import { Link } from "wouter";
import { motion } from "framer-motion";

const NAV_LEFT = [
  { href: "/diamonds",   label: "Diamonds" },
  { href: "/services",   label: "Services" },
  { href: "/investment", label: "Investment" },
  { href: "/about",      label: "About" },
];

const NAV_RIGHT = [
  { href: "/faq",     label: "FAQ" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const CONTACTS = [
  { label: "Email",     value: "help@flxdiamond.com",  teal: true  },
  { label: "Australia", value: "+91 91042 90971",       teal: false },
  { label: "India",     value: "+91 99982 17496",       teal: false },
  { label: "Location",  value: "Geelong, VIC, Australia", teal: false },
];

export function Footer() {
  return (
    <footer style={{ background: "#010d1a", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Editorial banner ── */}
      <div className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(28,169,201,0.15)" }}>

        {/* Animated teal shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #1CA9C9 30%, rgba(28,169,201,0.4) 60%, transparent 100%)",
            animation: "shimmerLine 6s ease-in-out infinite",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" data-testid="footer-logo" className="inline-block group">
              <img
                src="/flx-logo-v2-trimmed.png"
                alt="FLX Diamond"
                style={{
                  height: "clamp(56px, 8vw, 96px)",
                  width: "auto",
                  mixBlendMode: "screen",
                  opacity: 0.92,
                }}
              />
            </Link>
          </motion.div>

          {/* Editorial closing line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm text-right md:pb-3"
          >
            <p
              className="font-serif leading-snug mb-4"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "rgba(255,255,255,0.22)" }}
            >
              Every FL certificate begins with a practiced eye and 47 years of accumulated judgment.
            </p>
            <span className="block w-10 h-px ml-auto" style={{ background: "#1CA9C9" }} />
          </motion.div>

        </div>
      </div>

      {/* ── Main grid ── */}
      <div
        className="max-w-7xl mx-auto px-6 pb-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-14">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <p className="text-[9px] uppercase tracking-[0.45em] font-medium" style={{ color: "rgba(28,169,201,0.7)" }}>
              Est. 1978
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)", maxWidth: "200px" }}>
              B2B diamond sourcing and precision IF→FL conversion. Serving diamond traders, jewellers,
              and investors globally from Geelong, Victoria, Australia.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-2 border"
              style={{ borderColor: "rgba(28,169,201,0.15)", background: "rgba(28,169,201,0.04)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1CA9C9", opacity: 0.7 }} />
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(28,169,201,0.65)" }}>
                B2B Enquiries Only
              </span>
            </div>
          </div>

          {/* Navigation — two sub-columns */}
          <div className="space-y-6">
            <p className="text-[9px] uppercase tracking-[0.45em] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LEFT.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[11px] tracking-wide transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {NAV_RIGHT.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[11px] tracking-wide transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <p className="text-[9px] uppercase tracking-[0.45em] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
              Contact
            </p>
            <ul className="space-y-4">
              {CONTACTS.map(c => (
                <li key={c.label} className="space-y-0.5">
                  <p className="text-[8px] uppercase tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {c.label}
                  </p>
                  <p
                    className="text-[11px] leading-snug"
                    style={{ color: c.teal ? "rgba(28,169,201,0.8)" : "rgba(255,255,255,0.45)" }}
                  >
                    {c.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Trusted Partners */}
          <div className="space-y-6">
            <p className="text-[9px] uppercase tracking-[0.45em] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
              Trusted By
            </p>
            <ul className="space-y-4">
              {[
                { name: "KGK Diamond",      role: "Sourcing Partner" },
                { name: "Venus Jewellery",   role: "Conversion Partner" },
                { name: "Excell Overseas",   role: "Trade Partner" },
              ].map(p => (
                <li key={p.name} className="space-y-0.5">
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{p.name}</p>
                  <p className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.2)" }}>{p.role}</p>
                </li>
              ))}
            </ul>
            <p className="text-[10px] leading-relaxed pt-2" style={{ color: "rgba(255,255,255,0.15)" }}>
              All enquiries handled under strict commercial confidence.
            </p>
          </div>

        </div>
      </div>

      {/* ── GIA trust bar ── */}
      <div
        className="max-w-7xl mx-auto px-6 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {[
            "GIA Certified Stones",
            "47 Years Mastery",
            "IF → FL Conversion Specialists",
            "B2B Only",
            "Commercial Confidence Guaranteed",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(28,169,201,0.4)" }} />
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.2)" }}>
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
          &copy; {new Date().getFullYear()} FLX Diamonds Pty Ltd &mdash; Geelong, Victoria, Australia
        </p>
        <div className="flex gap-6">
          {[{ href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[9px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>

    </footer>
  );
}
