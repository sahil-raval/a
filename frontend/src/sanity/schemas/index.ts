import { seo, button } from "./objects/seo";
import { blockContent } from "./objects/blockContent";
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { footer } from "./documents/footer";
import { homePage } from "./documents/homePage";
import { service } from "./documents/service";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { howWeWorkPage } from "./documents/howWeWorkPage";
import { legalPage } from "./documents/legalPage";
import { blogPost } from "./documents/blogPost";
import { landingPage } from "./documents/landingPage";

export const schemaTypes = [
  // objects
  seo,
  button,
  blockContent,
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
  blogPost,
  landingPage,
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
