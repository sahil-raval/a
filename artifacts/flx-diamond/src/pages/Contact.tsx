import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

/* ─── Floating label input ─────────────────────────────────── */
function FloatInput({
  label, type = "text", testId, value, onChange, required,
}: {
  label: string; type?: string; testId: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative" style={{ paddingTop: "18px" }}>
      <label
        style={{
          position: "absolute",
          left: "1px",
          top: lifted ? "0px" : "30px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.45em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : lifted ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.55)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}{required && <span style={{ color: "#1CA9C9" }}> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-testid={testId}
        style={{
          width: "100%",
          height: "44px",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#1CA9C9" : "rgba(255,255,255,0.22)"}`,
          outline: "none",
          color: "rgba(255,255,255,0.9)",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          paddingBottom: "6px",
        }}
      />
    </div>
  );
}

function FloatSelect({
  label, options, testId, value, onChange, required,
}: {
  label: string; options: { value: string; label: string }[];
  testId: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative" style={{ paddingTop: "18px" }}>
      <label
        style={{
          position: "absolute",
          left: "1px",
          top: lifted ? "0px" : "30px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.45em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : lifted ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.55)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}{required && <span style={{ color: "#1CA9C9" }}> *</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-testid={testId}
        style={{
          width: "100%",
          height: "44px",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#1CA9C9" : "rgba(255,255,255,0.22)"}`,
          outline: "none",
          color: value ? "rgba(255,255,255,0.9)" : "transparent",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          paddingBottom: "6px",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" disabled style={{ background: "#02274A" }} />
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: "#02274A", color: "white" }}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <svg
        width="10" height="6"
        viewBox="0 0 10 6"
        style={{
          position: "absolute", right: "4px", bottom: "16px",
          opacity: 0.55, pointerEvents: "none",
        }}
      >
        <path d="M1 1l4 4 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FloatTextarea({
  label, testId, value, onChange, required,
}: {
  label: string; testId: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative" style={{ paddingTop: "18px" }}>
      <label
        style={{
          position: "absolute",
          left: "1px",
          top: lifted ? "0px" : "30px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.45em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : lifted ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.55)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}{required && <span style={{ color: "#1CA9C9" }}> *</span>}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-testid={testId}
        rows={4}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#1CA9C9" : "rgba(255,255,255,0.22)"}`,
          outline: "none",
          color: "rgba(255,255,255,0.9)",
          fontSize: "13px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          resize: "none",
          paddingTop: "8px",
          paddingBottom: "6px",
        }}
      />
    </div>
  );
}

/* ─── Animated diamond wireframe SVG ───────────────────────── */
function DiamondWireframe() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <svg
        viewBox="0 0 400 400"
        style={{ width: "100%", height: "100%", opacity: 0.07 }}
        fill="none"
      >
        {/* Outer diamond */}
        <polygon
          points="200,20 380,200 200,380 20,200"
          stroke="#1CA9C9" strokeWidth="0.8"
        />
        {/* Inner cross lines */}
        <line x1="200" y1="20" x2="200" y2="380" stroke="#1CA9C9" strokeWidth="0.5" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="#1CA9C9" strokeWidth="0.5" />
        {/* Diagonal facets */}
        <line x1="200" y1="20" x2="380" y2="200" stroke="#1CA9C9" strokeWidth="0.5" />
        <line x1="380" y1="200" x2="200" y2="380" stroke="#1CA9C9" strokeWidth="0.5" />
        <line x1="200" y1="380" x2="20" y2="200" stroke="#1CA9C9" strokeWidth="0.5" />
        <line x1="20" y1="200" x2="200" y2="20" stroke="#1CA9C9" strokeWidth="0.5" />
        {/* Inner facet ring */}
        <polygon
          points="200,80 320,200 200,320 80,200"
          stroke="#1CA9C9" strokeWidth="0.6"
        />
        <line x1="200" y1="80" x2="320" y2="200" stroke="#1CA9C9" strokeWidth="0.4" />
        <line x1="320" y1="200" x2="200" y2="320" stroke="#1CA9C9" strokeWidth="0.4" />
        <line x1="200" y1="320" x2="80" y2="200" stroke="#1CA9C9" strokeWidth="0.4" />
        <line x1="80" y1="200" x2="200" y2="80" stroke="#1CA9C9" strokeWidth="0.4" />
        {/* Core diamond */}
        <polygon
          points="200,140 260,200 200,260 140,200"
          stroke="#1CA9C9" strokeWidth="0.8"
        />
        {/* Table facets from outer to inner */}
        <line x1="200" y1="20" x2="200" y2="140" stroke="#1CA9C9" strokeWidth="0.3" />
        <line x1="380" y1="200" x2="260" y2="200" stroke="#1CA9C9" strokeWidth="0.3" />
        <line x1="200" y1="380" x2="200" y2="260" stroke="#1CA9C9" strokeWidth="0.3" />
        <line x1="20" y1="200" x2="140" y2="200" stroke="#1CA9C9" strokeWidth="0.3" />
        {/* Corner to inner ring diagonals */}
        <line x1="200" y1="20" x2="80" y2="200" stroke="#1CA9C9" strokeWidth="0.25" />
        <line x1="380" y1="200" x2="200" y2="80" stroke="#1CA9C9" strokeWidth="0.25" />
        <line x1="200" y1="380" x2="320" y2="200" stroke="#1CA9C9" strokeWidth="0.25" />
        <line x1="20" y1="200" x2="200" y2="320" stroke="#1CA9C9" strokeWidth="0.25" />
      </svg>
    </motion.div>
  );
}

/* ─── Glowing teal orb ─────────────────────────────────────── */
function TealOrb({ x, y, size, opacity }: { x: string; y: string; size: number; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x, top: y,
        width: size, height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, #1CA9C9, transparent 70%)",
        opacity,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        filter: "blur(40px)",
      }}
    />
  );
}

