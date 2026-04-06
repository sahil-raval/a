import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

/* ─── Floating label input — light card version ─────────────── */
function FloatInput({
  label, type = "text", testId, value, onChange, required,
}: {
  label: string; type?: string; testId: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative" style={{ paddingTop: "20px" }}>
      <label
        style={{
          position: "absolute",
          left: "0px",
          top: lifted ? "0px" : "32px",
          fontSize: lifted ? "9px" : "12px",
          letterSpacing: lifted ? "0.42em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : "rgba(2,39,74,0.45)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
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
          height: "46px",
          background: "transparent",
          border: "none",
          borderBottom: `1.5px solid ${focused ? "#1CA9C9" : "rgba(2,39,74,0.14)"}`,
          outline: "none",
          color: "#02274A",
          fontSize: "14px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          paddingBottom: "8px",
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
    <div className="relative" style={{ paddingTop: "20px" }}>
      <label
        style={{
          position: "absolute",
          left: "0px",
          top: lifted ? "0px" : "32px",
          fontSize: lifted ? "9px" : "12px",
          letterSpacing: lifted ? "0.42em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : "rgba(2,39,74,0.45)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
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
          height: "46px",
          background: "transparent",
          border: "none",
          borderBottom: `1.5px solid ${focused ? "#1CA9C9" : "rgba(2,39,74,0.14)"}`,
          outline: "none",
          color: value ? "#02274A" : "transparent",
          fontSize: "14px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          paddingBottom: "8px",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" disabled style={{ background: "white" }} />
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ background: "white", color: "#02274A" }}>
            {o.label}
          </option>
        ))}
      </select>
      <svg width="10" height="6" viewBox="0 0 10 6"
        style={{ position: "absolute", right: "4px", bottom: "18px", opacity: 0.3, pointerEvents: "none" }}
      >
        <path d="M1 1l4 4 4-4" stroke="#02274A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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
    <div className="relative" style={{ paddingTop: "20px" }}>
      <label
        style={{
          position: "absolute",
          left: "0px",
          top: lifted ? "0px" : "32px",
          fontSize: lifted ? "9px" : "12px",
          letterSpacing: lifted ? "0.42em" : "0.04em",
          color: lifted && focused ? "#1CA9C9" : "rgba(2,39,74,0.45)",
          textTransform: "uppercase",
          transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
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
        rows={3}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1.5px solid ${focused ? "#1CA9C9" : "rgba(2,39,74,0.14)"}`,
          outline: "none",
          color: "#02274A",
          fontSize: "14px",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s ease",
          resize: "none",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      />
    </div>
  );
}

/* ─── Decorative diamond SVG ────────────────────────────────── */
function DiamondArt() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 160, ease: "linear", repeat: Infinity }}
      style={{ position: "absolute", inset: 0 }}
    >
      <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }} fill="none">
        <polygon points="300,30 570,300 300,570 30,300" stroke="rgba(28,169,201,0.18)" strokeWidth="1" />
        <polygon points="300,100 500,300 300,500 100,300" stroke="rgba(28,169,201,0.12)" strokeWidth="0.8" />
        <polygon points="300,180 420,300 300,420 180,300" stroke="rgba(28,169,201,0.22)" strokeWidth="1" />
        <polygon points="300,230 370,300 300,370 230,300" stroke="rgba(28,169,201,0.14)" strokeWidth="0.7" />
        <line x1="300" y1="30" x2="300" y2="570" stroke="rgba(28,169,201,0.08)" strokeWidth="0.5" />
        <line x1="30" y1="300" x2="570" y2="300" stroke="rgba(28,169,201,0.08)" strokeWidth="0.5" />
        <line x1="300" y1="30" x2="570" y2="300" stroke="rgba(28,169,201,0.06)" strokeWidth="0.5" />
        <line x1="570" y1="300" x2="300" y2="570" stroke="rgba(28,169,201,0.06)" strokeWidth="0.5" />
        <line x1="300" y1="570" x2="30" y2="300" stroke="rgba(28,169,201,0.06)" strokeWidth="0.5" />
        <line x1="30" y1="300" x2="300" y2="30" stroke="rgba(28,169,201,0.06)" strokeWidth="0.5" />
        <line x1="300" y1="30" x2="100" y2="300" stroke="rgba(28,169,201,0.05)" strokeWidth="0.4" />
        <line x1="570" y1="300" x2="300" y2="100" stroke="rgba(28,169,201,0.05)" strokeWidth="0.4" />
        <line x1="300" y1="570" x2="500" y2="300" stroke="rgba(28,169,201,0.05)" strokeWidth="0.4" />
        <line x1="30" y1="300" x2="300" y2="500" stroke="rgba(28,169,201,0.05)" strokeWidth="0.4" />
        {/* Table lines */}
        <line x1="300" y1="30" x2="300" y2="180" stroke="rgba(28,169,201,0.1)" strokeWidth="0.5" />
        <line x1="570" y1="300" x2="420" y2="300" stroke="rgba(28,169,201,0.1)" strokeWidth="0.5" />
        <line x1="300" y1="570" x2="300" y2="420" stroke="rgba(28,169,201,0.1)" strokeWidth="0.5" />
        <line x1="30" y1="300" x2="180" y2="300" stroke="rgba(28,169,201,0.1)" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── Submit button ─────────────────────────────────────────── */
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
        height: "54px",
        background: hovered ? "#1CA9C9" : "#02274A",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background 0.4s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: "10px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "white",
          fontWeight: 500,
        }}
      >
        Submit Enquiry
      </span>
    </button>
  );
}

/* ─── Constants ─────────────────────────────────────────────── */
const ENQUIRY_TYPES = [
  { value: "conversion",  label: "IF→FL Conversion" },
  { value: "supply",      label: "Diamond Supply" },
  { value: "investment",  label: "Investment Advisory" },
  { value: "partnership", label: "Trade Partnership" },
  { value: "other",       label: "Other" },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const up = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Main page ─────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ══ Split hero ══ */}
      <div className="flex flex-col lg:flex-row" style={{ flex: 1, minHeight: "100vh" }}>

        {/* ─── LEFT — Dark panel ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative flex flex-col justify-between overflow-hidden lg:w-5/12"
          style={{
            background: "linear-gradient(145deg, #021d3a 0%, #02274A 50%, #03305c 100%)",
            padding: "clamp(100px, 12vw, 140px) clamp(32px, 5vw, 64px) clamp(48px, 6vw, 72px)",
          }}
        >
          {/* Teal left-edge accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
            background: "linear-gradient(180deg, transparent 0%, #1CA9C9 30%, #1CA9C9 70%, transparent 100%)",
            opacity: 0.7,
          }} />

          {/* Large diamond art — background */}
          <div style={{
            position: "absolute",
            right: "-120px", top: "50%", transform: "translateY(-50%)",
            width: "520px", height: "520px",
            pointerEvents: "none",
          }}>
            <DiamondArt />
          </div>

          {/* Giant watermark "FLX" */}
          <div style={{
            position: "absolute",
            bottom: "-40px", left: "-20px",
            fontSize: "clamp(140px, 20vw, 220px)",
            fontFamily: "'Playfair Display', serif",
            color: "rgba(255,255,255,0.025)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            fontWeight: 400,
          }}>
            FLX
          </div>

          {/* ── Headline content ── */}
          <div className="relative z-10 space-y-7">
            <motion.p variants={up}
              style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "#1CA9C9", fontWeight: 500 }}
            >
              Begin the Conversation
            </motion.p>

            <motion.h1 variants={up}
              className="font-serif"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.08, color: "white" }}
            >
              Get in touch.
            </motion.h1>

            <motion.div variants={up} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "1px", background: "#1CA9C9" }} />
              <div style={{ width: "16px", height: "1px", background: "rgba(28,169,201,0.35)" }} />
            </motion.div>

            <motion.p variants={up}
              style={{ fontSize: "13px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: "300px" }}
            >
              All enquiries are handled personally under strict commercial confidence. No sales process — just a direct conversation.
            </motion.p>
          </div>

          {/* ── Contact details ── */}
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="relative z-10 space-y-5 mt-12 lg:mt-0"
          >
            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.07)" }} />

            {[
              { label: "Location", value: "Geelong, Victoria, Australia", teal: false },
              { label: "Email",    value: "help@flxdiamond.com",          teal: true  },
              { label: "Phone",    value: "+91 91042 90971  ·  +91 99982 17496", teal: false },
            ].map(({ label, value, teal }) => (
              <motion.div key={label} variants={up}
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <span style={{ fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  {label}
                </span>
                <span style={{ fontSize: "12px", color: teal ? "#1CA9C9" : "rgba(255,255,255,0.72)", letterSpacing: "0.01em" }}>
                  {value}
                </span>
              </motion.div>
            ))}

            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.07)" }} />

            <motion.div variants={up} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1CA9C9", opacity: 0.9 }} />
              <span style={{ fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                B2B Trade Enquiries Only
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT — Light form panel ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center lg:w-7/12"
          style={{
            background: "#FFFFFF",
            padding: "clamp(100px, 10vw, 120px) clamp(32px, 6vw, 80px) clamp(48px, 6vw, 80px)",
          }}
        >
          {/* Subtle teal glow top-right */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "400px", height: "400px",
            background: "radial-gradient(circle at top right, rgba(28,169,201,0.06), transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Corner brackets */}
          <div style={{ position: "absolute", top: "88px", right: "40px", width: "40px", height: "40px",
            borderTop: "1px solid rgba(28,169,201,0.2)", borderRight: "1px solid rgba(28,169,201,0.2)" }} />
          <div style={{ position: "absolute", bottom: "40px", left: "40px", width: "40px", height: "40px",
            borderBottom: "1px solid rgba(28,169,201,0.12)", borderLeft: "1px solid rgba(28,169,201,0.12)" }} />

          <div style={{ width: "100%", maxWidth: "520px" }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ textAlign: "center", padding: "60px 0" }}
                  className="space-y-8"
                >
                  <div style={{ margin: "0 auto", width: "72px", height: "72px" }}>
                    <svg viewBox="0 0 72 72" fill="none" style={{ width: "72px", height: "72px" }}>
                      <polygon points="36,4 68,36 36,68 4,36" stroke="#1CA9C9" strokeWidth="1" />
                      <motion.path
                        d="M24 36l8 8 16-16"
                        stroke="#1CA9C9" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h2 className="font-serif" style={{ fontSize: "2rem", color: "#02274A" }}>
                      Enquiry received.
                    </h2>
                    <p style={{ fontSize: "13px", lineHeight: 1.7, color: "rgba(2,39,74,0.55)", maxWidth: "340px", margin: "0 auto" }}>
                      We will respond personally within one business day. All correspondence is treated as commercially confidential.
                    </p>
                  </div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "10px 20px", border: "1px solid rgba(28,169,201,0.25)",
                  }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#1CA9C9" }}>
                      help@flxdiamond.com
                    </span>
                  </div>
                  <div>
                    <Link href="/services">
                      <button style={{
                        fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase",
                        color: "rgba(2,39,74,0.4)", background: "none", border: "none",
                        cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      }}
                        className="hover:text-[#1CA9C9] transition-colors"
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
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", flexDirection: "column", gap: "0px" }}
                >
                  {/* Form heading */}
                  <div style={{ marginBottom: "40px" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.52em", textTransform: "uppercase", color: "rgba(2,39,74,0.4)", marginBottom: "10px", fontWeight: 500 }}>
                      Enquiry Form
                    </p>
                    <h2 className="font-serif" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#02274A", lineHeight: 1.2 }}>
                      How can we<br />
                      <span style={{ color: "#1CA9C9" }}>help you?</span>
                    </h2>
                  </div>

                  {/* Fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
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

                  <div style={{ height: "32px" }} />
                  <SubmitButton />

                  <p style={{
                    textAlign: "center", paddingTop: "16px",
                    fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                    color: "rgba(2,39,74,0.3)",
                  }}>
                    All correspondence is commercially confidential
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* ══ Bottom credentials strip ══ */}
      <div style={{
        background: "#02274A",
        padding: "16px clamp(32px, 5vw, 64px)",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          {["GIA Certified", "47 Years Mastery", "IF→FL Specialists", "B2B Only", "Commercial Confidence"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#1CA9C9", display: "inline-block", opacity: 0.8 }} />
              <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{t}</span>
            </span>
          ))}
        </div>
        <Link href="/faq">
          <span style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(28,169,201,0.6)", cursor: "pointer" }}
            className="hover:text-[#1CA9C9] transition-colors"
          >
            Read FAQ →
          </span>
        </Link>
      </div>

    </div>
  );
}
