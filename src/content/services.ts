export type ServiceEntry = {
  slug: string;
  index: number;
  title: string;
  tagline: string;
  intro: string[];
  included: string[];
  timeline?: string;
  count: string;
  /** What the founder ends up with, in their words. Shown instead of a count. */
  outcome: string;
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "brand-strategy",
    outcome: "A positioning your whole team can repeat",
    index: 1,
    title: "Brand Strategy",
    tagline:
      "Define who you are, who you serve, and why you're different — before you spend a cent on identity or marketing.",
    intro: [
      "Brand strategy is the foundational work that decides whether everything downstream lands or flops. We help you articulate a single defensible position in the market, map the competitive landscape, name the brand, and write the messaging playbook your team will use for years. Without sharp strategy, every identity, marketing, and product decision becomes a subjective debate. With it, those decisions become obvious. Engagements typically run 4–6 weeks and combine stakeholder interviews, market research, positioning workshops, and a final strategy document your team can operationalize.",
    ],
    included: [
      "Brand Positioning",
      "Competitor & Market Research",
      "Brand Architecture",
      "Brand Audit",
      "Brand Naming & Tagline",
      "Brand Messaging & Tone of Voice",
    ],
    timeline: "Engagements typically run 4–6 weeks.",
    count: "6 deliverables",
  },
  {
    slug: "brand-identity",
    outcome: "A logo, identity, and brand book",
    index: 2,
    title: "Brand Identity",
    tagline:
      "Logo, color, typography, imagery, and the design system that holds it all together.",
    intro: [
      "Brand identity is the visual translation of strategy — the logo, colors, typography, imagery, and design system that make your brand recognizable in any context. We design identities that work on a 16-pixel favicon and a 16-meter billboard, in print and on screen, today and in five years. Identity engagements typically run 6–10 weeks and include exploration, refinement, system design, and a comprehensive brand book. The deliverable is a system your team can use and extend without us in the room.",
    ],
    included: [
      "Brand Identity Design",
      "Logo Design",
      "Visual Language & Design System",
      "Rebranding",
      "Packaging Design",
    ],
    timeline: "Identity engagements typically run 6–10 weeks.",
    count: "5 deliverables",
  },
  {
    slug: "user-experience-design",
    outcome: "Screens tested before they're built",
    index: 3,
    title: "User Experience Design",
    tagline:
      "Products people choose to use, not products they have to use — researched, prototyped, and tested before anyone builds.",
    intro: [
      "UX design is where strategy meets the user. We design digital products — websites, web apps, mobile apps, internal tools — that balance business outcomes with user needs. Our work spans research, information architecture, interaction design, visual design, and prototyping. We're not pixel-pushers; we're product partners who happen to be very good at design. Engagements run 4–12 weeks depending on scope, and ship with everything engineering needs to build without guessing.",
    ],
    included: [
      "UX / UI Design",
      "Web Design",
      "Mobile App Design",
      "UX Research",
      "Wireframing & Prototyping",
      "Design System & UI Kit",
    ],
    timeline: "Engagements run 4–12 weeks depending on scope.",
    count: "6 deliverables",
  },
  {
    slug: "visual-content",
    outcome: "Photos that sell on shelf and online",
    index: 4,
    title: "Visual Content",
    tagline:
      "Product, lifestyle, and eCommerce photography that makes your brand look as premium as it is.",
    intro: [
      "Visual content is the proof of your brand. We produce photography that earns attention in feeds, on shelves, and in consideration sets — from clean product cutouts to full campaign productions. Our work includes art direction, casting, location scouting, lighting, retouching, and delivery in every format your channels need. Photography engagements range from one-day studio shoots to multi-day campaign productions with full crews.",
    ],
    included: [
      "Product Photography",
      "Lifestyle & Campaign Shoot",
      "E-commerce Shoot",
    ],
    count: "3 deliverables",
  },
  {
    slug: "web-development",
    outcome: "A fast site your team can edit",
    index: 5,
    title: "Web Development",
    tagline:
      "Websites that load fast, rank well, and your team can edit without calling us.",
    intro: [
      "Web development at Vellox covers everything from marketing sites to multi-tenant SaaS platforms. We build in Next.js, TypeScript, and Prisma by default — a stack that's fast, SEO-friendly, and easy to hire for. Every engagement ships with responsive design, accessibility, Core Web Vitals in the green, analytics, and a CMS your team can use without us. We don't disappear at launch; most clients stay on a maintenance retainer for ongoing improvements.",
    ],
    included: [
      "Website Development",
      "Web Applications",
      "SaaS Platforms",
      "Content Platforms",
      "API Integrations",
      "Maintenance & Support",
      "Scaling & Performance",
    ],
    count: "7 deliverables",
  },
  {
    slug: "ecommerce",
    outcome: "A store that takes orders from day one",
    index: 6,
    title: "eCommerce",
    tagline:
      "Online stores built to sell — on Shopify or custom-built — and tuned for revenue after launch.",
    intro: [
      "eCommerce is where brand, UX, and engineering converge on a single metric: revenue. We build Shopify stores, custom headless storefronts, multi-vendor marketplaces, and B2B portals — each engineered for the specific business model it serves. We don't just build and leave; most clients stay on a CRO retainer that lifts revenue 15–40% within six months. Our work has shipped across wellness, F&B, fashion, and B2B verticals.",
    ],
    included: [
      "Shopify Stores",
      "Custom eCommerce",
      "Platform Migration & Scaling",
      "Conversion Rate Optimization",
      "B2B & Enterprise Portals",
      "Multi-Vendor Marketplaces",
      "Membership Platforms",
    ],
    count: "7 deliverables",
  },
  {
    slug: "web-mobile-applications",
    outcome: "An app people come back to",
    index: 7,
    title: "Web and Mobile Apps",
    tagline:
      "iPhone, Android, and web apps built for people who come back, not just downloads.",
    intro: [
      "We build native mobile apps (Swift/Kotlin), cross-platform apps (React Native), and the backend APIs that power them. Our work has shipped across consumer, B2B, healthcare, and education verticals — including booking systems, learning platforms, internal business tools, and payments systems. Mobile engagements include design, development, App Store/Play Store submission, and post-launch monitoring.",
    ],
    included: [
      "iOS & Android Apps",
      "Internal Business Tools",
      "API Development",
      "Booking & Scheduling",
      "LMS & Education Platforms",
      "Payments Systems",
    ],
    count: "6 deliverables",
  },
  {
    slug: "erp-implementation",
    outcome: "One system for accounting, stock, and sales",
    index: 8,
    title: "ERPNext Implementation",
    tagline:
      "Open-source ERP that runs your operations — implemented and customized by a Frappe Partner.",
    intro: [
      "For wellness, fintech, and F&B companies outgrowing spreadsheets and disconnected SaaS tools, Frappe/ERPNext puts Accounting, Inventory, CRM, and HR in one system you actually own.",
      "As a Frappe Partner we implement it around your processes — not the other way round — then customize where off-the-shelf falls short.",
    ],
    included: [
      "Discovery & process mapping",
      "ERPNext core setup — Accounting, Stock, Selling/Buying, Manufacturing",
      "Custom app development — DocTypes, workflows, validations, reports",
      "Integrations — payments, shipping, marketplaces, WhatsApp, BI",
      "Data migration from legacy systems",
      "Hosting & upgrades — Frappe Cloud or self-hosted",
      "Training & support retainer",
    ],
    timeline: "Engagements typically run 6–16 weeks depending on modules.",
    count: "7 deliverables",
  },
];

export const FRAPPE_BADGE = "Frappe Partner";