/* ─── Main component ────────────────────────────────────────── */
const ENQUIRY_TYPES = [
  { value: "conversion",   label: "IF→FL Conversion" },
  { value: "supply",       label: "Diamond Supply" },
  { value: "investment",   label: "Investment Advisory" },
  { value: "partnership",  label: "Trade Partnership" },
  { value: "other",        label: "Other" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const up = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div
      style={{
        background: "#02274A",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── ambient glow orbs ── */}
      <TealOrb x="75%" y="30%" size={500} opacity={0.08} />
      <TealOrb x="20%" y="70%" size={300} opacity={0.05} />

      {/* ── grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(28,169,201,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28,169,201,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── top accent line ── */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #1CA9C9 30%, rgba(28,169,201,0.3) 70%, transparent 100%)",
          marginTop: "80px",
          opacity: 0.6,
        }}
      />

      {/* ══ Main split layout ══ */}
      <div className="relative max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row">

        {/* ── LEFT PANEL ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative flex flex-col justify-between px-8 md:px-12 pt-36 pb-12 lg:pb-20 lg:w-5/12"
        >
          {/* Diamond wireframe decorative */}
          <div
            className="absolute pointer-events-none hidden lg:block"
            style={{ width: "340px", height: "340px", bottom: "80px", left: "-40px", zIndex: 0 }}
          >
            <DiamondWireframe />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-8">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.55em]" style={{ color: "#1CA9C9" }}>
              Begin the Conversation
            </motion.p>

            <motion.h1
              variants={up}
              className="font-serif leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "rgba(255,255,255,0.92)" }}
            >
              Let's<br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.35)",
                  color: "transparent",
                }}
              >
                talk.
              </span>
            </motion.h1>

            <motion.div variants={up} className="space-y-1">
              <div className="w-10 h-px" style={{ background: "#1CA9C9" }} />
              <div className="w-5 h-px mt-1.5" style={{ background: "rgba(28,169,201,0.35)" }} />
            </motion.div>

            <motion.p variants={up} className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              All enquiries are handled personally under strict commercial confidence. No sales process — just a direct conversation.
            </motion.p>
          </div>

          {/* Contact details — bottom of left panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-10 mt-12 lg:mt-0 space-y-6"
          >
            {/* Horizontal rule */}
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.12)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5">
              {[
                { icon: "◎", label: "Location", value: "Geelong, Victoria, Australia" },
                { icon: "◉", label: "Email",    value: "help@flxdiamond.com", teal: true },
                { icon: "◈", label: "Phone",    value: "+91 91042 90971 · +91 99982 17496" },
              ].map(({ icon, label, value, teal }) => (
                <motion.div key={label} variants={up} className="flex items-start gap-4">
                  <span className="text-base mt-0.5 shrink-0" style={{ color: "rgba(28,169,201,0.75)", fontFamily: "monospace" }}>
                    {icon}
                  </span>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.45em] mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
                    <p className="text-[12px] leading-snug" style={{ color: teal ? "#1CA9C9" : "rgba(255,255,255,0.75)" }}>
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.12)" }} />

            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1CA9C9", opacity: 0.8 }} />
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                B2B Trade Enquiries Only
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Vertical divider — desktop only ── */}
        <div
          className="hidden lg:block self-stretch w-px my-20"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(28,169,201,0.25) 30%, rgba(28,169,201,0.25) 70%, transparent 100%)" }}
        />

        {/* ── RIGHT PANEL — Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center lg:w-7/12 px-8 md:px-12 lg:px-16 py-12 lg:pt-36 lg:pb-20"
        >
          {/* Subtle corner accent */}
          <div
            className="absolute top-12 right-8 hidden lg:block"
            style={{
              width: "120px", height: "120px",
              border: "1px solid rgba(28,169,201,0.08)",
              borderRadius: "0",
            }}
          />
          <div
            className="absolute top-12 right-8 hidden lg:block"
            style={{
              width: "80px", height: "80px",
              border: "1px solid rgba(28,169,201,0.05)",
              margin: "20px",
            }}
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full text-center space-y-8 py-16"
              >
                {/* Animated checkmark diamond */}
                <div className="mx-auto" style={{ width: "80px", height: "80px", position: "relative" }}>
                  <svg viewBox="0 0 80 80" fill="none" style={{ width: "80px", height: "80px" }}>
                    <polygon points="40,4 76,40 40,76 4,40" stroke="#1CA9C9" strokeWidth="1" />
                    <motion.path
                      d="M28 40l8 8 16-16"
                      stroke="#1CA9C9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <h2 className="font-serif text-3xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                    Enquiry received.
                  </h2>
                  <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.62)" }}>
                    We will respond personally within one business day. All correspondence is treated as commercially confidential.
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-5 py-2 border"
                  style={{ borderColor: "rgba(28,169,201,0.2)" }}
                >
                  <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "#1CA9C9" }}>
                    help@flxdiamond.com
                  </span>
                </div>

                <div>
                  <Link href="/services">
                    <button
                      className="text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
                    >
                      ← Browse our services
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-2"
              >
                {/* Form header */}
                <div className="mb-8 space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.55em]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Enquiry Form
                  </p>
                  <div className="w-8 h-px" style={{ background: "rgba(28,169,201,0.35)" }} />
                </div>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FloatInput label="First Name" testId="input-firstname" value={form.firstName} onChange={v => set("firstName", v)} required />
                  <FloatInput label="Last Name"  testId="input-lastname"  value={form.lastName}  onChange={v => set("lastName", v)}  required />
                </div>

                <FloatInput label="Business Email" type="email" testId="input-email" value={form.email} onChange={v => set("email", v)} required />

                <FloatInput label="Company / Organisation" testId="input-company" value={form.company} onChange={v => set("company", v)} />

                <FloatSelect
                  label="Nature of Enquiry"
                  testId="select-enquiry-type"
                  value={form.type}
                  onChange={v => set("type", v)}
                  options={ENQUIRY_TYPES}
                  required
                />

                <FloatTextarea label="Message" testId="input-message" value={form.message} onChange={v => set("message", v)} required />

                {/* Spacer */}
                <div style={{ height: "20px" }} />

                {/* Submit */}
                <SubmitButton />

                <p className="text-center pt-3 text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  All correspondence is commercially confidential
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Bottom strip ── */}
      <div
        className="relative max-w-7xl mx-auto px-8 md:px-12 py-5 flex flex-wrap justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="flex flex-wrap gap-x-8 gap-y-1">
          {["GIA Certified", "47 Years Mastery", "B2B Only", "Commercial Confidence"].map(t => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: "rgba(28,169,201,0.6)" }} />
              <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.38)" }}>{t}</span>
            </span>
          ))}
        </div>
        <Link href="/faq">
          <span className="text-[9px] uppercase tracking-[0.3em] transition-colors hover:text-[#1CA9C9]" style={{ color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
            Read FAQ →
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ─── Animated submit button ───────────────────────────────── */
function SubmitButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid="btn-submit"
      style={{
        position: "relative",
        width: "100%",
        height: "52px",
        background: "transparent",
        border: "1px solid",
        borderColor: hovered ? "#1CA9C9" : "rgba(255,255,255,0.28)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Fill sweep on hover */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "#1CA9C9",
          originX: 0,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: hovered ? "#02274A" : "rgba(255,255,255,0.7)",
          transition: "color 0.3s ease",
          fontWeight: 500,
        }}
      >
        Submit Enquiry
      </span>
    </button>
  );
}
