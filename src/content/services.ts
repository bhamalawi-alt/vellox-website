import type { Locale } from "../lib/i18n";
import { FRAPPE_BADGE as FRAPPE_BADGE_AR, SERVICES as SERVICES_AR } from "./ar/services";

export type ServiceEntry = {
  slug: string;
  index: number;
  title: string;
  /** The service page's H1: the phrase people search for. `title` stays the
   *  short name used in menus, cards and breadcrumbs. */
  heading: string;
  /** A question heading and a self-contained, answer-first passage of about
   *  140 words, the shape AI answers quote. Shown first on the service page. */
  summaryHeading: string;
  summary: string;
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
    summaryHeading: "What is brand strategy?",
    summary:
      "Brand strategy is the work of deciding who a company is, who it serves and why it is different, before any money goes into a logo, a website or marketing. At Vellox Studio, a brand strategy engagement typically runs 4 to 6 weeks and combines stakeholder interviews, competitor and market research, and positioning workshops. The result is a written strategy your team can use for years: a clear market position, a map of competitors, a brand architecture, a name and tagline when one is needed, and a messaging playbook that sets your tone of voice. We work remotely with founders in Libya, Saudi Arabia, the UAE and Oman, in Arabic or English. Strategy comes first because it turns every later decision about identity, content and campaigns from a matter of taste into a clear choice that follows from the position you chose.",
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
    summaryHeading: "What does brand identity design include?",
    summary:
      "Brand identity design is the visual system that makes a company recognisable everywhere it appears: the logo, colours, typography, imagery, packaging and the rules that hold them together. At Vellox Studio, an identity project typically runs 6 to 10 weeks, moving from exploration and refinement to a complete design system and a brand book your team can use without us. We design identities that work in both Arabic and English, including bilingual logo lockups and type pairings that hold up in both scripts, from a small app icon to a large sign. For companies in Libya, Saudi Arabia, the UAE and Oman, that means one consistent brand across social media, the website, printed material and packaging. Identity work is strongest when it follows a brand strategy, so the visuals express a clear position rather than a passing trend.",
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
    summaryHeading: "What is UI/UX design?",
    summary:
      "UI/UX design is the process of shaping how a website or app works and looks, so people can find what they need and complete tasks without friction. UX covers research, structure and flows; UI covers the screens, components and visual detail. At Vellox Studio, a UX engagement runs 4 to 12 weeks depending on scope and covers user research, information architecture, wireframes, interactive prototypes, interface design and a design system or UI kit. We design right-to-left Arabic and left-to-right English layouts and test the screens with real users before development starts. Engineers receive everything they need to build without guessing, whether they are our own developers or your team. For companies in Libya and the Gulf, designing both languages from the start avoids the common problem of an Arabic version that feels like an afterthought.",
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
    summaryHeading: "What does product photography include?",
    summary:
      "Product photography is the set of images that sells a product on shelves, in online stores and on social media. At Vellox Studio, visual content covers three kinds of shoot: product photography with clean cutouts for store pages, lifestyle and campaign shoots that show the product in use, and eCommerce shoots planned around the exact formats your store needs. Each engagement includes art direction, casting, lighting and retouching, and the final images are delivered in every size and format your channels need, from product pages and marketplace listings to Instagram posts and packaging. Shoots range from a single studio day to multi-day campaign productions. For brands in Libya and the Gulf selling online, consistent professional product images are often the fastest way to make a store look as trustworthy and premium as the product itself.",
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
    summaryHeading: "What is included in website design and development?",
    summary:
      "Website design and development is the work of planning, designing and building a website that loads fast, ranks in search and turns visitors into enquiries. At Vellox Studio, we build websites in Next.js and TypeScript by default, from marketing sites to web applications and content platforms. Every website ships with a responsive mobile-first design, accessibility, search basics such as titles, descriptions and a sitemap, analytics, and a content management system your team can use to update pages without calling us. For companies in Libya, Saudi Arabia, the UAE and Oman, we build bilingual sites with proper right-to-left Arabic layouts and separate pages for each language, so both versions can rank on Google. After launch, an optional maintenance plan covers security updates, fixes, performance monitoring and small improvements.",
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
    summaryHeading: "What does eCommerce website development include?",
    summary:
      "eCommerce website development is the design and build of an online store that takes orders, accepts payments and is easy for your team to run day to day. At Vellox Studio, we build stores on Shopify, which suits most businesses and launches quickly, or custom-built when a business needs subscriptions, marketplaces, B2B pricing or other models Shopify does not support. Work includes product data and collections, search, checkout, migration from platforms such as WooCommerce or Magento, and payment integration with Stripe or regional providers such as Checkout.com, PayTabs, Tap and mada. For brands in Libya, Saudi Arabia, the UAE and Oman, stores can run in Arabic and English. After launch, an optional conversion programme tests product pages, checkout and mobile experience to grow revenue from the visitors you already have.",
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
    summaryHeading: "What does mobile and web app development include?",
    summary:
      "Mobile and web app development is the design and build of applications people use on their phones and in the browser, together with the backend that powers them. At Vellox Studio, we build native iOS apps in Swift and SwiftUI and native Android apps in Kotlin, or a single cross-platform app with React Native when speed matters more. Typical projects include booking and scheduling systems, learning platforms, internal business tools, APIs and payment flows. Each project covers UX design, development, the backend, submission to the App Store and Google Play, a staged rollout, crash monitoring and a 30-day support window after launch. For companies in Libya, Saudi Arabia, the UAE and Oman, apps can be built in Arabic and English from the start. After launch, monthly releases add features and fixes, measured by retention, crash-free sessions and store ratings.",
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
    summaryHeading: "What is ERPNext implementation?",
    summary:
      "ERPNext implementation is the process of setting up ERPNext, an open-source ERP system, so that accounting, inventory, sales, purchasing, manufacturing and HR run in one place for your company. Vellox Studio implements ERPNext as a Frappe Partner, around the way your business already works rather than forcing new processes on it. A typical engagement runs 6 to 16 weeks depending on the modules and covers process mapping, core setup, custom workflows and reports, integrations with payments, shipping or WhatsApp, data migration from your old system, hosting on Frappe Cloud or your own server, training and ongoing support. ERPNext works in Arabic with right-to-left screens, supports multiple currencies and companies, and has no licence fee per user for the software itself. That makes it a strong fit for growing companies in Libya, Saudi Arabia, the UAE and Oman.",
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
