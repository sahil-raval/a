import { defineField, defineType } from "sanity";

// Site-wide settings: logo, contact info, social links, default SEO
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "general",
      initialValue: "APM Energy",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Primary Logo",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon / Icon",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "netccLogo",
      title: "NETCC Badge",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (footer)",
      type: "text",
      rows: 3,
      group: "general",
    }),
    defineField({
      name: "abn",
      title: "ABN",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Address / Region",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
            },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
