export const COPY = {
  "metaTitle": "About Vellox Studio — Brand, Web & ERPNext Studio",
  "metaDescription": "Vellox Studio pairs strategy, design and engineering to help companies in Libya, the Gulf and Oman build brands, websites, apps and ERPNext systems.",
  "eyebrow": "About Vellox Studio",
  "headline": "We pair the discipline of a strategy consultancy with the craft of a design studio.",
  "lede": "Operating across the EU and MENA, Vellox helps wellness, fintech, and F&B founders build brands, products, and the systems that scale them.",
  "approach": {
    "eyebrow": "Our Approach & Values",
    "heading": "Four principles guide every engagement.",
    "sub": "They shape how we scope work, how we collaborate, and how we measure success.",
  },
  "principles": [
    {
      "num": "01",
      "title": "Meaningful Design",
      "body": "Every decision we make serves a purpose. We don't add visual elements because they look nice — we add them because they communicate something specific. This discipline is what makes our work feel coherent across touchpoints, and what makes it last beyond the trend cycle. Design without meaning is decoration; design with meaning is strategy made visible.",
    },
    {
      "num": "02",
      "title": "Strategic Thinking",
      "body": "We start every engagement with positioning, not pixels. Before we draw a single screen, we map the market, the audience, and the business model — because the right answer depends on the right question. Strategy is what stops a beautiful site from being the wrong beautiful site.",
    },
    {
      "num": "03",
      "title": "Integrated Expertise",
      "body": "Strategy, design, and engineering sit in the same room — sometimes literally, always operationally. There's no hand-off between agencies, no translation loss between disciplines, and no finger-pointing when something breaks. One accountable team from kickoff to launch.",
    },
    {
      "num": "04",
      "title": "Long-Term Vision",
      "body": "We design for the version of your business that exists in three years, not the version that exists this quarter. That means building design systems, not one-off pages; building platforms, not features; and choosing tools you can still hire for in 2028.",
    },
  ],
  "numbers": {
    "eyebrow": "By the numbers",
    "note": "All figures verified via client references — available on request.",
    "stats": [] as { value: number; suffix: string; label: string; sub: string; href?: string }[],
  },
  "testimonialsSection": {
    "eyebrow": "Testimonials",
    "heading": "What our clients say about working with us.",
  },
  "testimonials": [] as { quote: string; name: string; initials: string; role: string; company: string }[],
};

export type PageCopy = typeof COPY;
