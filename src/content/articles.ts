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
  /** ISO date of the last substantial rewrite, if any. */
  updated?: string;
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
    updated: "2026-11-08",
    service: "erp-implementation",
    category: "ERP",
    title: "ERPNext in Arabic: is it right for companies in Libya and the Gulf?",
    description:
      "How ERPNext handles Arabic, right-to-left screens, VAT, e-invoicing and multiple currencies, and when it is the right ERP for companies in Libya and the Gulf.",
    intro:
      "ERPNext is one of the most widely used open-source ERP systems in the world. For companies in Libya, Saudi Arabia, the UAE and Oman, the first questions are practical: does it really work in Arabic, what does it cost, and can it meet local tax and e-invoicing rules? This guide answers them in plain terms.",
    sections: [
      {
        heading: "What ERPNext is",
        paragraphs: [
          "ERPNext is an open-source ERP built on the Frappe framework. It covers accounting, buying, selling, stock, manufacturing, projects, HR and payroll, CRM and a customer portal, all in one system.",
          "It runs in a web browser, on a computer or a phone, so there is nothing to install on each employee's machine.",
        ],
      },
      {
        heading: "Is ERPNext free?",
        paragraphs: [
          "The software is free. ERPNext is released under the GNU GPL licence, so there is no licence fee and no charge per user for the software itself, whether you have five users or five hundred.",
          "What you pay for is everything around it: hosting, setting it up for your company, moving your data, training, and support after go-live. Those costs depend on how many modules you use and how much needs to be customised, not on your number of users.",
        ],
      },
      {
        heading: "Working in Arabic",
        paragraphs: [
          "ERPNext ships with an Arabic translation and switches to a right-to-left layout when a user chooses Arabic. Each user can work in their own language, so the accountant can use Arabic while a foreign manager uses English in the same system.",
          "Customer, supplier and item names can be entered in Arabic and searched in Arabic. Printed documents such as invoices, quotations and delivery notes can be designed in Arabic, English or both side by side, which is common for companies dealing with local and international customers.",
          "The standard translation covers most screens, but some terms are translated literally. A careful implementation reviews the wording your team will see every day and adjusts it to the terms your accountants already use.",
        ],
      },
      {
        heading: "Taxes, currencies and local requirements",
        paragraphs: [
          "ERPNext supports multiple currencies with exchange rates, multiple companies and branches, and flexible tax templates, so VAT setups such as those in Saudi Arabia, the UAE and Oman can be configured.",
          "Your chart of accounts can follow your accountant's structure, in Arabic or English, rather than a fixed template. Companies in Libya, whose tax and reporting rules differ from the Gulf's, set up their own accounts, taxes and reports the same way.",
        ],
      },
      {
        heading: "E-invoicing in Saudi Arabia and the Gulf",
        paragraphs: [
          "Saudi Arabia's e-invoicing system, FATOORA, is run by the Zakat, Tax and Customs Authority (ZATCA). Its first phase, from December 2021, requires invoices to be issued electronically in an approved format. Its second phase connects invoicing systems directly to ZATCA's platform and is being applied to businesses in waves.",
          "ERPNext meets these rules through apps built for it by the Frappe community and partners, which add the required QR codes, invoice formats and the connection to ZATCA. The UAE has announced its own e-invoicing programme, introduced in phases, and other Gulf countries are moving in the same direction.",
          "Rules and deadlines change, so check with your tax adviser which phase applies to your company, and make sure your implementation partner sets it up and tests it before go-live.",
        ],
      },
      {
        heading: "Hosting and where your data lives",
        paragraphs: [
          "You can run ERPNext on Frappe Cloud, the hosting service from the company behind ERPNext, or on your own server or a cloud provider you choose. Either way, the data belongs to you and can be exported at any time.",
          "Some sectors in the region have rules about where data must be stored. If yours does, choose a host in the right country from the start; moving later is possible but it is extra work.",
        ],
      },
      {
        heading: "ERPNext compared with Odoo and SAP Business One",
        paragraphs: [
          "These are the systems companies in the region most often compare. All three cover accounting, stock, sales and purchasing, and all three can work in Arabic. The biggest difference is how they are licensed.",
        ],
        list: [
          "ERPNext: fully open source, with no licence fee per user. Every module is included.",
          "Odoo: a free Community edition, while many business features are in the paid Enterprise edition, charged per user each month.",
          "SAP Business One: licensed per user and sold through SAP partners, with an annual maintenance fee.",
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
          "Expect to add users as they grow, without the cost rising with each one",
          "Want room to add custom workflows and reports later",
        ],
      },
      {
        heading: "When another option may suit you better",
        paragraphs: [
          "If you only need invoices and a simple ledger, a basic accounting program may be enough for now. And if your group already runs SAP or Oracle at head office, it is often simpler for a branch to follow the same system. An honest partner will tell you when ERPNext is not the right answer.",
        ],
      },
      {
        heading: "Moving from spreadsheets or another system",
        paragraphs: [
          "ERPNext has a built-in data import tool that loads customers, suppliers, items, opening balances and open invoices from Excel or CSV files. The real work is cleaning the data first: removing duplicates, agreeing on item codes, and confirming opening balances with your accountant.",
          "Most companies move at the start of a financial year or a month, and run the old and new systems side by side for a short time to check the numbers match.",
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
  {
    slug: "erpnext-zatca-e-invoicing",
    date: "2026-11-08",
    service: "erp-implementation",
    category: "ERP",
    title: "ERPNext and ZATCA e-invoicing: a guide for companies in Saudi Arabia",
    description:
      "What Saudi e-invoicing (FATOORA) requires in phase one and phase two, how ERPNext meets it, and the steps to get your company ready before your deadline.",
    intro:
      "Every VAT-registered business in Saudi Arabia has to issue electronic invoices under FATOORA, the e-invoicing system run by the Zakat, Tax and Customs Authority (ZATCA). If you use ERPNext, or are thinking of moving to it, here is what the rules require and how ERPNext meets them.",
    sections: [
      {
        heading: "What FATOORA is",
        paragraphs: [
          "FATOORA is Saudi Arabia's e-invoicing system. It replaces paper and handwritten invoices with structured electronic invoices that ZATCA can verify, to reduce errors and tax evasion.",
          "It applies to taxpayers resident in Saudi Arabia who are registered for VAT, and to anyone issuing tax invoices on their behalf. It is being introduced in two phases.",
        ],
      },
      {
        heading: "Phase one: generating invoices electronically",
        paragraphs: [
          "Since 4 December 2021, invoices must be issued and stored through a compliant electronic system. Handwritten invoices and editing an invoice after it is issued are no longer allowed.",
        ],
        list: [
          "Every invoice is created and stored electronically",
          "Simplified invoices, issued to consumers, carry a QR code",
          "Invoices cannot be deleted or changed once issued; corrections are made with credit and debit notes",
          "The system keeps a record that shows invoices have not been tampered with",
        ],
      },
      {
        heading: "Phase two: connecting to ZATCA",
        paragraphs: [
          "The second phase, the integration phase, started on 1 January 2023 and is applied in waves. ZATCA selects each wave by revenue and notifies the businesses in it at least six months before their date.",
          "In this phase invoices are produced in a set XML format with a cryptographic stamp, and your system connects to ZATCA's platform. Standard tax invoices, between businesses, must be cleared by ZATCA before they are sent to the buyer. Simplified invoices, to consumers, are reported to ZATCA within 24 hours.",
        ],
      },
      {
        heading: "How ERPNext meets the requirements",
        paragraphs: [
          "ERPNext does not include ZATCA integration in its core, but apps built for it by the Frappe community and Frappe partners add it. These apps generate invoices in the required format, add the QR code and cryptographic stamp, and send invoices to ZATCA for clearance or reporting directly from the sales invoice screen.",
          "Because ERPNext already locks submitted invoices and handles returns with credit notes, it fits the phase-one rules once VAT and the invoice layout are set up correctly.",
        ],
      },
      {
        heading: "Connecting ERPNext to the FATOORA portal",
        paragraphs: ["Onboarding usually follows these steps:"],
        list: [
          "Check your VAT registration details and company address in ERPNext match ZATCA's records",
          "Install and configure a ZATCA app for your ERPNext version",
          "Generate a one-time code on the FATOORA portal and use it to register your ERPNext system",
          "Pass ZATCA's compliance checks with sample invoices, credit notes and debit notes",
          "Switch to production and issue real invoices",
        ],
      },
      {
        heading: "Arabic invoices and the details that matter",
        paragraphs: [
          "Tax invoices in Saudi Arabia must be in Arabic, and can also show another language. ERPNext's print formats can show Arabic and English side by side, with the seller and buyer VAT numbers, the VAT breakdown and the QR code where ZATCA expects them.",
          "Most problems at go-live come from data, not software: customers without VAT numbers or full addresses, items without the right tax template, or a company address that does not match ZATCA's records. Cleaning this data early saves time.",
        ],
      },
      {
        heading: "If you already use ERPNext",
        paragraphs: [
          "Check which ERPNext version you run, because ZATCA apps support specific versions. Older systems may need an upgrade first. Then test the full flow on a copy of your system, including returns and credit notes, before connecting production.",
          "Plan the switch well before your wave's deadline. Clearing invoices with ZATCA changes how your sales team works day to day, so train them before it goes live.",
        ],
      },
      {
        heading: "What about the rest of the Gulf?",
        paragraphs: [
          "The UAE has announced its own e-invoicing system, introduced in phases starting with larger businesses, and Oman has announced a programme of its own. The details differ from Saudi Arabia's, so check the rules in each country where you invoice. Rules and dates change, so confirm what applies to you with your tax adviser.",
        ],
      },
    ],
    cta: {
      heading: "Getting ready for FATOORA?",
      body: "We set up ERPNext with ZATCA e-invoicing, Arabic invoice formats and VAT, and test it before go-live, as a Frappe Partner.",
      label: "See ERPNext implementation",
    },
  },
  {
    slug: "erpnext-cost",
    date: "2026-11-08",
    service: "erp-implementation",
    category: "ERP",
    title: "How much does ERPNext cost? Licence, hosting and implementation",
    description:
      "ERPNext has no licence fee, so what do you pay for? Hosting, implementation, customisation and support explained, plus how to keep the cost under control.",
    intro:
      "ERPNext is open source, so there is no licence fee and no charge per user. That raises a fair question: what does an ERPNext system actually cost? The answer is the work and services around the software. This guide explains each part and what makes it bigger or smaller.",
    sections: [
      {
        heading: "The software: no licence fee",
        paragraphs: [
          "ERPNext is released under the GNU GPL licence. You can use it for any number of users and companies without paying a licence fee, and every module is included.",
          "This is the biggest difference from systems licensed per user, where the cost rises each time you add an employee. With ERPNext, adding users does not change what you pay for the software.",
        ],
      },
      {
        heading: "Hosting",
        paragraphs: [
          "ERPNext needs a server. You can rent one on Frappe Cloud, the hosting service from the company behind ERPNext, which handles updates and backups for a monthly fee, or run it on your own server or a cloud provider you choose.",
          "The size of the server depends on how many people use the system at once and how much data you have. A small company can start on a modest plan and move up as it grows.",
        ],
      },
      {
        heading: "Implementation: the main cost",
        paragraphs: [
          "Implementation is where most of the budget goes. It means setting ERPNext up around how your company works, and it usually includes:",
        ],
        list: [
          "Understanding your processes: sales, buying, stock, accounts and approvals",
          "Setting up your chart of accounts, taxes, warehouses and price lists",
          "Designing invoices and other documents in Arabic, English or both",
          "Moving your data from spreadsheets or your old system",
          "Training your team and supporting the first weeks of real use",
        ],
      },
      {
        heading: "What makes implementation bigger or smaller",
        paragraphs: ["The cost depends mostly on these:"],
        list: [
          "How many modules you start with, for example accounting and stock only, or also manufacturing, HR and payroll",
          "How many companies, branches and warehouses you run",
          "How much data you move, and how clean it is",
          "How far your processes differ from ERPNext's standard way of working",
          "Local requirements, such as ZATCA e-invoicing in Saudi Arabia",
        ],
      },
      {
        heading: "Customisation",
        paragraphs: [
          "Many changes are configuration: extra fields, approval steps, print formats and reports. These are quick and survive upgrades well.",
          "Custom apps, built for processes ERPNext does not cover, take more time to build and to maintain when ERPNext is upgraded. The closer you stay to the standard system, the lower the cost today and later.",
        ],
      },
      {
        heading: "Support and upgrades",
        paragraphs: [
          "After go-live you will want someone to answer questions, fix problems and make small changes. Most companies take a monthly support plan or a bank of support hours.",
          "ERPNext releases a new major version regularly. Upgrading keeps you on supported, secure software, and is easier when the system has few custom changes.",
        ],
      },
      {
        heading: "Costs people forget",
        paragraphs: [
          "Your own team's time is the hidden cost: someone has to clean data, answer questions about how you work, and test the system before go-live. Budget for running the old and new systems side by side for a short period, and for any hardware such as barcode scanners, label printers or point-of-sale equipment.",
        ],
      },
      {
        heading: "How to keep the cost under control",
        paragraphs: ["The companies that spend the least usually:"],
        list: [
          "Go live in stages, starting with accounting, buying, selling and stock",
          "Clean their data before migration, not during it",
          "Adapt to ERPNext's standard processes where they can",
          "Name one person on their side who can make decisions quickly",
        ],
      },
      {
        heading: "How to compare ERPNext quotes",
        paragraphs: [
          "Ask each partner for a written scope: the modules, the data to be moved, the documents to be designed, the training and the support after go-live. Ask whether hosting is included, who owns the system and the code, and how upgrades are handled. Compare scopes, not totals, as with any project.",
          "A typical ERPNext implementation takes 6 to 16 weeks depending on the modules. A quote far below the rest usually leaves something out.",
        ],
      },
    ],
    cta: {
      heading: "Want a clear ERPNext quote?",
      body: "Tell us how your company works. After a short call we send a written proposal with the scope, the price and the timeline.",
      label: "See ERPNext implementation",
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
    updated: "2026-11-08",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "ERPNext بالعربي: هل يناسب الشركات في ليبيا والخليج؟",
    description:
      "كيف يتعامل ERPNext مع العربية والضريبة والفوترة الإلكترونية والعملات المتعددة، وهل هو مجاني، ومتى يكون نظام ERP المناسب لشركتك في ليبيا والخليج.",
    intro:
      "ERPNext من أكثر أنظمة ERP مفتوحة المصدر استخدامًا في العالم. وبالنسبة للشركات في ليبيا والسعودية والإمارات وعُمان، تأتي الأسئلة العملية أولًا: هل يعمل فعلًا بالعربية؟ وكم يكلّف؟ وهل يلبّي قواعد الضريبة والفوترة الإلكترونية المحلية؟ يجيب هذا الدليل عنها بوضوح.",
    sections: [
      {
        heading: "ما هو ERPNext؟",
        paragraphs: [
          "ERPNext نظام تخطيط موارد مؤسسات (ERP) مفتوح المصدر، مبني على إطار Frappe. يغطي المحاسبة والمشتريات والمبيعات والمخزون والتصنيع والمشاريع والموارد البشرية والرواتب وإدارة علاقات العملاء وبوابة للعملاء، كلها في نظام واحد.",
          "ويعمل من متصفح الإنترنت على الحاسوب أو الهاتف، فلا حاجة إلى تثبيت برنامج على جهاز كل موظف.",
        ],
      },
      {
        heading: "هل ERPNext مجاني؟",
        paragraphs: [
          "البرنامج نفسه مجاني. يصدر ERPNext برخصة GNU GPL مفتوحة المصدر، فلا توجد رسوم ترخيص ولا رسوم لكل مستخدم، سواء كان لديك خمسة مستخدمين أو خمسمئة.",
          "أما ما تدفع مقابله فهو كل ما حوله: الاستضافة، وإعداده لشركتك، ونقل بياناتك، والتدريب، والدعم بعد التشغيل. وتعتمد هذه التكاليف على عدد الوحدات التي تستخدمها وحجم التخصيص المطلوب، لا على عدد المستخدمين.",
        ],
      },
      {
        heading: "العمل باللغة العربية",
        paragraphs: [
          "يأتي ERPNext مع ترجمة عربية، ويتحول إلى واجهة من اليمين إلى اليسار عندما يختار المستخدم العربية. ويستطيع كل مستخدم العمل بلغته، فيستخدم المحاسب العربية بينما يستخدم مدير أجنبي الإنجليزية في النظام نفسه.",
          "ويمكن إدخال أسماء العملاء والموردين والأصناف بالعربية والبحث عنها بالعربية. كما يمكن تصميم المستندات المطبوعة، مثل الفواتير وعروض الأسعار وإشعارات التسليم، بالعربية أو الإنجليزية أو باللغتين جنبًا إلى جنب، وهو أمر شائع لدى الشركات التي تتعامل مع عملاء محليين ودوليين.",
          "تغطي الترجمة الأساسية معظم الشاشات، لكن بعض المصطلحات مترجمة ترجمة حرفية. لذلك يراجع التطبيق الجيد الكلمات التي سيراها فريقك كل يوم، ويعدّلها إلى المصطلحات التي يستخدمها محاسبوك بالفعل.",
        ],
      },
      {
        heading: "الضرائب والعملات والمتطلبات المحلية",
        paragraphs: [
          "يدعم ERPNext العملات المتعددة مع أسعار الصرف، والشركات والفروع المتعددة، وقوالب ضريبية مرنة، فيمكن إعداد ضريبة القيمة المضافة كما هي في السعودية والإمارات وعُمان.",
          "ويمكن بناء دليل الحسابات وفق هيكل محاسبك، بالعربية أو الإنجليزية، بدل قالب ثابت. وتُعِدّ الشركات في ليبيا، حيث تختلف قواعد الضريبة والتقارير عن الخليج، حساباتها وضرائبها وتقاريرها بالطريقة نفسها.",
        ],
      },
      {
        heading: "الفوترة الإلكترونية في السعودية والخليج",
        paragraphs: [
          "تدير هيئة الزكاة والضريبة والجمارك في السعودية نظام الفوترة الإلكترونية «فاتورة». بدأت مرحلته الأولى في ديسمبر 2021 وتُلزم بإصدار الفواتير إلكترونيًا بصيغة معتمدة، أما المرحلة الثانية فتربط أنظمة الفوترة مباشرة بمنصة الهيئة، وتُطبَّق على المنشآت على دفعات.",
          "ويلبّي ERPNext هذه المتطلبات عبر تطبيقات مبنية له من مجتمع Frappe وشركائه، تضيف رمز الاستجابة السريعة (QR) وصيغ الفواتير المطلوبة والربط مع منصة الهيئة. وقد أعلنت الإمارات برنامجها الخاص للفوترة الإلكترونية على مراحل، وتسير دول خليجية أخرى في الاتجاه نفسه.",
          "تتغير القواعد والمواعيد، لذا تحقّق مع مستشارك الضريبي من المرحلة التي تنطبق على شركتك، وتأكد أن شريك التطبيق يُعدّها ويختبرها قبل التشغيل.",
        ],
      },
      {
        heading: "الاستضافة وأين تُحفظ بياناتك",
        paragraphs: [
          "يمكنك تشغيل ERPNext على Frappe Cloud، خدمة الاستضافة التابعة للشركة المطوّرة للنظام، أو على خادمك الخاص أو لدى مزوّد سحابي تختاره. وفي الحالتين تبقى البيانات ملكك ويمكن تصديرها في أي وقت.",
          "لبعض القطاعات في المنطقة قواعد تحدد مكان حفظ البيانات. إن كان قطاعك منها، فاختر استضافة في البلد الصحيح من البداية؛ فالنقل لاحقًا ممكن لكنه عمل إضافي.",
        ],
      },
      {
        heading: "ERPNext مقارنة بـ Odoo وSAP Business One",
        paragraphs: [
          "هذه هي الأنظمة التي تقارن بينها الشركات في المنطقة عادةً. تغطي الثلاثة المحاسبة والمخزون والمبيعات والمشتريات، وتعمل الثلاثة بالعربية. والفرق الأكبر في طريقة الترخيص:",
        ],
        list: [
          "ERPNext: مفتوح المصدر بالكامل، بلا رسوم ترخيص لكل مستخدم، وكل الوحدات متاحة.",
          "Odoo: نسخة مجتمعية مجانية، بينما توجد كثير من مزايا الأعمال في نسخة Enterprise المدفوعة باشتراك شهري لكل مستخدم.",
          "SAP Business One: ترخيص لكل مستخدم يُباع عبر شركاء SAP، مع رسوم صيانة سنوية.",
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
          "تتوقع زيادة المستخدمين مع نموها دون أن ترتفع التكلفة مع كل مستخدم",
          "تريد مجالًا لإضافة سير عمل وتقارير خاصة لاحقًا",
        ],
      },
      {
        heading: "متى قد يناسبك خيار آخر؟",
        paragraphs: [
          "إن كنت تحتاج فقط إلى فواتير ودفتر حسابات بسيط، فقد يكفيك برنامج محاسبة أساسي حاليًا. وإن كانت مجموعتك تعمل بنظام SAP أو Oracle في المقر الرئيسي، فغالبًا ما يكون اتباع النظام نفسه أسهل للفرع. والشريك الصادق يخبرك متى لا يكون ERPNext هو الحل المناسب.",
        ],
      },
      {
        heading: "الانتقال من الجداول أو من نظام آخر",
        paragraphs: [
          "يتضمن ERPNext أداة لاستيراد البيانات تُحمِّل العملاء والموردين والأصناف والأرصدة الافتتاحية والفواتير المفتوحة من ملفات Excel أو CSV. أما العمل الحقيقي فهو تنظيف البيانات أولًا: حذف المكرر، والاتفاق على رموز الأصناف، وتأكيد الأرصدة الافتتاحية مع محاسبك.",
          "تنتقل معظم الشركات في بداية سنة مالية أو شهر، وتشغّل النظامين القديم والجديد معًا لفترة قصيرة للتأكد من تطابق الأرقام.",
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
  {
    slug: "erpnext-zatca-e-invoicing",
    date: "2026-11-08",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "الفوترة الإلكترونية مع ERPNext: دليل الربط مع هيئة الزكاة (فاتورة)",
    description:
      "ما الذي تتطلبه الفوترة الإلكترونية «فاتورة» في المرحلتين الأولى والثانية، وكيف يلبّيها ERPNext، وخطوات تجهيز شركتك في السعودية قبل موعد الربط.",
    intro:
      "على كل منشأة مسجلة في ضريبة القيمة المضافة في السعودية إصدار فواتير إلكترونية وفق نظام «فاتورة» الذي تديره هيئة الزكاة والضريبة والجمارك. إن كنت تستخدم ERPNext أو تفكّر في الانتقال إليه، فهذا ما تتطلبه القواعد وكيف يلبّيها النظام.",
    sections: [
      {
        heading: "ما هو نظام «فاتورة»؟",
        paragraphs: [
          "«فاتورة» هو نظام الفوترة الإلكترونية في السعودية. يستبدل الفواتير الورقية والمكتوبة يدويًا بفواتير إلكترونية منظمة تستطيع الهيئة التحقق منها، للحد من الأخطاء والتهرب الضريبي.",
          "ينطبق على المكلّفين المقيمين في السعودية المسجلين في ضريبة القيمة المضافة، وعلى من يصدر الفواتير الضريبية نيابة عنهم، ويُطبَّق على مرحلتين.",
        ],
      },
      {
        heading: "المرحلة الأولى: مرحلة الإصدار",
        paragraphs: [
          "منذ 4 ديسمبر 2021 يجب إصدار الفواتير وحفظها عبر نظام إلكتروني متوافق. ولم يعد مسموحًا بالفواتير المكتوبة يدويًا ولا بتعديل الفاتورة بعد إصدارها.",
        ],
        list: [
          "تُنشأ كل فاتورة وتُحفظ إلكترونيًا",
          "تحمل الفاتورة الضريبية المبسطة، الصادرة للمستهلك، رمز الاستجابة السريعة (QR)",
          "لا يجوز حذف الفاتورة أو تعديلها بعد إصدارها، ويتم التصحيح بإشعارات دائنة ومدينة",
          "يحتفظ النظام بسجل يثبت أن الفواتير لم يُعبث بها",
        ],
      },
      {
        heading: "المرحلة الثانية: مرحلة الربط والتكامل",
        paragraphs: [
          "بدأت المرحلة الثانية في 1 يناير 2023، وتُطبَّق على دفعات. تحدد الهيئة كل دفعة بحسب الإيرادات، وتُبلغ المنشآت المشمولة قبل موعدها بستة أشهر على الأقل.",
          "في هذه المرحلة تصدر الفواتير بصيغة XML محددة مع ختم تشفيري، ويرتبط نظامك بمنصة الهيئة. فالفواتير الضريبية القياسية بين المنشآت يجب أن تعتمدها الهيئة قبل إرسالها إلى المشتري، أما الفواتير المبسطة للمستهلكين فتُبلَّغ بها الهيئة خلال 24 ساعة.",
        ],
      },
      {
        heading: "كيف يلبّي ERPNext هذه المتطلبات؟",
        paragraphs: [
          "لا يتضمن ERPNext الربط مع الهيئة في نسخته الأساسية، لكن تطبيقات مبنية له من مجتمع Frappe وشركائه تضيف ذلك. تُنشئ هذه التطبيقات الفواتير بالصيغة المطلوبة، وتضيف رمز QR والختم التشفيري، وترسل الفواتير إلى الهيئة للاعتماد أو الإبلاغ مباشرة من شاشة فاتورة المبيعات.",
          "ولأن ERPNext يقفل الفواتير بعد اعتمادها ويعالج المرتجعات بإشعارات دائنة، فهو يلبّي متطلبات المرحلة الأولى بمجرد إعداد ضريبة القيمة المضافة وشكل الفاتورة بشكل صحيح.",
        ],
      },
      {
        heading: "خطوات ربط ERPNext ببوابة «فاتورة»",
        paragraphs: ["تمر عملية الربط عادةً بهذه الخطوات:"],
        list: [
          "التأكد من أن بيانات التسجيل الضريبي وعنوان الشركة في ERPNext تطابق سجلات الهيئة",
          "تثبيت تطبيق الربط مع الهيئة المناسب لنسخة ERPNext لديك وإعداده",
          "إصدار رمز تحقق لمرة واحدة (OTP) من بوابة «فاتورة» واستخدامه لتسجيل نظامك",
          "اجتياز فحوصات التوافق لدى الهيئة بفواتير وإشعارات دائنة ومدينة تجريبية",
          "الانتقال إلى بيئة الإنتاج وإصدار الفواتير الفعلية",
        ],
      },
      {
        heading: "الفاتورة العربية والتفاصيل المهمة",
        paragraphs: [
          "يجب أن تكون الفواتير الضريبية في السعودية باللغة العربية، ويجوز أن تتضمن لغة أخرى. وتستطيع نماذج الطباعة في ERPNext عرض العربية والإنجليزية جنبًا إلى جنب، مع الرقم الضريبي للبائع والمشتري، وتفاصيل الضريبة، ورمز QR في مواضعها المطلوبة.",
          "معظم المشكلات عند التشغيل سببها البيانات لا البرنامج: عملاء بلا أرقام ضريبية أو عناوين كاملة، أو أصناف بلا قالب ضريبي صحيح، أو عنوان شركة لا يطابق سجلات الهيئة. وتنظيف هذه البيانات مبكرًا يوفّر وقتًا كبيرًا.",
        ],
      },
      {
        heading: "إن كنت تستخدم ERPNext حاليًا",
        paragraphs: [
          "تحقق من نسخة ERPNext التي تعمل بها، لأن تطبيقات الربط تدعم نسخًا محددة، وقد تحتاج الأنظمة القديمة إلى ترقية أولًا. ثم اختبر الدورة كاملة على نسخة من نظامك، بما فيها المرتجعات والإشعارات الدائنة، قبل ربط بيئة الإنتاج.",
          "خطّط للانتقال قبل موعد دفعتك بوقت كافٍ. فاعتماد الفواتير من الهيئة يغيّر طريقة عمل فريق المبيعات اليومية، لذا درّبهم قبل التشغيل.",
        ],
      },
      {
        heading: "وماذا عن بقية دول الخليج؟",
        paragraphs: [
          "أعلنت الإمارات نظامها الخاص للفوترة الإلكترونية، ويُطبَّق على مراحل تبدأ بالشركات الأكبر، كما أعلنت عُمان برنامجها الخاص. وتختلف التفاصيل عن السعودية، لذا راجع القواعد في كل بلد تصدر فيه فواتير. ولأن القواعد والمواعيد تتغير، تأكد مما ينطبق عليك مع مستشارك الضريبي.",
        ],
      },
    ],
    cta: {
      heading: "تستعد لنظام «فاتورة»؟",
      body: "نُعدّ ERPNext مع الربط مع هيئة الزكاة، ونماذج الفواتير العربية، وضريبة القيمة المضافة، ونختبرها قبل التشغيل، بصفتنا شريكًا لـ Frappe.",
      label: "تنفيذ نظام ERPNext",
    },
  },
  {
    slug: "erpnext-cost",
    date: "2026-11-08",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "كم تكلفة نظام ERPNext؟ الترخيص والاستضافة والتطبيق بالتفصيل",
    description:
      "ERPNext بلا رسوم ترخيص، فعلى ماذا تدفع إذن؟ شرح لتكلفة الاستضافة والتطبيق والتخصيص والدعم، وكيف تبقي الميزانية تحت السيطرة.",
    intro:
      "ERPNext مفتوح المصدر، فلا رسوم ترخيص ولا رسوم لكل مستخدم. وهذا يطرح سؤالًا منطقيًا: كم يكلّف نظام ERPNext فعلًا؟ الجواب أن التكلفة في العمل والخدمات المحيطة بالبرنامج. يشرح هذا الدليل كل جزء منها، وما الذي يرفعها أو يخفضها.",
    sections: [
      {
        heading: "البرنامج نفسه: بلا رسوم ترخيص",
        paragraphs: [
          "يصدر ERPNext برخصة GNU GPL مفتوحة المصدر. يمكنك استخدامه لأي عدد من المستخدمين والشركات دون رسوم ترخيص، وكل الوحدات متاحة.",
          "وهذا أكبر فرق عن الأنظمة المرخّصة لكل مستخدم، حيث ترتفع التكلفة مع كل موظف تضيفه. أما مع ERPNext فإضافة المستخدمين لا تغيّر ما تدفعه مقابل البرنامج.",
        ],
      },
      {
        heading: "الاستضافة",
        paragraphs: [
          "يحتاج ERPNext إلى خادم. يمكنك استئجاره على Frappe Cloud، خدمة الاستضافة التابعة للشركة المطوّرة للنظام، التي تتولى التحديثات والنسخ الاحتياطية مقابل رسوم شهرية، أو تشغيله على خادمك الخاص أو لدى مزوّد سحابي تختاره.",
          "يعتمد حجم الخادم على عدد من يستخدمون النظام في الوقت نفسه وحجم بياناتك. ويمكن للشركة الصغيرة أن تبدأ بخطة متواضعة وترتقي مع نموها.",
        ],
      },
      {
        heading: "التطبيق: الجزء الأكبر من التكلفة",
        paragraphs: ["يذهب معظم الميزانية إلى التطبيق، أي إعداد ERPNext وفق طريقة عمل شركتك، ويشمل عادةً:"],
        list: [
          "فهم إجراءاتك: المبيعات والمشتريات والمخزون والحسابات والموافقات",
          "إعداد دليل الحسابات والضرائب والمستودعات وقوائم الأسعار",
          "تصميم الفواتير والمستندات بالعربية أو الإنجليزية أو كليهما",
          "نقل بياناتك من الجداول أو من نظامك القديم",
          "تدريب فريقك ومرافقته في الأسابيع الأولى من الاستخدام الفعلي",
        ],
      },
      {
        heading: "ما الذي يرفع تكلفة التطبيق أو يخفضها؟",
        paragraphs: ["تعتمد التكلفة أساسًا على:"],
        list: [
          "عدد الوحدات التي تبدأ بها، مثل الحسابات والمخزون فقط، أو أيضًا التصنيع والموارد البشرية والرواتب",
          "عدد الشركات والفروع والمستودعات",
          "حجم البيانات التي تنقلها ومدى نظافتها",
          "مدى اختلاف إجراءاتك عن طريقة العمل القياسية في ERPNext",
          "المتطلبات المحلية، مثل الربط مع هيئة الزكاة في السعودية",
        ],
      },
      {
        heading: "التخصيص",
        paragraphs: [
          "كثير من التعديلات مجرد إعدادات: حقول إضافية، وخطوات موافقة، ونماذج طباعة، وتقارير. وهي سريعة ولا تتأثر كثيرًا بالترقيات.",
          "أما التطبيقات الخاصة، المبنية لإجراءات لا يغطيها ERPNext، فتحتاج وقتًا أطول للبناء وللصيانة عند ترقية النظام. وكلما بقيت قريبًا من النظام القياسي انخفضت التكلفة اليوم ولاحقًا.",
        ],
      },
      {
        heading: "الدعم والترقيات",
        paragraphs: [
          "بعد التشغيل ستحتاج إلى من يجيب عن الأسئلة ويحل المشكلات وينفّذ التعديلات الصغيرة. وتختار معظم الشركات خطة دعم شهرية أو رصيدًا من ساعات الدعم.",
          "يُصدر ERPNext نسخة رئيسية جديدة بانتظام. والترقية تبقيك على نظام مدعوم وآمن، وتكون أسهل كلما قلّت التعديلات الخاصة.",
        ],
      },
      {
        heading: "تكاليف يغفل عنها الكثيرون",
        paragraphs: [
          "وقت فريقك هو التكلفة الخفية: لا بد أن ينظّف أحدهم البيانات، ويجيب عن أسئلة طريقة العمل، ويختبر النظام قبل التشغيل. وخصّص ميزانية لتشغيل النظامين القديم والجديد معًا لفترة قصيرة، ولأي أجهزة مثل قارئات الباركود وطابعات الملصقات وأجهزة نقاط البيع.",
        ],
      },
      {
        heading: "كيف تبقي التكلفة تحت السيطرة؟",
        paragraphs: ["الشركات الأقل إنفاقًا عادةً:"],
        list: [
          "تُشغّل النظام على مراحل، بدءًا بالحسابات والمشتريات والمبيعات والمخزون",
          "تنظّف بياناتها قبل النقل لا أثناءه",
          "تتكيّف مع الإجراءات القياسية في ERPNext حيثما أمكن",
          "تسمّي شخصًا واحدًا من طرفها قادرًا على اتخاذ القرار بسرعة",
        ],
      },
      {
        heading: "كيف تقارن عروض أسعار ERPNext؟",
        paragraphs: [
          "اطلب من كل شريك نطاق عمل مكتوبًا: الوحدات، والبيانات المنقولة، والمستندات المصممة، والتدريب، والدعم بعد التشغيل. واسأل هل الاستضافة مشمولة، ومن يملك النظام والشيفرة، وكيف تتم الترقيات. وقارن النطاقات لا المجاميع، كما في أي مشروع.",
          "يستغرق تطبيق ERPNext عادةً من 6 إلى 16 أسبوعًا بحسب الوحدات. والعرض الأقل بكثير من غيره غالبًا ما يُسقط شيئًا من النطاق.",
        ],
      },
    ],
    cta: {
      heading: "تريد عرض سعر واضحًا لـ ERPNext؟",
      body: "أخبرنا كيف تعمل شركتك. وبعد مكالمة قصيرة نرسل عرضًا مكتوبًا بالنطاق والسعر والمدة.",
      label: "تنفيذ نظام ERPNext",
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

/** The guides that lead to a service page, for its "related guides" block. */
export function getArticlesForService(locale: Locale, service: string): Article[] {
  return BY_LOCALE[locale].filter((article) => article.service === service);
}

export const ARTICLE_SLUGS = EN.map((a) => a.slug);
