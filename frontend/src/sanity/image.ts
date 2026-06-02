import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
});

export function urlForImage(source: Image | null | undefined): string | null {
  if (!source || !(source as Image).asset) return null;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return null;
  }
}

export function urlForImageSized(
  source: Image | null | undefined,
  width: number,
  height?: number,
): string | null {
  if (!source || !(source as Image).asset) return null;
  try {
    let b = builder.image(source).width(width).auto("format").fit("crop");
    if (height) b = b.height(height);
    return b.url();
  } catch {
    return null;
  }
}
