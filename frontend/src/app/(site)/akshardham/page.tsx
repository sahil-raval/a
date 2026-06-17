"use client";

import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import {
  Sun, BatteryCharging, Zap, Info, ChevronDown, ChevronUp,
  Calculator, ArrowRight, CheckCircle, X, MapPin, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SERVICE_ID  = "service_6caf4r6";
const TEMPLATE_ID = "template_sfkwidw";
const PUBLIC_KEY  = "rgu-gpZuMbktPsuRs";

const SCHEME_END  = 2030;
const MAX_DEEMING = 10;
const VIC_REBATE  = 2800; // Solar Victoria fixed rebate

// ─── Postcode → Zone ──────────────────────────────────────────────────────────
function getZoneFromPostcode(pc: string): { zone: number; factor: number; label: string } | null {
  const n = parseInt(pc);
  if (isNaN(n) || pc.length !== 4) return null;
  if (n >= 800  && n <= 999)  return { zone: 1, factor: 1.622, label: "Zone 1 (factor 1.622)" };
  if (n >= 4870 && n <= 4899) return { zone: 1, factor: 1.622, label: "Zone 1 (factor 1.622)" };
  if (n >= 6700 && n <= 6770) return { zone: 1, factor: 1.622, label: "Zone 1 (factor 1.622)" };
  if (n >= 4000 && n <= 4869) return { zone: 2, factor: 1.536, label: "Zone 2 (factor 1.536)" };
  if (n >= 4900 && n <= 4999) return { zone: 2, factor: 1.536, label: "Zone 2 (factor 1.536)" };
  if (n >= 5000 && n <= 5499) return { zone: 2, factor: 1.536, label: "Zone 2 (factor 1.536)" };
  if (n >= 6000 && n <= 6699) return { zone: 2, factor: 1.536, label: "Zone 2 (factor 1.536)" };
  if (n >= 6771 && n <= 6999) return { zone: 2, factor: 1.536, label: "Zone 2 (factor 1.536)" };
  if (n >= 2600 && n <= 2618) return { zone: 4, factor: 1.185, label: "Zone 4 (factor 1.185)" };
  if (n >= 2000 && n <= 2999) return { zone: 3, factor: 1.382, label: "Zone 3 (factor 1.382)" };
  if (n >= 5500 && n <= 5799) return { zone: 3, factor: 1.382, label: "Zone 3 (factor 1.382)" };
  if (n >= 3000 && n <= 3999) return { zone: 4, factor: 1.185, label: "Zone 4 (factor 1.185)" };
  if (n >= 7000 && n <= 7999) return { zone: 4, factor: 1.185, label: "Zone 4 (factor 1.185)" };
  if (n >= 2900 && n <= 2920) return { zone: 4, factor: 1.185, label: "Zone 4 (factor 1.185)" };
  return null;
}

function getDeemingYears(dateStr: string): number {
  if (!dateStr) return 0;
  return Math.max(0, SCHEME_END - new Date(dateStr).getFullYear() + 1);
}

// ─── Battery STC factor ───────────────────────────────────────────────────────
const BATTERY_STC_FACTORS: Record<string, number> = {
  "2025": 9.3, "2026-H1": 8.4, "2026-H2": 6.8,
  "2027-H1": 5.7, "2027-H2": 5.2, "2028-H1": 4.6,
  "2028-H2": 4.1, "2029-H1": 3.6, "2029-H2": 3.1,
  "2030-H1": 2.6, "2030-H2": 2.1,
};

const INSTALL_PERIOD_OPTIONS = [
  { value: "2026-H2", label: "2026 May-Dec (6.8)" },
  { value: "2027-H1", label: "2027 Jan-Jun (5.7)" },
  { value: "2027-H2", label: "2027 Jul-Dec (5.2)" },
  { value: "2028-H1", label: "2028 Jan-Jun (4.6)" },
  { value: "2028-H2", label: "2028 Jul-Dec (4.1)" },
  { value: "2029-H1", label: "2029 Jan-Jun (3.6)" },
  { value: "2029-H2", label: "2029 Jul-Dec (3.1)" },
  { value: "2030-H1", label: "2030 Jan-Jun (2.6)" },
  { value: "2030-H2", label: "2030 Jul-Dec (2.1)" },
  { value: "2026-H1", label: "2026 Jan-Apr (8.4)" },
  { value: "2025",    label: "2025 Jan-Dec (9.3)" },
];

function getBatteryPeriod(dateStr: string): string {
  if (!dateStr) return "2026-H2";
  const d = new Date(dateStr); const y = d.getFullYear(); const m = d.getMonth() + 1;
  if (y === 2025) return "2025";
  if (y === 2026 && m <= 4) return "2026-H1";
  if (y === 2026 && m >= 5) return "2026-H2";
  if (y === 2027 && m <= 6) return "2027-H1";
  if (y === 2027 && m >= 7) return "2027-H2";
  if (y === 2028 && m <= 6) return "2028-H1";
  if (y === 2028 && m >= 7) return "2028-H2";
  if (y === 2029 && m <= 6) return "2029-H1";
  if (y === 2029 && m >= 7) return "2029-H2";
  if (y === 2030 && m <= 6) return "2030-H1";
  return "2030-H2";
}

function calcBatterySTCs(usableKwh: number, stcFactor: number) {
  const cap = Math.min(usableKwh, 50);
  const t1 = Math.min(cap, 14);
  const t2 = cap > 14 ? Math.min(cap - 14, 14) : 0;
  const t3 = cap > 28 ? cap - 28 : 0;
  const r1 = t1 * stcFactor; const r2 = t2 * stcFactor * 0.6; const r3 = t3 * stcFactor * 0.15;
  return { totalStcs: Math.floor(r1 + r2 + r3), t1, t2, t3, r1, r2, r3 };
}

// ─── Extra costs config ───────────────────────────────────────────────────────
type ExtraKey =
  | "doubleStorey" | "bollards" | "smokeAlarms" | "canopy"
  | "cementTile" | "fireRatedSheet" | "switchboardUpgrade"
  | "multipleStrings" | "partialBackup" | "fullBackup"
  | "tileRoof" | "accessHire";

type ExtraConfig = { label: string; cost: number | null; note?: string };

const EXTRA_COSTS: Record<ExtraKey, ExtraConfig> = {
  doubleStorey:       { label: "Double storey",           cost: 500  },
  bollards:           { label: "Bollards",                cost: 200  },
  smokeAlarms:        { label: "Smoke alarms",            cost: 100  },
  canopy:             { label: "Canopy",                  cost: 200  },
  cementTile:         { label: "Cement tile",             cost: 100  },
  fireRatedSheet:     { label: "Fire rated cement sheet", cost: 100  },
  switchboardUpgrade: { label: "Switchboard upgrade",     cost: 750  },
  multipleStrings:    { label: "Multiple strings",        cost: null, note: "Enter cost" },
  partialBackup:      { label: "Partial backup",          cost: 450  },
  fullBackup:         { label: "Full backup",             cost: 2000 },
  tileRoof:           { label: "Tile / Kliplok roof",     cost: 400  },
  accessHire:         { label: "Access hire",             cost: null, note: "Enter cost" },
};

function todayStr() { return new Date().toISOString().split("T")[0]; }
function fmt(n: number) { return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2 }); }

