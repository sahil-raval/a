import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const isSanityConfigured = !!projectId;

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (err) {
    console.warn("[Sanity] Fetch error:", err);
    return null;
  }
}