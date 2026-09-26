import { getSite } from "@/sanity/queries";
import FloatingContactButtons from "./floating-contact-buttons";

// Server wrapper: reads phone / WhatsApp number from Sanity (Site Settings)
// and hands plain hrefs to the client-side buttons component.
export default async function FloatingContact() {
  const site = await getSite();

  const digits = (site.whatsapp || site.phone || "").replace(/\D/g, "");
  const whatsappHref = digits ? `https://wa.me/${digits}` : undefined;
  const telHref = site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : undefined;

  return <FloatingContactButtons whatsappHref={whatsappHref} telHref={telHref} />;
}