// ─── UI helpers ───────────────────────────────────────────────────────────────
function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center ml-1">
      <button type="button" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        className="text-muted-foreground/50 hover:text-primary transition-colors">
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 text-xs text-muted-foreground bg-white dark:bg-slate-900 border border-border rounded-xl px-3 py-2 shadow-lg z-50 pointer-events-none leading-relaxed">
          {text}
        </span>
      )}
    </span>
  );
}

function Field({ label, value, onChange, unit, min, max, step, tooltip, placeholder, prefix }: {
  label: string; value: string; onChange: (v: string) => void;
  unit?: string; min?: string; max?: string; step?: string;
  tooltip?: string; placeholder?: string; prefix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center text-sm font-medium text-foreground">
        {label}{tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-xs text-muted-foreground pointer-events-none">{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} min={min ?? "0"} max={max} step={step}
          className={`w-full h-10 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${prefix ? "pl-6 pr-16" : "px-3 pr-16"}`} />
        {unit && <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none whitespace-nowrap">{unit}</span>}
      </div>
    </div>
  );
}

function SectionLabel({ icon: Icon, label, color }: {
  icon: React.ElementType; label: string; color: "blue" | "amber" | "green" | "primary" | "slate";
}) {
  const c: Record<string, string> = {
    blue:    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    amber:   "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    green:   "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
    primary: "bg-primary/10 text-primary border-primary/20",
    slate:   "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${c[color]}`}>
      <Icon className="h-3.5 w-3.5" />{label}
    </div>
  );
}

function BRow({ label, value, total, sub, indent }: {
  label: string; value: string; total?: boolean; sub?: boolean; indent?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-border last:border-0 text-sm ${total ? "font-bold" : ""} ${sub ? "opacity-70" : ""}`}>
      <span className={`${total ? "text-primary" : "text-muted-foreground"} ${indent ? "pl-4" : ""}`}>{label}</span>
      <span className={total ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  );
}

function ResultCard({ label, value, sub, highlight, accent, large }: {
  label: string; value: string; sub?: string; highlight?: boolean;
  accent?: "blue" | "amber" | "green"; large?: boolean;
}) {
  const box = accent === "blue"  ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
            : accent === "amber" ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
            : accent === "green" ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
            : highlight          ? "bg-primary/10 border-primary/20"
            :                     "bg-slate-100 dark:bg-slate-800 border-transparent";
  const txt = accent === "blue"  ? "text-blue-600 dark:text-blue-400"
            : accent === "amber" ? "text-amber-600 dark:text-amber-400"
            : accent === "green" ? "text-green-700 dark:text-green-400"
            : highlight          ? "text-primary"
            :                     "text-foreground";
  return (
    <div className={`rounded-xl p-4 text-center space-y-1 border ${box}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider leading-tight">{label}</p>
      <p className={`font-bold ${large ? "text-2xl" : "text-xl"} ${txt}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Quote Sent!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Your quote estimate has been sent to our team. We'll be in touch within 24 hours.</p>
        <Button onClick={onClose} className="w-full" size="lg">Sounds good!</Button>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is an STC?", a: "A Small-scale Technology Certificate represents approximately 1 MWh of renewable electricity. When you install solar or a battery, you create STCs which your installer typically claims on your behalf as an upfront discount on the system price." },
  { q: "How is my STC zone determined?", a: "The CER assigns each Australian postcode to one of four zones based on solar irradiance. Zone 1 (NT, Far North QLD) earns the most STCs. Zone 4 (VIC, TAS, ACT) earns fewer. Zone is automatically detected from your postcode." },
  { q: "What is the deeming period?", a: "The number of years from your installation date to 31 December 2030, when the STC scheme ends. A 2026 install earns 5 deeming years. Installing earlier means more STCs." },
  { q: "How are battery STCs calculated?", a: "Battery STCs use a tapering rule on usable kWh: first 14 kWh at 100% of the STC factor, next 14 kWh at 60%, and 28-50 kWh at 15%. The factor steps down every 6 months and is auto-selected from your installation date." },
  { q: "What is the VIC rebate?", a: "The Solar Victoria rebate provides eligible VIC households with a $1,400 rebate (with a matching interest-free loan of $1,400, totalling $2,800 off your system price). This is applied after the STC discount." },
  { q: "What are extra costs?", a: "Site-specific costs that may apply to your installation: double-storey access, switchboard upgrades, tile roofs, battery backup configurations, etc. Select Yes for any that apply and they will be added to the quote." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function STCCalculatorPage() {
  // System config
  const [installDate, setInstallDate] = useState(todayStr());
  const [postcode, setPostcode]       = useState("");
  const [postcodeError, setPostcodeError] = useState("");

  // Solar
  const [systemKw, setSystemKw]     = useState("6.6");
  const [numPanels, setNumPanels]   = useState("14");
  const [inverterKw, setInverterKw] = useState("5");
  const [inverterCost, setInverterCost] = useState("1906");
  const [stcPrice, setStcPrice]     = useState("37");

  // Battery
  const [hasBattery, setHasBattery]   = useState(false);
  const [battKwh, setBattKwh]         = useState("10");
  const [battModules, setBattModules] = useState("1");
  const [battModuleCost, setBattModuleCost] = useState("2170");
  const [battInstallCost, setBattInstallCost] = useState("2000");

  // VIC rebate
  const [applyVicRebate, setApplyVicRebate] = useState(false);

  // Extra costs — enabled/disabled + custom cost for variable ones
  const [extras, setExtras] = useState<Record<ExtraKey, boolean>>({
    doubleStorey: false, bollards: false, smokeAlarms: false, canopy: false,
    cementTile: false, fireRatedSheet: false, switchboardUpgrade: false,
    multipleStrings: false, partialBackup: false, fullBackup: false,
    tileRoof: false, accessHire: false,
  });
  const [extraCustomCosts, setExtraCustomCosts] = useState<Record<string, string>>({
    multipleStrings: "", accessHire: "",
  });

  // Client
  const [clientName, setClientName]   = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [refId, setRefId]             = useState("");
  const [notes, setNotes]             = useState("");

  // UI
  const [faqOpen, setFaqOpen]       = useState<number | null>(null);
  const [showPopup, setShowPopup]   = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [result, setResult]         = useState<ReturnType<typeof computeQuote> | null>(null);

  // Derived
  const zoneInfo     = getZoneFromPostcode(postcode);
  const deemingYears = getDeemingYears(installDate);
  const battPeriod   = getBatteryPeriod(installDate);
  const battFactor   = BATTERY_STC_FACTORS[battPeriod] ?? 6.8;

  // ── Core calculation ────────────────────────────────────────────────────────
  function computeQuote() {
    const kw          = parseFloat(systemKw)       || 0;
    const panels      = parseInt(numPanels)         || 0;
    const invCost     = parseFloat(inverterCost)    || 0;
    const stcPriceN   = parseFloat(stcPrice)        || 37;
    const battKwhN    = hasBattery ? (parseFloat(battKwh) || 0) : 0;
    const modules     = hasBattery ? (parseInt(battModules) || 0) : 0;
    const modCost     = hasBattery ? (parseFloat(battModuleCost) || 0) : 0;
    const battInst    = hasBattery ? (parseFloat(battInstallCost) || 0) : 0;

    // Base costs (from spreadsheet formulas)
    const panelCost    = 0.25 * kw * 1000;
    const racking      = Math.ceil(panels / 3) * 100;
    const batteryCost  = modules * modCost;
    const panelInstall = 0.3 * kw * 1000;
    const elecMisc     = 400;
    const freight      = 300;
    const commission   = 1500;

    // Extra costs
    let extraTotal = 0;
    const extraBreakdown: { label: string; cost: number }[] = [];
    (Object.keys(extras) as ExtraKey[]).forEach(k => {
      if (!extras[k]) return;
      const cfg = EXTRA_COSTS[k];
      const cost = cfg.cost !== null
        ? cfg.cost
        : (parseFloat(extraCustomCosts[k] || "0") || 0);
      if (cost > 0) {
        extraTotal += cost;
        extraBreakdown.push({ label: cfg.label, cost });
      }
    });

    const totalExGst = panelCost + racking + invCost + batteryCost
                     + panelInstall + battInst + elecMisc + freight
                     + commission + extraTotal;
    const gst         = totalExGst * 0.1;
    const totalInclGst = totalExGst + gst;

    // STCs
    const zoneFactor  = zoneInfo?.factor ?? 1.185;
    const solarStcs   = Math.floor(kw * zoneFactor * deemingYears);
    const solarRebate = solarStcs * stcPriceN;

    let battStcs = 0; let battRebate = 0;
    let battBreakdown = { t1: 0, t2: 0, t3: 0, r1: 0, r2: 0, r3: 0 };
    if (hasBattery && battKwhN > 0) {
      const { totalStcs, t1, t2, t3, r1, r2, r3 } = calcBatterySTCs(battKwhN, battFactor);
      battStcs = totalStcs; battRebate = battStcs * stcPriceN;
      battBreakdown = { t1, t2, t3, r1, r2, r3 };
    }

    const totalStcs   = solarStcs + battStcs;
    const totalStcVal = (totalStcs) * stcPriceN;
    const sellingPrice = totalInclGst - totalStcVal;
    const afterVic     = applyVicRebate ? sellingPrice - VIC_REBATE : sellingPrice;

    return {
      panelCost, racking, invCost, batteryCost, panelInstall,
      battInst, elecMisc, freight, commission, extraTotal, extraBreakdown,
      totalExGst, gst, totalInclGst,
      solarStcs, solarRebate, battStcs, battRebate,
      totalStcs, totalStcVal, sellingPrice, afterVic,
      battBreakdown, battPeriodLabel: INSTALL_PERIOD_OPTIONS.find(o => o.value === battPeriod)?.label ?? battPeriod,
      zoneFactor, zoneLabel: zoneInfo?.label ?? "Zone not detected",
      deemingYears, stcPriceN, kw, panels, battKwhN, battFactor,
      applyVicRebate,
    };
  }

  function handleCalculate() {
    if (!zoneInfo) { setPostcodeError("Enter a valid 4-digit Australian postcode."); return; }
    setPostcodeError("");
    setResult(computeQuote());
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setSendStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        client_name:    clientName,
        client_email:   clientEmail,
        client_phone:   clientPhone,
        reference_id:   refId || "N/A",
        notes:          notes || "None",
        postcode, zone: result.zoneLabel, install_date: installDate,
        system_kw:      `${result.kw} kW`,
        deeming_years:  String(result.deemingYears),
        solar_stcs:     String(result.solarStcs),
        battery_stcs:   String(result.battStcs),
        total_stcs:     String(result.totalStcs),
        stc_price:      `$${result.stcPriceN}`,
        stc_rebate:     fmt(result.totalStcVal),
        total_ex_gst:   fmt(result.totalExGst),
        total_incl_gst: fmt(result.totalInclGst),
        selling_price:  fmt(result.sellingPrice),
        after_vic:      result.applyVicRebate ? fmt(result.afterVic) : "N/A",
        extras:         result.extraBreakdown.map(e => `${e.label}: ${fmt(e.cost)}`).join(", ") || "None",
      }, PUBLIC_KEY);
      setSendStatus("success");
      setShowPopup(true);
      setClientName(""); setClientEmail(""); setClientPhone(""); setRefId(""); setNotes("");
    } catch { setSendStatus("error"); }
  }

  function toggleExtra(k: ExtraKey) {
    setExtras(p => ({ ...p, [k]: !p[k] }));
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {showPopup && <SuccessPopup onClose={() => { setShowPopup(false); setSendStatus("idle"); }} />}

      {/* Header */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-slate-50 dark:bg-slate-800 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Australian government solar rebate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Solar & Battery Quote Calculator</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Calculate your full system price — including STC rebate, GST, and optional VIC rebate — using official CER formulas.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">

          {/* ── Installation Details ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Installation details</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Location and date determine your STC zone and deeming period.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="flex items-center text-sm font-medium text-foreground">
                    Expected installation date
                    <Tooltip text="Used to calculate deeming years (solar) and battery STC factor period." />
                  </label>
                  <input type="date" value={installDate} min="2021-01-01" max="2030-12-31"
                    onChange={e => { setInstallDate(e.target.value); setResult(null); }}
                    className="w-full h-10 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  {deemingYears > 0 && (
                    <p className="text-xs text-primary font-medium">
                      → {deemingYears} deeming year{deemingYears !== 1 ? "s" : ""} · Battery factor: {battFactor} STCs/kWh
                    </p>
                  )}
                </div>
                {/* Postcode */}
                <div className="space-y-1.5">
                  <label className="flex items-center text-sm font-medium text-foreground">
                    Installation postcode
                    <Tooltip text="4-digit postcode used to automatically detect your CER STC zone (1-4)." />
                  </label>
                  <input type="text" inputMode="numeric" maxLength={4} value={postcode}
                    onChange={e => { setPostcode(e.target.value.replace(/\D/g, "")); setPostcodeError(""); setResult(null); }}
                    placeholder="e.g. 3217"
                    className={`w-full h-10 rounded-lg border bg-slate-50 dark:bg-slate-800 text-foreground px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${postcodeError ? "border-red-400" : "border-input focus:border-primary"}`} />
                  {postcodeError && <p className="text-xs text-red-500">{postcodeError}</p>}
                  {zoneInfo && !postcodeError && (
                    <p className="text-xs text-primary font-medium">→ {zoneInfo.label} detected</p>
                  )}
                  {postcode.length === 4 && !zoneInfo && (
                    <p className="text-xs text-amber-600">Postcode not recognised.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Solar System ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 shrink-0">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Solar panel system</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Panel capacity, inverter and STC spot price.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="System capacity" value={systemKw} onChange={v => { setSystemKw(v); setResult(null); }}
                  unit="kW" step="0.001" max="100"
                  tooltip="Total installed panel capacity in kW. Used to calculate panel cost ($0.25/W), install cost ($0.30/W) and solar STCs." />
                <Field label="Number of panels" value={numPanels} onChange={v => { setNumPanels(v); setResult(null); }}
                  unit="panels" step="1"
                  tooltip="Used to calculate racking cost (ceil(panels÷3) × $100)." />
                <Field label="Inverter size" value={inverterKw} onChange={v => { setInverterKw(v); setResult(null); }}
                  unit="kW" step="0.5"
                  tooltip="Inverter rated output in kW. For reference only — enter the inverter cost below." />
                <Field label="Inverter cost" value={inverterCost} onChange={v => { setInverterCost(v); setResult(null); }}
                  prefix="$" unit="" step="1"
                  tooltip="Actual cost of the inverter. Defaults to $1,906 for a standard 10 kW unit." />
                <Field label="STC spot price" value={stcPrice} onChange={v => { setStcPrice(v); setResult(null); }}
                  prefix="$" unit="/ STC" step="0.50"
                  tooltip="Current market price per STC. Check rec-registry.com.au. Default $37." />
              </div>

              {/* Auto-calculated cost preview */}
              {parseFloat(systemKw) > 0 && (
                <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-4 py-3 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-2">Auto-calculated from system size</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><span className="text-muted-foreground">Panel cost</span><br /><span className="font-semibold text-foreground">{fmt(0.25 * (parseFloat(systemKw)||0) * 1000)}</span></div>
                    <div><span className="text-muted-foreground">Racking</span><br /><span className="font-semibold text-foreground">{fmt(Math.ceil((parseInt(numPanels)||0)/3)*100)}</span></div>
                    <div><span className="text-muted-foreground">Panel install</span><br /><span className="font-semibold text-foreground">{fmt(0.3 * (parseFloat(systemKw)||0) * 1000)}</span></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Battery ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 shrink-0">
                    <BatteryCharging className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Battery storage</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Optional — include battery in quote.</p>
                  </div>
                </div>
                {/* Toggle */}
                <button onClick={() => { setHasBattery(p => !p); setResult(null); }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hasBattery ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${hasBattery ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </CardHeader>
            {hasBattery && (
              <CardContent className="pt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Usable capacity" value={battKwh} onChange={v => { setBattKwh(v); setResult(null); }}
                    unit="kWh" step="0.5" min="5" max="100"
                    tooltip="Usable kWh from product spec. Only first 50 kWh earns STCs." />
                  <Field label="Number of modules" value={battModules} onChange={v => { setBattModules(v); setResult(null); }}
                    unit="modules" step="1"
                    tooltip="Number of battery modules. Battery cost = modules × cost per module." />
                  <Field label="Cost per module" value={battModuleCost} onChange={v => { setBattModuleCost(v); setResult(null); }}
                    prefix="$" unit="" step="1"
                    tooltip="Cost per battery module. Defaults to $2,170." />
                  <Field label="Battery install cost" value={battInstallCost} onChange={v => { setBattInstallCost(v); setResult(null); }}
                    prefix="$" unit="" step="1"
                    tooltip="Labour cost to install battery. Defaults to $2,000." />
                </div>
                {/* Tapering preview */}
                {parseFloat(battKwh) > 0 && (
                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                      STC tapering preview · factor {battFactor} ({INSTALL_PERIOD_OPTIONS.find(o=>o.value===battPeriod)?.label ?? battPeriod})
                    </p>
                    {([
                      { label: "Tier 1 (0-14 kWh @ 100%)",  kwh: Math.min(Math.min(parseFloat(battKwh)||0, 50), 14) },
                      { label: "Tier 2 (14-28 kWh @ 60%)",  kwh: (parseFloat(battKwh)||0) > 14 ? Math.min(Math.min(parseFloat(battKwh)||0, 50) - 14, 14) : 0 },
                      { label: "Tier 3 (28-50 kWh @ 15%)",  kwh: (parseFloat(battKwh)||0) > 28 ? Math.min(parseFloat(battKwh)||0, 50) - 28 : 0 },
                    ] as const).map(({ label, kwh }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{label}</span>
                        <span className={`font-medium ${kwh > 0 ? "text-foreground" : "text-muted-foreground/40"}`}>{kwh.toFixed(1)} kWh</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* ── Extra Costs ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Extra costs</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Toggle any site-specific costs that apply.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-2">
                {(Object.keys(EXTRA_COSTS) as ExtraKey[]).map(k => {
                  const cfg = EXTRA_COSTS[k];
                  const isOn = extras[k];
                  const isVariable = cfg.cost === null;
                  return (
                    <div key={k} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${isOn ? "border-primary/30 bg-primary/5" : "border-border bg-white dark:bg-slate-900"}`}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button onClick={() => toggleExtra(k)}
                          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${isOn ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-4" : "translate-x-0.5"}`} />
                        </button>
                        <span className="text-sm font-medium text-foreground">{cfg.label}</span>
                        {!isVariable && cfg.cost !== null && (
                          <span className="text-xs text-muted-foreground">{fmt(cfg.cost)}</span>
                        )}
                        {isVariable && (
                          <span className="text-xs text-muted-foreground">variable</span>
                        )}
                      </div>
                      {/* Variable cost input */}
                      {isOn && isVariable && (
                        <div className="flex items-center gap-1 ml-3">
                          <span className="text-xs text-muted-foreground">$</span>
                          <input
                            type="number" min="0" step="50"
                            value={extraCustomCosts[k] || ""}
                            onChange={e => { setExtraCustomCosts(p => ({ ...p, [k]: e.target.value })); setResult(null); }}
                            placeholder="0"
                            className="w-24 h-8 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          />
                        </div>
                      )}
                      {/* Fixed cost badge when on */}
                      {isOn && !isVariable && cfg.cost !== null && (
                        <span className="ml-3 text-xs font-semibold text-primary">+ {fmt(cfg.cost)}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* VIC Rebate */}
              <div className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${applyVicRebate ? "border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800" : "border-border bg-white dark:bg-slate-900"}`}>
                <div className="flex items-center gap-3">
                  <button onClick={() => { setApplyVicRebate(p => !p); setResult(null); }}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${applyVicRebate ? "bg-green-600" : "bg-slate-200 dark:bg-slate-700"}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${applyVicRebate ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                  <div>
                    <span className="text-sm font-medium text-foreground">Apply VIC Solar rebate</span>
                    <span className="ml-2 text-xs text-muted-foreground">{fmt(VIC_REBATE)} off</span>
                  </div>
                </div>
                {applyVicRebate && <span className="text-xs font-semibold text-green-700 dark:text-green-400">- {fmt(VIC_REBATE)}</span>}
              </div>
            </CardContent>
          </Card>

          {/* ── Calculate button ── */}
          <Button onClick={handleCalculate} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" /> Generate quote
          </Button>

          {/* ── Results ── */}
          {result && (
            <Card className="border shadow-md">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Quote summary</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {clientName ? `For ${clientName}` : "Your estimate"}{refId ? ` · Ref: ${refId}` : ""} · Postcode {postcode} ({result.zoneLabel}) · {result.deemingYears} yr deeming
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-6">

                {/* Selling price hero */}
                <div className={`grid gap-3 ${result.applyVicRebate ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
                  <ResultCard label="Total (Ex-GST)"   value={fmt(result.totalExGst)}    />
                  <ResultCard label="Total (Incl. GST)" value={fmt(result.totalInclGst)}  />
                  <ResultCard label="After STC rebate"  value={fmt(result.sellingPrice)}  highlight large />
                  {result.applyVicRebate && (
                    <ResultCard label="After VIC rebate" value={fmt(result.afterVic)} accent="green" large />
                  )}
                </div>

                {/* STC summary */}
                <div className="grid grid-cols-3 gap-3">
                  <ResultCard label="Solar STCs"   value={String(result.solarStcs)}  accent="blue"  sub={fmt(result.solarRebate)} />
                  <ResultCard label="Battery STCs" value={String(result.battStcs)}   accent="amber" sub={hasBattery ? fmt(result.battRebate) : "N/A"} />
                  <ResultCard label="Total STCs"   value={String(result.totalStcs)}  highlight      sub={fmt(result.totalStcVal)} />
                </div>

                {/* Full cost breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Cost breakdown</p>

                  <SectionLabel icon={Sun} label="Solar" color="blue" />
                  <div className="mt-2 mb-4">
                    <BRow label={`Panel cost (0.25 × ${result.kw} kW × 1000)`}          value={fmt(result.panelCost)} />
                    <BRow label={`Racking (ceil(${result.panels}÷3) × $100)`}           value={fmt(result.racking)} />
                    <BRow label="Inverter"                                               value={fmt(result.invCost)} />
                    <BRow label={`Panel install (0.30 × ${result.kw} kW × 1000)`}      value={fmt(result.panelInstall)} />
                  </div>

                  {hasBattery && result.battStcs > 0 && (
                    <>
                      <SectionLabel icon={BatteryCharging} label="Battery" color="amber" />
                      <div className="mt-2 mb-4">
                        <BRow label={`Battery modules (${battModules} × $${battModuleCost})`} value={fmt(result.batteryCost)} />
                        <BRow label="Battery install"                                          value={fmt(result.battInst)} />
                      </div>
                    </>
                  )}

                  <SectionLabel icon={DollarSign} label="Other" color="slate" />
                  <div className="mt-2 mb-4">
                    <BRow label="Elec. misc."   value={fmt(result.elecMisc)} />
                    <BRow label="Freight"        value={fmt(result.freight)} />
                    <BRow label="Commission"     value={fmt(result.commission)} />
                  </div>

                  {result.extraBreakdown.length > 0 && (
                    <>
                      <SectionLabel icon={DollarSign} label="Extra costs" color="slate" />
                      <div className="mt-2 mb-4">
                        {result.extraBreakdown.map(e => (
                          <BRow key={e.label} label={e.label} value={fmt(e.cost)} indent />
                        ))}
                        <BRow label="Extra costs total" value={fmt(result.extraTotal)} />
                      </div>
                    </>
                  )}

                  <div className="border-t border-border pt-3 space-y-0">
                    <BRow label="Total (Ex-GST)"           value={fmt(result.totalExGst)} />
                    <BRow label="GST (10%)"                value={fmt(result.gst)} />
                    <BRow label="Total (Incl. GST)"        value={fmt(result.totalInclGst)} total />
                  </div>

                  <div className="border-t border-border pt-3 space-y-0 mt-3">
                    <BRow label={`STC rebate (${result.totalStcs} STCs × $${result.stcPriceN})`} value={`– ${fmt(result.totalStcVal)}`} />
                    <BRow label="Selling price (after STC)" value={fmt(result.sellingPrice)} total />
                    {result.applyVicRebate && (
                      <>
                        <BRow label="VIC Solar rebate" value={`– ${fmt(VIC_REBATE)}`} />
                        <BRow label="After VIC rebate" value={fmt(result.afterVic)} total />
                      </>
                    )}
                  </div>
                </div>

                {/* STC breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">STC calculation</p>
                  <BRow label={`Solar: floor(${result.kw} × ${result.zoneFactor.toFixed(3)} × ${result.deemingYears} yr)`} value={`${result.solarStcs} STCs`} />
                  {hasBattery && result.battBreakdown.t1 > 0 && (
                    <>
                      <BRow label={`Battery tier 1: ${result.battBreakdown.t1.toFixed(1)} kWh × ${result.battFactor} × 100%`} value={result.battBreakdown.r1.toFixed(2)} indent />
                      {result.battBreakdown.t2 > 0 && <BRow label={`Battery tier 2: ${result.battBreakdown.t2.toFixed(1)} kWh × ${result.battFactor} × 60%`} value={result.battBreakdown.r2.toFixed(2)} indent />}
                      {result.battBreakdown.t3 > 0 && <BRow label={`Battery tier 3: ${result.battBreakdown.t3.toFixed(1)} kWh × ${result.battFactor} × 15%`} value={result.battBreakdown.r3.toFixed(2)} indent />}
                      <BRow label={`Battery total (floored from ${(result.battBreakdown.r1+result.battBreakdown.r2+result.battBreakdown.r3).toFixed(2)})`} value={`${result.battStcs} STCs`} />
                    </>
                  )}
                  <BRow label={`Total STCs × $${result.stcPriceN}/STC`} value={fmt(result.totalStcVal)} total />
                </div>

                <p className="text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
                  * Panel cost: $0.25/W · Racking: ceil(panels÷3) × $100 · Panel install: $0.30/W · Battery cost: modules × cost per module · GST: 10% · STC zone from postcode per CER table · Deeming years from install date to 31 Dec 2030. All prices ex-GST unless stated.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Send quote ── */}
          {result && (
            <Card className="border shadow-md">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Send quote to our team</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">We'll follow up within 24 hours.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5">
                <form onSubmit={handleSend} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="sName">Client name</Label>
                      <Input id="sName" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="John Smith" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sEmail">Email address</Label>
                      <Input id="sEmail" type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sPhone">Phone</Label>
                      <Input id="sPhone" type="tel" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+61 400 000 000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sRef">Reference ID</Label>
                      <Input id="sRef" value={refId} onChange={e => setRefId(e.target.value)} placeholder="APM-2026-001 (optional)" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sNotes">Notes</Label>
                    <textarea id="sNotes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes..."
                      className="w-full min-h-[80px] rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                  </div>
                  {/* Summary */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-xs text-muted-foreground space-y-1 border border-border">
                    <p className="font-medium text-foreground text-sm mb-1">Quote summary</p>
                    <p>System: {systemKw} kW · Postcode {postcode} ({result.zoneLabel}) · {installDate}</p>
                    {hasBattery && <p>Battery: {battKwh} kWh · {battModules} module(s)</p>}
                    {result.extraBreakdown.length > 0 && <p>Extras: {result.extraBreakdown.map(e => e.label).join(", ")}</p>}
                    <p>Total incl. GST: <span className="text-foreground font-semibold">{fmt(result.totalInclGst)}</span> · STC rebate: <span className="text-primary font-semibold">– {fmt(result.totalStcVal)}</span></p>
                    <p>Selling price: <span className="text-primary font-semibold">{fmt(result.sellingPrice)}</span>{result.applyVicRebate ? ` · After VIC rebate: ${fmt(result.afterVic)}` : ""}</p>
                  </div>
                  {sendStatus === "error" && <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>}
                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={sendStatus === "sending"}>
                    {sendStatus === "sending" ? "Sending..." : "Send quote to APM Energy"}
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
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors">
                <span className="font-semibold text-base">{faq.q}</span>
                {faqOpen === i ? <ChevronUp className="h-4 w-4 text-primary shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
              </button>
              {faqOpen === i && <p className="text-muted-foreground text-base leading-relaxed pb-4">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get a formal quote?</h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our CEC-accredited team handles everything end-to-end — STC rebate applied as an upfront discount, zero paperwork.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}