// Arabic navigation, footer and tagline. Hrefs are the locale-less English
// paths; components prefix them with /ar through localePath().

import type { SiteContent } from "../site";

export const SITE: SiteContent = {
  CTA_ITEM: { label: "ابدأ مشروعك", href: "/contact" },
  NAV_ITEMS: [
    { label: "عن الاستوديو", href: "/about" },
    { label: "خدماتنا", href: "/services" },
    { label: "الأعمال", href: "/portfolio" },
    { label: "رؤى", href: "/insights" },
    { label: "تواصل معنا", href: "/contact" },
  ],
  TAGLINE:
    "استوديو لتطوير الأعمال يبني العلامات التجارية والمنتجات الرقمية والأنظمة التي تنمو بها الشركات.",
  FOOTER_COLUMNS: [
    {
      heading: "العلامة التجارية والتصميم",
      links: [
        { label: "استراتيجية العلامة التجارية", href: "/services/brand-strategy" },
        { label: "الهوية البصرية", href: "/services/brand-identity" },
        { label: "تصميم تجربة المستخدم", href: "/services/user-experience-design" },
        { label: "المحتوى البصري", href: "/services/visual-content" },
      ],
    },
    {
      heading: "التقنية",
      links: [
        { label: "تطوير المواقع", href: "/services/web-development" },
        { label: "المتاجر الإلكترونية", href: "/services/ecommerce" },
        { label: "تطبيقات الويب والجوال", href: "/services/web-mobile-applications" },
        { label: "تنفيذ نظام ERPNext", href: "/services/erp-implementation" },
      ],
    },
    {
      heading: "الاستوديو",
      links: [
        { label: "عن الاستوديو", href: "/about" },
        { label: "الأعمال", href: "/portfolio" },
        { label: "رؤى", href: "/insights" },
        { label: "تواصل معنا", href: "/contact" },
      ],
    },
  ],
  SOCIAL_LINKS: [
    { label: "Instagram", href: "https://www.instagram.com/vellox.studio" },
    { label: "Facebook", href: "https://www.facebook.com/velloxstudio" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/velloxstudio" },
    { label: "واتساب", href: "https://wa.me/201055212405" },
  ],
  COPYRIGHT: `© ${new Date().getFullYear()} Vellox Studio. جميع الحقوق محفوظة.`,
};
