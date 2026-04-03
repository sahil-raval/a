import { useState } from "react";
import { motion } from "framer-motion";

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ENQUIRY_TYPES = [
  { value: "conversion", label: "IF→FL Conversion" },
  { value: "supply",     label: "Diamond Supply" },
  { value: "investment", label: "Investment Advisory" },
  { value: "partnership",label: "Trade Partnership" },
  { value: "other",      label: "Other" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", type: "", message: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-28 px-6" style={{ background: "#02274A" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end"
        >
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              Begin the Conversation
            </motion.p>
            <motion.h1
              variants={up}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
            >
              Contact.<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>We respond directly.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.p variants={up} className="text-sm md:text-base leading-relaxed md:pb-3" style={{ color: "rgba(255,255,255,0.38)" }}>
            All enquiries are handled personally, under strict commercial confidence.
            There is no sales team — your message reaches the people who will actually do the work.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 md:py-24 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left — contact details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-2 space-y-10"
          >
            <div className="space-y-8">
              {[
                {
                  label: "Location",
                  lines: ["Geelong, Victoria", "Australia"],
                },
                {
                  label: "Phone",
                  lines: ["+91 91042 90971", "+91 99982 17496"],
                },
                {
                  label: "Email",
                  lines: ["help@flxdiamond.com"],
                },
              ].map(({ label, lines }) => (
                <motion.div key={label} variants={up} className="space-y-2">
                  <p className="text-[9px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
                    {label}
                  </p>
                  {lines.map(l => (
                    <p key={l} className="text-sm" style={{ color: "rgba(2,39,74,0.65)" }}>{l}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            <motion.div variants={up} className="w-full h-px" style={{ background: "rgba(2,39,74,0.08)" }} />

            <motion.div variants={up} className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(2,39,74,0.3)" }}>
                Response time
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>
                We aim to respond to all enquiries within one business day (Australian Eastern Time).
                All correspondence is treated as commercially confidential.
              </p>
            </motion.div>

            <motion.div variants={up} className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(2,39,74,0.3)" }}>
                This is B2B only
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>
                FLX Diamonds operates exclusively with trade professionals, jewellers,
                investors, and institutions. We do not service retail enquiries.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 md:p-14 text-center space-y-5 border"
                style={{ background: "#02274A", borderColor: "rgba(28,169,201,0.2)" }}
              >
                <span className="block text-2xl font-serif text-white">Enquiry received.</span>
                <span className="block text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                  We will respond personally within one business day, under commercial confidence.
                </span>
                <span className="block text-[10px] uppercase tracking-[0.4em]" style={{ color: "#1CA9C9" }}>
                  help@flxdiamond.com
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 md:p-10 border"
                style={{ background: "white", borderColor: "rgba(2,39,74,0.08)" }}
              >
                <motion.p variants={up} className="text-[10px] uppercase tracking-[0.4em] mb-6" style={{ color: "#1CA9C9" }}>
                  Enquiry Form
                </motion.p>

                {/* Name row */}
                <motion.div variants={up} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First Name" required>
                    <input
                      className="w-full h-11 px-4 text-sm border outline-none focus:border-[#1CA9C9] transition-colors"
                      style={{ borderColor: "rgba(2,39,74,0.15)", color: "#02274A", background: "#F4F8FC" }}
                      value={form.firstName}
                      onChange={e => set("firstName", e.target.value)}
                      required
                      data-testid="input-firstname"
                    />
                  </FormField>
                  <FormField label="Last Name" required>
                    <input
                      className="w-full h-11 px-4 text-sm border outline-none focus:border-[#1CA9C9] transition-colors"
                      style={{ borderColor: "rgba(2,39,74,0.15)", color: "#02274A", background: "#F4F8FC" }}
                      value={form.lastName}
                      onChange={e => set("lastName", e.target.value)}
                      required
                      data-testid="input-lastname"
                    />
                  </FormField>
                </motion.div>

                <motion.div variants={up}>
                  <FormField label="Business Email" required>
                    <input
                      type="email"
                      className="w-full h-11 px-4 text-sm border outline-none focus:border-[#1CA9C9] transition-colors"
                      style={{ borderColor: "rgba(2,39,74,0.15)", color: "#02274A", background: "#F4F8FC" }}
                      value={form.email}
                      onChange={e => set("email", e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </FormField>
                </motion.div>

                <motion.div variants={up}>
                  <FormField label="Company / Organisation">
                    <input
                      className="w-full h-11 px-4 text-sm border outline-none focus:border-[#1CA9C9] transition-colors"
                      style={{ borderColor: "rgba(2,39,74,0.15)", color: "#02274A", background: "#F4F8FC" }}
                      value={form.company}
                      onChange={e => set("company", e.target.value)}
                      data-testid="input-company"
                    />
                  </FormField>
                </motion.div>

                <motion.div variants={up}>
                  <FormField label="Nature of Enquiry" required>
                    <select
                      className="w-full h-11 px-4 text-sm border outline-none focus:border-[#1CA9C9] transition-colors appearance-none"
                      style={{ borderColor: "rgba(2,39,74,0.15)", color: form.type ? "#02274A" : "rgba(2,39,74,0.38)", background: "#F4F8FC" }}
                      value={form.type}
                      onChange={e => set("type", e.target.value)}
                      required
                      data-testid="select-enquiry-type"
                    >
                      <option value="" disabled>Select…</option>
                      {ENQUIRY_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </FormField>
                </motion.div>

                <motion.div variants={up}>
                  <FormField label="Message" required>
                    <textarea
                      className="w-full px-4 py-3 text-sm border outline-none focus:border-[#1CA9C9] transition-colors resize-none"
                      style={{
                        borderColor: "rgba(2,39,74,0.15)",
                        color: "#02274A",
                        background: "#F4F8FC",
                        minHeight: "120px",
                      }}
                      rows={5}
                      value={form.message}
                      onChange={e => set("message", e.target.value)}
                      required
                      data-testid="input-message"
                    />
                  </FormField>
                </motion.div>

                <motion.div variants={up} className="pt-2">
                  <button
                    type="submit"
                    className="w-full text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-200 hover:opacity-85"
                    style={{ background: "#1CA9C9", height: "50px", border: "none" }}
                    data-testid="btn-submit"
                  >
                    Submit Enquiry
                  </button>
                  <p className="text-center mt-4 text-[10px]" style={{ color: "rgba(2,39,74,0.3)" }}>
                    All correspondence is treated as commercially confidential.
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(2,39,74,0.45)" }}>
        {label}{required && <span style={{ color: "#1CA9C9" }}> *</span>}
      </label>
      {children}
    </div>
  );
}
