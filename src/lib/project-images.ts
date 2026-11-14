import sizes from "../content/project-image-sizes.json";

// Written by scripts/project-images.mjs: each project image's width and the
// smaller copies made of it.
const SIZES: Record<string, { width: number; variants: number[] }> = sizes;

/**
 * The src and srcset for a project image, so a phone downloads a small copy
 * and a large screen the original. An image added since the script last ran
 * has no entry and is served as it is.
 */
export function imageSources(src: string): { src: string; srcSet?: string } {
  const entry = SIZES[src];
  if (!entry || entry.variants.length === 0) return { src };
  const copies = entry.variants.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`);
  return { src, srcSet: [...copies, `${src} ${entry.width}w`].join(", ") };
}
