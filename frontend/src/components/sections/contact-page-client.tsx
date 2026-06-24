"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, CheckCircle, X } from "lucide-react";
import type { ContactContent, SiteContent } from "@/sanity/fallbacks";

const SERVICE_ID = "service_t5q2c7h";
const TEMPLATE_ID = "template_rt7qy7g";
const PUBLIC_KEY = "rgu-gpZuMbktPsuRs";

interface ContactPageClientProps {
  contact: ContactContent;
  site: SiteContent;
}

function SuccessPopup({
  onClose,
  title,
  message,
}: {
  onClose: () => void;
  title: string;
  message: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{message}</p>

        <Button onClick={onClose} className="w-full" size="lg">
          Sounds good!
        </Button>
      </div>
    </div>
  );
}

export default function ContactPageClient({ contact, site }: ContactPageClientProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setStatus("success");
      setShowPopup(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" data-testid="contact-page">
      {showPopup && (
        <SuccessPopup
          onClose={() => {
            setShowPopup(false);
            setStatus("idle");
          }}
          title={contact.successTitle}
          message={contact.successMessage}
        />
      )}

      <section className="bg-slate-900 text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 skew-y-3 transform origin-bottom-right"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{contact.heroTitle}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">{contact.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-12 md:py-24 -mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white dark:bg-slate-900 border-none shadow-xl">
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contact.callLabel}</h3>
                      <p className="text-muted-foreground mb-2">{contact.callDescription}</p>
                      <a
                        href={`tel:${site.phone.replace(/\s+/g, "")}`}
                        className="text-primary font-medium hover:underline"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contact.emailLabel}</h3>
                      <p className="text-muted-foreground mb-2">{contact.emailDescription}</p>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-primary font-medium hover:underline"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contact.visitLabel}</h3>
                      <p className="text-muted-foreground">{contact.visitDescription}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contact.serviceAreaLabel}</h3>
                      <p className="text-muted-foreground">{contact.serviceAreaDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-slate-900 border-none shadow-xl h-full">
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First name</Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="John"
                          required
                          data-testid="contact-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last name</Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                          data-testid="contact-last-name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          data-testid="contact-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+61 400 000 000"
                          data-testid="contact-phone"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interested In</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        data-testid="contact-service"
                      >
                        <option value="">Select a service...</option>
                        {contact.serviceOptions?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="min-h-[150px]"
                        required
                        data-testid="contact-message"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-600 font-medium">
                        ❌ Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={status === "sending"}
                      data-testid="contact-submit"
                    >
                      {status === "sending" ? "Sending..." : contact.submitLabel}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
