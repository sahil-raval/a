import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Footer Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "linkColumns",
      title: "Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Column Title" },
            {
              name: "links",
              type: "array",
              title: "Links",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "href", type: "string", title: "Link" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightLine",
      title: "Copyright Line",
      type: "string",
      description: "Use {year} as a token for the current year.",
      initialValue:
        "© {year} APM Energy. All rights reserved. ABN: 11 681 478 848",
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
