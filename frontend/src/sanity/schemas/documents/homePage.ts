import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Services Overview" },
    { name: "globe", title: "Energy Globe" },
    { name: "features", title: "Features" },
    { name: "testimonials", title: "Testimonials" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroBadge",
      title: "Hero Badge Text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Heading – Line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Heading – Line 2 (highlight)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubheading",
      title: "Subheading",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaHref",
      title: "Primary CTA Link",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaHref",
      title: "Secondary CTA Link",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroChips",
      title: "Hero Chips",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              description: "e.g. Sun, Zap",
            },
          ],
        },
      ],
    }),

    // SERVICES OVERVIEW
    defineField({
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesSubtitle",
      title: "Services Section Subtitle",
      type: "text",
      rows: 2,
      group: "services",
    }),

    // GLOBE
    defineField({
      name: "globeBadge",
      title: "Globe Badge Text",
      type: "string",
      group: "globe",
    }),
    defineField({
      name: "globeHeadingLine1",
      title: "Globe Heading – Line 1",
      type: "string",
      group: "globe",
    }),
    defineField({
      name: "globeHeadingLine2",
      title: "Globe Heading – Line 2 (highlight)",
      type: "string",
      group: "globe",
    }),
    defineField({
      name: "globeDescription",
      title: "Globe Description",
      type: "text",
      rows: 4,
      group: "globe",
    }),
    defineField({
      name: "globeStats",
      title: "Globe Stats",
      type: "array",
      group: "globe",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value (e.g. 50+)" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),

    // FEATURES
    defineField({
      name: "featuresTitle",
      title: "Features Title",
      type: "string",
      group: "features",
    }),
    defineField({
      name: "featuresSubtitle",
      title: "Features Subtitle",
      type: "text",
      rows: 2,
      group: "features",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "features",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              description:
                "e.g. ShieldCheck, Leaf, Zap, Award, Clock, Users",
            },
          ],
        },
      ],
    }),

    // TESTIMONIALS
    defineField({
      name: "testimonialsTitle",
      title: "Testimonials Title",
      type: "string",
      group: "testimonials",
    }),
    defineField({
      name: "testimonialsSubtitle",
      title: "Testimonials Subtitle",
      type: "text",
      rows: 2,
      group: "testimonials",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "role", type: "string", title: "Role" },
            { name: "content", type: "text", title: "Quote" },
            {
              name: "rating",
              type: "number",
              title: "Rating (1-5)",
              validation: (r) => r.min(1).max(5),
            },
            { name: "avatar", type: "string", title: "Avatar Initials" },
          ],
        },
      ],
    }),

    // CTA
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "CTA Primary Button Label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "CTA Primary Button Link",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "CTA Secondary Button Label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "CTA Secondary Button Link",
      type: "string",
      group: "cta",
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
