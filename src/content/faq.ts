// Frequently asked questions per service page, in both languages. Shown as an
// accordion on the service page and as FAQPage structured data. Answers only
// state what the rest of the site already says: no prices, no guarantees.

import type { Locale } from "../lib/i18n";

export type FaqItem = { q: string; a: string };

const PRICE_EN =
  "Pricing depends on scope. After a short call we send a written proposal with the price, the deliverables and the timeline, so you know the full cost before anything starts.";
const PRICE_AR =
  "يعتمد السعر على نطاق العمل. بعد مكالمة قصيرة نرسل عرضًا مكتوبًا يتضمن السعر والمخرجات والجدول الزمني، لتعرف التكلفة كاملة قبل أن يبدأ أي عمل.";
const REMOTE_EN =
  "Yes. We work remotely with companies in Libya, Saudi Arabia, the UAE, Oman and the rest of the Gulf, in Arabic or English, with calls and weekly updates.";
const REMOTE_AR =
  "نعم. نعمل عن بُعد مع الشركات في ليبيا والسعودية والإمارات وعُمان وبقية دول الخليج، بالعربية أو الإنجليزية، مع مكالمات وتحديثات أسبوعية.";

export const FAQ: Record<Locale, Record<string, FaqItem[]>> = {
  en: {
    "brand-strategy": [
      { q: "How long does a brand strategy project take?", a: "Brand strategy engagements typically run 4–6 weeks: stakeholder interviews, market research, positioning workshops and a final strategy document your team can use." },
      { q: "What do we get at the end?", a: "A written strategy covering your positioning, competitor landscape, brand architecture, naming and tagline if needed, and a messaging playbook with your tone of voice." },
      { q: "Do you work with companies in Libya and the Gulf?", a: REMOTE_EN },
    ],
    "brand-identity": [
      { q: "How long does a brand identity take?", a: "Identity engagements typically run 6–10 weeks, from exploration and refinement to the full design system and brand book." },
      { q: "Do you design Arabic and English logos?", a: "Yes. We design identities that work in Arabic and English, including bilingual logo lockups and type choices that hold up in both scripts." },
      { q: "How much does a logo and brand identity cost?", a: PRICE_EN },
    ],
    "user-experience-design": [
      { q: "How long does UI/UX design take?", a: "UX engagements run 4–12 weeks depending on scope, and ship with everything engineering needs to build without guessing." },
      { q: "Do you design right-to-left Arabic interfaces?", a: "Yes. We design screens for Arabic right-to-left and English left-to-right layouts, and test them with real users before development." },
      { q: "Can you work with our developers?", a: "Yes. We hand over prototypes, a design system and UI kit, and stay available while your team builds, or our own engineers can build it." },
    ],
    "visual-content": [
      { q: "What kind of photography do you do?", a: "Product photography, lifestyle and campaign shoots, and eCommerce photography, from clean product cutouts to full campaign productions." },
      { q: "Do you deliver images ready for our store and social media?", a: "Yes. Every shoot includes retouching and delivery in each format your channels need, from product pages to social posts and packaging." },
      { q: "How much does a product photo shoot cost?", a: PRICE_EN },
    ],
    "web-development": [
      { q: "How much does a website cost?", a: PRICE_EN },
      { q: "Can the website be in Arabic and English?", a: "Yes. We build bilingual sites with proper right-to-left Arabic layouts, separate pages for each language and search settings so both versions rank on Google." },
      { q: "Can we edit the website ourselves?", a: "Yes. Every site ships with a content management system your team can use to update text, images and projects without calling us." },
    ],
    ecommerce: [
      { q: "Shopify or a custom store: which is right for us?", a: "Shopify suits most stores and is quick to launch. A custom build makes sense for subscriptions, marketplaces, B2B pricing or anything Shopify cannot do. We recommend one after looking at your business model." },
      { q: "Can you connect local payment methods?", a: "Yes. We integrate Stripe and regional processors such as Checkout.com, PayTabs, Tap and mada, depending on where you sell." },
      { q: "How much does an online store cost?", a: PRICE_EN },
    ],
    "web-mobile-applications": [
      { q: "Do you build iPhone and Android apps?", a: "Yes. We build native iOS and Android apps, or one cross-platform app with React Native when speed matters, plus the backend that powers them." },
      { q: "Do you publish the app to the App Store and Google Play?", a: "Yes. We handle submission and review on both stores, a staged rollout, crash monitoring and a 30-day support window after launch." },
      { q: "How much does it cost to build an app?", a: PRICE_EN },
    ],
    "erp-implementation": [
      { q: "What is ERPNext?", a: "ERPNext is an open-source ERP system that puts accounting, inventory, sales, purchasing, manufacturing and HR in one place. You own it, with no per-user licence fees for the software itself." },
      { q: "Does ERPNext work in Arabic?", a: "Yes. ERPNext supports Arabic and right-to-left layouts, and we set it up around how your business already works, in Arabic, English or both." },
      { q: "How long does an ERPNext implementation take?", a: "Engagements typically run 6–16 weeks depending on the modules, covering process mapping, setup, data migration from your old system, training and support." },
    ],
  },
  ar: {
    "brand-strategy": [
      { q: "كم يستغرق مشروع استراتيجية العلامة التجارية؟", a: "يستغرق المشروع عادةً من 4 إلى 6 أسابيع: مقابلات مع أصحاب القرار، وبحث في السوق، وورش عمل لتحديد الموقع التنافسي، ووثيقة استراتيجية نهائية يستخدمها فريقك." },
      { q: "ما الذي نحصل عليه في النهاية؟", a: "استراتيجية مكتوبة تشمل موقعك التنافسي وخريطة المنافسين وهيكلة العلامة، والاسم والشعار اللفظي عند الحاجة، ودليل رسائل يحدد نبرة صوت علامتك." },
      { q: "هل تعملون مع الشركات في ليبيا والخليج؟", a: REMOTE_AR },
    ],
    "brand-identity": [
      { q: "كم يستغرق تصميم الهوية البصرية؟", a: "يستغرق مشروع الهوية عادةً من 6 إلى 10 أسابيع، من الاستكشاف والتطوير إلى نظام التصميم الكامل ودليل الهوية." },
      { q: "هل تصممون شعارات بالعربية والإنجليزية؟", a: "نعم. نصمم هويات تعمل بالعربية والإنجليزية، بما في ذلك الشعارات ثنائية اللغة واختيار خطوط تناسب الكتابتين." },
      { q: "كم تكلفة تصميم الشعار والهوية البصرية؟", a: PRICE_AR },
    ],
    "user-experience-design": [
      { q: "كم يستغرق تصميم واجهات وتجربة المستخدم؟", a: "يستغرق المشروع من 4 إلى 12 أسبوعًا بحسب النطاق، ويُسلَّم مع كل ما يحتاجه المطورون للبناء من دون تخمين." },
      { q: "هل تصممون واجهات عربية من اليمين إلى اليسار؟", a: "نعم. نصمم الشاشات بالعربية من اليمين إلى اليسار وبالإنجليزية من اليسار إلى اليمين، ونختبرها مع مستخدمين حقيقيين قبل البرمجة." },
      { q: "هل يمكنكم العمل مع مطورينا؟", a: "نعم. نسلّم النماذج الأولية ونظام التصميم ومكتبة الواجهات ونبقى متاحين أثناء عمل فريقك، أو يتولى مهندسونا البناء." },
    ],
    "visual-content": [
      { q: "ما نوع التصوير الذي تقدمونه؟", a: "تصوير المنتجات، وتصوير أسلوب الحياة والحملات، وتصوير المتاجر الإلكترونية، من صور المنتجات على خلفية بيضاء إلى إنتاج الحملات الكاملة." },
      { q: "هل تسلّمون الصور جاهزة للمتجر ووسائل التواصل؟", a: "نعم. يشمل كل تصوير التعديل والتسليم بكل المقاسات التي تحتاجها قنواتك، من صفحات المنتجات إلى منشورات التواصل والتغليف." },
      { q: "كم تكلفة جلسة تصوير المنتجات؟", a: PRICE_AR },
    ],
    "web-development": [
      { q: "كم تكلفة تصميم موقع إلكتروني؟", a: PRICE_AR },
      { q: "هل يمكن أن يكون الموقع بالعربية والإنجليزية؟", a: "نعم. نبني مواقع ثنائية اللغة بتصميم عربي صحيح من اليمين إلى اليسار، وصفحات مستقلة لكل لغة، وإعدادات بحث تجعل النسختين تظهران في Google." },
      { q: "هل نستطيع تعديل الموقع بأنفسنا؟", a: "نعم. يُسلَّم كل موقع مع نظام إدارة محتوى يستخدمه فريقك لتحديث النصوص والصور والمشاريع من دون الرجوع إلينا." },
    ],
    ecommerce: [
      { q: "Shopify أم متجر مخصص: أيهما يناسبنا؟", a: "يناسب Shopify معظم المتاجر ويُطلق بسرعة. أما المتجر المخصص فمناسب للاشتراكات والأسواق متعددة البائعين وتسعير الشركات وكل ما لا يدعمه Shopify. نوصي بأحدهما بعد دراسة نموذج عملك." },
      { q: "هل تربطون وسائل الدفع المحلية؟", a: "نعم. نربط Stripe والمعالجات الإقليمية مثل Checkout.com وPayTabs وTap وmada بحسب البلد الذي تبيع فيه." },
      { q: "كم تكلفة تصميم متجر إلكتروني؟", a: PRICE_AR },
    ],
    "web-mobile-applications": [
      { q: "هل تبرمجون تطبيقات iPhone وAndroid؟", a: "نعم. نبني تطبيقات iOS وAndroid أصلية، أو تطبيقًا واحدًا متعدد المنصات بـ React Native عندما تهم السرعة، مع البنية الخلفية التي تشغّلها." },
      { q: "هل تنشرون التطبيق على App Store وGoogle Play؟", a: "نعم. نتولى النشر والمراجعة على المتجرين، والطرح التدريجي، ومراقبة الأعطال، ونافذة دعم لمدة 30 يومًا بعد الإطلاق." },
      { q: "كم تكلفة برمجة تطبيق؟", a: PRICE_AR },
    ],
    "erp-implementation": [
      { q: "ما هو نظام ERPNext؟", a: "ERPNext نظام ERP مفتوح المصدر يجمع المحاسبة والمخزون والمبيعات والمشتريات والتصنيع والموارد البشرية في مكان واحد. النظام ملكك، من دون رسوم ترخيص لكل مستخدم على البرنامج نفسه." },
      { q: "هل يعمل ERPNext بالعربي؟", a: "نعم. يدعم ERPNext اللغة العربية والكتابة من اليمين إلى اليسار، ونُعدّه وفق الطريقة التي يعمل بها عملك فعلًا، بالعربية أو الإنجليزية أو كليهما." },
      { q: "كم يستغرق تنفيذ نظام ERPNext؟", a: "يستغرق المشروع عادةً من 6 إلى 16 أسبوعًا بحسب الوحدات، ويشمل رسم العمليات والإعداد ونقل البيانات من نظامك القديم والتدريب والدعم." },
    ],
  },
};

export function getFaq(locale: Locale, slug: string): FaqItem[] {
  return FAQ[locale][slug] ?? [];
}
