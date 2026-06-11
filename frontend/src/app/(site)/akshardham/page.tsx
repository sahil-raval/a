"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Sun, BatteryCharging, Zap, Info, ChevronDown, ChevronUp,
  Calculator, ArrowRight, CheckCircle, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SERVICE_ID  = "service_6caf4r6";
const TEMPLATE_ID = "template_sfkwidw";
const PUBLIC_KEY  = "rgu-gpZuMbktPsuRs";

const SCHEME_END    = 2030;
const MAX_DEEMING   = 10; // Maximum deeming years (2021 installs); used for progress bar

// ─── Zone / State data ────────────────────────────────────────────────────────
const ZONE_OPTIONS = [
  { value: "1.622", label: "Zone 1 — NT, NW WA (factor 1.622)" },
  { value: "1.536", label: "Zone 2 — QLD, SA, WA (factor 1.536)" },
  { value: "1.382", label: "Zone 3 — NSW, VIC, SE QLD (factor 1.382)" },
  { value: "1.185", label: "Zone 4 — TAS, S. VIC (factor 1.185)" },
];

const STATE_ZONE: Record<string, string> = {
  NSW: "1.382", VIC: "1.382", QLD: "1.536", SA: "1.536",
  WA: "1.536",  TAS: "1.185", NT:  "1.622", ACT: "1.382",
};

const STATE_OPTIONS = Object.keys(STATE_ZONE).map((s) => ({ value: s, label: s }));

// Solar installation years — full range 2021-2030 (matches official deeming table)
const SOLAR_YEAR_OPTIONS = [
  { value: "2030", label: "2030 (1 yr deeming)" },
  { value: "2029", label: "2029 (2 yr deeming)" },
  { value: "2028", label: "2028 (3 yr deeming)" },
  { value: "2027", label: "2027 (4 yr deeming)" },
  { value: "2026", label: "2026 (5 yr deeming)" },
  { value: "2025", label: "2025 (6 yr deeming)" },
  { value: "2024", label: "2024 (7 yr deeming)" },
  { value: "2023", label: "2023 (8 yr deeming)" },
  { value: "2022", label: "2022 (9 yr deeming)" },
  { value: "2021", label: "2021 (10 yr deeming)" },
];

// Battery STC factors — official CER schedule (source: cer.gov.au, updated Apr 2026)
// https://cer.gov.au/.../calculate-small-scale-technology-certificate-entitlements
const INSTALL_PERIOD_OPTIONS = [
  { value: "2025",    label: "2025 Jan–Dec (factor 9.3)"  },
  { value: "2026-H1", label: "2026 Jan–Apr (factor 8.4)"  },
  { value: "2026-H2", label: "2026 May–Dec (factor 6.8)"  },
  { value: "2027-H1", label: "2027 Jan–Jun (factor 5.7)"  },
  { value: "2027-H2", label: "2027 Jul–Dec (factor 5.2)"  },
  { value: "2028-H1", label: "2028 Jan–Jun (factor 4.6)"  },
  { value: "2028-H2", label: "2028 Jul–Dec (factor 4.1)"  },
  { value: "2029-H1", label: "2029 Jan–Jun (factor 3.6)"  },
  { value: "2029-H2", label: "2029 Jul–Dec (factor 3.1)"  },
  { value: "2030-H1", label: "2030 Jan–Jun (factor 2.6)"  },
  { value: "2030-H2", label: "2030 Jul–Dec (factor 2.1)"  },
];

const BATTERY_STC_FACTORS: Record<string, number> = {
  "2025":    9.3,
  "2026-H1": 8.4,
  "2026-H2": 6.8,
  "2027-H1": 5.7,
  "2027-H2": 5.2,
  "2028-H1": 4.6,
  "2028-H2": 4.1,
  "2029-H1": 3.6,
  "2029-H2": 3.1,
  "2030-H1": 2.6,
  "2030-H2": 2.1,
};

/**
 * Official CER battery STC calculation.
 * Source: cer.gov.au — "Calculate small-scale technology certificate entitlements"
 *
 * Tapering tiers (applied to usable capacity, capped at 50 kWh):
 *   Tier 1:  0 – 14 kWh  → STC factor × 100%
 *   Tier 2: 14 – 28 kWh  → STC factor ×  60%
 *   Tier 3: 28 – 50 kWh  → STC factor ×  15%
 *
 * The raw sum of all tiers is floored once to the nearest whole number.
 * (Do NOT floor each tier separately — floor is applied to the total.)
 */
