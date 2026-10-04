import emailjs from "@emailjs/browser";

// Same EmailJS credentials the contact page already uses
export const EMAILJS_SERVICE_ID = "service_t5q2c7h";
export const EMAILJS_TEMPLATE_ID = "template_rt7qy7g";
export const EMAILJS_PUBLIC_KEY = "rgu-gpZuMbktPsuRs";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a lead through EmailJS and fires the GA4 `generate_lead` conversion.
 * `formName` lets you compare hero vs contact-page leads in GA4.
 */
export async function submitLead(params: Record<string, string>, formName: string) {
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      form_name: formName,
      service_interest: params.service || "not_specified",
    });
  }
}