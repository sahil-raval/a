"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Sun, BatteryCharging, Zap, Info, ChevronDown, ChevronUp,
  Calculator as CalcIcon, ArrowRight, CheckCircle, X, MapPin, DollarSign, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SERVICE_ID   = "service_t5q2c7h";
const TEMPLATE_ID  = "template_sfkwidw";
const PUBLIC_KEY   = "rgu-gpZuMbktPsuRs";
const PAGE_PASSWORD = "Akshardham@01";

const SCHEME_END  = 2030;
const MAX_DEEMING = 10;
const VIC_REBATE  = 2800;
const STC_PRICE   = 37; // Fixed

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

// ─── Extra costs ──────────────────────────────────────────────────────────────
type FixedExtraKey =
  | "doubleStorey" | "bollards" | "smokeAlarms" | "canopy"
  | "cementTile" | "fireRatedSheet" | "switchboardUpgrade"
  | "partialBackup" | "fullBackup" | "tileRoof";

type VariableExtraKey =
  | "multipleStrings" | "accessHire"
  | "tilt" | "evCharger" | "hotWaterUnit"
  | "panelsLandscape" | "extraCableRun" | "commission";

type ExtraKey = FixedExtraKey | VariableExtraKey;

type ExtraConfig = { label: string; cost: number | null };

const EXTRA_COSTS: Record<ExtraKey, ExtraConfig> = {
  // Fixed
  doubleStorey:       { label: "Double storey",           cost: 500  },
  bollards:           { label: "Bollards",                cost: 200  },
  smokeAlarms:        { label: "Smoke alarms",            cost: 100  },
  canopy:             { label: "Canopy",                  cost: 200  },
  cementTile:         { label: "Cement tile",             cost: 100  },
  fireRatedSheet:     { label: "Fire rated cement sheet", cost: 100  },
  switchboardUpgrade: { label: "Switchboard upgrade",     cost: 750  },
  partialBackup:      { label: "Partial backup",          cost: 450  },
  fullBackup:         { label: "Full backup",             cost: 2000 },
  tileRoof:           { label: "Tile / Kliplok roof",     cost: 400  },
  // Variable
  multipleStrings:    { label: "Multiple strings",        cost: null },
  accessHire:         { label: "Access hire",             cost: null },
  tilt:               { label: "Tilt",                    cost: null },
  evCharger:          { label: "EV charger",              cost: null },
  hotWaterUnit:       { label: "Hot water unit",          cost: null },
  panelsLandscape:    { label: "Panels in landscape",     cost: null },
  extraCableRun:      { label: "Extra cable run",         cost: null },
  commission:         { label: "Commission",              cost: null },
};

function todayStr() { return new Date().toISOString().split("T")[0]; }
function fmt(n: number) { return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2 }); }

// ─── UI Components ────────────────────────────────────────────────────────────
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

