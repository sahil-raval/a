import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";
import React from "react";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: () => React.createElement(Newspaper, { size: 16 }),
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary shown on the blog list and social cards.",
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({
          name: "externalUrl",
          type: "url",
          title: "…or external image URL",
          description: "Optional. Used if no image is uploaded above.",
        }),
      ],
    }),
    defineField({ name: "author", title: "Author", type: "string", group: "content", initialValue: "APM Energy" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime", group: "content", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          "Solar",
          "Battery",
          "EV Charging",
          "Maintenance",
          "Energy Savings",
          "Sustainability",
          "News",
        ],
      },
      initialValue: "Solar",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Draft",
        media,
      };
    },
  },
});
