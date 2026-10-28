// Arabic interface strings. Same keys as ../ui.ts (checked by the compiler
// through UiStrings and by content.test.ts).

import type { UiStrings } from "../ui";

export const UI: UiStrings = {
  skipToContent: "الانتقال إلى المحتوى",
  menu: "القائمة",
  close: "إغلاق",
  homeAria: "Vellox Studio — الصفحة الرئيسية",
  mobileNavAria: "قائمة الجوال",
  switchLanguage: "English",
  switchLanguageAria: "Switch to English",
  currentLanguage: "عربي",
  follow: "تابعنا",
  privacy: "الخصوصية",
  terms: "الشروط",
  backToTop: "العودة إلى الأعلى",
  legal: "قانوني",
  lastUpdated: (date: string) => `آخر تحديث: ${date}.`,
  englishPrevails:
    "هذه ترجمة للنسخة الإنجليزية. في حال وجود أي اختلاف، يُعتمد النص الإنجليزي.",
  opensInNewTab: " (يفتح في نافذة جديدة)",
  pause: "إيقاف",
  play: "تشغيل",
  marqueeAria: " شريط أسماء الخدمات المتحرك",
  breadcrumbAria: "مسار التنقل",
  breadcrumbServices: "خدماتنا",
  breadcrumbPortfolio: "الأعمال",
  readReferences: "اقرأ آراء العملاء",
  viewPortfolio: "تصفّح الأعمال",
  includes: (items: string, more: boolean) => ` تشمل ${items}${more ? " وغيرها" : ""}.`,
  details: { industry: "القطاع", location: "الموقع", year: "السنة" },
  nextProject: "المشروع التالي",
  visitSite: "زيارة الموقع",
  englishOnlyNote: "هذا المشروع متاح بالإنجليزية فقط حاليًا.",
  notFound: {
    eyebrow: "404",
    title: "لم نعثر على هذه الصفحة.",
    back: "العودة إلى الرئيسية",
  },
  form: {
    aria: "طلب بدء مشروع",
    honeypot: "اترك هذا الحقل فارغًا",
    sending: "جارٍ الإرسال…",
    success: "شكرًا لك. نردّ عادةً خلال 24 ساعة.",
    error: "تعذّر إرسال رسالتك. حاول مرة أخرى، أو راسلنا مباشرة على",
    notConfigured: "لم يُفعَّل إرسال النموذج بعد. راسلنا مباشرة على",
    privacyLink: "سياسة الخصوصية",
  },
  cta: {
    heading: "هل أنت مستعد لبدء مشروعك؟",
    body: "أخبرنا بما تبنيه. نردّ عادةً خلال 24 ساعة بمكالمة قصيرة نتفق فيها على النطاق والجدول الزمني ومدى الملاءمة.",
  },
  globeBand: {
    heading: "نعمل عن بُعد في أوروبا والشرق الأوسط وشمال أفريقيا.",
    body: "مع مؤسسي شركات الصحة والعافية والتقنية المالية والأغذية والمشروبات، من تحديد الموقع التنافسي إلى الإنتاج.",
  },
  statement: {
    heading: "فريق واحد مسؤول عن الاستراتيجية والتصميم والتطوير.",
    sub: "بلا تسليمات بين جهات متعددة، ولا ضياع للمعنى، ولا مفاجآت عند الإطلاق.",
  },
  facts: {
    founded: "التأسيس",
    operating: "نطاق العمل",
    focus: "التخصص",
    operatingValue: "عن بُعد · أوروبا · الشرق الأوسط وشمال أفريقيا",
    focusValue: "الصحة والعافية · التقنية المالية · الأغذية والمشروبات",
  },
};
