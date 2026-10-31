// Insights articles, written for what people in Libya and the Gulf search
// for. Each article exists in both languages under the same slug; the Arabic
// is written for Arabic readers, not translated line by line. Articles only
// state general, checkable facts and what the rest of the site already says:
// no prices, no client claims.

import type { Locale } from "../lib/i18n";

export type ArticleSection = { heading: string; paragraphs: string[]; list?: string[] };

export type Article = {
  slug: string;
  /** ISO date, shown and used in structured data. */
  date: string;
  /** The service page the article leads to. */
  service: string;
  category: string;
  title: string;
  /** Search snippet, 110–160 characters. */
  description: string;
  intro: string;
  sections: ArticleSection[];
  cta: { heading: string; body: string; label: string };
};

const PUBLISHED = "2026-10-31";

const EN: Article[] = [
  {
    slug: "what-is-an-erp-system",
    date: PUBLISHED,
    service: "erp-implementation",
    category: "ERP",
    title: "What is an ERP system? A plain guide for growing companies",
    description:
      "What an ERP system does, the signs your company needs one, what it replaces, and how to choose and roll one out without stopping the business.",
    intro:
      "If your accounts live in one program, your stock in a spreadsheet and your sales in WhatsApp chats, you have already felt the problem an ERP system solves. This guide explains what ERP means, what it does day to day, and how to tell whether your company is ready for one.",
    sections: [
      {
        heading: "What ERP means",
        paragraphs: [
          "ERP stands for Enterprise Resource Planning. In practice it is one system, with one database, that runs the core of a business: accounting, purchasing, stock, sales, and often manufacturing, projects and HR.",
          "The point is not the features. It is that every department works from the same numbers. When a salesperson confirms an order, the stock is reserved, the invoice is ready and the accounts update, without anyone retyping anything.",
        ],
      },
      {
        heading: "What an ERP system replaces",
        paragraphs: ["Most companies that move to an ERP are replacing a patchwork that grew one tool at a time:"],
        list: [
          "A separate accounting program that only the accountant can read",
          "Stock counts kept in spreadsheets and corrected by hand every month",
          "Quotes and invoices written in Word or Excel",
          "Purchase requests sent by message, with no record of who approved what",
          "Reports that take days to assemble because the data sits in five places",
        ],
      },
      {
        heading: "Signs your company is ready",
        paragraphs: [
          "You do not need an ERP because you reached a certain size. You need one when the cost of disconnected tools becomes visible: month-end closing takes a week, stock figures never match reality, managers wait for reports, or growth means hiring people just to move data between systems.",
          "Another common trigger is a second branch, warehouse or company. The moment you need consolidated numbers across locations, spreadsheets stop scaling.",
        ],
      },
      {
        heading: "Cloud or on your own server, open source or licensed",
        paragraphs: [
          "Modern ERPs run either in the cloud or on a server you control. Cloud is faster to start and needs no IT team; your own server gives you full control over your data and where it is stored.",
          "Licensed systems charge per user, every year. Open-source systems such as ERPNext have no licence fee for the software itself, so the cost goes into setting it up properly around your processes, hosting and support.",
        ],
      },
      {
        heading: "How an ERP rollout works",
        paragraphs: [
          "A good implementation starts with your processes, not the software: how orders, purchases and payments actually flow today. The system is then configured to match, data is migrated from the old tools, and the team is trained on real examples from their own work.",
          "Rolling out in stages, usually accounting and stock first, keeps the business running while people learn. Depending on the modules, a typical implementation runs 6 to 16 weeks.",
        ],
      },
      {
        heading: "Questions to ask before you choose",
        paragraphs: ["Whichever system you pick, ask these before signing:"],
        list: [
          "Does it work fully in Arabic, including printed invoices and reports?",
          "Can it handle your country's tax rules and more than one currency?",
          "Who owns the data, and can you export all of it if you leave?",
          "What will it cost in year three, not just year one?",
          "Who supports it locally, in your time zone and language?",
        ],
      },
    ],
    cta: {
      heading: "Thinking about an ERP?",
      body: "As a Frappe Partner we implement ERPNext around how your business already works, in Arabic, English or both.",
      label: "See ERPNext implementation",
    },
  },
  {
    slug: "how-much-does-a-website-cost",
    date: PUBLISHED,
    service: "web-development",
    category: "Web",
    title: "How much does a website cost? What actually drives the price",
    description:
      "Why website quotes range so widely, the six things that decide the price, the costs people forget, and how to compare offers fairly before you sign.",
    intro:
      "Ask three studios to quote the same website and you can get three very different numbers. That is rarely because someone is overcharging: they are usually quoting three different websites. This guide explains what drives the price so you can compare offers on equal terms.",
    sections: [
      {
        heading: "Why quotes vary so much",
        paragraphs: [
          "A website can be a template with your logo on it, or a custom design with its own content structure, two languages, a content management system and search optimisation built in. Both are called a website. The difference is the amount of thinking, design and engineering behind it.",
          "Before comparing prices, compare what is included. A low quote that leaves out content, Arabic, or the ability to edit the site yourself often ends up costing more.",
        ],
      },
      {
        heading: "The six things that decide the price",
        paragraphs: ["Almost every website quote comes down to these:"],
        list: [
          "Number and type of pages: a five-page company site is a different job from a fifty-page catalogue",
          "Custom design or a template: custom design takes research, layout and several rounds of review",
          "Languages: a proper Arabic and English site needs right-to-left layouts, not just translated text",
          "Content management: whether your team can update pages, projects and articles without a developer",
          "Features: online payments, bookings, member areas or integrations with other systems",
          "Content: who writes the copy and who provides the photos",
        ],
      },
      {
        heading: "Costs people forget",
        paragraphs: [
          "The build is not the only cost. Budget for the domain name, hosting, a business email address, any paid plugins or services, and ongoing maintenance: security updates, small changes and fixes over time.",
          "Ask whether hosting and maintenance are included, for how long, and what they cost afterwards.",
        ],
      },
      {
        heading: "How to compare quotes fairly",
        paragraphs: [
          "Send every studio the same brief: your goals, the pages you need, the languages, and examples of sites you like. Then compare the proposals line by line, not by the total.",
          "A good proposal lists the deliverables, the timeline, how many design revisions are included, who owns the site at the end, and what happens after launch.",
        ],
      },
      {
        heading: "What a good website should include",
        paragraphs: ["Whatever the budget, a professional website today should come with:"],
        list: [
          "Mobile-first design that loads fast on phones",
          "Search basics: page titles, descriptions, a sitemap and clean addresses",
          "Analytics, so you can see where visitors come from",
          "A contact form or WhatsApp link that actually reaches you",
          "The ability to edit content yourself",
        ],
      },
    ],
    cta: {
      heading: "Want a clear quote?",
      body: "Tell us what you need. After a short call we send a written proposal with the price, the deliverables and the timeline.",
      label: "See website design and development",
    },
  },
  {
    slug: "erpnext-in-arabic",
    date: PUBLISHED,
    service: "erp-implementation",
    category: "ERP",
    title: "ERPNext in Arabic: is it right for companies in Libya and the Gulf?",
    description:
      "How ERPNext handles Arabic, right-to-left screens, local taxes and multiple currencies, and when it is the right ERP choice for companies in the region.",
    intro:
      "ERPNext is one of the most widely used open-source ERP systems in the world. For companies in Libya and the Gulf, the first questions are practical: does it really work in Arabic, and can it handle local requirements? Here is what to know.",
    sections: [
      {
        heading: "What ERPNext is",
        paragraphs: [
          "ERPNext is an open-source ERP built on the Frappe framework. It covers accounting, buying, selling, stock, manufacturing, projects, HR and payroll, CRM and a customer portal, all in one system.",
          "Because it is open source, there is no licence fee per user for the software itself. You can host it on Frappe Cloud or on your own server, and the data stays yours.",
        ],
      },
      {
        heading: "Working in Arabic",
        paragraphs: [
          "ERPNext ships with an Arabic translation and switches to a right-to-left layout when a user chooses Arabic. Each user can work in their own language, so the accountant can use Arabic while a foreign manager uses English in the same system.",
          "Printed documents such as invoices, quotations and delivery notes can be designed in Arabic, English or both side by side, which is common for companies dealing with local and international customers.",
        ],
      },
      {
        heading: "Taxes, currencies and local requirements",
        paragraphs: [
          "ERPNext supports multiple currencies with exchange rates, multiple companies and branches, and flexible tax templates, so VAT setups such as those in Saudi Arabia, the UAE and Oman can be configured.",
          "Country-specific requirements, such as e-invoicing rules, are handled through apps built for ERPNext and through configuration. Part of a good implementation is checking exactly what your country and sector require and setting it up before go-live.",
        ],
      },
      {
        heading: "When ERPNext is a good fit",
        paragraphs: ["ERPNext suits companies that:"],
        list: [
          "Have outgrown spreadsheets and a standalone accounting program",
          "Want one system for accounts, stock, sales and purchasing",
          "Prefer to own their system and data instead of renting per user",
          "Need Arabic and English side by side",
          "Want room to add custom workflows and reports later",
        ],
      },
      {
        heading: "What a good implementation looks like",
        paragraphs: [
          "The software is only half the result. The other half is setting it up around how your business works: your chart of accounts, approval steps, warehouses, price lists and reports, plus migrating clean data from your old system and training your team.",
          "A typical ERPNext implementation runs 6 to 16 weeks depending on the modules, and goes live in stages so the business never stops.",
        ],
      },
    ],
    cta: {
      heading: "Considering ERPNext?",
      body: "We implement and customise ERPNext as a Frappe Partner, in Arabic, English or both, around the way your company already works.",
      label: "See ERPNext implementation",
    },
  },
  {
    slug: "how-to-choose-a-web-design-company",
    date: PUBLISHED,
    service: "web-development",
    category: "Web",
    title: "How to choose a web design company: 8 questions to ask before you sign",
    description:
      "Eight questions that separate a reliable web design company from a risky one: portfolio, Arabic, ownership, editing, search, timeline and support.",
    intro:
      "Choosing a web design company is choosing a partner for something your customers will judge you by. Portfolios all look good, so ask questions that reveal how a studio actually works. These eight will tell you most of what you need to know.",
    sections: [
      {
        heading: "1. Can you show work similar to ours?",
        paragraphs: [
          "Ask for projects in your sector or of similar size and complexity, and open the live sites on your phone. Check that they load quickly and are easy to use, not just that the screenshots look good.",
        ],
      },
      {
        heading: "2. How do you handle Arabic and English?",
        paragraphs: [
          "A bilingual site needs proper right-to-left layouts, Arabic typography and separate pages for each language so both can rank on Google. Ask to see an Arabic site they built, and check the Arabic version on a phone.",
        ],
      },
      {
        heading: "3. Who owns the website and the domain?",
        paragraphs: [
          "The domain should be registered in your company's name, and you should own the design, the code and the content at the end of the project. Get this in writing.",
        ],
      },
      {
        heading: "4. Can we edit the site ourselves?",
        paragraphs: [
          "Ask for a demonstration of the content management system. Your team should be able to change text, images and projects without paying for every small update.",
        ],
      },
      {
        heading: "5. What do you do for search engines?",
        paragraphs: [
          "At minimum: unique page titles and descriptions, a sitemap, fast loading, mobile-friendly pages and connecting the site to Google Search Console. Be careful with anyone who guarantees first place on Google: nobody can promise that.",
        ],
      },
      {
        heading: "6. What is the timeline, and what do you need from us?",
        paragraphs: [
          "A clear plan shows each stage, when you review designs, and when content is due. Delays often come from waiting on content, so agree early on who writes the text and provides the photos.",
        ],
      },
      {
        heading: "7. What happens after launch?",
        paragraphs: [
          "Ask about hosting, security updates, backups and how quickly they respond to problems, and what that costs per month or per year.",
        ],
      },
      {
        heading: "8. How will we communicate?",
        paragraphs: [
          "Find out who your contact is, how often you will get updates, and in which language. A studio that answers clearly before you sign usually communicates well during the project.",
        ],
      },
    ],
    cta: {
      heading: "Planning a new website?",
      body: "We design and build fast bilingual websites for companies in Libya and the Gulf, with a content system your team can use.",
      label: "See website design and development",
    },
  },
];

