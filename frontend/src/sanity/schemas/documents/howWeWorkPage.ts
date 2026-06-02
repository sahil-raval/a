import { defineField, defineType } from "sanity";

export const howWeWorkPage = defineType({
  name: "howWeWorkPage",
  title: "How We Work Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "journey", title: "Process" },
    { name: "systems", title: "Business Systems" },
    { name: "complaints", title: "Complaints" },
    { name: "netcc", title: "NETCC" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title", group: "hero" }),
    defineField({ name: "heroSubtitle", type: "text", rows: 3, title: "Hero Subtitle", group: "hero" }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      group: "hero",
      options: { hotspot: true },
      fields: [{ name: "externalUrl", type: "url", title: "External URL" }],
    }),

    defineField({ name: "introTitle", type: "string", title: "Intro Title", group: "intro" }),
    defineField({
      name: "introParagraphs",
      type: "array",
      title: "Intro Paragraphs",
      of: [{ type: "text" }],
      group: "intro",
    }),

    defineField({ name: "processTitle", type: "string", title: "Process Title", group: "journey" }),
    defineField({ name: "processSubtitle", type: "text", title: "Process Subtitle", rows: 2, group: "journey" }),
    defineField({
      name: "journey",
      title: "Journey Steps",
      type: "array",
      group: "journey",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Step Number (e.g. 01)" },
            { name: "title", type: "string", title: "Title" },
            { name: "desc", type: "text", title: "Description", rows: 4 },
            { name: "icon", type: "string", title: "Icon (lucide name)" },
          ],
        },
      ],
    }),

    defineField({ name: "systemsTitle", type: "string", title: "Systems Title", group: "systems" }),
    defineField({ name: "systemsSubtitle", type: "text", title: "Systems Subtitle", rows: 2, group: "systems" }),
    defineField({
      name: "businessSystems",
      title: "Business Systems",
      type: "array",
      group: "systems",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "desc", type: "text", title: "Description", rows: 4 },
            { name: "icon", type: "string", title: "Icon (lucide name)" },
          ],
        },
      ],
    }),

    defineField({ name: "complaintsBadge", type: "string", title: "Complaints Badge", group: "complaints" }),
    defineField({ name: "complaintsTitle", type: "string", title: "Complaints Title", group: "complaints" }),
    defineField({ name: "complaintsIntro", type: "text", title: "Complaints Intro", rows: 3, group: "complaints" }),
    defineField({
      name: "complaintTimelines",
      title: "Complaint Timelines",
      type: "array",
      group: "complaints",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "desc", type: "text", title: "Description", rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: "lodgeTitle",
      type: "string",
      title: "How to Lodge Title",
      group: "complaints",
    }),
    defineField({
      name: "lodgeIntro",
      type: "text",
      title: "How to Lodge Intro",
      rows: 2,
      group: "complaints",
    }),
    defineField({
      name: "lodgeFooter",
      type: "string",
      title: "How to Lodge Footer",
      group: "complaints",
    }),

    defineField({ name: "netccTitle", type: "string", title: "NETCC Title", group: "netcc" }),
    defineField({ name: "netccBody", type: "text", title: "NETCC Body", rows: 4, group: "netcc" }),
    defineField({ name: "netccCtaLabel", type: "string", title: "NETCC CTA Label", group: "netcc" }),
    defineField({ name: "netccCtaHref", type: "string", title: "NETCC CTA Link", group: "netcc" }),

    defineField({ name: "seo", type: "seo", title: "SEO", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "How We Work" }) },
});
