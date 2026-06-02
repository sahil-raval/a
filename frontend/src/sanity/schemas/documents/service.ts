import { defineField, defineType } from "sanity";

// Services listing summary used on /, /services and footer.
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "page", title: "Detail Page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "general",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      group: "general",
      description: "e.g. Sun, Wrench, Recycle, HardHat, ClipboardList, Zap",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (home grid)",
      type: "text",
      rows: 2,
      group: "general",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description (services index page)",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "navDescription",
      title: "Nav-menu description",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      group: "general",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        {
          name: "externalUrl",
          type: "url",
          title: "External Image URL",
          description:
            "Optional: use an Unsplash/external URL when no upload is provided",
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "general",
      initialValue: 0,
    }),
    defineField({
      name: "showOnHome",
      title: "Show on home page",
      type: "boolean",
      group: "general",
      initialValue: true,
    }),

    // Detail Page
    defineField({
      name: "heroTitle",
      title: "Detail Hero Title",
      type: "string",
      group: "page",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Detail Hero Subtitle",
      type: "text",
      rows: 3,
      group: "page",
    }),
    defineField({
      name: "heroImage",
      title: "Detail Hero Image",
      type: "image",
      group: "page",
      options: { hotspot: true },
      fields: [
        {
          name: "externalUrl",
          type: "url",
          title: "External Image URL",
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Detail Page Body",
      type: "array",
      group: "page",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "highlights",
      title: "Highlights / Bullet Points",
      type: "array",
      group: "page",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "icon", type: "string", title: "Icon (lucide name)" },
          ],
        },
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    { name: "order", title: "Manual order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
