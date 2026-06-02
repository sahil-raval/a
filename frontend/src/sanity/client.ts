import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

// We create a client even when not configured (with a placeholder) so imports
// don't fail. All fetch helpers gate on `isSanityConfigured` before calling.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Safe fetch wrapper. Returns `fallback` immediately when Sanity is not
 * configured or when the request fails. This lets every page render with
 * hardcoded defaults until the CMS is populated.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 30 },
    });
    if (result === null || result === undefined) return fallback;
    return result;
  } catch (err) {
    // Surface the error in dev logs but never crash the site.
    console.warn("[sanity] fetch failed, using fallback:", err);
    return fallback;
  }
}
