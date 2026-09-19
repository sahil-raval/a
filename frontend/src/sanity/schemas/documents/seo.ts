import { defineField } from "sanity";

export const seoFields = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Keep this specific and under 60 characters.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Summarise the page in 150–160 characters.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social Sharing Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload the image used when this page is shared.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});