const AR: Article[] = [
  {
    slug: "what-is-an-erp-system",
    date: PUBLISHED,
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "ما هو نظام ERP؟ دليل مبسّط للشركات النامية",
    description:
      "ما هو نظام ERP، وما الذي يقوم به يوميًا، وما العلامات التي تقول إن شركتك تحتاجه، وكيف تختاره وتطبّقه من دون أن يتوقف العمل.",
    intro:
      "إذا كانت حساباتك في برنامج، ومخزونك في جدول Excel، ومبيعاتك في محادثات واتساب، فأنت تعرف المشكلة التي يحلّها نظام ERP. يشرح هذا الدليل معنى ERP، وما يقوم به في العمل اليومي، وكيف تعرف أن شركتك جاهزة له.",
    sections: [
      {
        heading: "ما معنى ERP؟",
        paragraphs: [
          "ERP اختصار لعبارة Enterprise Resource Planning، أي تخطيط موارد المؤسسة. وهو عمليًا نظام واحد بقاعدة بيانات واحدة يدير قلب العمل: المحاسبة والمشتريات والمخزون والمبيعات، وغالبًا التصنيع والمشاريع والموارد البشرية.",
          "الفكرة ليست في عدد الخصائص، بل في أن كل الأقسام تعمل على الأرقام نفسها. عندما يؤكد موظف المبيعات طلبًا، يُحجز المخزون وتجهز الفاتورة وتتحدث الحسابات، من دون أن يعيد أحد كتابة شيء.",
        ],
      },
      {
        heading: "ما الذي يحلّ نظام ERP محلّه؟",
        paragraphs: ["معظم الشركات التي تنتقل إلى ERP تستبدل مجموعة أدوات تراكمت مع الوقت:"],
        list: [
          "برنامج محاسبة منفصل لا يفهمه إلا المحاسب",
          "جرد مخزون في جداول تُصحَّح يدويًا كل شهر",
          "عروض أسعار وفواتير تُكتب في Word أو Excel",
          "طلبات شراء تُرسل في رسائل من دون سجل لمن وافق عليها",
          "تقارير تستغرق أيامًا لأن البيانات موزعة في خمسة أماكن",
        ],
      },
      {
        heading: "علامات أن شركتك جاهزة",
        paragraphs: [
          "لا تحتاج إلى ERP لأنك وصلت إلى حجم معيّن، بل عندما تصبح تكلفة الأدوات المتفرقة واضحة: إغلاق نهاية الشهر يستغرق أسبوعًا، وأرقام المخزون لا تطابق الواقع، والمديرون ينتظرون التقارير، والنمو يعني توظيف أشخاص فقط لنقل البيانات بين الأنظمة.",
          "ومن الدوافع الشائعة أيضًا افتتاح فرع أو مستودع أو شركة ثانية. فعندما تحتاج إلى أرقام موحّدة لعدة مواقع، تتوقف الجداول عن الكفاية.",
        ],
      },
      {
        heading: "سحابي أم على خادمك، مفتوح المصدر أم بترخيص؟",
        paragraphs: [
          "تعمل أنظمة ERP الحديثة إما على السحابة أو على خادم تتحكم فيه. السحابة أسرع في البدء ولا تحتاج فريق تقنية معلومات، والخادم الخاص يمنحك تحكمًا كاملًا في بياناتك ومكان حفظها.",
          "الأنظمة المرخّصة تفرض رسومًا لكل مستخدم كل سنة. أما الأنظمة مفتوحة المصدر مثل ERPNext فلا رسوم ترخيص فيها على البرنامج نفسه، فتذهب التكلفة إلى إعداده جيدًا وفق عملياتك، وإلى الاستضافة والدعم.",
        ],
      },
      {
        heading: "كيف يُطبَّق نظام ERP؟",
        paragraphs: [
          "يبدأ التطبيق الجيد بعملياتك لا بالبرنامج: كيف تسير الطلبات والمشتريات والمدفوعات فعلًا اليوم. ثم يُعدّ النظام ليطابقها، وتُنقل البيانات من الأدوات القديمة، ويُدرَّب الفريق على أمثلة حقيقية من عمله.",
          "التطبيق على مراحل، وعادةً المحاسبة والمخزون أولًا، يُبقي العمل مستمرًا أثناء التعلّم. ويستغرق التطبيق عادةً من 6 إلى 16 أسبوعًا بحسب الوحدات.",
        ],
      },
      {
        heading: "أسئلة قبل أن تختار",
        paragraphs: ["أيًّا كان النظام، اسأل هذه الأسئلة قبل التوقيع:"],
        list: [
          "هل يعمل بالعربية بالكامل، بما في ذلك الفواتير والتقارير المطبوعة؟",
          "هل يدعم قواعد الضرائب في بلدك وأكثر من عملة؟",
          "من يملك البيانات، وهل يمكنك تصديرها كاملة إذا غادرت؟",
          "كم ستكون التكلفة في السنة الثالثة، لا في الأولى فقط؟",
          "من يدعم النظام محليًا، في منطقتك الزمنية وبلغتك؟",
        ],
      },
    ],
    cta: {
      heading: "تفكّر في نظام ERP؟",
      body: "بصفتنا شريكًا معتمدًا لـ Frappe، نطبّق ERPNext وفق الطريقة التي يعمل بها عملك فعلًا، بالعربية أو الإنجليزية أو كليهما.",
      label: "تنفيذ نظام ERPNext",
    },
  },
  {
    slug: "how-much-does-a-website-cost",
    date: PUBLISHED,
    service: "web-development",
    category: "المواقع",
    title: "كم تكلفة تصميم موقع إلكتروني؟ ما الذي يحدد السعر فعلًا",
    description:
      "لماذا تختلف أسعار تصميم المواقع كثيرًا، والعوامل الست التي تحدد التكلفة، والتكاليف التي ينساها الناس، وكيف تقارن العروض بعدل.",
    intro:
      "اطلب عرض سعر للموقع نفسه من ثلاث شركات، وقد تحصل على ثلاثة أرقام مختلفة تمامًا. والسبب نادرًا ما يكون مبالغة في السعر؛ فغالبًا ما تسعّر كل شركة موقعًا مختلفًا. يشرح هذا الدليل ما يحدد السعر لتقارن العروض على أساس واحد.",
    sections: [
      {
        heading: "لماذا تختلف العروض إلى هذا الحد؟",
        paragraphs: [
          "قد يكون الموقع قالبًا جاهزًا عليه شعارك، وقد يكون تصميمًا خاصًا ببنية محتوى مدروسة ولغتين ولوحة تحكم وتحسين لمحركات البحث. كلاهما يسمى موقعًا، والفرق في حجم التفكير والتصميم والبرمجة وراءه.",
          "قبل مقارنة الأسعار، قارن ما يتضمنه كل عرض. العرض الرخيص الذي لا يشمل المحتوى أو النسخة العربية أو إمكانية تعديل الموقع بنفسك قد يكلّف أكثر في النهاية.",
        ],
      },
      {
        heading: "العوامل الست التي تحدد السعر",
        paragraphs: ["يعود كل عرض سعر تقريبًا إلى هذه العوامل:"],
        list: [
          "عدد الصفحات ونوعها: موقع شركة من خمس صفحات يختلف عن كتالوج من خمسين صفحة",
          "تصميم خاص أم قالب جاهز: التصميم الخاص يحتاج بحثًا وتخطيطًا وعدة جولات مراجعة",
          "اللغات: الموقع العربي والإنجليزي الصحيح يحتاج تصميمًا من اليمين إلى اليسار، لا مجرد ترجمة",
          "نظام إدارة المحتوى: هل يستطيع فريقك تحديث الصفحات والمشاريع والمقالات من دون مبرمج",
          "الخصائص: الدفع الإلكتروني أو الحجوزات أو مناطق الأعضاء أو الربط مع أنظمة أخرى",
          "المحتوى: من يكتب النصوص ومن يوفّر الصور",
        ],
      },
      {
        heading: "تكاليف ينساها الناس",
        paragraphs: [
          "البناء ليس التكلفة الوحيدة. ضع في الحساب اسم النطاق والاستضافة والبريد الإلكتروني الرسمي، وأي إضافات أو خدمات مدفوعة، والصيانة المستمرة: تحديثات الأمان والتعديلات الصغيرة والإصلاحات مع الوقت.",
          "اسأل هل الاستضافة والصيانة مشمولتان، ولأي مدة، وكم تكلفان بعد ذلك.",
        ],
      },
      {
        heading: "كيف تقارن العروض بعدل",
        paragraphs: [
          "أرسل إلى كل شركة الوصف نفسه: أهدافك، والصفحات التي تحتاجها، واللغات، وأمثلة لمواقع تعجبك. ثم قارن العروض بندًا بندًا، لا بالمبلغ الإجمالي.",
          "العرض الجيد يذكر المخرجات والجدول الزمني وعدد جولات تعديل التصميم ومن يملك الموقع في النهاية وما الذي يحدث بعد الإطلاق.",
        ],
      },
      {
        heading: "ما الذي يجب أن يتضمنه أي موقع جيد",
        paragraphs: ["مهما كانت الميزانية، يجب أن يأتي الموقع الاحترافي اليوم مع:"],
        list: [
          "تصميم يبدأ من الجوال ويُحمَّل بسرعة على الهواتف",
          "أساسيات محركات البحث: عناوين وأوصاف للصفحات وخريطة موقع وروابط واضحة",
          "أدوات تحليل تعرف بها من أين يأتي الزوار",
          "نموذج تواصل أو رابط واتساب يصل إليك فعلًا",
          "إمكانية تعديل المحتوى بنفسك",
        ],
      },
    ],
    cta: {
      heading: "تريد عرض سعر واضحًا؟",
      body: "أخبرنا بما تحتاجه. بعد مكالمة قصيرة نرسل عرضًا مكتوبًا يتضمن السعر والمخرجات والجدول الزمني.",
      label: "تصميم وتطوير المواقع",
    },
  },
  {
    slug: "erpnext-in-arabic",
    date: PUBLISHED,
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "ERPNext بالعربي: هل يناسب الشركات في ليبيا والخليج؟",
    description:
      "كيف يتعامل ERPNext مع اللغة العربية والشاشات من اليمين إلى اليسار والضرائب المحلية والعملات المتعددة، ومتى يكون الخيار الصحيح لشركتك.",
    intro:
      "ERPNext من أكثر أنظمة ERP مفتوحة المصدر استخدامًا في العالم. وبالنسبة للشركات في ليبيا والخليج، تأتي الأسئلة العملية أولًا: هل يعمل فعلًا بالعربية، وهل يلبّي المتطلبات المحلية؟ إليك ما تحتاج إلى معرفته.",
    sections: [
      {
        heading: "ما هو ERPNext؟",
        paragraphs: [
          "ERPNext نظام ERP مفتوح المصدر مبني على إطار Frappe. يغطي المحاسبة والمشتريات والمبيعات والمخزون والتصنيع والمشاريع والموارد البشرية والرواتب وإدارة علاقات العملاء وبوابة للعملاء، كلها في نظام واحد.",
          "ولأنه مفتوح المصدر، لا توجد رسوم ترخيص لكل مستخدم على البرنامج نفسه. يمكنك استضافته على Frappe Cloud أو على خادمك الخاص، وتبقى البيانات ملكك.",
        ],
      },
      {
        heading: "العمل باللغة العربية",
        paragraphs: [
          "يأتي ERPNext مع ترجمة عربية، ويتحول إلى تصميم من اليمين إلى اليسار عندما يختار المستخدم العربية. ويستطيع كل مستخدم العمل بلغته، فيستخدم المحاسب العربية بينما يستخدم مدير أجنبي الإنجليزية في النظام نفسه.",
          "ويمكن تصميم المستندات المطبوعة، مثل الفواتير وعروض الأسعار وإشعارات التسليم، بالعربية أو الإنجليزية أو باللغتين جنبًا إلى جنب، وهو أمر شائع لدى الشركات التي تتعامل مع عملاء محليين ودوليين.",
        ],
      },
      {
        heading: "الضرائب والعملات والمتطلبات المحلية",
        paragraphs: [
          "يدعم ERPNext العملات المتعددة مع أسعار الصرف، والشركات والفروع المتعددة، وقوالب ضريبية مرنة، فيمكن إعداد ضريبة القيمة المضافة مثل المعمول بها في السعودية والإمارات وعُمان.",
          "أما المتطلبات الخاصة بكل بلد، مثل قواعد الفوترة الإلكترونية، فتُلبّى عبر تطبيقات مبنية لـ ERPNext وعبر الإعداد. وجزء من التطبيق الجيد هو التحقق بدقة مما يتطلبه بلدك وقطاعك وإعداده قبل التشغيل.",
        ],
      },
      {
        heading: "متى يكون ERPNext مناسبًا؟",
        paragraphs: ["يناسب ERPNext الشركات التي:"],
        list: [
          "تجاوزت الجداول وبرنامج المحاسبة المنفصل",
          "تريد نظامًا واحدًا للحسابات والمخزون والمبيعات والمشتريات",
          "تفضّل امتلاك نظامها وبياناتها بدل الاستئجار لكل مستخدم",
          "تحتاج إلى العربية والإنجليزية جنبًا إلى جنب",
          "تريد مجالًا لإضافة سير عمل وتقارير خاصة لاحقًا",
        ],
      },
      {
        heading: "كيف يبدو التطبيق الجيد؟",
        paragraphs: [
          "البرنامج نصف النتيجة فقط. النصف الآخر هو إعداده وفق طريقة عملك: دليل الحسابات وخطوات الموافقة والمستودعات وقوائم الأسعار والتقارير، إضافة إلى نقل بيانات نظيفة من نظامك القديم وتدريب فريقك.",
          "يستغرق تطبيق ERPNext عادةً من 6 إلى 16 أسبوعًا بحسب الوحدات، ويُشغَّل على مراحل حتى لا يتوقف العمل أبدًا.",
        ],
      },
    ],
    cta: {
      heading: "تفكّر في ERPNext؟",
      body: "ننفّذ ERPNext ونخصّصه بصفتنا شريكًا لـ Frappe، بالعربية أو الإنجليزية أو كليهما، وفق الطريقة التي تعمل بها شركتك.",
      label: "تنفيذ نظام ERPNext",
    },
  },
  {
    slug: "how-to-choose-a-web-design-company",
    date: PUBLISHED,
    service: "web-development",
    category: "المواقع",
    title: "كيف تختار شركة تصميم مواقع: 8 أسئلة قبل التوقيع",
    description:
      "ثمانية أسئلة تكشف الفرق بين شركة تصميم مواقع موثوقة وأخرى محفوفة بالمخاطر: الأعمال السابقة والعربية والملكية والتعديل والبحث والدعم.",
    intro:
      "اختيار شركة تصميم مواقع هو اختيار شريك لشيء سيحكم عليك عملاؤك من خلاله. كل معارض الأعمال تبدو جيدة، لذا اسأل أسئلة تكشف كيف تعمل الشركة فعلًا. هذه الأسئلة الثمانية تخبرك بمعظم ما تحتاج إلى معرفته.",
    sections: [
      {
        heading: "1. هل يمكنكم عرض أعمال تشبه ما نحتاجه؟",
        paragraphs: [
          "اطلب مشاريع في قطاعك أو بحجم وتعقيد مشابهين، وافتح المواقع الحقيقية على هاتفك. تأكد أنها سريعة وسهلة الاستخدام، لا أن الصور جميلة فقط.",
        ],
      },
      {
        heading: "2. كيف تتعاملون مع العربية والإنجليزية؟",
        paragraphs: [
          "الموقع ثنائي اللغة يحتاج تصميمًا صحيحًا من اليمين إلى اليسار، وخطوطًا عربية جيدة، وصفحات مستقلة لكل لغة حتى تظهر النسختان في Google. اطلب رؤية موقع عربي نفّذوه، وافتح النسخة العربية على الهاتف.",
        ],
      },
      {
        heading: "3. من يملك الموقع والنطاق؟",
        paragraphs: [
          "يجب أن يُسجَّل اسم النطاق باسم شركتك، وأن تملك التصميم والكود والمحتوى في نهاية المشروع. واطلب ذلك مكتوبًا.",
        ],
      },
      {
        heading: "4. هل نستطيع تعديل الموقع بأنفسنا؟",
        paragraphs: [
          "اطلب عرضًا عمليًا لنظام إدارة المحتوى. يجب أن يتمكن فريقك من تغيير النصوص والصور والمشاريع من دون الدفع مقابل كل تعديل صغير.",
        ],
      },
      {
        heading: "5. ماذا تفعلون لمحركات البحث؟",
        paragraphs: [
          "على الأقل: عنوان ووصف مختلفان لكل صفحة، وخريطة موقع، وتحميل سريع، وصفحات مناسبة للجوال، وربط الموقع بـ Google Search Console. واحذر ممن يضمن لك المركز الأول في Google، فلا أحد يستطيع ضمان ذلك.",
        ],
      },
      {
        heading: "6. ما الجدول الزمني، وما المطلوب منا؟",
        paragraphs: [
          "الخطة الواضحة تبيّن كل مرحلة، ومتى تراجع التصاميم، ومتى يجب تسليم المحتوى. فالتأخير غالبًا ما يأتي من انتظار المحتوى، لذا اتفقوا مبكرًا على من يكتب النصوص ومن يوفّر الصور.",
        ],
      },
      {
        heading: "7. ماذا يحدث بعد الإطلاق؟",
        paragraphs: [
          "اسأل عن الاستضافة وتحديثات الأمان والنسخ الاحتياطي وسرعة الاستجابة للمشكلات، وكم يكلّف ذلك شهريًا أو سنويًا.",
        ],
      },
      {
        heading: "8. كيف سنتواصل؟",
        paragraphs: [
          "اعرف من هو الشخص المسؤول عن مشروعك، وكم مرة ستصلك التحديثات، وبأي لغة. الشركة التي تجيب بوضوح قبل التوقيع تتواصل جيدًا عادةً أثناء المشروع.",
        ],
      },
    ],
    cta: {
      heading: "تخطّط لموقع جديد؟",
      body: "نصمم ونبني مواقع سريعة ثنائية اللغة للشركات في ليبيا والخليج، مع نظام محتوى يستخدمه فريقك.",
      label: "تصميم وتطوير المواقع",
    },
  },
];

const BY_LOCALE: Record<Locale, Article[]> = { en: EN, ar: AR };

export function getArticles(locale: Locale): Article[] {
  return BY_LOCALE[locale];
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return BY_LOCALE[locale].find((a) => a.slug === slug);
}

export const ARTICLE_SLUGS = EN.map((a) => a.slug);
