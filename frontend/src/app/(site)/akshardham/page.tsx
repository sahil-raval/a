"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Sun, Info, ChevronDown, ChevronUp, Calculator, ArrowRight, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// ─── EmailJS Config ───────────────────────────────────────────────────────────
const SERVICE_ID  = "service_6caf4r6";
const TEMPLATE_ID = "template_sfkwidw"; // create this template in EmailJS dashboard
const PUBLIC_KEY  = "rgu-gpZuMbktPsuRs";

// ─── Constants ────────────────────────────────────────────────────────────────
const SCHEME_END = 2030;

const ZONE_OPTIONS = [
  { value: "1.622", label: "Zone 1 — NT, NW WA (factor 1.622)" },
  { value: "1.536", label: "Zone 2 — QLD, SA, WA (factor 1.536)" },
  { value: "1.382", label: "Zone 3 — NSW, VIC, SE QLD (factor 1.382)" },
  { value: "1.185", label: "Zone 4 — TAS, S. VIC (factor 1.185)" },
];

const STATE_ZONE: Record<string, string> = {
  NSW: "1.382", VIC: "1.382", QLD: "1.536", SA: "1.536",
  WA: "1.536", TAS: "1.185", NT: "1.622", ACT: "1.382",
};

const STATE_OPTIONS = Object.keys(STATE_ZONE).map((s) => ({ value: s, label: s }));

const YEAR_OPTIONS = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

// ─── Success Popup ────────────────────────────────────────────────────────────
function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Results Sent!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Your STC estimate has been sent to our team. We'll be in touch within 24 hours to discuss your installation.
        </p>
        <Button onClick={onClose} className="w-full" size="lg">Sounds good!</Button>
      </div>
    </div>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-muted-foreground/50 hover:text-primary transition-colors"
        aria-label="More info"
      >
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 text-xs text-muted-foreground bg-white dark:bg-slate-900 border border-border rounded-xl px-3 py-2 shadow-lg z-50 pointer-events-none leading-relaxed">
          {text}
        </span>
      )}
    </span>
  );
}