function Field({ label, value, onChange, unit, min, max, step, tooltip, placeholder, prefix, readOnly }: {
  label: string; value: string; onChange?: (v: string) => void;
  unit?: string; min?: string; max?: string; step?: string;
  tooltip?: string; placeholder?: string; prefix?: string; readOnly?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center text-sm font-medium text-foreground">
        {label}{tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-xs text-muted-foreground pointer-events-none">{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder} min={min ?? "0"} max={max} step={step}
          readOnly={readOnly}
          className={`w-full h-10 rounded-lg border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${prefix ? "pl-6 pr-16" : "px-3 pr-16"} ${readOnly ? "bg-slate-100 dark:bg-slate-700 text-muted-foreground cursor-not-allowed" : "bg-slate-50 dark:bg-slate-800"}`} />
        {unit && <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none whitespace-nowrap">{unit}</span>}
      </div>
    </div>
  );
}

function SectionLabel({ icon: Icon, label, color }: {
  icon: React.ElementType; label: string; color: "blue" | "amber" | "primary" | "slate";
}) {
  const c: Record<string, string> = {
    blue:    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
    amber:   "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
    primary: "bg-primary/10 text-primary border-primary/20",
    slate:   "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${c[color]}`}>
      <Icon className="h-3.5 w-3.5" />{label}
    </div>
  );
}

function BRow({ label, value, total, indent }: {
  label: string; value: string; total?: boolean; indent?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-border last:border-0 text-sm ${total ? "font-bold" : ""}`}>
      <span className={`${total ? "text-primary" : "text-muted-foreground"} ${indent ? "pl-4" : ""}`}>{label}</span>
      <span className={total ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  );
}

function ResultCard({ label, value, sub, highlight, accent, large }: {
  label: string; value: string; sub?: string; highlight?: boolean;
  accent?: "blue" | "amber"; large?: boolean;
}) {
  const box = accent === "blue"  ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
            : accent === "amber" ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
            : highlight          ? "bg-primary/10 border-primary/20"
            :                     "bg-slate-100 dark:bg-slate-800 border-transparent";
  const txt = accent === "blue"  ? "text-blue-600 dark:text-blue-400"
            : accent === "amber" ? "text-amber-600 dark:text-amber-400"
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
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Quote Sent!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Your quote estimate has been sent to the APM Energy team. We'll be in touch within 24 hours.</p>
        <Button onClick={onClose} className="w-full" size="lg">Sounds good!</Button>
      </div>
    </div>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  function attempt() {
    if (pw === PAGE_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">APM Energy</h1>
          <p className="text-sm text-muted-foreground mt-1">Quote Calculator — Staff Access Only</p>
        </div>
        <Card className="border shadow-lg">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pw">Password</Label>
              <div className="relative">
                <Input
                  id="pw"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && attempt()}
                  placeholder="Enter password"
                  className={error ? "border-red-400 focus-visible:ring-red-400" : ""}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="text-xs text-red-500 font-medium">Incorrect password. Try again.</p>}
            </div>
            <Button onClick={attempt} className="w-full" size="lg">
              <Lock className="mr-2 h-4 w-4" /> Unlock
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Contact your administrator if you need access.
        </p>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "What is an STC?", a: "A Small-scale Technology Certificate represents approximately 1 MWh of renewable electricity. When you install solar or a battery, you create STCs which your installer typically claims on your behalf as an upfront discount on the system price." },
  { q: "How is my STC zone determined?", a: "The CER assigns each Australian postcode to one of four zones based on solar irradiance. Zone 1 (NT, Far North QLD) earns the most STCs. Zone 4 (VIC, TAS, ACT) earns fewer. Zone is automatically detected from your postcode." },
  { q: "What is the deeming period?", a: "The number of years from your installation date to 31 December 2030, when the STC scheme ends. A 2026 install earns 5 deeming years. Installing earlier means more STCs." },
  { q: "How is system capacity calculated?", a: "System capacity (kW) = Number of panels × Panel wattage ÷ 1000. For example, 14 panels × 475W ÷ 1000 = 6.65 kW. This is calculated automatically." },
  { q: "How are battery STCs calculated?", a: "Battery STCs use a tapering rule on usable kWh: first 14 kWh at 100% of the STC factor, next 14 kWh at 60%, and 28-50 kWh at 15%. The factor steps down every 6 months and is auto-selected from your installation date." },
  { q: "What is the VIC rebate?", a: "The Solar Victoria rebate provides eligible VIC households with a $1,400 rebate (with a matching interest-free loan of $1,400, totalling $2,800 off your system price). This is applied after the STC discount." },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function STCCalculatorPage() {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return <Calculator />;
}

function Calculator() {
  // ── Installation ─────────────────────────────────────────────────────────
  const [installDate, setInstallDate] = useState(todayStr());
  const [postcode, setPostcode]       = useState("");
  const [postcodeError, setPostcodeError] = useState("");

  // ── Solar toggle ─────────────────────────────────────────────────────────
  const [hasSolar, setHasSolar] = useState(true);

  // ── Solar inputs ─────────────────────────────────────────────────────────
  const [numPanels, setNumPanels]       = useState("14");
  const [panelWattage, setPanelWattage] = useState("475");   // W per panel
  const [panelPriceCw, setPanelPriceCw] = useState("25");    // cents per watt
  const [inverterKw, setInverterKw]     = useState("5");
  const [inverterCost, setInverterCost] = useState("1906");

  // Derived solar values
  const systemKw    = ((parseInt(numPanels) || 0) * (parseFloat(panelWattage) || 0)) / 1000;
  const panelCostAuto = systemKw * 1000 * ((parseFloat(panelPriceCw) || 0) / 100); // cW → $/W

  // ── Battery-only inverter (shown when battery is on but solar is off) ─────
  const [battInverterKw, setBattInverterKw]     = useState("5");
  const [battInverterCost, setBattInverterCost] = useState("1906");

  // ── Battery ──────────────────────────────────────────────────────────────
  const [hasBattery, setHasBattery]         = useState(false);
  const [battKwh, setBattKwh]               = useState("10");
  const [battModules, setBattModules]       = useState("1");
  const [battModuleCost, setBattModuleCost] = useState("2170");
  const [battInstallCost, setBattInstallCost] = useState("2000");

  // ── VIC rebate ───────────────────────────────────────────────────────────
  const [applyVicRebate, setApplyVicRebate] = useState(false);

  // ── Extra costs ──────────────────────────────────────────────────────────
  const [extras, setExtras] = useState<Record<ExtraKey, boolean>>({
    doubleStorey: false, bollards: false, smokeAlarms: false, canopy: false,
    cementTile: false, fireRatedSheet: false, switchboardUpgrade: false,
    partialBackup: false, fullBackup: false, tileRoof: false,
    multipleStrings: false, accessHire: false,
    tilt: false, evCharger: false, hotWaterUnit: false,
    panelsLandscape: false, extraCableRun: false, commission: true,
  });
  const [extraCustomCosts, setExtraCustomCosts] = useState<Record<string, string>>({});
  // "Other" extras — array so user can add multiple
  const [otherItems, setOtherItems] = useState<{name: string; cost: string}[]>([]);

  function addOtherItem() {
    setOtherItems(p => [...p, { name: "", cost: "" }]);
    setResult(null);
  }
  function updateOtherItem(i: number, field: "name" | "cost", val: string) {
    setOtherItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
    setResult(null);
  }
  function removeOtherItem(i: number) {
    setOtherItems(p => p.filter((_, idx) => idx !== i));
    setResult(null);
  }

  // ── Client ───────────────────────────────────────────────────────────────
  // const [clientName, setClientName]   = useState("");
  // const [clientEmail, setClientEmail] = useState("");
  // const [clientPhone, setClientPhone] = useState("");
  const [refId, setRefId]             = useState("");
  const [notes, setNotes]             = useState("");

  // ── UI ────────────────────────────────────────────────────────────────────
  const [faqOpen, setFaqOpen]       = useState<number | null>(null);
  const [showPopup, setShowPopup]   = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [result, setResult]         = useState<ReturnType<typeof computeQuote> | null>(null);

  // Derived
  const zoneInfo     = getZoneFromPostcode(postcode);
  const deemingYears = getDeemingYears(installDate);
  const battPeriod   = getBatteryPeriod(installDate);
  const battFactor   = BATTERY_STC_FACTORS[battPeriod] ?? 6.8;

  function toggleExtra(k: ExtraKey) {
    setExtras(p => ({ ...p, [k]: !p[k] }));
    setResult(null);
  }

  // ── Core calculation ──────────────────────────────────────────────────────
  function computeQuote() {
    const kw          = systemKw;
    const panels      = parseInt(numPanels) || 0;
    // If battery only, use the battery-section inverter cost
    const invCost     = hasSolar ? (parseFloat(inverterCost) || 0) : (hasBattery ? (parseFloat(battInverterCost) || 0) : 0);
    const battKwhN    = hasBattery ? (parseFloat(battKwh) || 0) : 0;
    const modules     = hasBattery ? (parseInt(battModules) || 0) : 0;
    const modCost     = hasBattery ? (parseFloat(battModuleCost) || 0) : 0;
    const battInst    = hasBattery ? (parseFloat(battInstallCost) || 0) : 0;

    // Solar costs — only if hasSolar
    const panelCost    = hasSolar ? panelCostAuto : 0;
    const racking      = hasSolar ? Math.ceil(panels / 3) * 100 : 0;
    const panelInstall = hasSolar ? 0.3 * kw * 1000 : 0;

    // Battery costs
    const batteryCost  = modules * modCost;

    // Shared
    const elecMisc   = 400;
    const freight    = 300;

    // Extra costs
    let extraTotal = 0;
    let commissionValue = 0; // tracked separately for margin calc
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
        if (k === "commission") commissionValue = cost;
      }
    });
    // Other items (multiple)
    otherItems.forEach(item => {
      const c = parseFloat(item.cost) || 0;
      if (c > 0) {
        extraTotal += c;
        extraBreakdown.push({ label: item.name || "Other", cost: c });
      }
    });

    const totalExGst   = panelCost + racking + invCost + batteryCost
                       + panelInstall + battInst + elecMisc + freight
                       + extraTotal;
    const gst          = totalExGst * 0.1;
    const totalInclGst = totalExGst + gst;

    // STCs
    const zoneFactor  = zoneInfo?.factor ?? 1.185;
    const solarStcs   = hasSolar ? Math.floor(kw * zoneFactor * deemingYears) : 0;
    const solarRebate = solarStcs * STC_PRICE;

    let battStcs = 0; let battRebate = 0;
    let battBreakdown = { t1: 0, t2: 0, t3: 0, r1: 0, r2: 0, r3: 0 };
    if (hasBattery && battKwhN > 0) {
      const { totalStcs, t1, t2, t3, r1, r2, r3 } = calcBatterySTCs(battKwhN, battFactor);
      battStcs = totalStcs; battRebate = battStcs * STC_PRICE;
      battBreakdown = { t1, t2, t3, r1, r2, r3 };
    }

    const totalStcs    = solarStcs + battStcs;
    const totalStcVal  = totalStcs * STC_PRICE;
    const sellingPrice = totalInclGst - totalStcVal;
    const afterVic     = applyVicRebate ? sellingPrice - VIC_REBATE : sellingPrice;

    // Margin % = Commission / (After STC Rebate) × 100
    const marginPct = commissionValue > 0 && sellingPrice > 0
      ? (commissionValue / sellingPrice) * 100
      : 0;

    return {
      panelCost, racking, invCost, batteryCost, panelInstall,
      battInst, elecMisc, freight, extraTotal, extraBreakdown,
      totalExGst, gst, totalInclGst,
      solarStcs, solarRebate, battStcs, battRebate,
      totalStcs, totalStcVal, sellingPrice, afterVic,
      battBreakdown,
      battPeriodLabel: INSTALL_PERIOD_OPTIONS.find(o => o.value === battPeriod)?.label ?? battPeriod,
      zoneFactor, zoneLabel: zoneInfo?.label ?? "Zone not detected",
      deemingYears, kw, panels, battKwhN, battFactor, applyVicRebate,
      commissionValue, marginPct,
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
        // client_name:        clientName,
        // client_email:       clientEmail,
        // client_phone:       clientPhone || "N/A",
        reference_id:       refId || "N/A",
        notes:              notes || "None",
        postcode,
        zone:               result.zoneLabel,
        install_date:       installDate,
        deeming_years:      String(result.deemingYears),
        calculator_mode:    hasSolar && hasBattery ? "Solar PV + Battery" : hasBattery ? "Battery only" : "Solar PV only",
        // Solar fields — only when solar is on
        system_kw:          hasSolar ? `${result.kw.toFixed(3)} kW` : "N/A",
        num_panels:         hasSolar ? numPanels : "N/A",
        panel_wattage:      hasSolar ? `${panelWattage} W` : "N/A",
        panel_price_cw:     hasSolar ? `${panelPriceCw} c/W` : "N/A",
        inverter_kw:        hasSolar ? `${inverterKw} kW` : (hasBattery ? `${battInverterKw} kW` : "N/A"),
        inverter_cost:      hasSolar ? fmt(parseFloat(inverterCost) || 0) : (hasBattery ? fmt(parseFloat(battInverterCost) || 0) : "N/A"),
        panel_cost:         hasSolar ? fmt(result.panelCost) : "N/A",
        racking_cost:       hasSolar ? fmt(result.racking) : "N/A",
        panel_install:      hasSolar ? fmt(result.panelInstall) : "N/A",
        solar_stcs:         hasSolar ? String(result.solarStcs) : "N/A",
        solar_rebate:       hasSolar ? fmt(result.solarRebate) : "N/A",
        // Battery fields — only when battery is on
        battery_kwh:        hasBattery ? `${battKwh} kWh` : "N/A",
        battery_modules:    hasBattery ? `${battModules} × $${battModuleCost}` : "N/A",
        battery_cost:       hasBattery ? fmt(result.batteryCost) : "N/A",
        battery_install:    hasBattery ? fmt(result.battInst) : "N/A",
        battery_factor:     hasBattery ? `${result.battFactor} STCs/kWh` : "N/A",
        battery_period:     hasBattery ? result.battPeriodLabel : "N/A",
        battery_stcs:       hasBattery ? String(result.battStcs) : "N/A",
        battery_rebate:     hasBattery ? fmt(result.battRebate) : "N/A",
        elec_misc:          fmt(result.elecMisc),
        freight:            fmt(result.freight),
        commission:         result.commissionValue > 0 ? fmt(result.commissionValue) : "N/A",
        margin_pct:         result.commissionValue > 0 ? `${result.marginPct.toFixed(1)}%` : "N/A",
        extras:             result.extraBreakdown.length > 0
                              ? result.extraBreakdown.map(e => `${e.label}: ${fmt(e.cost)}`).join(", ")
                              : "None",
        extras_total:       fmt(result.extraTotal),
        total_ex_gst:       fmt(result.totalExGst),
        gst:                fmt(result.gst),
        total_incl_gst:     fmt(result.totalInclGst),
        total_stcs:         String(result.totalStcs),
        stc_price:          `$${STC_PRICE}`,
        stc_rebate:         fmt(result.totalStcVal),
        selling_price:      fmt(result.sellingPrice),
        vic_rebate_applied: result.applyVicRebate ? "Yes" : "No",
        after_vic:          result.applyVicRebate ? fmt(result.afterVic) : "N/A",
      }, PUBLIC_KEY);
      setSendStatus("success");
      setShowPopup(true);
      // setClientName(""); setClientEmail(""); setClientPhone(""); 
      setRefId(""); setNotes("");
    } catch { setSendStatus("error"); }
  }

  const battKwhN = parseFloat(battKwh) || 0;

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Solar &amp; Battery Quote Calculator</h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Full system price including STC rebate, GST and optional VIC rebate — using official CER formulas.
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
                  {zoneInfo && !postcodeError && <p className="text-xs text-primary font-medium">→ {zoneInfo.label} detected</p>}
                  {postcode.length === 4 && !zoneInfo && <p className="text-xs text-amber-600">Postcode not recognised.</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Solar System ── */}
          <Card className="border shadow-md">
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 shrink-0">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Solar panel system</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">Panel capacity auto-calculated from count × wattage.</p>
                  </div>
                </div>
                <button onClick={() => { setHasSolar(p => !p); setResult(null); }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hasSolar ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${hasSolar ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </CardHeader>
            {hasSolar && (
              <CardContent className="pt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Number of panels" value={numPanels}
                    onChange={v => { setNumPanels(v); setResult(null); }}
                    unit="panels" step="1"
                    tooltip="Number of panels installed. System capacity = panels × wattage ÷ 1000." />
                  <Field label="Panel wattage" value={panelWattage}
                    onChange={v => { setPanelWattage(v); setResult(null); }}
                    unit="W" step="5"
                    tooltip="Rated wattage per panel. E.g. 475 W, 500 W." />
                  <Field label="Panel price" value={panelPriceCw}
                    onChange={v => { setPanelPriceCw(v); setResult(null); }}
                    unit="c/W" step="0.5"
                    tooltip="Panel cost in cents per watt. Total panel cost = system kW × 1000 × (price ÷ 100)." />
                  <Field label="System capacity (auto)" value={systemKw.toFixed(3)}
                    unit="kW" readOnly
                    tooltip="Auto-calculated: panels × wattage ÷ 1000. Read-only." />
                  <Field label="Inverter size" value={inverterKw}
                    onChange={v => { setInverterKw(v); setResult(null); }}
                    unit="kW" step="0.5" />
                  <Field label="Inverter cost" value={inverterCost}
                    onChange={v => { setInverterCost(v); setResult(null); }}
                    prefix="$" step="1"
                    tooltip="Actual cost of the inverter. Defaults to $1,906." />
                </div>

                {/* Auto-calc preview */}
                {systemKw > 0 && (
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-2">Auto-calculated</p>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground block">System capacity</span>
                        <span className="font-bold text-foreground text-sm">{systemKw.toFixed(3)} kW</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Panel cost</span>
                        <span className="font-bold text-foreground text-sm">{fmt(panelCostAuto)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Panel install</span>
                        <span className="font-bold text-foreground text-sm">{fmt(0.3 * systemKw * 1000)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Racking: {fmt(Math.ceil((parseInt(numPanels)||0)/3)*100)} · STC price: ${STC_PRICE}/STC (fixed)
                    </p>
                  </div>
                )}
              </CardContent>
            )}
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
                    unit="modules" step="1" />
                  <Field label="Cost per module" value={battModuleCost} onChange={v => { setBattModuleCost(v); setResult(null); }}
                    prefix="$" step="1" tooltip="Cost per battery module. Defaults to $2,170." />
                  <Field label="Battery install cost" value={battInstallCost} onChange={v => { setBattInstallCost(v); setResult(null); }}
                    prefix="$" step="1" tooltip="Labour cost to install battery. Defaults to $2,000." />
                  {/* Inverter fields — only shown when battery is on and solar is off */}
                  {!hasSolar && (
                    <>
                      <Field label="Inverter size" value={battInverterKw}
                        onChange={v => { setBattInverterKw(v); setResult(null); }}
                        unit="kW" step="0.5"
                        tooltip="Inverter size for battery-only installation." />
                      <Field label="Inverter cost" value={battInverterCost}
                        onChange={v => { setBattInverterCost(v); setResult(null); }}
                        prefix="$" step="1"
                        tooltip="Cost of inverter for battery-only installation. Defaults to $1,906." />
                    </>
                  )}
                </div>
                {battKwhN > 0 && (
                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                      STC tapering · factor {battFactor} ({INSTALL_PERIOD_OPTIONS.find(o=>o.value===battPeriod)?.label ?? battPeriod})
                    </p>
                    {([
                      { label: "Tier 1 (0-14 kWh @ 100%)",  kwh: Math.min(Math.min(battKwhN, 50), 14) },
                      { label: "Tier 2 (14-28 kWh @ 60%)",  kwh: battKwhN > 14 ? Math.min(Math.min(battKwhN, 50) - 14, 14) : 0 },
                      { label: "Tier 3 (28-50 kWh @ 15%)",  kwh: battKwhN > 28 ? Math.min(battKwhN, 50) - 28 : 0 },
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
            <CardContent className="pt-5 space-y-2">

              {/* Fixed cost extras */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Fixed costs</p>
              {(["doubleStorey","bollards","smokeAlarms","canopy","cementTile","fireRatedSheet","switchboardUpgrade","partialBackup","fullBackup","tileRoof"] as FixedExtraKey[]).map(k => {
                const cfg = EXTRA_COSTS[k]; const isOn = extras[k];
                return (
                  <div key={k} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${isOn ? "border-primary/30 bg-primary/5" : "border-border bg-white dark:bg-slate-900"}`}>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleExtra(k)}
                        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${isOn ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <span className="text-sm font-medium text-foreground">{cfg.label}</span>
                      <span className="text-xs text-muted-foreground">{fmt(cfg.cost!)}</span>
                    </div>
                    {isOn && <span className="text-xs font-semibold text-primary">+ {fmt(cfg.cost!)}</span>}
                  </div>
                );
              })}

              {/* Variable cost extras */}
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-4 mb-1">Variable costs</p>
              {(["multipleStrings","accessHire","tilt","evCharger","hotWaterUnit","panelsLandscape","extraCableRun","commission"] as VariableExtraKey[]).map(k => {
                const cfg = EXTRA_COSTS[k]; const isOn = extras[k];
                return (
                  <div key={k} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${isOn ? "border-primary/30 bg-primary/5" : "border-border bg-white dark:bg-slate-900"}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button onClick={() => toggleExtra(k)}
                        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${isOn ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isOn ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <span className="text-sm font-medium text-foreground">{cfg.label}</span>
                    </div>
                    {isOn && (
                      <div className="flex items-center gap-1 ml-3 shrink-0">
                        <span className="text-xs text-muted-foreground">$</span>
                        <input type="number" min="0" step="50"
                          value={extraCustomCosts[k] || ""}
                          onChange={e => { setExtraCustomCosts(p => ({ ...p, [k]: e.target.value })); setResult(null); }}
                          placeholder="0"
                          className="w-24 h-8 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Other — multiple items with + button */}
              <div className="rounded-xl border border-border bg-white dark:bg-slate-900 px-4 py-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Other</span>
                  <button
                    type="button"
                    onClick={addOtherItem}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <span className="text-base leading-none">+</span> Add item
                  </button>
                </div>
                {otherItems.length === 0 && (
                  <p className="text-xs text-muted-foreground">Click + to add a custom cost item.</p>
                )}
                {otherItems.map((item, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Description</label>
                        <input type="text" value={item.name}
                          onChange={e => updateOtherItem(i, "name", e.target.value)}
                          placeholder="e.g. Custom cable tray"
                          className="w-full h-8 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Amount ($)</label>
                        <input type="number" min="0" step="50" value={item.cost}
                          onChange={e => updateOtherItem(i, "cost", e.target.value)}
                          placeholder="0"
                          className="w-full h-8 rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOtherItem(i)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* VIC Rebate */}
              <div className={`mt-2 flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${applyVicRebate ? "border-primary/30 bg-primary/5" : "border-border bg-white dark:bg-slate-900"}`}>
                <div className="flex items-center gap-3">
                  <button onClick={() => { setApplyVicRebate(p => !p); setResult(null); }}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${applyVicRebate ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${applyVicRebate ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                  <span className="text-sm font-medium text-foreground">Apply VIC Solar rebate</span>
                  <span className="text-xs text-muted-foreground">{fmt(VIC_REBATE)} off</span>
                </div>
                {applyVicRebate && <span className="text-xs font-semibold text-primary">– {fmt(VIC_REBATE)}</span>}
              </div>
            </CardContent>
          </Card>

          {/* ── Generate ── */}
          <Button onClick={handleCalculate} className="w-full" size="lg">
            <CalcIcon className="mr-2 h-4 w-4" /> Generate quote
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
                      { "Estimate"}{refId ? ` · Ref: ${refId}` : ""} · Postcode {postcode} ({result.zoneLabel}) · {result.deemingYears} yr deeming
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-6">

                {/* Price hero */}
                <div className={`grid gap-3 ${result.applyVicRebate ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
                  <ResultCard label="Total (Ex-GST)"    value={fmt(result.totalExGst)} />
                  <ResultCard label="Total (Incl. GST)" value={fmt(result.totalInclGst)} />
                  <ResultCard label="After STC rebate"  value={fmt(result.sellingPrice)} highlight large />
                  {result.applyVicRebate && (
                    <ResultCard label="After VIC rebate" value={fmt(result.afterVic)} accent="blue" large />
                  )}
                </div>

                {/* Commission + Margin highlight */}
                {result.commissionValue > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4 text-center space-y-1 border bg-primary dark:bg-slate-900 border-slate-700">
                      <p className="text-xs text-slate-400 uppercase tracking-wider leading-tight">Commission</p>
                      <p className="text-xl font-bold text-white">{fmt(result.commissionValue)}</p>
                    </div>
                    <div className={`rounded-xl p-4 text-center space-y-1 border ${result.marginPct >= 15 ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider leading-tight">Margin %</p>
                      <p className={`text-xl font-bold ${result.marginPct >= 15 ? "text-blue-600 dark:text-blue-400" : "text-foreground"}`}>
                        {result.marginPct.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">commission ÷ after STC rebate</p>
                    </div>
                  </div>
                )}

                {/* STC cards */}
                <div className="grid grid-cols-3 gap-3">
                  <ResultCard label="Solar STCs"   value={String(result.solarStcs)}  accent="blue"  sub={fmt(result.solarRebate)} />
                  <ResultCard label="Battery STCs" value={String(result.battStcs)}   accent="amber" sub={hasBattery ? fmt(result.battRebate) : "N/A"} />
                  <ResultCard label="Total STCs"   value={String(result.totalStcs)}  highlight      sub={fmt(result.totalStcVal)} />
                </div>

                {/* Cost breakdown */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Cost breakdown</p>

                  {hasSolar && (
                    <>
                      <SectionLabel icon={Sun} label="Solar" color="blue" />
                      <div className="mt-2 mb-4">
                        <BRow label={`Panel cost (${result.kw.toFixed(3)} kW × 1000 × ${panelPriceCw}c/W ÷ 100)`} value={fmt(result.panelCost)} />
                        <BRow label={`Racking (ceil(${result.panels}÷3) × $100)`}                                  value={fmt(result.racking)} />
                        <BRow label={`Inverter (${inverterKw} kW)`}                                                value={fmt(result.invCost)} />
                        <BRow label={`Panel install (0.30 × ${result.kw.toFixed(3)} kW × 1000)`}                  value={fmt(result.panelInstall)} />
                      </div>
                    </>
                  )}

                  {hasBattery && (
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
                    <BRow label="Elec. misc."  value={fmt(result.elecMisc)} />
                    <BRow label="Freight"       value={fmt(result.freight)} />
                  </div>

                  {result.extraBreakdown.length > 0 && (
                    <>
                      <SectionLabel icon={DollarSign} label="Extra costs" color="slate" />
                      <div className="mt-2 mb-4">
                        {result.extraBreakdown.map(e => <BRow key={e.label} label={e.label} value={fmt(e.cost)} indent />)}
                        <BRow label="Extra costs total" value={fmt(result.extraTotal)} />
                      </div>
                    </>
                  )}

                  <div className="border-t border-border pt-3">
                    <BRow label="Total (Ex-GST)"    value={fmt(result.totalExGst)} />
                    <BRow label="GST (10%)"          value={fmt(result.gst)} />
                    <BRow label="Total (Incl. GST)" value={fmt(result.totalInclGst)} total />
                  </div>

                  <div className="border-t border-border pt-3 mt-3">
                    <BRow label={`STC rebate (${result.totalStcs} STCs × $${STC_PRICE})`} value={`– ${fmt(result.totalStcVal)}`} />
                    <BRow label="Selling price (after STC)"                               value={fmt(result.sellingPrice)} total />
                    {result.applyVicRebate && (
                      <>
                        <BRow label="VIC Solar rebate" value={`– ${fmt(VIC_REBATE)}`} />
                        <BRow label="After VIC rebate" value={fmt(result.afterVic)} total />
                      </>
                    )}
                  </div>
                </div>

                {/* STC detail */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">STC calculation</p>
                  {hasSolar && (
                    <BRow label={`Solar: floor(${result.kw.toFixed(3)} × ${result.zoneFactor.toFixed(3)} × ${result.deemingYears} yr)`} value={`${result.solarStcs} STCs`} />
                  )}
                  {hasBattery && result.battBreakdown.t1 > 0 && (
                    <>
                      <BRow label={`Batt. tier 1: ${result.battBreakdown.t1.toFixed(1)} kWh × ${result.battFactor} × 100%`} value={result.battBreakdown.r1.toFixed(2)} indent />
                      {result.battBreakdown.t2 > 0 && <BRow label={`Batt. tier 2: ${result.battBreakdown.t2.toFixed(1)} kWh × ${result.battFactor} × 60%`}  value={result.battBreakdown.r2.toFixed(2)} indent />}
                      {result.battBreakdown.t3 > 0 && <BRow label={`Batt. tier 3: ${result.battBreakdown.t3.toFixed(1)} kWh × ${result.battFactor} × 15%`}  value={result.battBreakdown.r3.toFixed(2)} indent />}
                      <BRow label={`Battery total (floored from ${(result.battBreakdown.r1+result.battBreakdown.r2+result.battBreakdown.r3).toFixed(2)})`} value={`${result.battStcs} STCs`} />
                    </>
                  )}
                  <BRow label={`Total STCs × $${STC_PRICE}/STC`} value={fmt(result.totalStcVal)} total />
                </div>

                <p className="text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
                  * System capacity = panels × wattage ÷ 1000 · Panel cost = kW × 1000 × c/W ÷ 100 · Racking = ceil(panels÷3) × $100 · Panel install = $0.30/W · STC price fixed at ${STC_PRICE}/STC · Zone from postcode per CER table · Deeming years from install date to 31 Dec 2030.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Send Quote ── */}
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
                      <Label htmlFor="sRef">Reference ID</Label>
                      <Input id="sRef" value={refId} onChange={e => setRefId(e.target.value)} placeholder="APM-2026-001 (optional)" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sNotes">Notes</Label>
                    <textarea id="sNotes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes..."
                      className="w-full min-h-[80px] rounded-lg border border-input bg-slate-50 dark:bg-slate-800 text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 text-xs text-muted-foreground space-y-1 border border-border">
                    <p className="font-medium text-foreground text-sm mb-1">Quote summary</p>
                    {hasSolar && <p>Solar: {result.kw.toFixed(3)} kW ({numPanels} × {panelWattage}W) · {postcode} ({result.zoneLabel}) · {installDate}</p>}
                    {hasBattery && <p>Battery: {battKwh} kWh · {battModules} module(s)</p>}
                    {result.extraBreakdown.length > 0 && <p>Extras: {result.extraBreakdown.map(e => e.label).join(", ")}</p>}
                    <p>Total incl. GST: <span className="text-foreground font-semibold">{fmt(result.totalInclGst)}</span> · STC rebate: <span className="text-primary font-semibold">– {fmt(result.totalStcVal)}</span></p>
                    <p>Selling price: <span className="text-primary font-semibold">{fmt(result.sellingPrice)}</span>{result.applyVicRebate ? ` · After VIC: ${fmt(result.afterVic)}` : ""}</p>
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