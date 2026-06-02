/**
 * This route mounts Sanity Studio at /studio.
 * All Studio sub-routes (e.g. /studio/structure, /studio/vision) are handled
 * by the catch-all `[[...tool]]` segment.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export const revalidate = false;

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
