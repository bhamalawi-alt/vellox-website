export const COPY = {
  "metaTitle": "Vellox Studio — Brand, Web & ERP for Wellness, Fintech, F&B",
  "hero": {
    "metaLeft": "Remote-first",
    "metaRight": "EU & MENA",
    "eyebrow": "Business Development Studio",
    "headline": "We design brands and build websites and stores for wellness, fintech, and F&B founders.",
    "support": "One team from the first logo to the store that sells it — and, when you're ready, the system that runs the business.",
    "metaDescription": "Brand, web, eCommerce, and ERPNext studio for wellness, fintech, and F&B founders across the EU and MENA. Strategy, design, and engineering in one team.",
    "primaryCta": "Start a Project",
    "emphasis": ["wellness,", "fintech,", "F&B"],
    "secondaryCta": "View Work",
  },
  "marquee": [
    "Brand Strategy",
    "Brand Identity",
    "User Experience Design",
    "Web Development",
    "eCommerce",
    "Web and Mobile Apps",
    "Visual Content",
    "ERPNext Implementation",
  ],
  "whatWeDo": {
    "heading": "Start with the brand or the website. Add the rest when you're ready.",
    "body": "Most founders come to us for a brand or a website or store. The app and the system that runs the business come later, from the same team.",
    "stages": [
      { "heading": "Brand", "slugs": ["brand-strategy", "brand-identity", "visual-content"] },
      { "heading": "Website and store", "slugs": ["web-development", "ecommerce", "user-experience-design"] },
      { "heading": "Apps and operations", "slugs": ["web-mobile-applications", "erp-implementation"] },
    ],
  },
  "erpNote": {
    "lead": "Frappe Partner.",
    "body": "When the spreadsheets stop coping, we set up ERPNext, the open-source system for accounting, stock, and sales, around how you already work.",
    "link": "How we run an ERP project",
  },
  "proof": {
    "heading": "Recent work",
    "clientsHeading": "Recent clients",
    "quotesHeading": "In their words",
    "testimonialNames": [] as string[],
    "allWork": "All work",
    "allReferences": "All six references",
  },
  "numbers": {
    "heading": "By the numbers",
    "note": "Client references available on request.",
    "stats": [] as { value: number; suffix: string; label: string; sub: string; href?: string }[],
  },
  "ctaBand": {
    "heading": "Ready to get started?",
    "body": "Tell us what you're building and where it's stuck. We work with founders across the EU and MENA, reply within a working day, and start with a 20-minute call: no deck, no pitch.",
  },
};

export type PageCopy = typeof COPY;
