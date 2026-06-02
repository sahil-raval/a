import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroSubtitle", type: "text", title: "Hero Subtitle", rows: 2 }),
    defineField({ name: "callLabel", type: "string", title: "Call Block Label", initialValue: "Call Us" }),
    defineField({ name: "callDescription", type: "string", title: "Call Description" }),
    defineField({ name: "emailLabel", type: "string", title: "Email Block Label", initialValue: "Email Us" }),
    defineField({ name: "emailDescription", type: "string", title: "Email Description" }),
    defineField({ name: "visitLabel", type: "string", title: "Visit Block Label", initialValue: "Visit Us" }),
    defineField({ name: "visitDescription", type: "string", title: "Visit Description" }),
    defineField({ name: "serviceAreaLabel", type: "string", title: "Service Area Label", initialValue: "Service Area" }),
    defineField({ name: "serviceAreaDescription", type: "string", title: "Service Area Description" }),
    defineField({
      name: "serviceOptions",
      title: "Service Dropdown Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({ name: "submitLabel", type: "string", title: "Submit Button Label", initialValue: "Send Message" }),
    defineField({ name: "successTitle", type: "string", title: "Success Popup Title" }),
    defineField({ name: "successMessage", type: "text", title: "Success Popup Message", rows: 3 }),
    defineField({ name: "seo", type: "seo", title: "SEO" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
