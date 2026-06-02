// Sanity environment configuration. All values are optional in this app —
// when missing, components fall back to default hardcoded content so the
// site keeps working before the CMS is configured.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || "";

// True only when project id is configured. We avoid making requests otherwise.
export const isSanityConfigured = Boolean(projectId);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://apmenergy.com.au";
