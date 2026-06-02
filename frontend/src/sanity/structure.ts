import type { StructureResolver } from "sanity/structure";
import {
  Cog,
  Home,
  ListChecks,
  Phone,
  Info,
  Workflow,
  FileText,
  PanelTop,
  PanelBottom,
  Briefcase,
} from "lucide-react";
import React from "react";

const ico = (Icon: typeof Cog) => () => React.createElement(Icon, { size: 16 });

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons
      S.listItem()
        .title("Site Settings")
        .icon(ico(Cog))
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .icon(ico(PanelTop))
        .child(
          S.editor()
            .id("navigation")
            .schemaType("navigation")
            .documentId("navigation"),
        ),
      S.listItem()
        .title("Footer")
        .icon(ico(PanelBottom))
        .child(
          S.editor().id("footer").schemaType("footer").documentId("footer"),
        ),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .icon(ico(Home))
        .child(
          S.editor()
            .id("homePage")
            .schemaType("homePage")
            .documentId("homePage"),
        ),
      S.listItem()
        .title("About Page")
        .icon(ico(Info))
        .child(
          S.editor()
            .id("aboutPage")
            .schemaType("aboutPage")
            .documentId("aboutPage"),
        ),
      S.listItem()
        .title("How We Work Page")
        .icon(ico(Workflow))
        .child(
          S.editor()
            .id("howWeWorkPage")
            .schemaType("howWeWorkPage")
            .documentId("howWeWorkPage"),
        ),
      S.listItem()
        .title("Contact Page")
        .icon(ico(Phone))
        .child(
          S.editor()
            .id("contactPage")
            .schemaType("contactPage")
            .documentId("contactPage"),
        ),
      S.divider(),
      // Collections
      S.listItem()
        .title("Services")
        .icon(ico(Briefcase))
        .child(
          S.documentTypeList("service")
            .title("Services")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Legal Pages")
        .icon(ico(FileText))
        .child(
          S.documentTypeList("legalPage").title("Legal Pages"),
        ),
      S.listItem()
        .title("All Content")
        .icon(ico(ListChecks))
        .child(
          S.list()
            .title("All Content")
            .items(
              S.documentTypeListItems().filter((listItem) => {
                const id = listItem.getId();
                return Boolean(id);
              }),
            ),
        ),
    ]);
