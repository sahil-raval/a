import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "stats", title: "Stats" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title", group: "hero" }),
    defineField({ name: "heroSubtitle", type: "text", title: "Hero Subtitle", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [{ name: "externalUrl", type: "url", title: "External URL" }],
    }),

    defineField({ name: "approachTitle", type: "string", title: "Approach Title", group: "content" }),
    defineField({ name: "approachBody", type: "text", title: "Approach Body", rows: 5, group: "content" }),
    defineField({ name: "differentiatorTitle", type: "string", title: "What Sets Us Apart Title", group: "content" }),
    defineField({ name: "differentiatorBody", type: "text", title: "What Sets Us Apart Body", rows: 5, group: "content" }),
    defineField({ name: "whoWeAreTitle", type: "string", title: "Who We Are Title", group: "content" }),
    defineField({
      name: "whoWeAreParagraphs",
      title: "Who We Are Paragraphs",
      type: "array",
      group: "content",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "bulletPoints",
      title: "Bullet Points",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "label", type: "text", title: "Label" },
            { name: "icon", type: "string", title: "Icon (lucide name)" },
          ],
        },
      ],
    }),

    defineField({ name: "ctaHeading", type: "string", title: "CTA Heading", group: "cta" }),
    defineField({ name: "ctaBody", type: "text", title: "CTA Body", rows: 3, group: "cta" }),
    defineField({ name: "ctaLabel", type: "string", title: "CTA Label", group: "cta" }),
    defineField({ name: "ctaHref", type: "string", title: "CTA Link", group: "cta" }),

    defineField({ name: "seo", type: "seo", title: "SEO", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