function calcBatterySTCs(usableKwh: number, stcFactor: number): {
  totalStcs: number;
  tier1Kwh: number; tier2Kwh: number; tier3Kwh: number;
  rawTotal: number;
} {
  const cap     = Math.min(usableKwh, 50);
  const tier1Kwh = Math.min(cap, 14);
  const tier2Kwh = cap > 14 ? Math.min(cap - 14, 14) : 0;
  const tier3Kwh = cap > 28 ? cap - 28 : 0;

  const rawTotal  = tier1Kwh * stcFactor * 1.0
                  + tier2Kwh * stcFactor * 0.6
                  + tier3Kwh * stcFactor * 0.15;
  const totalStcs = Math.floor(rawTotal);

  return { totalStcs, tier1Kwh, tier2Kwh, tier3Kwh, rawTotal };
}

type Mode = "solar" | "battery" | "both";

// ─── Success Popup ────────────────────────────────────────────────────────────
function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Results Sent!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Your STC estimate has been sent to our team. We'll be in touch within 24 hours.
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
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 text-xs text-muted-foreground bg-white dark:bg-slate-900 border border-border rounded-xl px-3 py-2 shadow-lg z-50 pointer-events-none leading-relaxed">
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
          <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none whitespace-nowrap">
            {unit}
          </span>
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
function ResultCard({ label, value, sub, highlight, accent }: {
  label: string; value: string; sub?: string; highlight?: boolean; accent?: "blue" | "amber";
}) {
  const accentClass =
    accent === "blue"  ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
    : accent === "amber" ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
    : highlight        ? "bg-primary/10 border-primary/20"
    :                    "bg-slate-100 dark:bg-slate-800 border-transparent";

  const textClass =
    accent === "blue"  ? "text-blue-600 dark:text-blue-400"
    : accent === "amber" ? "text-amber-600 dark:text-amber-400"
    : highlight        ? "text-primary"
    :                    "text-foreground";

  return (
    <div className={`rounded-xl p-4 text-center space-y-1 border ${accentClass}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider leading-tight">{label}</p>
      <p className={`text-xl font-bold ${textClass}`}>{value}</p>
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

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label, color }: {
  icon: React.ElementType; label: string; color: "blue" | "amber" | "primary";
}) {
  const colorMap = {
    blue:    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    amber:   "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    primary: "bg-primary/10 text-primary border-primary/20",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${colorMap[color]}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is an STC?",
    a: "A Small-scale Technology Certificate (STC) is a tradeable certificate created when you install an eligible solar PV system, solar battery, solar water heater, or heat pump. Each STC represents approximately 1 MWh of renewable electricity the system is expected to generate or save over its deeming period.",
  },
  {
    q: "What is the deeming period for solar panels?",
    a: "The deeming period is the number of years remaining until the scheme ends on 31 December 2030. According to the official CER table: a 2026 install earns 5 deeming years, 2025 earns 6, 2024 earns 7, and so on back to 2021 which earned the maximum of 10 years.",
  },
  {
    q: "How are battery STCs calculated differently from solar?",
    a: "Battery STCs are based on usable capacity (kWh), not system size (kW), and use a tiered tapering rule: the first 14 kWh earns the full STC factor, the next 14 kWh (14–28 kWh) earns 60% of the factor, and capacity above 28 kWh up to 50 kWh earns 15%. Only the first 50 kWh of usable capacity is eligible. The STC factor itself steps down every six months as battery costs fall.",
  },
  {
    q: "What is the current battery STC factor?",
    a: "From 1 May 2026, the STC factor is 6.8 STCs per kWh. It was 8.4 for January–April 2026, and 9.3 for all of 2025. The factor continues stepping down every six months: 5.7 for Jan–Jun 2027, then 5.2 for Jul–Dec 2027, all the way to 2.1 for Jul–Dec 2030.",
  },
  {
    q: "What installation zone am I in for solar?",
    a: "Zone 1: NT and northern/western WA (highest solar resource). Zone 2: QLD, SA, and most of WA. Zone 3: NSW, VIC, ACT, and south-east QLD. Zone 4: TAS and southern VIC. Your zone determines the irradiance multiplier in the solar STC formula only — batteries don't use zones.",
  },
  {
    q: "Can I claim STCs for both solar and a battery?",
    a: "Yes — solar PV and batteries are separate, independent STC claims. Your solar claim uses kW × zone factor × deeming years. Your battery claim uses the kWh tapering formula. They can be combined in one installation and the rebates are additive.",
  },
  {
    q: "Is there a minimum battery size?",
    a: "Yes. Batteries must be between 5 kWh and 100 kWh in nominal capacity. Only the first 50 kWh of usable capacity earns STCs. Only one battery per premises can ever claim STCs. The battery must be installed with a new or existing solar PV system.",
  },
  {
    q: "Does the rebate decrease over time?",
    a: "Yes for both types. Solar STCs decrease as each year brings the 2030 scheme-end closer (fewer deeming years). Battery STCs decrease faster — the STC factor steps down every six months. Installing sooner always means a larger rebate.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function STCCalculatorPage() {
  const [mode, setMode] = useState<Mode>("solar");

  // Solar inputs
  const [cap, setCap]           = useState("6.6");
  const [zone, setZone]         = useState("1.382");
  const [state, setState]       = useState("VIC");
  const [solarYear, setSolarYear] = useState("2026");
  const [solarCost, setSolarCost] = useState("8500");

  // Battery inputs
  const [battKwh, setBattKwh]       = useState("10");
  const [battPeriod, setBattPeriod] = useState("2026-H2");
  const [battCost, setBattCost]     = useState("4000");

  // Shared
  const [price, setPrice] = useState("39");

  // Client / lead fields
  const [clientName, setClientName]   = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [refId, setRefId]             = useState("");
  const [notes, setNotes]             = useState("");

  // UI
  const [faqOpen, setFaqOpen]       = useState<number | null>(null);
  const [showPopup, setShowPopup]   = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [result, setResult] = useState<{
    solar?: {
      stcs: number; rebate: number; netCost: number;
      deemingYears: number; pctRemaining: number;
      zoneFactor: number; zoneLabel: string;
    };
    battery?: {
      stcs: number; rebate: number; netCost: number;
      stcFactor: number; usableKwh: number; periodLabel: string;
      tier1Kwh: number; tier2Kwh: number; tier3Kwh: number;
      // Per-tier STC contributions (unrounded) for display only
      tier1Raw: number; tier2Raw: number; tier3Raw: number;
    };
    totalSTCs: number;
    totalRebate: number;
    totalNetCost: number;
  } | null>(null);

  function handleStateChange(s: string) {
    setState(s);
    setZone(STATE_ZONE[s]);
  }

  function calculate() {
    const priceN = parseFloat(price) || 39;
    let solarResult: typeof result["solar"]   | undefined;
    let battResult:  typeof result["battery"] | undefined;

    // ── Solar ──────────────────────────────────────────────────────────────
    if (mode === "solar" || mode === "both") {
      const capN   = parseFloat(cap)       || 0;
      const zoneN  = parseFloat(zone)      || 1.382;
      const yearN  = parseInt(solarYear)   || 2026;
      const costN  = parseFloat(solarCost) || 0;

      // Official deeming table: deemingYears = SCHEME_END - installYear + 1
      const deemingYears = Math.max(0, SCHEME_END - yearN + 1);
      const stcs         = Math.floor(capN * zoneN * deemingYears);
      const rebate       = stcs * priceN;
      const netCost      = Math.max(0, costN - rebate);
      // Progress bar: proportion of max deeming period remaining (max = 10 years)
      const pctRemaining = Math.min(100, (deemingYears / MAX_DEEMING) * 100);
      const zoneLabel    = ZONE_OPTIONS.find((o) => o.value === String(zoneN))?.label ?? zone;

      solarResult = { stcs, rebate, netCost, deemingYears, pctRemaining, zoneFactor: zoneN, zoneLabel };
    }

    // ── Battery ────────────────────────────────────────────────────────────
    if (mode === "battery" || mode === "both") {
      const usableInput = parseFloat(battKwh) || 0;
      const usableKwh   = Math.min(usableInput, 50); // cap at 50 kWh per CER rules
      const stcFactor   = BATTERY_STC_FACTORS[battPeriod] ?? 6.8;
      const costN       = parseFloat(battCost) || 0;

      const { totalStcs, tier1Kwh, tier2Kwh, tier3Kwh } = calcBatterySTCs(usableKwh, stcFactor);

      // Unrounded per-tier contributions for informational display
      const tier1Raw = tier1Kwh * stcFactor * 1.0;
      const tier2Raw = tier2Kwh * stcFactor * 0.6;
      const tier3Raw = tier3Kwh * stcFactor * 0.15;

      const rebate  = totalStcs * priceN;
      const netCost = Math.max(0, costN - rebate);
      const periodLabel = INSTALL_PERIOD_OPTIONS.find((o) => o.value === battPeriod)?.label ?? battPeriod;

      battResult = {
        stcs: totalStcs, rebate, netCost, stcFactor,
        usableKwh, periodLabel,
        tier1Kwh, tier2Kwh, tier3Kwh,
        tier1Raw, tier2Raw, tier3Raw,
      };
    }

    const totalSTCs    = (solarResult?.stcs   ?? 0) + (battResult?.stcs   ?? 0);
    const totalRebate  = (solarResult?.rebate ?? 0) + (battResult?.rebate ?? 0);
    const totalCostIn  = (mode !== "battery" ? (parseFloat(solarCost) || 0) : 0)
                       + (mode !== "solar"   ? (parseFloat(battCost)  || 0) : 0);
    const totalNetCost = Math.max(0, totalCostIn - totalRebate);

    setResult({ solar: solarResult, battery: battResult, totalSTCs, totalRebate, totalNetCost });
  }

  async function handleSendResults(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setSendStatus("sending");

    const templateParams = {
      client_name:    clientName,
      client_email:   clientEmail,
      client_phone:   clientPhone,
      reference_id:   refId || "N/A",
      notes:          notes || "None",
      calculator_mode: mode === "solar" ? "Solar PV" : mode === "battery" ? "Battery" : "Solar PV + Battery",

      system_capacity:   mode !== "battery" ? `${cap} kW` : "N/A",
      installation_zone: mode !== "battery" ? (result.solar?.zoneLabel ?? "N/A") : "N/A",
      solar_year:        mode !== "battery" ? solarYear : "N/A",
      solar_deeming_yrs: mode !== "battery" ? String(result.solar?.deemingYears ?? "N/A") : "N/A",
      solar_stcs:        result.solar ? result.solar.stcs.toLocaleString() : "N/A",
      solar_rebate:      result.solar ? `$${result.solar.rebate.toLocaleString()}` : "N/A",
      solar_net_cost:    result.solar ? `$${Math.round(result.solar.netCost).toLocaleString()}` : "N/A",

      battery_usable_kwh: mode !== "solar" ? `${battKwh} kWh` : "N/A",
      battery_period:     mode !== "solar" ? battPeriod : "N/A",
      battery_stc_factor: mode !== "solar" ? String(BATTERY_STC_FACTORS[battPeriod] ?? "N/A") : "N/A",
      battery_stcs:       result.battery ? result.battery.stcs.toLocaleString() : "N/A",
      battery_rebate:     result.battery ? `$${result.battery.rebate.toLocaleString()}` : "N/A",
      battery_net_cost:   result.battery ? `$${Math.round(result.battery.netCost).toLocaleString()}` : "N/A",

      stc_spot_price: `$${price}`,
      total_stcs:     result.totalSTCs.toLocaleString(),
      total_rebate:   `$${result.totalRebate.toLocaleString()}`,
      total_net_cost: `$${Math.round(result.totalNetCost).toLocaleString()}`,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSendStatus("success");
      setShowPopup(true);
      setClientName(""); setClientEmail(""); setClientPhone(""); setRefId(""); setNotes("");
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    }
  }

  const capN         = parseFloat(cap)     || 0;
  const zoneN        = parseFloat(zone)    || 1.382;
  const yearN        = parseInt(solarYear) || 2026;
  const deemingYears = Math.max(0, SCHEME_END - yearN + 1);
  const battKwhN     = parseFloat(battKwh) || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {showPopup && (
        <SuccessPopup onClose={() => { setShowPopup(false); setSendStatus("idle"); }} />
      )}

      {/* Page Header */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-slate-50 dark:bg-slate-800 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Australian government solar rebate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">STC Calculator</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate your Small-scale Technology Certificates for solar panels, batteries, or both — using official CER formulas.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl pt-10">
        <div className="flex gap-3 items-start bg-primary/5 border border-primary/15 rounded-xl px-5 py-4">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Solar and battery STCs use different formulas. Solar: <strong>kW × zone factor × deeming years</strong>. Battery: <strong>usable kWh × STC factor</strong> with a tiered tapering rule (first 14 kWh full rate, next 14 kWh at 60%, remainder at 15%). Current STC market price is approximately $38–$40.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-8">

          {/* ── Mode Selector ── */}
          <Card className="border shadow-md">
            <CardContent className="pt-6 pb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">What are you installing?</p>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: "solar"   as Mode, Icon: Sun,            label: "Solar panels",    sub: "kW × zone × years"  },
                  { id: "battery" as Mode, Icon: BatteryCharging, label: "Battery storage", sub: "kWh × STC factor"  },
                  { id: "both"    as Mode, Icon: Zap,             label: "Solar + Battery", sub: "Combined estimate" },
                ] as const).map(({ id, Icon, label, sub }) => (
                  <button
                    key={id}
                    onClick={() => { setMode(id); setResult(null); }}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-4 py-4 text-center transition-all ${
                      mode === id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white dark:bg-slate-900 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-semibold leading-tight">{label}</span>
                    <span className="text-xs opacity-70 hidden sm:block">{sub}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Inputs Card ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {mode === "battery" ? <BatteryCharging className="h-6 w-6" />
                    : mode === "both" ? <Zap className="h-6 w-6" />
                    : <Sun className="h-6 w-6" />}
                </div>
                <div>
                  <CardTitle className="text-xl">System details</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Enter your installation details to calculate STCs.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">

              {/* Client / Reference */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Client / reference</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="clientName">Client name</Label>
                    <Input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. John Smith" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="refId">
                      Reference ID <Tooltip text="Optional job or quote number. E.g. APM-2026-001" />
                    </Label>
                    <Input id="refId" value={refId} onChange={(e) => setRefId(e.target.value)} placeholder="e.g. APM-2026-001 (optional)" />
                  </div>
                </div>
              </div>

              {/* ── Solar Inputs ── */}
              {(mode === "solar" || mode === "both") && (
                <div className="border-t border-border pt-5 space-y-4">
                  <SectionLabel icon={Sun} label="Solar panel inputs" color="blue" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="System capacity"
                      value={cap} onChange={setCap}
                      unit="kW" step="0.1" max="100"
                      tooltip="Total installed panel capacity in kilowatts. E.g. 6.6 kW, 10 kW. Maximum 100 kW for STC eligibility."
                    />
                    <div className="space-y-1.5">
                      <label className="flex items-center text-sm font-medium text-foreground">
                        State <Tooltip text="Used to auto-select your installation zone." />
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
                        tooltip="Zone determines your solar irradiance factor. Auto-fills from your state — override if needed."
                      />
                    </div>
                    <SelectField
                      label="Installation year"
                      value={solarYear} onChange={setSolarYear}
                      options={SOLAR_YEAR_OPTIONS}
                      tooltip="Deeming years are fixed by the official CER table: 2026 = 5 yrs, 2025 = 6 yrs, 2024 = 7 yrs, etc."
                    />
                    <Field
                      label="Solar system cost (gross)"
                      value={solarCost} onChange={setSolarCost}
                      unit="$"
                      tooltip="Full installed price of the solar panels before any STC rebate."
                    />
                  </div>
                </div>
              )}

              {/* ── Battery Inputs ── */}
              {(mode === "battery" || mode === "both") && (
                <div className="border-t border-border pt-5 space-y-4">
                  <SectionLabel icon={BatteryCharging} label="Battery storage inputs" color="amber" />
                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      <strong>Battery STC formula:</strong> Based on usable kWh with tapering — first 14 kWh at 100% of the STC factor, next 14 kWh (14–28) at 60%, and 28–50 kWh at 15%. Only the first 50 kWh is eligible. The STC factor is set by installation date and steps down every six months.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Usable capacity"
                      value={battKwh} onChange={setBattKwh}
                      unit="kWh" step="0.5" min="5" max="100"
                      tooltip="The usable (dischargeable) kWh — shown in product specs, not nominal capacity. Only the first 50 kWh earns STCs."
                    />
                    <SelectField
                      label="Installation period"
                      value={battPeriod} onChange={setBattPeriod}
                      options={INSTALL_PERIOD_OPTIONS}
                      tooltip="Battery STC factors step down every 6 months per the official CER schedule. Select when you expect to install."
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="Battery cost (gross)"
                        value={battCost} onChange={setBattCost}
                        unit="$"
                        tooltip="Full installed price of the battery before any STC rebate."
                      />
                    </div>
                  </div>

                  {/* Live tapering preview */}
                  {battKwhN > 0 && (
                    <div className="rounded-xl border border-border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tapering tier preview</p>
                      {([
                        { label: "Tier 1 (0–14 kWh @ 100%)", kwh: Math.min(Math.min(battKwhN, 50), 14) },
                        { label: "Tier 2 (14–28 kWh @ 60%)", kwh: battKwhN > 14 ? Math.min(Math.min(battKwhN, 50) - 14, 14) : 0 },
                        { label: "Tier 3 (28–50 kWh @ 15%)", kwh: battKwhN > 28 ? Math.min(battKwhN, 50) - 28 : 0 },
                      ] as const).map(({ label, kwh }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className={`font-medium ${kwh > 0 ? "text-foreground" : "text-muted-foreground/40"}`}>
                            {kwh.toFixed(1)} kWh
                          </span>
                        </div>
                      ))}
                      {battKwhN > 50 && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 pt-1 border-t border-border">
                          ⚠ Only the first 50 kWh is eligible — {(battKwhN - 50).toFixed(1)} kWh above the cap will not earn STCs.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Shared STC spot price */}
              <div className="border-t border-border pt-5">
                <Field
                  label="STC spot price"
                  value={price} onChange={setPrice}
                  unit="$ / STC" min="1" max="50" step="0.50"
                  tooltip="Current market price per STC. Typically $36–$40. Check rec-registry.com.au for live pricing."
                />
              </div>

              <Button onClick={calculate} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" /> Calculate STCs &amp; rebate
              </Button>

              {/* ── Results ── */}
              {result && (
                <div className="space-y-8 pt-2">

                  {/* Solar Results */}
                  {result.solar && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <SectionLabel icon={Sun} label="Solar panel results" color="blue" />
                        {clientName && (
                          <span className="text-xs text-muted-foreground">
                            for {clientName}{refId ? ` · Ref: ${refId}` : ""}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ResultCard label="STCs created"     value={result.solar.stcs.toLocaleString()}                  accent="blue" />
                        <ResultCard label="Solar rebate"     value={`$${result.solar.rebate.toLocaleString()}`}           accent="blue" />
                        <ResultCard label="Net solar cost"   value={`$${Math.round(result.solar.netCost).toLocaleString()}`} sub="after rebate" />
                        <ResultCard label="Deeming years"    value={`${result.solar.deemingYears} yrs`}                  sub="left in scheme" />
                      </div>

                      {/* Deeming bar — correct denominator: MAX_DEEMING = 10 */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Deeming period remaining</p>
                        <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${result.solar.pctRemaining.toFixed(1)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{solarYear}</span>
                          <span>{result.solar.deemingYears} of {MAX_DEEMING} max deeming years · scheme ends {SCHEME_END}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Solar calculation breakdown</p>
                        <BRow label="System capacity"  value={`${capN.toFixed(1)} kW`} />
                        <BRow label="Zone factor"      value={result.solar.zoneFactor.toFixed(3)} />
                        <BRow label="Deeming years"    value={`${deemingYears} years`} />
                        <BRow
                          label={`STCs = floor(${capN.toFixed(1)} × ${result.solar.zoneFactor.toFixed(3)} × ${deemingYears})`}
                          value={`${result.solar.stcs} STCs`}
                        />
                        <BRow label="STC spot price"   value={`$${parseFloat(price).toFixed(2)}`} />
                        <BRow label="Solar rebate"     value={`$${result.solar.rebate.toLocaleString()}`} total />
                      </div>
                    </div>
                  )}

                  {/* Battery Results */}
                  {result.battery && (
                    <div className="space-y-4">
                      <SectionLabel icon={BatteryCharging} label="Battery storage results" color="amber" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <ResultCard label="STCs created"      value={result.battery.stcs.toLocaleString()}                     accent="amber" />
                        <ResultCard label="Battery rebate"    value={`$${result.battery.rebate.toLocaleString()}`}              accent="amber" />
                        <ResultCard label="Net battery cost"  value={`$${Math.round(result.battery.netCost).toLocaleString()}`} sub="after rebate" />
                        <ResultCard label="STC factor"        value={`${result.battery.stcFactor}`}                             sub="STCs per kWh" />
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Battery calculation breakdown
                        </p>
                        <BRow label="Usable capacity (eligible max 50 kWh)" value={`${result.battery.usableKwh.toFixed(1)} kWh`} />
                        <BRow label="Installation period"                    value={result.battery.periodLabel} />
                        <BRow label="STC factor"                             value={`${result.battery.stcFactor} STCs/kWh`} />
                        <BRow
                          label={`Tier 1: ${result.battery.tier1Kwh.toFixed(1)} kWh × ${result.battery.stcFactor} × 100%`}
                          value={`${result.battery.tier1Raw.toFixed(2)} STCs`}
                        />
                        {result.battery.tier2Kwh > 0 && (
                          <BRow
                            label={`Tier 2: ${result.battery.tier2Kwh.toFixed(1)} kWh × ${result.battery.stcFactor} × 60%`}
                            value={`${result.battery.tier2Raw.toFixed(2)} STCs`}
                          />
                        )}
                        {result.battery.tier3Kwh > 0 && (
                          <BRow
                            label={`Tier 3: ${result.battery.tier3Kwh.toFixed(1)} kWh × ${result.battery.stcFactor} × 15%`}
                            value={`${result.battery.tier3Raw.toFixed(2)} STCs`}
                          />
                        )}
                        <BRow
                          label={`Total (floored from ${(result.battery.tier1Raw + result.battery.tier2Raw + result.battery.tier3Raw).toFixed(2)})`}
                          value={`${result.battery.stcs} STCs`}
                        />
                        <BRow label="STC spot price"  value={`$${parseFloat(price).toFixed(2)}`} />
                        <BRow label="Battery rebate"  value={`$${result.battery.rebate.toLocaleString()}`} total />
                      </div>
                    </div>
                  )}

                  {/* Combined totals (both mode) */}
                  {mode === "both" && result.solar && result.battery && (
                    <div className="space-y-4">
                      <SectionLabel icon={Zap} label="Combined total" color="primary" />
                      <div className="grid grid-cols-3 gap-3">
                        <ResultCard label="Total STCs"     value={result.totalSTCs.toLocaleString()}                     highlight />
                        <ResultCard label="Total rebate"   value={`$${result.totalRebate.toLocaleString()}`}              highlight />
                        <ResultCard label="Total net cost" value={`$${Math.round(result.totalNetCost).toLocaleString()}`} sub="solar + battery" />
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground border-t border-border pt-4 leading-relaxed">
                    * Solar: STCs = floor(kW × zone factor × deeming years). Deeming years per official CER table (2026 = 5 yrs, 2025 = 6 yrs, etc.).
                    Battery: STCs = floor(tier1 + tier2 + tier3) where tiers are 100%/60%/15% of the STC factor; floor applied once to the total.
                    STC factors per official CER schedule (last updated 1 May 2026). Rebate depends on spot price at time of assignment.
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
                      <Input id="sendName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Smith" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendEmail">Email address</Label>
                      <Input id="sendEmail" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendPhone">Phone number</Label>
                      <Input id="sendPhone" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+61 400 000 000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sendRef">Reference ID (optional)</Label>
                      <Input id="sendRef" value={refId} onChange={(e) => setRefId(e.target.value)} placeholder="e.g. APM-2026-001" />
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

                  {/* Results summary */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-sm text-muted-foreground space-y-1 border border-border">
                    <p className="font-medium text-foreground mb-2">Results being sent</p>
                    {result.solar && (
                      <p>Solar: {cap} kW · {result.solar.zoneLabel.split("—")[0].trim()} · {solarYear} ({result.solar.deemingYears} yr deeming) → <span className="text-blue-600 dark:text-blue-400 font-semibold">{result.solar.stcs} STCs</span> · <span className="text-blue-600 dark:text-blue-400 font-semibold">${result.solar.rebate.toLocaleString()}</span></p>
                    )}
                    {result.battery && (
                      <p>Battery: {battKwh} kWh usable · factor {result.battery.stcFactor} ({battPeriod}) → <span className="text-amber-600 dark:text-amber-400 font-semibold">{result.battery.stcs} STCs</span> · <span className="text-amber-600 dark:text-amber-400 font-semibold">${result.battery.rebate.toLocaleString()}</span></p>
                    )}
                    <p className="pt-1 border-t border-border font-medium text-foreground">
                      Total: <span className="text-primary">{result.totalSTCs} STCs</span> · Rebate: <span className="text-primary">${result.totalRebate.toLocaleString()}</span> · Net: ${Math.round(result.totalNetCost).toLocaleString()}
                    </p>
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