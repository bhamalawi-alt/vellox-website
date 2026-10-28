// Class strings shared by the page components.

export const primaryCta =
  "inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export const primaryCtaSoft =
  "inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export const quietLink =
  "text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white";

export const breadcrumbLink =
  "inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export const darkFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

/** JSON-LD payload safe to inline in a <script>. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
