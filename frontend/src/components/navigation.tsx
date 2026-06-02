import { NavigationClient } from "./navigation-client";
import { getNavigation, getSite } from "@/sanity/queries";

export default async function Navigation() {
  const [nav, site] = await Promise.all([getNavigation(), getSite()]);
  return <NavigationClient nav={nav} site={site} />;
}
