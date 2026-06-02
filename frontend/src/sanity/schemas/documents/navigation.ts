import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "primaryLinks",
      title: "Primary Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),
    defineField({
      name: "servicesMenuItems",
      title: "Services Mega-Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "href", type: "string", title: "Link" },
            { name: "description", type: "string", title: "Description" },
            {
              name: "icon",
              type: "string",
              title: "Icon Key",
              description:
                "lucide-react icon name (e.g. Sun, Wrench, Recycle, HardHat, ClipboardList, Zap)",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Get a Quote",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      initialValue: "/contact",
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
