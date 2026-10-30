import type { Locale } from "../lib/i18n";
import { SITE as SITE_AR } from "./ar/site";

export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  heading: string;
  links: NavItem[];
};

export const WORDMARK = "Vellox";

export const CTA_ITEM: NavItem = { label: "Start a Project", href: "/contact" };

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const TAGLINE =
  "A business development studio building brands, products, and the systems that scale them.";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Brand and Design",
    links: [
      { label: "Brand Strategy", href: "/services/brand-strategy" },
      { label: "Brand Identity", href: "/services/brand-identity" },
      { label: "User Experience Design", href: "/services/user-experience-design" },
      { label: "Visual Content", href: "/services/visual-content" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "eCommerce", href: "/services/ecommerce" },
      { label: "Web and Mobile Apps", href: "/services/web-mobile-applications" },
      { label: "ERPNext Implementation", href: "/services/erp-implementation" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const SOCIAL_LINKS: NavItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/vellox.studio" },
  { label: "Facebook", href: "https://www.facebook.com/velloxstudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/velloxstudio" },
  { label: "Behance", href: "https://www.behance.net/velloxstudio" },
  { label: "WhatsApp", href: "https://wa.me/201055212405" },
  { label: "Email", href: "mailto:info@velloxstudio.com" },
];

// The studio inbox: forwards to the team via Cloudflare Email Routing.
export const EMAIL = "info@velloxstudio.com";

// The studio's WhatsApp line: the floating button and the contact page link here.
export const WHATSAPP = {
  number: "201055212405",
  display: "+20 105 521 2405",
};

/** wa.me link that opens a chat with the studio, optionally with a drafted message. */
export const whatsappHref = (message?: string) =>
  `https://wa.me/${WHATSAPP.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// Evaluated at build time, so the year stays current on every deploy.
export const COPYRIGHT = `© ${new Date().getFullYear()} Vellox Studio. All rights reserved.`;

export type SiteContent = {
  CTA_ITEM: NavItem;
  NAV_ITEMS: NavItem[];
  TAGLINE: string;
  FOOTER_COLUMNS: FooterColumn[];
  SOCIAL_LINKS: NavItem[];
  COPYRIGHT: string;
};

const EN: SiteContent = { CTA_ITEM, NAV_ITEMS, TAGLINE, FOOTER_COLUMNS, SOCIAL_LINKS, COPYRIGHT };

/** Navigation, footer and tagline for a locale; hrefs stay locale-less. */
export function getSite(locale: Locale): SiteContent {
  return locale === "ar" ? SITE_AR : EN;
}
