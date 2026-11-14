// The specialties behind each service, as people search for them, in both
// languages. Every term is something its service page already offers. They
// feed the Organization "knowsAbout" list in the structured data, so search
// engines and AI assistants can tell what the studio does. Search phrases
// with a place in them ("web design company in Libya") do not belong here:
// those go in page titles and guides.

import type { Locale } from "../lib/i18n";

export const SERVICE_KEYWORDS: Record<string, Record<Locale, string[]>> = {
  "brand-strategy": {
    en: ["Brand strategy", "Brand positioning", "Brand naming", "Brand messaging", "Tone of voice", "Brand audit"],
    ar: ["استراتيجية العلامة التجارية", "تحديد موقع العلامة", "تسمية العلامة التجارية", "رسائل العلامة", "نبرة الصوت", "تدقيق العلامة التجارية"],
  },
  "brand-identity": {
    en: ["Brand identity design", "Logo design", "Visual identity", "Rebranding", "Packaging design", "Brand guidelines"],
    ar: ["تصميم الهوية البصرية", "تصميم الشعار", "الهوية البصرية", "إعادة بناء الهوية", "تصميم التغليف", "دليل الهوية البصرية"],
  },
  "user-experience-design": {
    en: ["UI/UX design", "User experience design", "Mobile app design", "UX research", "Wireframing and prototyping", "Design systems"],
    ar: ["تصميم واجهات وتجربة المستخدم", "تصميم تجربة المستخدم", "تصميم تطبيقات الجوال", "بحث تجربة المستخدم", "النماذج الأولية", "أنظمة التصميم"],
  },
  "web-development": {
    en: ["Website design", "Website development", "Bilingual Arabic-English websites", "Web applications", "SaaS platforms", "Website maintenance"],
    ar: ["تصميم المواقع الإلكترونية", "تطوير المواقع الإلكترونية", "مواقع ثنائية اللغة عربي وإنجليزي", "تطبيقات الويب", "منصات SaaS", "صيانة المواقع"],
  },
  ecommerce: {
    en: ["eCommerce website development", "Shopify stores", "Custom online stores", "Conversion rate optimization", "B2B portals", "Multi-vendor marketplaces"],
    ar: ["تصميم المتاجر الإلكترونية", "متاجر Shopify", "متاجر إلكترونية مخصصة", "تحسين معدل التحويل", "بوابات الشركات", "منصات متعددة البائعين"],
  },
  "web-mobile-applications": {
    en: ["Mobile app development", "iOS and Android apps", "Web app development", "Internal business tools", "Booking systems", "Learning platforms (LMS)"],
    ar: ["برمجة تطبيقات الجوال", "تطبيقات iOS وAndroid", "تطوير تطبيقات الويب", "الأدوات الداخلية للشركات", "أنظمة الحجز", "منصات التعليم الإلكتروني"],
  },
  "erp-implementation": {
    en: ["ERPNext implementation", "ERPNext customization", "ERP system", "ERPNext in Arabic", "ZATCA e-invoicing", "Data migration", "Frappe Cloud hosting", "ERPNext training and support"],
    ar: ["تنفيذ نظام ERPNext", "تخصيص ERPNext", "نظام ERP", "ERPNext بالعربي", "الفوترة الإلكترونية (فاتورة)", "نقل البيانات", "استضافة Frappe Cloud", "تدريب ودعم ERPNext"],
  },
  "visual-content": {
    en: ["Product photography", "Brand photography", "Lifestyle photography", "eCommerce photography"],
    ar: ["تصوير المنتجات", "تصوير العلامات التجارية", "تصوير أسلوب الحياة", "تصوير المتاجر الإلكترونية"],
  },
};

/** Every service keyword in one language, in service order. */
export function getKeywords(locale: Locale): string[] {
  return Object.values(SERVICE_KEYWORDS).flatMap((terms) => terms[locale]);
}
