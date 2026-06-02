import { seo, button } from "./objects/seo";
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { footer } from "./documents/footer";
import { homePage } from "./documents/homePage";
import { service } from "./documents/service";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { howWeWorkPage } from "./documents/howWeWorkPage";
import { legalPage } from "./documents/legalPage";

export const schemaTypes = [
  // objects
  seo,
  button,
  // documents
  siteSettings,
  navigation,
  footer,
  homePage,
  service,
  aboutPage,
  contactPage,
  howWeWorkPage,
  legalPage,
];

export const singletonTypes = new Set([
  "siteSettings",
  "navigation",
  "footer",
  "homePage",
  "aboutPage",
  "contactPage",
  "howWeWorkPage",
]);
