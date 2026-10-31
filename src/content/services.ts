import type { Locale } from "../lib/i18n";
import { FRAPPE_BADGE as FRAPPE_BADGE_AR, SERVICES as SERVICES_AR } from "./ar/services";

export type ServiceEntry = {
  slug: string;
  index: number;
  title: string;
  /** The service page's H1: the phrase people search for. `title` stays the
   *  short name used in menus, cards and breadcrumbs. */
  heading: string;
  tagline: string;
  intro: string[];
  included: string[];
  timeline?: string;
  count: string;
  /** What the founder ends up with, in their words. Shown instead of a count. */
  outcome: string;
  /** Search result title (under 60 characters) and snippet (120–160). */
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "brand-strategy",
    outcome: "A positioning your whole team can repeat",
    index: 1,
    title: "Brand Strategy",
    heading: "Brand Strategy & Positioning",
    tagline:
      "Define who you are, who you serve, and why you're different — before you spend a cent on identity or marketing.",
    metaTitle: "Brand Strategy & Positioning Agency — Vellox Studio",
    metaDescription:
      "Brand strategy, positioning, naming and messaging for founders in Libya and the Gulf. Define who you serve and why you're different before you spend on ads.",
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
    heading: "Brand Identity & Logo Design",
    tagline:
      "Logo, color, typography, imagery, and the design system that holds it all together.",
    metaTitle: "Brand Identity & Logo Design Agency — Vellox Studio",
    metaDescription:
      "Brand identity and logo design for companies in Libya, Saudi Arabia, the UAE and Oman: logo, colors, typography, packaging and a brand book your team can use.",
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
    heading: "UI/UX Design",
    tagline:
      "Products people choose to use, not products they have to use — researched, prototyped, and tested before anyone builds.",
    metaTitle: "UI/UX Design Agency for Apps & Websites — Vellox Studio",
    metaDescription:
      "UI/UX design for apps and websites: user research, wireframes, prototypes and interface design in Arabic and English, tested with real users before development.",
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
    heading: "Product & Brand Photography",
    tagline:
      "Product, lifestyle, and eCommerce photography that makes your brand look as premium as it is.",
    metaTitle: "Product Photography for Brands & eCommerce — Vellox Studio",
    metaDescription:
      "Professional product, lifestyle and eCommerce photography that makes your brand look as premium as it is, in every format your store and social channels need.",
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
    heading: "Website Design & Development",
    tagline:
      "Websites that load fast, rank well, and your team can edit without calling us.",
    metaTitle: "Web Design Company in Libya, the Gulf & Oman — Vellox Studio",
    metaDescription:
      "Website design and development for companies in Libya, Saudi Arabia, the UAE and Oman: fast Arabic and English sites built for search, with an easy-to-edit CMS.",
    intro: [
      "Web development at Vellox covers everything from marketing sites to multi-tenant SaaS platforms. We build in Next.js, TypeScript, and Prisma by default — a stack that's fast, SEO-friendly, and easy to hire for. Every engagement ships with responsive design, accessibility, Core Web Vitals in the green, analytics, and a CMS your team can use without us. We don't disappear at launch: a maintenance retainer covers ongoing improvements.",
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
    heading: "eCommerce Website Development",
    tagline:
      "Online stores built to sell — on Shopify or custom-built — and tuned for revenue after launch.",
    metaTitle: "eCommerce Website Development in the Gulf — Vellox Studio",
    metaDescription:
      "Online store design and development on Shopify or custom-built, for brands in Libya, Saudi Arabia, the UAE and Oman. Built to take orders from day one.",
    intro: [
      "eCommerce is where brand, UX, and engineering converge on a single metric: revenue. We build Shopify stores, custom headless storefronts, multi-vendor marketplaces, and B2B portals — each engineered for the specific business model it serves. We don't just build and leave: after launch, a CRO retainer keeps testing and improving conversion.",
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
    heading: "Mobile & Web App Development",
    tagline:
      "iPhone, Android, and web apps built for people who come back, not just downloads.",
    metaTitle: "Mobile App Development Company — Vellox Studio",
    metaDescription:
      "iPhone, Android and web app development for companies in Libya, Saudi Arabia, the UAE and Oman, from UX design and prototyping to App Store launch and updates.",
    intro: [
      "We build native mobile apps (Swift/Kotlin), cross-platform apps (React Native), and the backend APIs that power them. We build booking systems, learning platforms, internal business tools, and payment flows. Mobile engagements include design, development, App Store/Play Store submission, and post-launch monitoring.",
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
    heading: "ERPNext Implementation & Customization",
    tagline:
      "Open-source ERP that runs your operations — implemented and customized by a Frappe Partner.",
    metaTitle: "ERPNext Partner in Libya, Saudi, UAE & Oman — Vellox Studio",
    metaDescription:
      "ERPNext implementation by a Frappe Partner for Libya and the Gulf: accounting, stock, sales and HR in one Arabic-ready system, set up around how you work.",
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

export function getServices(locale: Locale): ServiceEntry[] {
  return locale === "ar" ? SERVICES_AR : SERVICES;
}

export function getFrappeBadge(locale: Locale): string {
  return locale === "ar" ? FRAPPE_BADGE_AR : FRAPPE_BADGE;
}
