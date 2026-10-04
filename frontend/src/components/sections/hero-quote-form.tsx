"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { submitLead } from "@/lib/lead";

type ServiceOption = { value: string; label: string };

// Used only if serviceOptions aren't passed in from Sanity.
// Ideally pass contact.serviceOptions so values match the contact page in GA4.
const FALLBACK_OPTIONS: ServiceOption[] = [
  { value: "solar-battery", label: "Solar + battery" },
  { value: "solar", label: "Solar panels" },
  { value: "battery", label: "Battery storage" },
  { value: "ev-charger", label: "EV charger" },
  { value: "complete-package", label: "Solar, battery & EV charger" },
  { value: "maintenance", label: "Maintenance or repair" },
  { value: "not-sure", label: "Not sure yet — advise me" },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  suburb: "",
  service: "",
  company: "", // honeypot — real users never see or fill this
};

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function HeroQuoteForm({ serviceOptions }: { serviceOptions?: ServiceOption[] }) {
  const options = serviceOptions?.length ? serviceOptions : FALLBACK_OPTIONS;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentTo, setSentTo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot filled the hidden field: pretend success, send nothing
    if (form.company) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const serviceLabel = options.find((o) => o.value === form.service)?.label ?? "Not specified";

    try {
      await submitLead(
        {
          // Matches the existing EmailJS template fields, so no template changes are required
          first_name: firstName ?? "",
          last_name: rest.join(" "),
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: [
            "Quote request from the homepage hero form.",
            `Suburb/postcode: ${form.suburb}`,
            `Interested in: ${serviceLabel}`,
          ].join("\n"),
          // Extra fields, available if you add {{suburb}} / {{source}} to the template later
          suburb: form.suburb,
          source: "Homepage hero form",
        },
        "home_hero_form",
      );
      setSentTo(firstName ?? "");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border-t-4 border-primary bg-white p-6 shadow-2xl sm:p-8 dark:bg-slate-900">
      {status === "success" ? (
        <div className="py-8 text-center" role="status">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Request sent</h2>
          <p className="mb-6 text-slate-500 dark:text-slate-400">
            Thanks{sentTo ? ` ${sentTo}` : ""}. Our North Geelong team will be in touch within 24
            hours to talk through your system.
          </p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Send another request
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Get your free quote</h2>
          <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">
            Takes under a minute. We&apos;ll book a free, no-obligation assessment of your roof
            and usage.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="hero-quote-form">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hero-company">Leave this field empty</label>
              <input
                id="hero-company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-name">Name</Label>
              <Input
                id="hero-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="hero-phone">Phone</Label>
                <Input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  minLength={8}
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-email">Email</Label>
                <Input
                  id="hero-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-suburb">Suburb or postcode</Label>
              <Input
                id="hero-suburb"
                name="suburb"
                autoComplete="postal-code"
                value={form.suburb}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hero-service">I&apos;m interested in</Label>
              <select
                id="hero-service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className={selectClass}
              >
                <option value="">Select a service...</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {status === "error" && (
              <p className="text-sm font-medium text-red-600" role="alert">
                Your request didn&apos;t send. Try again, or call us on +61 412 391 878.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-full text-base"
              disabled={status === "sending"}
              data-testid="hero-quote-submit"
            >
              {status === "sending" ? "Sending..." : "Request my free quote"}
            </Button>

            <p className="text-center text-xs text-slate-400">
              We only use your details to prepare your quote. Never sold or shared.
            </p>
          </form>
        </>
      )}
    </div>
  );
}