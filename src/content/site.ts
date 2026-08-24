export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  heading: string;
  links: NavItem[];
};

export const WORDMARK = "Vellox";

export const CTA_ITEM: NavItem = { label: "Start a Project →", href: "/contact" };

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
    heading: "Visual & Marketing",
    links: [
      { label: "Brand Strategy", href: "/services" },
      { label: "Brand Identity", href: "/services" },
      { label: "UX Design", href: "/services" },
      { label: "Visual Content", href: "/services" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "eCommerce", href: "/services" },
      { label: "Mobile Apps", href: "/services" },
      { label: "ERP Implementation", href: "/services" },
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
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Mail", href: "mailto:hello@velloxstudio.com" },
];

export const COPYRIGHT = "© 2026 Vellox Studio. All rights reserved.";
