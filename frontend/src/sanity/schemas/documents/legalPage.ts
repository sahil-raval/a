import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy" },
          { title: "Terms of Service", value: "terms" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required() }),
    defineField({ name: "lastUpdated", type: "date", title: "Last Updated" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "seo", type: "seo", title: "SEO" }),
  ],
  preview: {
    select: { title: "title", subtitle: "kind" },
  },
});
