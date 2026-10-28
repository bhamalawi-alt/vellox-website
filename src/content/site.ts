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
  { label: "Instagram", href: "https://www.instagram.com/velloxstudio" },
  { label: "Facebook", href: "https://www.facebook.com/velloxstudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/velloxstudio" },
  { label: "Mail", href: "mailto:hello@velloxstudio.com" },
];

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