// ─── Field Components ─────────────────────────────────────────────────────────
function Field({
  label, value, onChange, unit, min, max, step, tooltip, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; min?: string; max?: string; step?: string;
  tooltip?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center text-sm font-medium text-foreground">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min ?? "0"}
          max={max}
          step={step}
          className="w-full h-10 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
        {unit && (
          <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none whitespace-nowrap">{unit}</span>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, tooltip,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; tooltip?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center text-sm font-medium text-foreground">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({ label, value, sub, highlight }: {
  label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 text-center space-y-1 ${
      highlight
        ? "bg-primary/10 border border-primary/20"
        : "bg-slate-100 dark:bg-slate-800 border border-transparent"
    }`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider leading-tight">{label}</p>
      <p className={`text-xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ─── Breakdown Row ────────────────────────────────────────────────────────────
function BRow({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-border last:border-0 text-sm ${total ? "font-semibold" : ""}`}>
      <span className={total ? "text-primary" : "text-muted-foreground"}>{label}</span>
      <span className={total ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is an STC?", a: "A Small-scale Technology Certificate (STC) is a tradeable certificate created when you install an eligible solar PV system, solar water heater, or heat pump. Each STC represents approximately 1 MWh of renewable electricity the system is expected to generate over its deeming period." },
  { q: "What is the deeming period?", a: "The deeming period is the number of years remaining until the STC scheme ends on 31 December 2030. If you install in 2026, your deeming period is approximately 4 years. Earlier installations receive more STCs because more years remain — so it pays to install sooner." },
  { q: "How is the rebate applied?", a: "Most installers accept an assignment of STCs from you and apply the value as an upfront discount on your system price. Alternatively, you can create and sell the STCs yourself through the REC Registry, but this takes more time and effort." },
  { q: "What installation zone am I in?", a: "Zone 1: NT and northern/western WA (highest solar resource). Zone 2: QLD, SA, and most of WA. Zone 3: NSW, VIC, ACT, and south-east QLD. Zone 4: TAS and southern VIC (lowest solar resource). Your zone determines the multiplier used in the STC formula." },
  { q: "Does the rebate decrease over time?", a: "Yes. As each year passes, the deeming period shrinks, so the number of STCs — and your rebate — decreases. The scheme ends 31 December 2030, after which no new STCs can be created for solar PV installations." },
  { q: "Is there a system size limit?", a: "Yes. The STC scheme applies to systems up to 100 kW installed capacity. Systems above 100 kW fall under the Large-scale Renewable Energy Target (LRET) and create Large-scale Generation Certificates (LGCs) instead of STCs." },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function STCCalculatorPage() {
  // System inputs
  const [cap, setCap]         = useState("6.6");
  const [zone, setZone]       = useState("1.382");
  const [state, setState]     = useState("VIC");
  const [price, setPrice]     = useState("39");
  const [syscost, setSyscost] = useState("8500");
  const [year, setYear]       = useState("2026");

  // Client / lead fields
  const [clientName, setClientName]   = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [refId, setRefId]             = useState("");
  const [notes, setNotes]             = useState("");

  // UI state
  const [faqOpen, setFaqOpen]   = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [result, setResult] = useState<{
    stcs: number; rebate: number; netCost: number;
    deemingYears: number; pctRemaining: number;
    zoneFactor: number; zoneLabel: string;
  } | null>(null);

  function handleStateChange(s: string) {
    setState(s);
    setZone(STATE_ZONE[s]);
  }

  function calculate() {
    const capN   = parseFloat(cap)   || 0;
    const zoneN  = parseFloat(zone)  || 1.382;
    const priceN = parseFloat(price) || 39;
    const costN  = parseFloat(syscost) || 0;
    const yearN  = parseInt(year)    || 2026;

    const deemingYears  = Math.max(0, SCHEME_END - yearN + 1);
    const stcs          = Math.floor(capN * zoneN * deemingYears);
    const rebate        = stcs * priceN;
    const netCost       = Math.max(0, costN - rebate);
    const pctRemaining  = Math.min(100, (deemingYears / (SCHEME_END - 2010 + 1)) * 100);
    const zoneLabel     = ZONE_OPTIONS.find((o) => o.value === String(zoneN))?.label ?? zone;

    setResult({ stcs, rebate, netCost, deemingYears, pctRemaining, zoneFactor: zoneN, zoneLabel });
  }

  async function handleSendResults(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setSendStatus("sending");

    const templateParams = {
      // ── Client info ──────────────────────────────────
      client_name:   clientName,
      client_email:  clientEmail,
      client_phone:  clientPhone,
      reference_id:  refId || "N/A",
      notes:         notes || "None",

      // ── System details ────────────────────────────────
      system_capacity:  `${cap} kW`,
      installation_zone: result.zoneLabel,
      installation_year: year,
      stc_spot_price:   `$${price}`,
      gross_system_cost: `$${parseFloat(syscost).toLocaleString()}`,

      // ── Results ───────────────────────────────────────
      stc_count:        result.stcs.toLocaleString(),
      rebate_value:     `$${result.rebate.toLocaleString()}`,
      net_system_cost:  `$${Math.round(result.netCost).toLocaleString()}`,
      deeming_years:    `${result.deemingYears} years`,

      // ── Formula breakdown ─────────────────────────────
      formula: `${cap} kW × ${result.zoneFactor.toFixed(3)} × ${result.deemingYears} years = ${result.stcs} STCs`,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSendStatus("success");
      setShowPopup(true);
      setClientName(""); setClientEmail(""); setClientPhone("");
      setRefId(""); setNotes("");
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    }
  }

  const capN        = parseFloat(cap) || 0;
  const zoneN       = parseFloat(zone) || 1.382;
  const yearN       = parseInt(year) || 2026;
  const deemingYears = Math.max(0, SCHEME_END - yearN + 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {showPopup && <SuccessPopup onClose={() => { setShowPopup(false); setSendStatus("idle"); }} />}

      {/* Page Header */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-slate-50 dark:bg-slate-800 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Australian government solar rebate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">STC Calculator</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate your Small-scale Technology Certificate count, dollar rebate value, and deeming period remaining — for homeowners and installers.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl pt-10">
        <div className="flex gap-3 items-start bg-primary/5 border border-primary/15 rounded-xl px-5 py-4">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            STCs are created when you install an eligible solar system and are typically assigned to your installer in exchange for an upfront discount on your system price. The STC spot price fluctuates — the current market rate is approximately $38–$40 per certificate.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-8">

          {/* ── System Details Card ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">System details</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Enter your solar system information to calculate STCs.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">

              {/* Client / Reference fields */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Client / reference</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="clientName">Client name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. John Smith"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="refId">
                      Reference ID
                      <Tooltip text="Optional job or quote number for your records. E.g. APM-2026-001" />
                    </Label>
                    <Input
                      id="refId"
                      value={refId}
                      onChange={(e) => setRefId(e.target.value)}
                      placeholder="e.g. APM-2026-001 (optional)"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">System inputs</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="System capacity"
                    value={cap} onChange={setCap}
                    unit="kW" step="0.1" max="100"
                    tooltip="Total installed panel capacity. E.g. 6.6 kW, 10 kW, 13.2 kW. Maximum 100 kW for STC eligibility."
                  />
                  <div className="space-y-1.5">
                    <label className="flex items-center text-sm font-medium text-foreground">
                      State
                      <Tooltip text="Used to auto-select your installation zone." />
                    </label>
                    <select
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full h-10 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      {STATE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <SelectField
                      label="Installation zone"
                      value={zone} onChange={setZone}
                      options={ZONE_OPTIONS}
                      tooltip="Zone determines your solar irradiance factor. Auto-fills from state — override if needed."
                    />
                  </div>
                  <Field
                    label="STC spot price"
                    value={price} onChange={setPrice}
                    unit="$ / STC" min="1" max="50" step="0.50"
                    tooltip="Current market price per STC. Typically $36–$40. Check rec-registry.com.au for live pricing."
                  />
                  <SelectField
                    label="Installation year"
                    value={year} onChange={setYear}
                    options={YEAR_OPTIONS}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="System cost (gross, before rebate)"
                      value={syscost} onChange={setSyscost}
                      unit="$"
                      tooltip="Full installed price before any STC rebate. Used to calculate your net cost after discount."
                    />
                  </div>
                </div>
              </div>

              <Button onClick={calculate} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" /> Calculate STCs &amp; rebate
              </Button>

              {/* ── Results ── */}
              {result && (
                <div className="space-y-6 pt-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      {clientName ? `Results for ${clientName}` : "Your estimated results"}
                      {refId && <span className="ml-2 font-normal normal-case text-muted-foreground/60">· Ref: {refId}</span>}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <ResultCard label="STCs created" value={result.stcs.toLocaleString()} highlight />
                      <ResultCard label="Rebate value" value={`$${result.rebate.toLocaleString()}`} highlight />
                      <ResultCard label="Net system cost" value={`$${Math.round(result.netCost).toLocaleString()}`} sub="after rebate" />
                      <ResultCard label="Deeming years left" value={`${result.deemingYears} yrs`} sub="of 10-year scheme" />
                    </div>
                  </div>

                  {/* Deeming bar */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Deeming period remaining</p>
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${result.pctRemaining.toFixed(1)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{year}</span>
                      <span>{result.deemingYears} years remaining until scheme ends {SCHEME_END}</span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Calculation breakdown</p>
                    <BRow label="System capacity" value={`${capN.toFixed(1)} kW`} />
                    <BRow label="Zone factor" value={result.zoneFactor.toFixed(3)} />
                    <BRow label="Deeming years" value={`${deemingYears} years`} />
                    <BRow label={`STCs = ${capN.toFixed(1)} × ${result.zoneFactor.toFixed(3)} × ${deemingYears}`} value={`${result.stcs} STCs`} />
                    <BRow label="STC spot price" value={`$${parseFloat(price).toFixed(2)}`} />
                    <BRow label="Estimated rebate" value={`$${result.rebate.toLocaleString()}`} total />
                  </div>

                  <p className="text-xs text-muted-foreground border-t border-border pt-4 leading-relaxed">
                    * STC counts are rounded down to the nearest whole number as per CER rules. Rebate value depends on the spot price at time of assignment. Formula: kW × zone factor × deeming years.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Send Results Card ── */}
          {result && (
            <Card className="border shadow-md">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Send results to our team</CardTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">We'll review your STC estimate and get back to you within 24 hours.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSendResults} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="sendName">Your name</Label>
                      <Input
                        id="sendName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendEmail">Email address</Label>
                      <Input
                        id="sendEmail"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendPhone">Phone number</Label>
                      <Input
                        id="sendPhone"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+61 400 000 000"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendRef">Reference ID (optional)</Label>
                      <Input
                        id="sendRef"
                        value={refId}
                        onChange={(e) => setRefId(e.target.value)}
                        placeholder="e.g. APM-2026-001"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sendNotes">Additional notes (optional)</Label>
                    <textarea
                      id="sendNotes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information about the installation..."
                      className="w-full min-h-[100px] rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Results summary shown in the form */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-sm text-muted-foreground space-y-1 border border-border">
                    <p className="font-medium text-foreground mb-2">Results being sent</p>
                    <p>System: {cap} kW · {result.zoneLabel.split("—")[0].trim()} · {year}</p>
                    <p>STCs: <span className="text-primary font-semibold">{result.stcs.toLocaleString()}</span> · Rebate: <span className="text-primary font-semibold">${result.rebate.toLocaleString()}</span> · Net cost: ${Math.round(result.netCost).toLocaleString()}</p>
                    <p>Formula: {cap} kW × {result.zoneFactor.toFixed(3)} × {deemingYears} yrs = {result.stcs} STCs</p>
                  </div>

                  {sendStatus === "error" && (
                    <p className="text-red-600 text-sm font-medium">Something went wrong. Please try again or call us directly.</p>
                  )}

                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={sendStatus === "sending"}>
                    {sendStatus === "sending" ? "Sending..." : "Send results to APM Energy"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Frequently asked questions</h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
                >
                  <span className="font-semibold text-base">{faq.q}</span>
                  {faqOpen === i
                    ? <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {faqOpen === i && (
                  <p className="text-muted-foreground text-base leading-relaxed pb-4">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to claim your STC rebate?</h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our CEC-accredited team handles the STC process end-to-end — you get the rebate applied as an upfront discount with zero paperwork.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Get a free quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}