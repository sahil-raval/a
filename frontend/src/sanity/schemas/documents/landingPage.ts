import { defineField, defineType, defineArrayMember } from "sanity";
import { LayoutTemplate } from "lucide-react";
import React from "react";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  icon: () => React.createElement(LayoutTemplate, { size: 16 }),
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "hero",
      description: "The page will be available at /landing/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      group: "hero",
      initialValue: true,
      description: "Uncheck to hide this landing page from the site.",
    }),
    // Hero
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text", rows: 2, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "externalUrl", type: "url", title: "…or external image URL" }),
      ],
    }),
    defineField({ name: "heroCtaLabel", title: "Hero Button Label", type: "string", group: "hero" }),
    defineField({ name: "heroCtaHref", title: "Hero Button Link", type: "string", group: "hero" }),
    // Sections
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          name: "richText",
          title: "Rich Text",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string", title: "Heading" }),
            defineField({ name: "body", type: "blockContent", title: "Body" }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Rich Text", subtitle: "Rich Text section" }) },
        }),
        defineArrayMember({
          name: "featureGrid",
          title: "Feature Grid",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string", title: "Heading" }),
            defineField({ name: "subheading", type: "text", rows: 2, title: "Subheading" }),
            defineField({
              name: "items",
              title: "Features",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "icon", type: "string", title: "Icon name", description: "lucide-react icon e.g. Sun, Zap, ShieldCheck" }),
                    defineField({ name: "title", type: "string", title: "Title" }),
                    defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
                  ],
                  preview: { select: { title: "title" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "Feature Grid", subtitle: "Feature Grid section" }) },
        }),
        defineArrayMember({
          name: "ctaBanner",
          title: "Call To Action",
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string", title: "Heading" }),
            defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
            defineField({ name: "buttonLabel", type: "string", title: "Button Label" }),
            defineField({ name: "buttonHref", type: "string", title: "Button Link" }),
          ],
          preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: title || "CTA", subtitle: "Call To Action section" }) },
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `/landing/${subtitle}` : "No slug", media };
    },
  },
});
