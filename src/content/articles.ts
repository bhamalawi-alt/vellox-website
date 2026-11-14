// Insights articles, written for what people in Libya and the Gulf search
// for. Each article exists in both languages under the same slug; the Arabic
// is written for Arabic readers, not translated line by line. Articles only
// state general, checkable facts and what the rest of the site already says:
// no client claims, and never the studio's own prices. The website cost guide
// and ERPNext cost guides carry published market ranges, dated and labelled as
// such. ERPNext work itself is priced per business after scoping, and the
// table's note says so.

import type { Locale } from "../lib/i18n";
import erpnextVsOdoo from "./guides/erpnext-vs-odoo.json";
import omanEInvoicing from "./guides/erpnext-oman-e-invoicing.json";
import uaeEInvoicing from "./guides/erpnext-uae-e-invoicing.json";

/**
 * Paragraphs and list items may link to another page of the site by writing
 * [the linked words](/insights/slug) or [words](/services/slug). The path is
 * the locale-less one; the page adds /ar when it renders Arabic. A source
 * outside the site is linked the same way with its full https:// address.
 */
export type ArticleTable = { head: string[]; rows: string[][]; note?: string };

export type ArticleSection = { heading: string; paragraphs: string[]; list?: string[]; table?: ArticleTable };

export const ARTICLE_LINK = /\[([^\]]+)\]\(((?:\/|https:\/\/)[^)\s]+)\)/g;

/** Every path a guide links to from inside its text. */
export function articleLinks(article: Article): string[] {
  const texts = article.sections.flatMap((s) => [...s.paragraphs, ...(s.list ?? [])]);
  return texts.flatMap((text) => [...text.matchAll(ARTICLE_LINK)].map((m) => m[2]));
}

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
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "ERP",
    title: "What is an ERP system? A plain guide for growing companies",
    description:
      "What an ERP system does, the signs your company needs one, what it replaces, and how to choose and roll one out without stopping the business.",
    intro:
      "An ERP (Enterprise Resource Planning) system is one piece of software, built on one shared database, that runs a company's core operations: accounting, purchasing, stock, sales and often manufacturing, projects and HR. Every department works from the same figures, so an order entered once updates stock, invoices and the accounts without retyping. This guide explains the main modules, how ERP differs from accounting software, the signs your company is ready for one, and how to choose and roll one out.",
    sections: [
      {
        heading: "What ERP means",
        paragraphs: [
          "ERP stands for Enterprise Resource Planning. In practice it is one system, with one database, that runs the core of a business: accounting, purchasing, stock, sales, and often manufacturing, projects and HR.",
          "The point is not the features. It is that every department works from the same numbers. When a salesperson confirms an order, the stock is reserved, the invoice is ready and the accounts update, without anyone retyping anything.",
        ],
      },
      {
        heading: "The main ERP modules, one by one",
        paragraphs: [
          "An ERP is set up as modules, one for each part of the business. You switch on the ones you need and add others later. The names vary between products, but the list is much the same everywhere; [ERPNext's own module list](https://frappe.io/erpnext) is a typical example. Most companies start with accounting, purchasing, sales and stock.",
        ],
        list: [
          "Accounting: the general ledger, receivables and payables, taxes and financial statements. Every other module posts into it.",
          "Purchasing: purchase requests, supplier quotations, purchase orders and supplier invoices, with a record of who approved each step.",
          "Sales: quotations, sales orders, price lists and customer invoices.",
          "Stock: warehouses and every movement in and out of them, with a quantity and a value for each item.",
          "Manufacturing: bills of materials, work orders and production planning, for companies that make or assemble what they sell.",
          "CRM: leads and opportunities, before they become customers.",
          "Projects: tasks, time and costs for work that is delivered as projects.",
          "HR and payroll: employee records, attendance, leave and salaries.",
          "Point of sale: a till screen for shops that updates stock and accounts as it sells.",
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
        heading: "ERP compared with accounting software",
        paragraphs: [
          "Accounting software records what has already happened: invoices, payments, expenses and the ledgers behind them. It answers the accountant's questions well. It does not usually run the operations that produce those numbers, so stock, purchasing and sales orders live somewhere else and reach the accounts later, by hand or by import.",
          "An ERP includes accounting and also runs the operations. The delivery that leaves the warehouse and the invoice that follows it are documents in the same system, so the ledger is updated as the work happens, not at month end.",
          "The practical test is simple. If the only people who need the system are in the finance team, accounting software is enough. If sales, the warehouse and purchasing all need to see and change the same data, you are describing an ERP.",
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
        heading: "One order, followed through the system",
        paragraphs: [
          "The easiest way to see what an ERP does is to follow one sale from start to finish. The steps below are the [standard order-to-cash flow in ERPNext](https://docs.frappe.io/erpnext/user/manual/en/sales-order); other ERPs follow the same pattern under different names.",
          "Each document is created from the one before it, so nothing is typed twice, and a manager can open any order and see whether it has been delivered, invoiced and paid.",
        ],
        list: [
          "Quotation: the salesperson prices the items from the price list and sends the quotation to the customer.",
          "Sales order: when the customer accepts, the quotation becomes a sales order. The warehouse and the accountant now see the same commitment, and stock can be reserved for it.",
          "Purchasing: if an item is short, a purchase order to the supplier can be raised from the sales order itself.",
          "Delivery note: when the goods leave, the storekeeper submits a delivery note and the stock figure drops at that moment.",
          "Sales invoice: the invoice is created from the delivery, so quantities and prices cannot drift apart. Submitting it records the receivable, the income and the tax in the ledger.",
          "Payment: when the customer pays, the payment is recorded against the invoice and the balance clears.",
        ],
      },
      {
        heading: "Cloud or on your own server, open source or licensed",
        paragraphs: [
          "Modern ERPs run either in the cloud or on a server you control. Cloud is faster to start and needs no IT team; your own server gives you full control over your data and where it is stored.",
          "Licensed systems charge per user, every year. [Open-source systems such as ERPNext](/insights/erpnext-in-arabic) have [no licence fee](https://frappe.io/erpnext) for the software itself, so [the cost goes into setting it up properly](/insights/erpnext-cost) around your processes, hosting and support.",
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
        heading: "Why ERP projects fail, and how to avoid it",
        paragraphs: [
          "ERP projects rarely fail because of the software. They fail for reasons that are visible before the project starts:",
          "If you are weighing a project now, the [ERPNext cost guide](/insights/erpnext-cost) shows how these same choices move the budget, and the [ERP implementation page](/services/erp-implementation) describes how a rollout is planned.",
        ],
        list: [
          "No owner on the company's side. Decisions wait for weeks. Name one person with the authority to decide how a process will work.",
          "Copying the old system. Rebuilding every spreadsheet habit inside the ERP makes it expensive and hard to upgrade. Start from the standard process and change only what truly differs.",
          "Dirty data. Duplicate customers, items without codes and unchecked opening balances produce reports nobody trusts. Clean the data before it is migrated.",
          "Everything at once. Going live with every module on the same day overwhelms the team. Go live in stages.",
          "Training left to the end. People return to spreadsheets when the system feels unfamiliar. Train each team on its own real transactions and keep support close in the first weeks.",
          "No agreed scope. Without a written list of what is included, the budget and the timeline both drift.",
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
      body: "We implement ERPNext around how your business already works, in Arabic, English or both.",
      label: "See ERP consulting and implementation",
    },
  },
  {
    slug: "how-much-does-a-website-cost",
    date: PUBLISHED,
    updated: "2026-11-15",
    service: "web-development",
    category: "Web",
    title: "How much does a website cost? What actually drives the price",
    description:
      "Why website quotes range so widely, the six things that decide the price, the costs people forget, and how to compare offers fairly before you sign.",
    intro:
      "A custom company website in Arabic and English that your team can edit costs roughly 8,000–25,000 SAR in Saudi Arabia and 6,000–18,000 AED in the UAE, going by ranges published in each market in November 2026. A template site costs less and a custom online store costs more. The exact price depends on scope: pages, design, languages, features and content. This guide explains what drives the price, shows the market ranges for Libya, Saudi Arabia and the UAE, and helps you compare offers on equal terms.",
    sections: [
      {
        heading: "Why quotes vary so much",
        paragraphs: [
          "A website can be a template with your logo on it, or a custom design with its own content structure, two languages, a content management system and search optimisation built in. Both are called a website. The difference is the amount of thinking, design and engineering behind it.",
          "Before comparing prices, compare what is included. A low quote that leaves out content, Arabic, or the ability to edit the site yourself often ends up costing more.",
        ],
      },
      {
        heading: "Template or custom: what you give up",
        paragraphs: [
          "A template is a ready-made design that a studio fills with your logo, colours and text. It is the cheapest and quickest route, and for a new business that only needs to be found and contacted it can be enough.",
          "What you give up is fit. The layout was drawn for a generic company, so your content has to bend to it. The same template may be in use on many other sites. Arabic is often added afterwards rather than designed in, which shows in the typography and in layouts that are simply mirrored. Templates also tend to carry code for features you never use, which can slow the pages down.",
          "A [custom website](/services/web-development) starts from your content and your customers instead. The structure, the design and the Arabic and English versions are planned together, and the site can grow without being rebuilt. You pay for that in design and engineering time, which is why custom work sits well above templates in the ranges below.",
          "A fair rule: choose a template when the website is a business card, and custom work when the website has to sell, explain something complicated, or carry a brand you have invested in.",
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
          "Features: [online payments](/services/ecommerce), bookings, member areas or integrations with other systems",
          "Content: who writes the copy and who provides the photos",
        ],
      },
      {
        heading: "Typical market ranges in Libya, Saudi Arabia and the UAE",
        paragraphs: [
          "These are ranges published by agencies and platforms in each country, collected in November 2026. They are market figures, not our price list: your quote depends on the six things above.",
        ],
        table: {
          head: ["What you are buying", "Libya (LYD)", "Saudi Arabia (SAR)", "UAE (AED)"],
          rows: [
            ["Template website", "900–1,500", "2,000–7,000", "1,000–4,500"],
            ["Custom company website, Arabic and English, editable", "1,300–4,000 and up", "8,000–25,000", "6,000–18,000"],
            ["Online store on Shopify, Salla or Zid", "1,700–3,500 and up", "7,000–25,000", "3,000–15,000"],
            ["Custom online store", "Quoted per project", "20,000–60,000", "18,000–50,000"],
            ["Maintenance, per month", "From about 400", "From about 2,000", "300–3,000"],
          ],
          note: "Libya has few published price lists, so its ranges rest on a small number of local agencies. UAE figures exclude 5% VAT.",
        },
      },
      {
        heading: "What an online store adds",
        paragraphs: [
          "A store is a website plus a business system. Most stores in the region are built on a hosted platform rather than from scratch. [Shopify](https://www.shopify.com/) is an international platform. [Salla](https://salla.com/) and [Zid](https://zid.sa/) are Saudi platforms made for Arabic-speaking merchants, with payment and shipping services built in. Each has its own plans and fees, which you pay to the platform separately from the studio that sets up and designs your store, so check the platform's current pricing page before you compare quotes.",
          "A platform store costs less to build because checkout, hosting and security come ready-made. A [custom online store](/services/ecommerce) makes sense when the platform cannot do what your business needs: unusual pricing, a link to your accounting or stock system, or a buying experience the themes do not allow.",
          "Whichever route you take, somebody still has to set up the parts that take money and move goods. Product data is the one most often underestimated: if you have hundreds of products, agree who enters them and in what format before the price is fixed. The full list:",
        ],
        list: [
          "Payments: a payment provider has to approve your business before you can accept cards, and it will usually ask for company documents, so start early",
          "Shipping: delivery companies, zones, rates and what the customer is told at each step",
          "Product data: names, descriptions, prices, options and photos for every product, in both languages",
          "Tax, invoices and the legal pages: returns, privacy and terms",
          "Stock and orders: who updates quantities, and who handles an order once it arrives",
        ],
      },
      {
        heading: "If you need a brand identity too",
        paragraphs: ["Many new websites start with a logo or a brand identity. These are the published ranges for that work in the Gulf:"],
        table: {
          head: ["What you are buying", "Libya", "Saudi Arabia (SAR)", "UAE (AED)"],
          rows: [
            ["Logo only", "Quoted per project", "750–12,000", "1,000–15,000"],
            ["Full brand identity with guidelines", "Quoted per project", "3,500–18,000", "8,500–40,000"],
          ],
          note: "Libyan studios do not publish identity prices. The ranges are for studio-level work; large agencies charge more. Collected November 2026.",
        },
      },
      {
        heading: "Costs people forget",
        paragraphs: [
          "The build is not the only cost. Budget for the domain name, hosting, a business email address, any paid plugins or services, and ongoing maintenance: security updates, small changes and fixes over time.",
          "Ask whether hosting and maintenance are included, for how long, and what they cost afterwards.",
        ],
      },
      {
        heading: "How payment and timelines usually work",
        paragraphs: [
          "Website projects are normally paid in stages rather than all at once. A common pattern is a deposit when you sign, one or more payments tied to milestones such as design approval, and a final payment at launch. Staged payment protects both sides: the studio is not working unpaid, and you are not paying in full for something you have not seen.",
          "Ask for each payment to be tied to something you can check, not to a date. Ask too what happens if the project pauses because content is late, and whether the quote stays valid if it does.",
          "How long the work takes follows the scope. A template site is the quickest. A custom bilingual site takes longer because design and content go through review rounds, and a custom store takes longest. In practice the calendar is set less by the building than by the waiting: for feedback, for text and photos, for the payment provider's approval. A studio that gives you a timeline should also tell you what it needs from you, and by when.",
        ],
      },
      {
        heading: "How to compare quotes fairly",
        paragraphs: [
          "Send every studio the same brief: your goals, the pages you need, the languages, and examples of sites you like. Then compare the proposals line by line, not by the total.",
          "A good proposal lists the deliverables, the timeline, how many design revisions are included, [who owns the site at the end, and what happens after launch](/insights/how-to-choose-a-web-design-company).",
        ],
      },
      {
        heading: "Warning signs in a very cheap quote",
        paragraphs: [
          "A low price is not a problem in itself. Some studios are simply efficient, and a small site should not cost much. What matters is what the quote leaves unsaid.",
          "Where something is missing, ask, because any gap can have an innocent explanation. A supplier who answers in writing and adds the missing lines to the quote is usually fine. One who avoids the question has shown you how the project will go. The signs to look for:",
        ],
        list: [
          "No written scope: a single line and a total, with no list of pages or deliverables",
          "Arabic described as translation, with no mention of right-to-left design",
          "The domain or hosting registered in the supplier's name instead of yours",
          "No content management system, or one you must pay to have changed",
          "Full payment asked for before any work is shown",
          "Nothing about what happens after launch: updates, backups and fixes",
          "A top position on Google promised as part of the price",
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
      {
        heading: "How to lower the cost without lowering quality",
        paragraphs: [
          "The price follows the amount of work, so the honest way to pay less is to remove work, not to squeeze the supplier.",
          "What not to cut: Arabic done properly, speed on phones, and your ability to edit the site. Saving on these is what makes a cheap site expensive, because each one is costly to fix after launch.",
          "These steps cut the cost without harming the result:",
        ],
        list: [
          "Write a clear brief before you ask for quotes: goals, pages, languages and sites you like. A vague brief gets a padded price",
          "Have your content ready. Final text and good photos save rounds of redesign",
          "Launch with the pages you need now and add the rest later, on a site built to grow",
          "Settle your [brand identity](/services/brand-identity) first, so the designer is not inventing colours and typography as part of the website",
          "Name one person on your side to give feedback, and collect comments into one list per round",
          "Use a platform's standard features where they do the job, and pay for custom work only where it earns its cost",
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
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "ERP",
    title: "ERPNext in Arabic: is it right for companies in Libya and the Gulf?",
    description:
      "How ERPNext handles Arabic, right-to-left screens, VAT, e-invoicing and multiple currencies, and when it is the right ERP for companies in Libya and the Gulf.",
    intro:
      "ERPNext works fully in Arabic: it ships with an Arabic translation and a right-to-left layout, lets each user choose Arabic or English, and prints invoices in either language or both. It has no licence fee, handles VAT and several currencies, and meets Saudi e-invoicing rules through add-on apps, so it fits many growing companies in Libya and the Gulf. This guide covers how the Arabic works in practice, regional settings, e-invoicing, hosting, and when another system suits you better.",
    sections: [
      {
        heading: "What ERPNext is",
        paragraphs: [
          "ERPNext is an [open-source ERP](/insights/what-is-an-erp-system) built on the Frappe framework. It covers accounting, buying, selling, stock, manufacturing, projects, HR and payroll, CRM and a customer portal, all in one system.",
          "It runs in a web browser, on a computer or a phone, so there is nothing to install on each employee's machine.",
        ],
      },
      {
        heading: "Is ERPNext free?",
        paragraphs: [
          "The software is free. ERPNext is released under the [GNU GPL licence](https://www.gnu.org/licenses/gpl-3.0.html), so there is no licence fee and no charge per user for the software itself, whether you have five users or five hundred.",
          "[What you pay for is everything around it](/insights/erpnext-cost): hosting, setting it up for your company, moving your data, training, and support after go-live. Those costs depend on how many modules you use and how much needs to be customised, not on your number of users.",
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
        heading: "How to switch a user to Arabic, and what changes",
        paragraphs: [
          "Language is set in two places. The site default is in System Settings, and each user has a language on their own user record. To [switch one user to Arabic](https://docs.frappe.io/erpnext/set-language), open that user, choose Arabic as the language, save, and ask the user to sign out and back in. Only that user's screens change; the site default stays as it was.",
          "After the switch, menus, field labels, buttons and messages appear in Arabic and the layout runs from right to left. What your team typed does not change: customer names, item descriptions and notes stay in the language they were entered in. Where a translation is missing, ERPNext shows the original text, usually English. This is most noticeable in custom fields and newly released features.",
          "Date and number formats are not part of the language setting. They come from System Settings, so check them separately.",
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
        heading: "Dates, the Hijri calendar and regional settings",
        paragraphs: [
          "[System Settings](https://docs.frappe.io/erpnext/user/manual/en/system-settings) holds the regional choices for the whole site: country, time zone, date format, number format, currency precision and the first day of the week. Set the time zone before you enter transactions, because it decides the timestamps on every document. The first day of the week can be changed to match your working week.",
          "ERPNext's standard settings do not list a Hijri calendar option, so dates are entered and shown in the Gregorian calendar. Companies that need Hijri dates on screen add an app. The Frappe Cloud marketplace lists a free, community-built [Islamic Calendar app](https://frappecloud.com/marketplace/apps/islamic_calendar) that adds a Hijri date picker and converts between the two calendars. Its listing names ERPNext version 15, so check it against your own version before relying on it.",
        ],
      },
      {
        heading: "E-invoicing in Saudi Arabia and the Gulf",
        paragraphs: [
          "[Saudi Arabia's e-invoicing system, FATOORA](/insights/erpnext-zatca-e-invoicing), is run by the [Zakat, Tax and Customs Authority (ZATCA)](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/Roll-out-phases.aspx). Its first phase, from December 2021, requires invoices to be issued electronically in an approved format. Its second phase connects invoicing systems directly to ZATCA's platform and is being applied to businesses in waves.",
          "ERPNext meets these rules through apps built for it by the Frappe community and partners, which add the required QR codes, invoice formats and the connection to ZATCA. The UAE has announced its own e-invoicing programme, introduced in phases, and other Gulf countries are moving in the same direction.",
          "Rules and deadlines change, so check with your tax adviser which phase applies to your company, and make sure your implementation partner sets it up and tests it before go-live.",
        ],
      },
      {
        heading: "Arabic and bilingual print formats in practice",
        paragraphs: [
          "Every document type in ERPNext starts with a default layout called Standard. A [print format](https://docs.frappe.io/erpnext/user/manual/en/print-format) replaces it with your own design, made in the Print Format Builder or written as a custom template when you need full control. The company name, logo and address sit in a separate letter head, and a company can keep different letter heads for different offices.",
          "Switching a user to Arabic does not translate printed documents on its own; printed documents need their own Arabic print formats and letter heads. For a bilingual invoice, the format carries each label in both languages, so one page serves a local customer and a foreign one.",
          "ERPNext can also print a document in the customer's language. Set a language on the customer record and the print preview uses it, and the user can still pick another language in the print view. [Custom translations](https://docs.frappe.io/erpnext/user/manual/en/custom-translations) let you fix individual words, for example an item description, so the printed Arabic matches the terms your customers expect.",
          "Before go-live, print real documents, not samples: a long Arabic item name, an invoice that runs to a second page, and one that mixes Arabic and English text. These are the cases where alignment goes wrong.",
        ],
      },
      {
        heading: "Hosting and where your data lives",
        paragraphs: [
          "You can run ERPNext on [Frappe Cloud](https://frappe.io/cloud/pricing), the hosting service from the company behind ERPNext, or on your own server or a cloud provider you choose. Either way, the data belongs to you and can be exported at any time.",
          "Some sectors in the region have rules about where data must be stored. If yours does, choose a host in the right country from the start; moving later is possible but it is extra work.",
        ],
      },
      {
        heading: "What Frappe and the community publish for the region",
        paragraphs: [
          "Much of what a company in the region needs is published in the open, by Frappe and by the community around it:",
          "Community apps are maintained by their publishers and support specific ERPNext versions. Check when an app was last updated, and test it on a copy of your system before you depend on it. For Saudi invoicing in detail, see the [ZATCA e-invoicing guide](/insights/erpnext-zatca-e-invoicing).",
        ],
        list: [
          "Translations: the translations are [contributed by the community](https://docs.frappe.io/erpnext/user/manual/en/translations) and reviewed before they are added, and anyone can suggest a correction from inside the system.",
          "Saudi e-invoicing: the Frappe Cloud marketplace lists ZATCA apps, among them [KSA Compliance](https://frappecloud.com/marketplace/apps/ksa_compliance), a free and open-source app for phase one and phase two. Its listing names ERPNext versions 15 and 16.",
          "A country page: Frappe keeps a [page for Saudi Arabia](https://frappe.io/erpnext/saudiarabia) that lists apps built for the Kingdom, including e-invoicing and Zakat calculation.",
          "Hosting: Frappe Cloud lets you choose the cloud provider and the region your site runs in.",
        ],
      },
      {
        heading: "ERPNext compared with Odoo and SAP Business One",
        paragraphs: [
          "These are the systems companies in the region most often compare. All three cover accounting, stock, sales and purchasing, and all three can work in Arabic. [The biggest difference is how they are licensed](/insights/erpnext-vs-odoo).",
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
      body: "We implement and customise ERPNext, in Arabic, English or both, around the way your company already works.",
      label: "See ERP consulting and implementation",
    },
  },
  {
    slug: "how-to-choose-a-web-design-company",
    date: PUBLISHED,
    updated: "2026-11-15",
    service: "web-development",
    category: "Web",
    title: "How to choose a web design company: 8 questions to ask before you sign",
    description:
      "Eight questions that separate a reliable web design company from a risky one: portfolio, Arabic, ownership, editing, search, timeline and support.",
    intro:
      "Choose a web design company on evidence, not on portfolio screenshots. Open its live sites on your phone, check the Arabic version, see the content system working, confirm in writing that you will own the domain, the design and the code, and ask what support costs after launch. A company that answers these plainly is usually a safe choice. The eight questions below, and the checks that go with them, tell you most of what you need to know.",
    sections: [
      {
        heading: "1. Can you show work similar to ours?",
        paragraphs: [
          "Ask for projects in your sector or of similar size and complexity, and open the live sites on your phone. Check that they load quickly and are [easy to use](/services/user-experience-design), not just that the screenshots look good.",
        ],
      },
      {
        heading: "Freelancer, studio or large agency?",
        paragraphs: [
          "These are three ways of buying the same thing, and each suits a different project.",
          "A freelancer is usually the cheapest and the most direct: you talk to the person doing the work. The risk is that one person rarely covers design, development, Arabic content and search equally well, and if they fall ill or take on a bigger job, your project waits. A freelancer suits a small site with a clear brief.",
          "A studio is a small team, typically with a designer, a developer and someone managing the project. You pay more than for a freelancer, and you get more than one set of skills and somebody to cover when a person is away. Most company websites and online stores fit here.",
          "A large agency adds strategy, campaigns and account managers. That is worth paying for when the website is one part of a bigger launch. For an ordinary company site you may be paying for overhead, and the people who pitch are not always the people who build.",
          "Whichever you choose, ask who exactly will work on your project, and whether any of it is passed to subcontractors.",
        ],
      },
      {
        heading: "2. How do you handle Arabic and English?",
        paragraphs: [
          "[A bilingual site](/services/web-development) needs proper right-to-left layouts, Arabic typography and separate pages for each language so both can rank on Google. Ask to see an Arabic site they built, and check the Arabic version on a phone.",
        ],
      },
      {
        heading: "How to test a live site on your phone",
        paragraphs: [
          "Five minutes on a phone tells you more than a presentation. Pick two or three sites from the portfolio, make sure they are really live on the client's own domain, and open them on mobile data rather than office wifi.",
          "Two further checks cost little. Run one of the addresses through Google's free PageSpeed Insights tool: you do not need to understand every line of the report, only to see whether the company's own work passes. And if you can, ask for a client you can call. One short conversation about deadlines and support is worth more than any case study.",
          "On the phone itself, look at:",
        ],
        list: [
          "Speed: does the first screen appear quickly, and can you scroll and tap straight away?",
          "Stability: does the page jump while it loads, moving the button you were about to press?",
          "Arabic: switch language. Does the whole layout turn right to left, including menus, arrows and forms, or only the text?",
          "Typography: is the Arabic set in a proper Arabic typeface at a readable size?",
          "Navigation: can you find the services and the contact details in two taps?",
          "Forms: do the contact form and the WhatsApp link actually work?",
          "Upkeep: does the site look maintained, or has it been left untouched since launch?",
        ],
      },
      {
        heading: "3. Who owns the website and the domain?",
        paragraphs: [
          "The domain should be registered in your company's name, and you should own the design, the code and the content at the end of the project. Get this in writing.",
        ],
      },
      {
        heading: "What a good brief and contract contain",
        paragraphs: [
          "The brief is what you give the company; the contract is what you both sign. Problems in a project usually trace back to something neither document said.",
          "A useful brief is short. It states what the business does and who its customers are, what the website must achieve, the pages and features you expect, the languages, examples of sites you like and dislike, your deadline and your budget range. Giving a budget does not weaken your position. It lets the company propose what fits instead of guessing.",
          "If [brand identity](/services/brand-identity) work or an [online store](/services/ecommerce) is part of the project, each should appear in the contract as its own line, not be hidden inside the total.",
          "Beyond that, the contract or written proposal should cover:",
        ],
        list: [
          "Scope: the pages, features and languages, listed",
          "Deliverables, and the number of design revision rounds included",
          "Timeline, with what the company needs from you at each stage",
          "Payment stages and what each one is tied to; see [what a website costs and how payment usually works](/insights/how-much-does-a-website-cost)",
          "Ownership of the domain, design, code and content",
          "How work outside the scope is priced and approved",
          "Handover: the logins, files and training you receive at launch",
          "Support after launch: what is included, for how long, and what it costs afterwards",
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
          "At minimum: unique page titles and descriptions, a sitemap, fast loading, mobile-friendly pages and connecting the site to Google Search Console. Be careful with anyone who guarantees first place on Google: [nobody can promise that](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).",
        ],
      },
      {
        heading: "Questions about speed, accessibility and handover",
        paragraphs: [
          "Speed can be measured, so ask for numbers. Google uses three measurements called the [Core Web Vitals](https://web.dev/articles/vitals). Largest Contentful Paint (LCP) is how long the main content takes to appear; good is within 2.5 seconds. Interaction to Next Paint (INP) is how quickly the page reacts when you tap; good is 200 milliseconds or less. Cumulative Layout Shift (CLS) is how much the layout moves while loading; good is 0.1 or less. Ask whether the company's recent sites meet these on mobile, and whether it will check yours before launch.",
          "Accessibility means the site works for people who use a screen reader, a keyboard instead of a mouse, or enlarged text. The international standard is the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) from the W3C, which has three levels: A, AA and AAA. Ask which level the company builds to and how it tests. A sensible answer mentions colour contrast, text alternatives for images, labelled forms and keyboard navigation.",
          "Last, ask what you will hold on launch day. You should receive administrator access to the website, the domain and hosting accounts, the analytics and Search Console properties, the design files, and a training session for the people who will edit the site.",
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
          "Ask about hosting, security updates, backups and how quickly they respond to problems, and [what that costs](/insights/how-much-does-a-website-cost) per month or per year.",
        ],
      },
      {
        heading: "8. How will we communicate?",
        paragraphs: [
          "Find out who your contact is, how often you will get updates, and in which language. A studio that answers clearly before you sign usually communicates well during the project.",
        ],
      },
      {
        heading: "Warning signs before you sign",
        paragraphs: [
          "Most companies are honest, and most bad projects come from poor fit rather than bad faith. Still, some signs are worth taking seriously.",
          "None of the signs below proves a company is bad. Two or three together are a reason to keep looking:",
        ],
        list: [
          "A guaranteed first place on Google, or guaranteed sales",
          "A portfolio of screenshots with no live addresses",
          "Vague answers about who owns the domain and the code",
          "A price given before anyone has asked what you need",
          "Pressure to sign today to keep a discount",
          "No written proposal, or one with no list of deliverables",
          "No Arabic site to show, when Arabic matters to your customers",
          "Slow or unclear replies while they are still trying to win the work",
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
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "ERP",
    title: "ERPNext and ZATCA e-invoicing: a guide for companies in Saudi Arabia",
    description:
      "What Saudi e-invoicing (FATOORA) requires in phase one and phase two, how ERPNext meets it, and the steps to get your company ready before your deadline.",
    intro:
      "ERPNext can meet Saudi Arabia's e-invoicing rules, known as FATOORA and set by the Zakat, Tax and Customs Authority (ZATCA). Its core already locks issued invoices and corrects them with credit notes, as phase one requires. For phase two, an add-on app produces the XML invoice, QR code and cryptographic stamp and connects ERPNext to ZATCA's platform. This guide explains both phases, the technical pieces in plain words, the published wave dates, and how to test before go-live.",
    sections: [
      {
        heading: "What FATOORA is",
        paragraphs: [
          "FATOORA is [Saudi Arabia's e-invoicing system](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/What-is-e-invoicing.aspx). It replaces paper and handwritten invoices with structured electronic invoices that ZATCA can verify, to reduce errors and tax evasion.",
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
          "The second phase, the integration phase, started on 1 January 2023 and is [applied in waves](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/Roll-out-phases.aspx). ZATCA selects each wave by revenue and notifies the businesses in it at least six months before their date.",
          "In this phase invoices are produced in a set XML format with a cryptographic stamp, and your system connects to ZATCA's platform. Standard tax invoices, between businesses, must be cleared by ZATCA before they are sent to the buyer. Simplified invoices, to consumers, are reported to ZATCA within 24 hours.",
        ],
      },
      {
        heading: "The latest waves as ZATCA published them",
        paragraphs: [
          "ZATCA does not bring every business into phase two on one date. It sets the criteria for each wave by revenue subject to VAT, and the two most recent waves reach much smaller businesses than before.",
          "[Wave 24](https://zatca.gov.sa/en/Pages/news-1426.aspx), announced on 26 September 2025, covers taxpayers whose revenue subject to VAT exceeded SAR 375,000 in 2022, 2023 or 2024. They had to integrate their systems with the FATOORA platform by no later than 30 June 2026.",
          "[Wave 25](https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx), announced on 24 July 2026, covers taxpayers whose revenue subject to VAT exceeded SAR 187,500 in 2022, 2023, 2024 or 2025. Their date is no later than 1 February 2027.",
          "If your revenue is above either figure and you are not yet connected, start now. If it is below both, phase one still applies to you today, and ZATCA says it will inform later waves at least six months before their date. The notice ZATCA sends to your company is what counts, so confirm your position with the authority or your tax adviser.",
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
        heading: "The phase-two technical pieces in plain words",
        paragraphs: [
          "The ZATCA app does this work for you, but it helps to know the terms your implementer and the error messages will use. They come from ZATCA's [detailed technical guideline](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-invoicing-Detailed-Technical-Guideline.pdf).",
        ],
        list: [
          "XML invoice: the invoice itself is a structured XML file that follows the UBL 2.1 standard. A standard tax invoice reaches the buyer as that XML, or as a PDF/A-3 file with the XML embedded in it.",
          "UUID and invoice counter: each invoice carries a unique identifier and a counter that goes up with every document and cannot be reset.",
          "Invoice hash: a hash is a fixed-size fingerprint of the invoice, calculated with SHA-256, that shows the file has not been altered. Each invoice also stores the hash of the invoice before it, so the invoices form a chain with no gaps.",
          "Cryptographic stamp: an electronic stamp that proves who issued the invoice and that its content has not changed.",
          "CSID: the Cryptographic Stamp Identifier, a certificate that identifies your invoicing system to ZATCA. During onboarding the system receives a compliance CSID, passes the compliance checks, and then receives a production CSID. It has an expiry date and must be renewed before then.",
          "QR code: a set of fields encoded as Tag-Length-Value (TLV) and then as Base64. It holds the seller's name, VAT number, date and time, the total with VAT and the VAT amount, and in phase two the invoice hash and signature data as well.",
          "Clearance: for standard tax invoices between businesses. The XML goes to ZATCA first. ZATCA validates it, adds its stamp and QR code, and returns it. Only then does it go to the buyer.",
          "Reporting: for simplified invoices to consumers. Your system stamps the invoice and adds the QR code itself, the customer receives it at once, and the XML is sent to ZATCA within 24 hours.",
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
        heading: "A test checklist before go-live",
        paragraphs: [
          "ZATCA publishes a [developer portal](https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/Pages/default.aspx) with an integration sandbox and a validation toolkit, so onboarding and invoice submission can be rehearsed without touching real records. Run these checks on a copy of your ERPNext system first:",
        ],
        list: [
          "Onboarding completes: the one-time code is used within its one-hour validity and the system receives its production CSID",
          "Every branch or device that issues invoices is onboarded, not only head office",
          "A standard tax invoice to a VAT-registered customer is cleared and comes back with ZATCA's stamp and QR code",
          "A simplified invoice is stamped, prints with a QR code that scans, and is reported",
          "A credit note and a debit note each refer to their original invoice and are accepted",
          "Invoices with a discount, with zero-rated or exempt items, and with an advance payment all pass",
          "A deliberately wrong invoice is rejected, and your team knows how to correct it and submit again",
          "An invoice created while the connection is down is kept and submitted once the connection returns",
          "Responses marked as accepted with warnings are reviewed, not ignored",
          "The printed invoice shows the Arabic text, the VAT numbers and the QR code",
        ],
      },
      {
        heading: "Arabic invoices and the details that matter",
        paragraphs: [
          "Tax invoices in Saudi Arabia [must be in Arabic](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-Invoicing_Detailed__Guideline.pdf), and can also show another language. ERPNext's print formats can show [Arabic and English side by side](/insights/erpnext-in-arabic), with the seller and buyer VAT numbers, the VAT breakdown and the QR code where ZATCA expects them.",
          "Most problems at go-live come from data, not software: customers without VAT numbers or full addresses, items without the right tax template, or a company address that does not match ZATCA's records. Cleaning this data early saves time.",
        ],
      },
      {
        heading: "Common reasons ZATCA rejects an invoice",
        paragraphs: [
          "ZATCA answers every submission in one of three ways: accepted, accepted with warnings, or rejected. Its [detailed e-invoicing guideline](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-Invoicing_Detailed__Guideline.pdf) explains that a rejected document has at least one fatal error. The examples it gives include:",
          "Warnings are a separate category. A missing building number in an address, or a business customer without an additional ID, is accepted with a warning. ZATCA says warnings should be corrected for the next invoice, may become rejections in future, and can lead to a closer look at taxpayers who keep producing them.",
          "A rejected invoice is not cancelled or edited in place. You correct the error and submit it as a new document with its own counter value and hash. In ERPNext that usually means fixing the customer, item or tax data first, which is why clean master data matters more than anything else on this list.",
        ],
        list: [
          "Mandatory fields missing, such as the invoice issue date or the invoice type",
          "VAT values filled in wrongly, for example a rate that is not a plain number between 0 and 100 with at most two decimals",
          "An issue date later than the current date",
          "A quantity on an invoice line that is not above zero",
          "An invalid certificate, which returns an authorisation error instead of a validation result",
        ],
      },
      {
        heading: "If you already use ERPNext",
        paragraphs: [
          "Check which ERPNext version you run, because ZATCA apps support specific versions. Older systems [may need an upgrade first](/insights/erpnext-cost). Then test the full flow on a copy of your system, including returns and credit notes, before connecting production.",
          "Plan the switch well before your wave's deadline. Clearing invoices with ZATCA changes how your sales team works day to day, so train them before it goes live.",
        ],
      },
      {
        heading: "What about the rest of the Gulf?",
        paragraphs: [
          "[The UAE has announced its own e-invoicing system](/insights/erpnext-uae-e-invoicing), introduced in phases starting with larger businesses, and [Oman has announced a programme of its own](/insights/erpnext-oman-e-invoicing). The details differ from Saudi Arabia's, so check the rules in each country where you invoice. Rules and dates change, so confirm what applies to you with your tax adviser.",
        ],
      },
    ],
    cta: {
      heading: "Getting ready for FATOORA?",
      body: "We set up ERPNext with ZATCA e-invoicing, Arabic invoice formats and VAT, and test it before go-live.",
      label: "See ERP consulting and implementation",
    },
  },
  {
    slug: "erpnext-cost",
    date: "2026-11-08",
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "ERP",
    title: "How much does ERPNext cost? Licence, hosting and implementation",
    description:
      "ERPNext has no licence fee, so what do you pay for? Hosting, implementation, customisation and support explained, plus how to keep the cost under control.",
    intro:
      "ERPNext costs nothing to license: it is open source, with no fee per user. What you pay for is hosting, implementation, any customisation and ongoing support. Published market ranges put a small implementation at roughly USD 2,000 to 12,000 and a large or heavily customised one at USD 25,000 and up, with hosting from about USD 5 a month. This guide explains each part, what makes it bigger or smaller, how year one differs from later years, and how to budget for it.",
    sections: [
      {
        heading: "The software: no licence fee",
        paragraphs: [
          "ERPNext is released under the [GNU GPL licence](https://www.gnu.org/licenses/gpl-3.0.html). You can use it for any number of users and companies without paying a licence fee, and every module is included.",
          "This is the biggest difference from systems licensed per user, where the cost rises each time you add an employee. With ERPNext, adding users does not change what you pay for the software.",
        ],
      },
      {
        heading: "Hosting",
        paragraphs: [
          "ERPNext needs a server. You can rent one on [Frappe Cloud](https://frappe.io/cloud/pricing), the hosting service from the company behind ERPNext, which handles updates and backups for a monthly fee, or run it on your own server or a cloud provider you choose.",
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
          "Designing invoices and other documents [in Arabic, English or both](/insights/erpnext-in-arabic)",
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
          "Local requirements, such as [ZATCA e-invoicing in Saudi Arabia](/insights/erpnext-zatca-e-invoicing)",
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
        heading: "Year one compared with later years",
        paragraphs: [
          "An ERPNext budget has two shapes. Year one carries the one-off costs: implementation, data migration, document design, training, any hardware, and the e-invoicing setup if you invoice in Saudi Arabia. Hosting and support start in the same year but are small beside them.",
          "From year two the one-off costs are gone. What remains is hosting, a support plan or support hours, and upgrades. Because ERPNext has [no fee per user](https://frappe.io/erpnext), these do not rise when you add staff. Hosting rises only when the system needs a larger server.",
          "Upgrades are the later-year cost to plan for. Frappe says it plans to support two major versions of ERPNext at a time, which it puts at roughly 2.5 to 3 years of support for each version. Plan for a major upgrade inside that window, and expect it to cost more the more custom code you carry.",
          "This is the main contrast with systems licensed per user, where the yearly bill grows as the team grows.",
        ],
      },
      {
        heading: "Costs people forget",
        paragraphs: [
          "Your own team's time is the hidden cost: someone has to clean data, answer questions about how you work, and test the system before go-live. Budget for running the old and new systems side by side for a short period, and for any hardware such as barcode scanners, label printers or point-of-sale equipment.",
        ],
      },
      {
        heading: "Typical cost ranges",
        paragraphs: [
          "The figures below combine Frappe's published prices with ranges that ERPNext partners publish. Use them to size a budget, not as a quote.",
        ],
        table: {
          head: ["Cost", "USD", "SAR"],
          rows: [
            ["ERPNext licence", "0", "0"],
            ["Frappe Cloud shared hosting, per month", "From 5", "From about 19"],
            ["Frappe Cloud server, per month", "From 20–40", "From about 75–150"],
            ["Your own server (2 CPUs, 4 GB), per month", "Up to about 24", "Up to about 90"],
            ["Small implementation: accounts and stock, under 20 users", "2,000–12,000", "7,500–45,000"],
            ["Medium implementation: adds manufacturing or HR", "12,000–25,000", "45,000–94,000"],
            ["Large or heavily customised implementation", "25,000–75,000 and up", "94,000–281,000 and up"],
            ["Support plan, per month", "200–1,000", "750–3,750"],
            ["ZATCA e-invoicing", "Free community app; paid builds from about 800–1,000", "Paid builds from about 3,000–3,750"],
          ],
          note: "Hosting prices are Frappe's published entry prices. Implementation and support ranges are estimates published by ERPNext partners, not verified market data and not our price list: ERPNext work is priced for each business once its processes and timeline are scoped. Collected November 2026.",
        },
      },
      {
        heading: "A worked example: budgeting for a 15-user trading company",
        paragraphs: [
          "Take a trading company with 15 users, one company, two warehouses, and customers in Saudi Arabia. It wants accounting, buying, selling and stock, with bilingual invoices. No new prices are given here: each line below points to a row in the table above.",
          "To turn the lines into a budget, add the one-off lines for a year-one figure, then add twelve months of hosting and support for the running cost. What would move this company into the medium row is scope, not headcount: adding manufacturing, HR and payroll, or a second company.",
        ],
        list: [
          "Licence: nothing, for 15 users or for 50.",
          "Hosting: one of the three hosting rows. Start on a small plan and move up if the system slows.",
          "Implementation: the small implementation row, since the scope is accounts and stock for under 20 users. Where the company lands inside that range depends on how clean its data is and how many documents need designing.",
          "ZATCA e-invoicing: the last row. The community app is free; the setup, onboarding and testing are the work to budget for.",
          "Support: the support plan row, from the month of go-live.",
          "Hardware: barcode scanners or label printers for the two warehouses, bought separately.",
          "Your own time: someone on your side for the length of the project, to clean data, answer questions and test.",
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
        heading: "The cost of doing it badly",
        paragraphs: [
          "The cheapest quote is not always the cheapest project. The real overspend comes from work that has to be done twice, and it rarely appears on the first invoice:",
          "Each of these is avoided by decisions made before the project starts: a written scope, clean data, a staged go-live and one decision-maker. The [guide to what an ERP system is](/insights/what-is-an-erp-system) lists the common reasons projects fail, and the [ERP implementation page](/services/erp-implementation) shows how a project is scoped.",
        ],
        list: [
          "Rework: a chart of accounts or item structure set up in a hurry is expensive to change once thousands of transactions sit on it.",
          "Failed adoption: if the team is not trained, it goes back to spreadsheets, and the company pays for a system while still running on the old one.",
          "Bad opening data: wrong opening balances and duplicate records mean months of corrections and reports nobody trusts.",
          "Heavy customisation: code written to copy the old system has to be checked and often reworked at every major upgrade.",
          "Missed compliance: an e-invoicing setup that was never properly tested fails when real invoices are rejected, and invoicing stalls while it is fixed.",
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
      label: "See ERP consulting and implementation",
    },
  },
];

const AR: Article[] = [
  {
    slug: "what-is-an-erp-system",
    date: PUBLISHED,
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "ما هو نظام ERP؟ دليل مبسّط للشركات النامية",
    description:
      "ما هو نظام ERP، وما الذي يقوم به يوميًا، وما العلامات التي تقول إن شركتك تحتاجه، وكيف تختاره وتطبّقه من دون أن يتوقف العمل.",
    intro:
      "نظام ERP، أي تخطيط موارد المؤسسة، برنامج واحد بقاعدة بيانات مشتركة واحدة يدير العمليات الأساسية في الشركة: المحاسبة والمشتريات والمخزون والمبيعات، وغالبًا التصنيع والمشاريع والموارد البشرية. تعمل كل الأقسام على الأرقام نفسها، فالطلب الذي يُدخَل مرة واحدة يحدّث المخزون والفواتير والحسابات من دون إعادة كتابة. يشرح هذا الدليل الوحدات الرئيسية، والفرق بين ERP وبرنامج المحاسبة، وعلامات جاهزية شركتك، وكيف تختار النظام وتطبّقه.",
    sections: [
      {
        heading: "ما معنى ERP؟",
        paragraphs: [
          "ERP اختصار لعبارة Enterprise Resource Planning، أي تخطيط موارد المؤسسة. وهو عمليًا نظام واحد بقاعدة بيانات واحدة يدير قلب العمل: المحاسبة والمشتريات والمخزون والمبيعات، وغالبًا التصنيع والمشاريع والموارد البشرية.",
          "الفكرة ليست في عدد الخصائص، بل في أن كل الأقسام تعمل على الأرقام نفسها. عندما يؤكد موظف المبيعات طلبًا، يُحجز المخزون وتجهز الفاتورة وتتحدث الحسابات، من دون أن يعيد أحد كتابة شيء.",
        ],
      },
      {
        heading: "وحدات نظام ERP الرئيسية واحدة واحدة",
        paragraphs: [
          "يُعدّ نظام ERP على شكل وحدات، لكل جزء من العمل وحدة. تفعّل ما تحتاجه منها وتضيف غيرها لاحقًا. تختلف الأسماء من نظام إلى آخر، لكن القائمة متشابهة في كل الأنظمة، و[قائمة وحدات ERPNext](https://frappe.io/erpnext) مثال معتاد عليها. وتبدأ معظم الشركات بالمحاسبة والمشتريات والمبيعات والمخزون.",
        ],
        list: [
          "المحاسبة: دفتر الأستاذ العام، والذمم المدينة والدائنة، والضرائب، والقوائم المالية. وكل الوحدات الأخرى تُرحِّل قيودها إليها.",
          "المشتريات: طلبات الشراء، وعروض أسعار الموردين، وأوامر الشراء، وفواتير الموردين، مع سجل بمن وافق على كل خطوة.",
          "المبيعات: عروض الأسعار، وأوامر البيع، وقوائم الأسعار، وفواتير العملاء.",
          "المخزون: المستودعات وكل حركة دخول إليها وخروج منها، مع كمية وقيمة لكل صنف.",
          "التصنيع: قوائم المواد، وأوامر العمل، وتخطيط الإنتاج، للشركات التي تصنع أو تجمّع ما تبيعه.",
          "إدارة علاقات العملاء (CRM): العملاء المحتملون والفرص قبل أن يصبحوا عملاء.",
          "المشاريع: المهام والوقت والتكاليف للأعمال التي تُنفَّذ على شكل مشاريع.",
          "الموارد البشرية والرواتب: سجلات الموظفين، والحضور، والإجازات، والرواتب.",
          "نقاط البيع: شاشة بيع للمتاجر تحدّث المخزون والحسابات مع كل عملية بيع.",
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
        heading: "الفرق بين نظام ERP وبرنامج المحاسبة",
        paragraphs: [
          "برنامج المحاسبة يسجّل ما حدث فعلًا: الفواتير والمدفوعات والمصروفات والدفاتر التي وراءها. وهو يجيب عن أسئلة المحاسب جيدًا. لكنه لا يدير عادةً العمليات التي تُنتج هذه الأرقام، فيبقى المخزون والمشتريات وأوامر البيع في مكان آخر، وتصل إلى الحسابات لاحقًا يدويًا أو بالاستيراد.",
          "أما نظام ERP فيتضمن المحاسبة ويدير العمليات أيضًا. فإشعار التسليم الذي يخرج من المستودع والفاتورة التي تتبعه مستندان في النظام نفسه، فتتحدث الدفاتر مع سير العمل لا في نهاية الشهر.",
          "والاختبار العملي بسيط. إن كان من يحتاجون إلى النظام هم فريق المالية فقط، فبرنامج المحاسبة يكفي. وإن كانت المبيعات والمستودع والمشتريات تحتاج كلها إلى رؤية البيانات نفسها وتعديلها، فأنت تصف نظام ERP.",
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
        heading: "مثال: طلب واحد من بدايته إلى نهايته",
        paragraphs: [
          "أسهل طريقة لفهم ما يفعله نظام ERP هي تتبّع عملية بيع واحدة من بدايتها إلى نهايتها. الخطوات التالية هي [دورة البيع القياسية في ERPNext](https://docs.frappe.io/erpnext/user/manual/en/sales-order)، وتتبع الأنظمة الأخرى النمط نفسه بأسماء مختلفة.",
          "كل مستند يُنشأ من المستند الذي قبله، فلا يُكتب شيء مرتين، ويستطيع المدير أن يفتح أي طلب ويرى هل سُلِّم وفُوتر ودُفع.",
        ],
        list: [
          "عرض السعر: يسعّر موظف المبيعات الأصناف من قائمة الأسعار ويرسل العرض إلى العميل.",
          "أمر البيع: عندما يوافق العميل يتحول عرض السعر إلى أمر بيع. فيرى المستودع والمحاسب الالتزام نفسه، ويمكن حجز المخزون له.",
          "الشراء: إن كان أحد الأصناف ناقصًا، يمكن إصدار أمر شراء للمورد من أمر البيع نفسه.",
          "إشعار التسليم: عند خروج البضاعة يعتمد أمين المستودع إشعار التسليم، فينخفض رصيد المخزون في تلك اللحظة.",
          "فاتورة المبيعات: تُنشأ الفاتورة من إشعار التسليم، فلا تختلف الكميات والأسعار بينهما. وعند اعتمادها تُسجَّل الذمة المدينة والإيراد والضريبة في الدفاتر.",
          "الدفع: عندما يدفع العميل يُسجَّل المبلغ مقابل الفاتورة ويُسدَّد الرصيد.",
        ],
      },
      {
        heading: "سحابي أم على خادمك، مفتوح المصدر أم بترخيص؟",
        paragraphs: [
          "تعمل أنظمة ERP الحديثة إما على السحابة أو على خادم تتحكم فيه. السحابة أسرع في البدء ولا تحتاج فريق تقنية معلومات، والخادم الخاص يمنحك تحكمًا كاملًا في بياناتك ومكان حفظها.",
          "الأنظمة المرخّصة تفرض رسومًا لكل مستخدم كل سنة. أما [الأنظمة مفتوحة المصدر مثل ERPNext](/insights/erpnext-in-arabic) [فلا رسوم ترخيص](https://frappe.io/erpnext) فيها على البرنامج نفسه، [فتذهب التكلفة إلى إعداده جيدًا](/insights/erpnext-cost) وفق عملياتك، وإلى الاستضافة والدعم.",
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
        heading: "لماذا تفشل مشاريع ERP وكيف تتجنب ذلك؟",
        paragraphs: [
          "قلّما تفشل مشاريع ERP بسبب البرنامج. إنها تفشل لأسباب تظهر قبل أن يبدأ المشروع:",
          "وإن كنت تدرس مشروعًا الآن، فإن [دليل تكلفة ERPNext](/insights/erpnext-cost) يبيّن كيف تؤثر هذه الخيارات نفسها في الميزانية، و[صفحة تنفيذ نظام ERP](/services/erp-implementation) تشرح كيف يُخطَّط التطبيق.",
        ],
        list: [
          "لا مسؤول من طرف الشركة. فتنتظر القرارات أسابيع. سمِّ شخصًا واحدًا يملك صلاحية تحديد طريقة سير كل إجراء.",
          "نسخ النظام القديم. إعادة بناء كل عادات الجداول داخل النظام تجعله مكلفًا وصعب الترقية. ابدأ من الإجراء القياسي وغيّر فقط ما يختلف فعلًا.",
          "بيانات غير نظيفة. العملاء المكررون والأصناف بلا رموز والأرصدة الافتتاحية غير المراجَعة تُنتج تقارير لا يثق بها أحد. نظّف البيانات قبل نقلها.",
          "كل شيء دفعة واحدة. تشغيل كل الوحدات في يوم واحد يُرهق الفريق. شغّل النظام على مراحل.",
          "تأجيل التدريب إلى النهاية. يعود الناس إلى الجداول عندما يبدو النظام غريبًا عليهم. درّب كل فريق على معاملاته الحقيقية، وأبقِ الدعم قريبًا في الأسابيع الأولى.",
          "نطاق غير متفق عليه. من دون قائمة مكتوبة بما يشمله المشروع، تنحرف الميزانية والمدة معًا.",
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
      body: "نطبّق ERPNext وفق الطريقة التي يعمل بها عملك فعلًا، بالعربية أو الإنجليزية أو كليهما.",
      label: "استشارات وتنفيذ أنظمة ERP",
    },
  },
  {
    slug: "how-much-does-a-website-cost",
    date: PUBLISHED,
    updated: "2026-11-15",
    service: "web-development",
    category: "المواقع",
    title: "كم تكلفة تصميم موقع إلكتروني؟ ما الذي يحدد السعر فعلًا",
    description:
      "لماذا تختلف أسعار تصميم المواقع كثيرًا، والعوامل الست التي تحدد التكلفة، والتكاليف التي ينساها الناس، وكيف تقارن العروض بعدل.",
    intro:
      "تتراوح تكلفة موقع شركة بتصميم خاص، بالعربية والإنجليزية وقابل للتعديل، بين 8,000 و25,000 ريال في السعودية وبين 6,000 و18,000 درهم في الإمارات، بحسب نطاقات منشورة في السوقين جُمعت في نوفمبر 2026. الموقع بقالب جاهز أرخص، والمتجر الإلكتروني المخصص أغلى. والسعر الدقيق يعتمد على حجم العمل: الصفحات والتصميم واللغات والخصائص والمحتوى. يشرح هذا الدليل ما يحدد السعر، ويعرض نطاقات السوق في ليبيا والسعودية والإمارات، لتقارن العروض على أساس واحد.",
    sections: [
      {
        heading: "لماذا تختلف العروض إلى هذا الحد؟",
        paragraphs: [
          "قد يكون الموقع قالبًا جاهزًا عليه شعارك، وقد يكون تصميمًا خاصًا ببنية محتوى مدروسة ولغتين ولوحة تحكم وتحسين لمحركات البحث. كلاهما يسمى موقعًا، والفرق في حجم التفكير والتصميم والبرمجة وراءه.",
          "قبل مقارنة الأسعار، قارن ما يتضمنه كل عرض. العرض الرخيص الذي لا يشمل المحتوى أو النسخة العربية أو إمكانية تعديل الموقع بنفسك قد يكلّف أكثر في النهاية.",
        ],
      },
      {
        heading: "قالب جاهز أم تصميم خاص: ما الذي تتنازل عنه",
        paragraphs: [
          "القالب تصميم جاهز تملؤه الشركة بشعارك وألوانك ونصوصك. وهو الطريق الأرخص والأسرع، وقد يكفي نشاطًا جديدًا لا يحتاج إلا أن يجده الناس ويتواصلوا معه.",
          "ما تتنازل عنه هو الملاءمة. فالتصميم وُضع لشركة عامة، وعلى محتواك أن يتكيّف معه. وقد يكون القالب نفسه مستخدمًا في مواقع كثيرة أخرى. والعربية تُضاف إليه غالبًا بعد التصميم لا في أثنائه، ويظهر ذلك في الخطوط وفي صفحات عُكس اتجاهها فقط. وتحمل القوالب عادةً كودًا لخصائص لا تستخدمها، وقد يبطئ ذلك الصفحات.",
          "أما [الموقع بتصميم خاص](/services/web-development) فيبدأ من محتواك وعملائك. تُخطَّط البنية والتصميم والنسختان العربية والإنجليزية معًا، ويمكن أن ينمو الموقع من دون إعادة بنائه. وثمن ذلك وقت في التصميم والبرمجة، ولهذا يقع التصميم الخاص أعلى بوضوح من القوالب في النطاقات أدناه.",
          "قاعدة منصفة: اختر القالب إن كان الموقع بطاقة تعريف، والتصميم الخاص إن كان على الموقع أن يبيع، أو يشرح شيئًا معقدًا، أو يحمل علامة تجارية استثمرت فيها.",
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
          "الخصائص: [الدفع الإلكتروني](/services/ecommerce) أو الحجوزات أو مناطق الأعضاء أو الربط مع أنظمة أخرى",
          "المحتوى: من يكتب النصوص ومن يوفّر الصور",
        ],
      },
      {
        heading: "نطاقات الأسعار المعتادة في ليبيا والسعودية والإمارات",
        paragraphs: [
          "هذه نطاقات نشرتها وكالات ومنصات في كل بلد، وجُمعت في نوفمبر 2026. وهي أرقام السوق لا قائمة أسعارنا: عرضك يعتمد على العوامل الست أعلاه.",
        ],
        table: {
          head: ["ما الذي تشتريه", "ليبيا (دينار)", "السعودية (ريال)", "الإمارات (درهم)"],
          rows: [
            ["موقع بقالب جاهز", "900–1,500", "2,000–7,000", "1,000–4,500"],
            ["موقع شركة بتصميم خاص، عربي وإنجليزي، قابل للتعديل", "1,300–4,000 فأكثر", "8,000–25,000", "6,000–18,000"],
            ["متجر إلكتروني على Shopify أو سلة أو زد", "1,700–3,500 فأكثر", "7,000–25,000", "3,000–15,000"],
            ["متجر إلكتروني مخصص", "يُسعَّر بحسب المشروع", "20,000–60,000", "18,000–50,000"],
            ["الصيانة شهريًا", "من نحو 400", "من نحو 2,000", "300–3,000"],
          ],
          note: "قوائم الأسعار المنشورة في ليبيا قليلة، فنطاقاتها مبنية على عدد محدود من الوكالات المحلية. وأرقام الإمارات لا تشمل ضريبة القيمة المضافة (5%).",
        },
      },
      {
        heading: "ما الذي يضيفه المتجر الإلكتروني",
        paragraphs: [
          "المتجر موقع ومعه نظام عمل. تُبنى معظم المتاجر في المنطقة على منصة جاهزة لا من الصفر. [Shopify](https://www.shopify.com/) منصة عالمية. و[سلة](https://salla.com/) و[زد](https://zid.sa/) منصتان سعوديتان موجّهتان للتاجر العربي، وفيهما خدمات الدفع والشحن. ولكل منصة باقاتها ورسومها، تدفعها للمنصة نفسها لا للشركة التي تجهّز متجرك وتصممه، فراجع صفحة الأسعار الحالية للمنصة قبل مقارنة العروض.",
          "المتجر على منصة أقل تكلفة في البناء لأن صفحة الدفع والاستضافة والأمان تأتي جاهزة. أما [المتجر الإلكتروني المخصص](/services/ecommerce) فيناسبك حين لا تستطيع المنصة تلبية ما يحتاجه نشاطك: تسعير غير معتاد، أو ربط مع نظام المحاسبة أو المخزون، أو تجربة شراء لا تسمح بها القوالب.",
          "وأيًّا كان الطريق الذي تختاره، لا بد أن يجهّز أحد الأجزاء التي تستقبل المال وتحرّك البضاعة. وبيانات المنتجات هي الجزء الذي يُستهان به أكثر من غيره: فإن كانت لديك مئات المنتجات، فاتفقوا على من يُدخلها وبأي صيغة قبل تثبيت السعر. وهذه القائمة كاملة:",
        ],
        list: [
          "الدفع: يجب أن يوافق مزوّد خدمة الدفع على نشاطك قبل أن تقبل البطاقات، ويطلب عادةً مستندات الشركة، فابدأ مبكرًا",
          "الشحن: شركات التوصيل والمناطق والأسعار وما يُبلَّغ به العميل في كل خطوة",
          "بيانات المنتجات: الاسم والوصف والسعر والخيارات والصور لكل منتج، باللغتين",
          "الضريبة والفواتير والصفحات القانونية: الاسترجاع والخصوصية والشروط",
          "المخزون والطلبات: من يحدّث الكميات، ومن يتولى الطلب بعد وصوله",
        ],
      },
      {
        heading: "وإن احتجت هوية بصرية أيضًا",
        paragraphs: ["كثير من المواقع الجديدة تبدأ بشعار أو هوية بصرية. وهذه النطاقات المنشورة لها في الخليج:"],
        table: {
          head: ["ما الذي تشتريه", "ليبيا", "السعودية (ريال)", "الإمارات (درهم)"],
          rows: [
            ["شعار فقط", "يُسعَّر بحسب المشروع", "750–12,000", "1,000–15,000"],
            ["هوية بصرية كاملة مع دليل الاستخدام", "يُسعَّر بحسب المشروع", "3,500–18,000", "8,500–40,000"],
          ],
          note: "لا تنشر الاستوديوهات الليبية أسعار الهوية البصرية. والنطاقات لأعمال على مستوى الاستوديوهات، أما الوكالات الكبرى فتتقاضى أكثر. جُمعت في نوفمبر 2026.",
        },
      },
      {
        heading: "تكاليف ينساها الناس",
        paragraphs: [
          "البناء ليس التكلفة الوحيدة. ضع في الحساب اسم النطاق والاستضافة والبريد الإلكتروني الرسمي، وأي إضافات أو خدمات مدفوعة، والصيانة المستمرة: تحديثات الأمان والتعديلات الصغيرة والإصلاحات مع الوقت.",
          "اسأل هل الاستضافة والصيانة مشمولتان، ولأي مدة، وكم تكلفان بعد ذلك.",
        ],
      },
      {
        heading: "كيف يجري الدفع والجدول الزمني عادةً",
        paragraphs: [
          "تُدفع مشاريع المواقع عادةً على مراحل لا دفعة واحدة. والنمط الشائع: دفعة مقدمة عند التوقيع، ثم دفعة أو أكثر مرتبطة بمراحل مثل اعتماد التصميم، ثم دفعة أخيرة عند الإطلاق. والدفع على مراحل يحمي الطرفين: فلا تعمل الشركة بلا مقابل، ولا تدفع أنت المبلغ كاملًا لشيء لم تره.",
          "اطلب أن ترتبط كل دفعة بشيء تستطيع التحقق منه، لا بتاريخ. واسأل أيضًا ماذا يحدث إن توقف المشروع بسبب تأخر المحتوى، وهل يبقى العرض ساريًا حينها.",
          "ومدة العمل تتبع حجمه. الموقع بقالب جاهز هو الأسرع. والموقع ثنائي اللغة بتصميم خاص يأخذ وقتًا أطول لأن التصميم والمحتوى يمرّان بجولات مراجعة، والمتجر المخصص هو الأطول. وعمليًا لا يحدد المدة البناء بقدر ما يحددها الانتظار: انتظار الملاحظات، والنصوص والصور، وموافقة مزوّد خدمة الدفع. والشركة التي تعطيك جدولًا زمنيًا يجب أن تخبرك أيضًا بما تحتاجه منك، ومتى.",
        ],
      },
      {
        heading: "كيف تقارن العروض بعدل",
        paragraphs: [
          "أرسل إلى كل شركة الوصف نفسه: أهدافك، والصفحات التي تحتاجها، واللغات، وأمثلة لمواقع تعجبك. ثم قارن العروض بندًا بندًا، لا بالمبلغ الإجمالي.",
          "العرض الجيد يذكر المخرجات والجدول الزمني وعدد جولات تعديل التصميم [ومن يملك الموقع في النهاية وما الذي يحدث بعد الإطلاق](/insights/how-to-choose-a-web-design-company).",
        ],
      },
      {
        heading: "علامات تحذير في العرض الرخيص جدًا",
        paragraphs: [
          "السعر المنخفض ليس مشكلة في ذاته. فبعض الشركات تعمل بكفاءة، والموقع الصغير لا ينبغي أن يكلّف كثيرًا. المهم هو ما يسكت عنه العرض.",
          "وحين ينقص شيء فاسأل، فقد يكون لأي نقص تفسير بريء. المورّد الذي يجيب كتابةً ويضيف البنود الناقصة إلى العرض لا بأس به في الغالب. والذي يتهرّب من السؤال أراك كيف سيسير المشروع. والعلامات التي تبحث عنها:",
        ],
        list: [
          "لا نطاق عمل مكتوبًا: سطر واحد ومبلغ إجمالي، بلا قائمة بالصفحات أو المخرجات",
          "العربية مذكورة على أنها ترجمة، من دون أي ذكر للتصميم من اليمين إلى اليسار",
          "النطاق أو الاستضافة مسجّلان باسم المورّد لا باسمك",
          "لا نظام لإدارة المحتوى، أو نظام تدفع مقابل كل تعديل فيه",
          "طلب المبلغ كاملًا قبل عرض أي عمل",
          "لا شيء عمّا يحدث بعد الإطلاق: التحديثات والنسخ الاحتياطي والإصلاحات",
          "وعد بمركز متقدم في Google ضمن السعر",
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
      {
        heading: "كيف تخفّض التكلفة من دون أن تخفّض الجودة",
        paragraphs: [
          "السعر يتبع حجم العمل، فالطريقة النزيهة لتدفع أقل هي أن تقلّل العمل، لا أن تضغط على المورّد.",
          "وما لا يُختصر: العربية المنفّذة كما ينبغي، والسرعة على الهواتف، وقدرتك على تعديل الموقع. التوفير في هذه هو ما يجعل الموقع الرخيص غاليًا، لأن إصلاح كل واحدة منها بعد الإطلاق مكلف.",
          "هذه الخطوات تخفّض التكلفة من دون أن تضر بالنتيجة:",
        ],
        list: [
          "اكتب وصفًا واضحًا قبل طلب العروض: الأهداف والصفحات واللغات ومواقع تعجبك. فالوصف الغامض يقابله سعر مبالغ فيه",
          "جهّز محتواك. النصوص النهائية والصور الجيدة توفّر جولات من إعادة التصميم",
          "أطلق الموقع بالصفحات التي تحتاجها الآن وأضف الباقي لاحقًا، على موقع مبني لينمو",
          "احسم [هويتك البصرية](/services/brand-identity) أولًا، حتى لا يبتكر المصمم الألوان والخطوط ضمن مشروع الموقع",
          "حدّد شخصًا واحدًا من جهتك يقدّم الملاحظات، واجمعها في قائمة واحدة لكل جولة",
          "استخدم الخصائص الجاهزة في المنصة حيث تؤدي الغرض، وادفع مقابل العمل المخصص حيث يستحق تكلفته فقط",
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
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "ERPNext بالعربي: هل يناسب الشركات في ليبيا والخليج؟",
    description:
      "كيف يتعامل ERPNext مع العربية والضريبة والفوترة الإلكترونية والعملات المتعددة، وهل هو مجاني، ومتى يكون نظام ERP المناسب لشركتك في ليبيا والخليج.",
    intro:
      "يعمل ERPNext بالعربية بالكامل: يأتي مع ترجمة عربية وواجهة من اليمين إلى اليسار، ويختار كل مستخدم العربية أو الإنجليزية، ويطبع الفواتير بإحدى اللغتين أو بكلتيهما. وهو بلا رسوم ترخيص، ويدعم ضريبة القيمة المضافة والعملات المتعددة، ويلبّي قواعد الفوترة الإلكترونية السعودية عبر تطبيقات إضافية، مما يجعله خيارًا عمليًا لكثير من الشركات النامية في ليبيا والخليج. يتناول هذا الدليل طريقة عمل العربية فعليًا، والإعدادات الإقليمية، والفوترة الإلكترونية، والاستضافة، ومتى يناسبك نظام آخر.",
    sections: [
      {
        heading: "ما هو ERPNext؟",
        paragraphs: [
          "ERPNext [نظام تخطيط موارد مؤسسات (ERP)](/insights/what-is-an-erp-system) مفتوح المصدر، مبني على إطار Frappe. يغطي المحاسبة والمشتريات والمبيعات والمخزون والتصنيع والمشاريع والموارد البشرية والرواتب وإدارة علاقات العملاء وبوابة للعملاء، كلها في نظام واحد.",
          "ويعمل من متصفح الإنترنت على الحاسوب أو الهاتف، فلا حاجة إلى تثبيت برنامج على جهاز كل موظف.",
        ],
      },
      {
        heading: "هل ERPNext مجاني؟",
        paragraphs: [
          "البرنامج نفسه مجاني. يصدر ERPNext [برخصة GNU GPL](https://www.gnu.org/licenses/gpl-3.0.html) مفتوحة المصدر، فلا توجد رسوم ترخيص ولا رسوم لكل مستخدم، سواء كان لديك خمسة مستخدمين أو خمسمئة.",
          "أما [ما تدفع مقابله فهو كل ما حوله](/insights/erpnext-cost): الاستضافة، وإعداده لشركتك، ونقل بياناتك، والتدريب، والدعم بعد التشغيل. وتعتمد هذه التكاليف على عدد الوحدات التي تستخدمها وحجم التخصيص المطلوب، لا على عدد المستخدمين.",
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
        heading: "كيف تحوّل مستخدمًا إلى العربية وما الذي يتغير؟",
        paragraphs: [
          "تُضبط اللغة في مكانين: اللغة الافتراضية للنظام في «إعدادات النظام» (System Settings)، ولغة كل مستخدم في سجله الخاص. و[لتحويل مستخدم واحد إلى العربية](https://docs.frappe.io/erpnext/set-language)، افتح سجل المستخدم، واختر العربية لغةً له، واحفظ، ثم اطلب منه تسجيل الخروج والدخول من جديد. تتغير شاشات هذا المستخدم فقط، وتبقى اللغة الافتراضية للنظام كما هي.",
          "بعد التحويل تظهر القوائم وأسماء الحقول والأزرار والرسائل بالعربية، وتصبح الواجهة من اليمين إلى اليسار. أما ما كتبه فريقك فلا يتغير: أسماء العملاء وأوصاف الأصناف والملاحظات تبقى باللغة التي أُدخلت بها. وحيث لا توجد ترجمة يعرض ERPNext النص الأصلي، وهو بالإنجليزية غالبًا. ويظهر ذلك أكثر في الحقول المخصصة والمزايا الصادرة حديثًا.",
          "أما صيغ التاريخ والأرقام فليست جزءًا من إعداد اللغة، بل تأتي من إعدادات النظام، فراجعها على حدة.",
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
        heading: "التواريخ والتقويم الهجري والإعدادات الإقليمية",
        paragraphs: [
          "تضم [إعدادات النظام](https://docs.frappe.io/erpnext/user/manual/en/system-settings) الخيارات الإقليمية للنظام كله: البلد، والمنطقة الزمنية، وصيغة التاريخ، وصيغة الأرقام، ودقة العملة، وأول أيام الأسبوع. اضبط المنطقة الزمنية قبل إدخال المعاملات، لأنها تحدد التوقيت المسجَّل على كل مستند. ويمكن تغيير أول أيام الأسبوع ليطابق أسبوع العمل لديك.",
          "لا تتضمن الإعدادات القياسية في ERPNext خيارًا للتقويم الهجري، فتُدخَل التواريخ وتُعرض بالتقويم الميلادي. والشركات التي تحتاج إلى التاريخ الهجري على الشاشة تضيف تطبيقًا لذلك. ويعرض متجر تطبيقات Frappe Cloud تطبيقًا مجانيًا من المجتمع باسم [Islamic Calendar](https://frappecloud.com/marketplace/apps/islamic_calendar)، يضيف منتقي تاريخ هجريًا ويحوّل بين التقويمين. وتذكر صفحته النسخة 15 من ERPNext، فتحقق من توافقه مع نسختك قبل الاعتماد عليه.",
        ],
      },
      {
        heading: "الفوترة الإلكترونية في السعودية والخليج",
        paragraphs: [
          "تدير [هيئة الزكاة والضريبة والجمارك](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/Roll-out-phases.aspx) في السعودية [نظام الفوترة الإلكترونية «فاتورة»](/insights/erpnext-zatca-e-invoicing). بدأت مرحلته الأولى في ديسمبر 2021 وتُلزم بإصدار الفواتير إلكترونيًا بصيغة معتمدة، أما المرحلة الثانية فتربط أنظمة الفوترة مباشرة بمنصة الهيئة، وتُطبَّق على المنشآت على دفعات.",
          "ويلبّي ERPNext هذه المتطلبات عبر تطبيقات مبنية له من مجتمع Frappe وشركائه، تضيف رمز الاستجابة السريعة (QR) وصيغ الفواتير المطلوبة والربط مع منصة الهيئة. وقد أعلنت الإمارات برنامجها الخاص للفوترة الإلكترونية على مراحل، وتسير دول خليجية أخرى في الاتجاه نفسه.",
          "تتغير القواعد والمواعيد، لذا تحقّق مع مستشارك الضريبي من المرحلة التي تنطبق على شركتك، وتأكد أن شريك التطبيق يُعدّها ويختبرها قبل التشغيل.",
        ],
      },
      {
        heading: "نماذج الطباعة العربية والفواتير باللغتين عمليًا",
        paragraphs: [
          "يبدأ كل نوع من المستندات في ERPNext بتصميم افتراضي اسمه Standard. و[نموذج الطباعة](https://docs.frappe.io/erpnext/user/manual/en/print-format) يستبدل به تصميمك الخاص، ويُبنى في أداة Print Format Builder أو يُكتب قالبًا مخصصًا عندما تحتاج إلى تحكم كامل. أما اسم الشركة وشعارها وعنوانها فتوضع في ترويسة (Letter Head) منفصلة، ويمكن للشركة أن تحتفظ بترويسات مختلفة لمكاتبها المختلفة.",
          "تحويل المستخدم إلى العربية لا يترجم المستندات المطبوعة تلقائيًا، فالمستندات المطبوعة تحتاج إلى نماذج طباعة وترويسات عربية خاصة بها. وفي الفاتورة باللغتين يحمل النموذج كل عنوان بالعربية والإنجليزية معًا، فتخدم الصفحة الواحدة العميل المحلي والعميل الأجنبي.",
          "ويستطيع ERPNext أيضًا طباعة المستند بلغة العميل. حدّد لغة في سجل العميل فتستخدمها معاينة الطباعة، ويبقى للمستخدم أن يختار لغة أخرى من شاشة الطباعة. وتتيح [الترجمات المخصصة](https://docs.frappe.io/erpnext/user/manual/en/custom-translations) تصحيح كلمات بعينها، مثل وصف صنف، ليطابق النص العربي المطبوع المصطلحات التي يتوقعها عملاؤك.",
          "وقبل التشغيل اطبع مستندات حقيقية لا نماذج تجريبية: صنفًا باسم عربي طويل، وفاتورة تمتد إلى صفحة ثانية، وأخرى تجمع نصًا عربيًا وإنجليزيًا. ففي هذه الحالات تظهر مشكلات المحاذاة.",
        ],
      },
      {
        heading: "الاستضافة وأين تُحفظ بياناتك",
        paragraphs: [
          "يمكنك تشغيل ERPNext على [Frappe Cloud](https://frappe.io/cloud/pricing)، خدمة الاستضافة التابعة للشركة المطوّرة للنظام، أو على خادمك الخاص أو لدى مزوّد سحابي تختاره. وفي الحالتين تبقى البيانات ملكك ويمكن تصديرها في أي وقت.",
          "لبعض القطاعات في المنطقة قواعد تحدد مكان حفظ البيانات. إن كان قطاعك منها، فاختر استضافة في البلد الصحيح من البداية؛ فالنقل لاحقًا ممكن لكنه عمل إضافي.",
        ],
      },
      {
        heading: "ما الذي تنشره Frappe والمجتمع للمنطقة؟",
        paragraphs: [
          "كثير مما تحتاجه شركة في المنطقة منشور للجميع، من Frappe ومن المجتمع المحيط بها:",
          "تطبيقات المجتمع يصونها ناشروها وتدعم نسخًا محددة من ERPNext. تحقق من تاريخ آخر تحديث للتطبيق، واختبره على نسخة من نظامك قبل الاعتماد عليه. ولتفاصيل الفوترة في السعودية، راجع [دليل الربط مع هيئة الزكاة](/insights/erpnext-zatca-e-invoicing).",
        ],
        list: [
          "الترجمة: الترجمات [مساهمات من المجتمع](https://docs.frappe.io/erpnext/user/manual/en/translations) تُراجَع قبل إضافتها، ويستطيع أي مستخدم اقتراح تصحيح من داخل النظام.",
          "الفوترة الإلكترونية السعودية: يعرض متجر تطبيقات Frappe Cloud تطبيقات للربط مع الهيئة، منها [KSA Compliance](https://frappecloud.com/marketplace/apps/ksa_compliance)، وهو تطبيق مجاني مفتوح المصدر للمرحلتين الأولى والثانية. وتذكر صفحته النسختين 15 و16 من ERPNext.",
          "صفحة خاصة بالبلد: تنشر Frappe [صفحة للسعودية](https://frappe.io/erpnext/saudiarabia) تعرض تطبيقات مبنية للمملكة، منها الفوترة الإلكترونية وحساب الزكاة.",
          "الاستضافة: يتيح Frappe Cloud اختيار المزوّد السحابي والمنطقة التي يعمل فيها نظامك.",
        ],
      },
      {
        heading: "ERPNext مقارنة بـ Odoo وSAP Business One",
        paragraphs: [
          "هذه هي الأنظمة التي تقارن بينها الشركات في المنطقة عادةً. تغطي الثلاثة المحاسبة والمخزون والمبيعات والمشتريات، وتعمل الثلاثة بالعربية. [والفرق الأكبر في طريقة الترخيص](/insights/erpnext-vs-odoo):",
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
      body: "ننفّذ ERPNext ونخصّصه، بالعربية أو الإنجليزية أو كليهما، وفق الطريقة التي تعمل بها شركتك.",
      label: "استشارات وتنفيذ أنظمة ERP",
    },
  },
  {
    slug: "how-to-choose-a-web-design-company",
    date: PUBLISHED,
    updated: "2026-11-15",
    service: "web-development",
    category: "المواقع",
    title: "كيف تختار شركة تصميم مواقع: 8 أسئلة قبل التوقيع",
    description:
      "ثمانية أسئلة تكشف الفرق بين شركة تصميم مواقع موثوقة وأخرى محفوفة بالمخاطر: الأعمال السابقة والعربية والملكية والتعديل والبحث والدعم.",
    intro:
      "اختر شركة تصميم المواقع بالدليل لا بصور معرض الأعمال. افتح مواقعها الحقيقية على هاتفك، وافحص النسخة العربية، وشاهد نظام إدارة المحتوى وهو يعمل، وتأكد كتابةً أنك ستملك النطاق والتصميم والكود، واسأل كم يكلّف الدعم بعد الإطلاق. الشركة التي تجيب عن هذا بوضوح اختيار آمن في الغالب. الأسئلة الثمانية أدناه، والفحوص المرافقة لها، تخبرك بمعظم ما تحتاج إلى معرفته.",
    sections: [
      {
        heading: "1. هل يمكنكم عرض أعمال تشبه ما نحتاجه؟",
        paragraphs: [
          "اطلب مشاريع في قطاعك أو بحجم وتعقيد مشابهين، وافتح المواقع الحقيقية على هاتفك. تأكد أنها سريعة [وسهلة الاستخدام](/services/user-experience-design)، لا أن الصور جميلة فقط.",
        ],
      },
      {
        heading: "مستقل أم استوديو أم وكالة كبيرة؟",
        paragraphs: [
          "هذه ثلاث طرق لشراء الشيء نفسه، وكل واحدة تناسب مشروعًا مختلفًا.",
          "المستقل هو الأرخص عادةً والأقرب: تتحدث مع من ينفّذ العمل نفسه. والخطر أن شخصًا واحدًا يندر أن يتقن التصميم والبرمجة والمحتوى العربي ومحركات البحث بالمستوى نفسه، وإن مرض أو أخذ مشروعًا أكبر انتظر مشروعك. المستقل يناسب موقعًا صغيرًا بوصف واضح.",
          "الاستوديو فريق صغير، فيه عادةً مصمم ومبرمج ومن يدير المشروع. تدفع أكثر مما تدفع للمستقل، وتحصل على أكثر من مهارة وعلى من يغطي غياب أحدهم. ومعظم مواقع الشركات والمتاجر الإلكترونية تقع هنا.",
          "الوكالة الكبيرة تضيف الاستراتيجية والحملات ومديري الحسابات. ويستحق ذلك ثمنه حين يكون الموقع جزءًا من إطلاق أكبر. أما لموقع شركة عادي فقد تدفع مقابل مصاريف إدارية، ومن يعرضون عليك المشروع ليسوا دائمًا من ينفّذونه.",
          "وأيًّا كان اختيارك، اسأل من سيعمل على مشروعك بالتحديد، وهل يُسند جزء منه إلى طرف آخر.",
        ],
      },
      {
        heading: "2. كيف تتعاملون مع العربية والإنجليزية؟",
        paragraphs: [
          "[الموقع ثنائي اللغة](/services/web-development) يحتاج تصميمًا صحيحًا من اليمين إلى اليسار، وخطوطًا عربية جيدة، وصفحات مستقلة لكل لغة حتى تظهر النسختان في Google. اطلب رؤية موقع عربي نفّذوه، وافتح النسخة العربية على الهاتف.",
        ],
      },
      {
        heading: "كيف تختبر موقعًا حقيقيًا على هاتفك",
        paragraphs: [
          "خمس دقائق على الهاتف تخبرك بأكثر مما يخبرك به عرض تقديمي. اختر موقعين أو ثلاثة من معرض الأعمال، وتأكد أنها تعمل فعلًا على نطاق العميل نفسه، وافتحها على بيانات الجوال لا على شبكة المكتب.",
          "وهناك فحصان آخران لا يكلّفان شيئًا يُذكر. أدخل أحد العناوين في أداة PageSpeed Insights المجانية من Google: لا تحتاج إلى فهم كل سطر في التقرير، يكفي أن ترى هل ينجح عمل الشركة نفسها. وإن استطعت، فاطلب عميلًا تتصل به. محادثة قصيرة عن المواعيد والدعم أنفع من أي دراسة حالة.",
          "وعلى الهاتف نفسه، انظر إلى:",
        ],
        list: [
          "السرعة: هل تظهر الشاشة الأولى بسرعة، وهل تستطيع التمرير والضغط فورًا؟",
          "الثبات: هل تقفز الصفحة في أثناء التحميل فيتحرك الزر الذي كنت ستضغطه؟",
          "العربية: بدّل اللغة. هل ينقلب التصميم كله من اليمين إلى اليسار، بما فيه القوائم والأسهم والنماذج، أم النص فقط؟",
          "الخطوط: هل العربية مكتوبة بخط عربي جيد وبحجم مقروء؟",
          "التنقل: هل تصل إلى الخدمات وبيانات التواصل بضغطتين؟",
          "النماذج: هل يعمل نموذج التواصل ورابط واتساب فعلًا؟",
          "العناية: هل يبدو الموقع متابَعًا، أم تُرك على حاله منذ الإطلاق؟",
        ],
      },
      {
        heading: "3. من يملك الموقع والنطاق؟",
        paragraphs: [
          "يجب أن يُسجَّل اسم النطاق باسم شركتك، وأن تملك التصميم والكود والمحتوى في نهاية المشروع. واطلب ذلك مكتوبًا.",
        ],
      },
      {
        heading: "ما الذي يتضمنه الوصف الجيد والعقد الجيد",
        paragraphs: [
          "الوصف هو ما تقدّمه أنت للشركة، والعقد هو ما توقّعانه معًا. ومشكلات المشاريع تعود غالبًا إلى شيء لم يذكره أي منهما.",
          "الوصف المفيد قصير. يذكر ما يفعله نشاطك ومن عملاؤه، وما المطلوب من الموقع أن يحققه، والصفحات والخصائص التي تتوقعها، واللغات، وأمثلة لمواقع تعجبك وأخرى لا تعجبك، والموعد النهائي، ونطاق ميزانيتك. وذكر الميزانية لا يضعف موقفك، بل يتيح للشركة أن تقترح ما يناسبك بدل التخمين.",
          "وإن كان في المشروع عمل على [الهوية البصرية](/services/brand-identity) أو [متجر إلكتروني](/services/ecommerce)، فليظهر كل منهما في العقد بندًا مستقلًا لا مخفيًا داخل الإجمالي.",
          "وفوق ذلك، يجب أن يغطي العقد أو العرض المكتوب:",
        ],
        list: [
          "نطاق العمل: الصفحات والخصائص واللغات، في قائمة",
          "المخرجات، وعدد جولات تعديل التصميم المشمولة",
          "الجدول الزمني، وما تحتاجه الشركة منك في كل مرحلة",
          "مراحل الدفع وما ترتبط به كل دفعة؛ انظر [كم يكلّف الموقع وكيف يجري الدفع عادةً](/insights/how-much-does-a-website-cost)",
          "ملكية النطاق والتصميم والكود والمحتوى",
          "كيف يُسعَّر العمل الخارج عن النطاق وكيف يُعتمد",
          "التسليم: بيانات الدخول والملفات والتدريب التي تستلمها عند الإطلاق",
          "الدعم بعد الإطلاق: ما المشمول، ولأي مدة، وكم يكلّف بعد ذلك",
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
          "على الأقل: عنوان ووصف مختلفان لكل صفحة، وخريطة موقع، وتحميل سريع، وصفحات مناسبة للجوال، وربط الموقع بـ Google Search Console. واحذر ممن يضمن لك المركز الأول في Google، ف[لا أحد يستطيع ضمان ذلك](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).",
        ],
      },
      {
        heading: "أسئلة عن السرعة وسهولة الوصول والتسليم",
        paragraphs: [
          "السرعة تُقاس، فاطلب أرقامًا. تستخدم Google ثلاثة مقاييس تسمى [Core Web Vitals](https://web.dev/articles/vitals). الأول Largest Contentful Paint (LCP)، وهو الوقت الذي يستغرقه ظهور المحتوى الرئيسي، والجيد أن يكون خلال 2.5 ثانية. والثاني Interaction to Next Paint (INP)، وهو سرعة استجابة الصفحة عند الضغط، والجيد 200 ميلي ثانية أو أقل. والثالث Cumulative Layout Shift (CLS)، وهو مقدار تحرك عناصر الصفحة في أثناء التحميل، والجيد 0.1 أو أقل. اسأل هل تحقق مواقع الشركة الأخيرة هذه الأرقام على الجوال، وهل ستفحص موقعك قبل الإطلاق.",
          "وسهولة الوصول تعني أن يعمل الموقع لمن يستخدم قارئ الشاشة، أو لوحة المفاتيح بدل الفأرة، أو النص المكبَّر. والمعيار الدولي هو [إرشادات الوصول إلى محتوى الويب (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) الصادرة عن W3C، وله ثلاثة مستويات: A وAA وAAA. اسأل أي مستوى تلتزم به الشركة وكيف تختبره. والجواب المعقول يذكر تباين الألوان، والنص البديل للصور، وتسمية حقول النماذج، والتنقل بلوحة المفاتيح.",
          "وأخيرًا، اسأل ما الذي سيكون بيدك يوم الإطلاق. يجب أن تستلم صلاحيات المدير في الموقع، وحسابات النطاق والاستضافة، وحسابات أدوات التحليل و Search Console، وملفات التصميم، وجلسة تدريب لمن سيعدّلون الموقع.",
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
          "اسأل عن الاستضافة وتحديثات الأمان والنسخ الاحتياطي وسرعة الاستجابة للمشكلات، [وكم يكلّف ذلك](/insights/how-much-does-a-website-cost) شهريًا أو سنويًا.",
        ],
      },
      {
        heading: "8. كيف سنتواصل؟",
        paragraphs: [
          "اعرف من هو الشخص المسؤول عن مشروعك، وكم مرة ستصلك التحديثات، وبأي لغة. الشركة التي تجيب بوضوح قبل التوقيع تتواصل جيدًا عادةً أثناء المشروع.",
        ],
      },
      {
        heading: "علامات تحذير قبل التوقيع",
        paragraphs: [
          "معظم الشركات نزيهة، ومعظم المشاريع السيئة سببها عدم الملاءمة لا سوء النية. ومع ذلك، هناك علامات تستحق أن تؤخذ بجدية.",
          "لا تثبت أي واحدة من العلامات أدناه أن الشركة سيئة. لكن اجتماع اثنتين أو ثلاث سبب كافٍ لمواصلة البحث:",
        ],
        list: [
          "ضمان المركز الأول في Google، أو ضمان المبيعات",
          "معرض أعمال من الصور فقط، بلا عناوين مواقع حقيقية",
          "إجابات غامضة عمّن يملك النطاق والكود",
          "سعر يُعطى قبل أن يسألك أحد عمّا تحتاجه",
          "ضغط للتوقيع اليوم حتى لا يضيع الخصم",
          "لا عرض مكتوبًا، أو عرض بلا قائمة بالمخرجات",
          "لا موقع عربيًا يعرضونه، والعربية مهمة لعملائك",
          "ردود بطيئة أو غير واضحة وهم ما زالوا يسعون إلى كسب المشروع",
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
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "الفوترة الإلكترونية مع ERPNext: دليل الربط مع هيئة الزكاة (فاتورة)",
    description:
      "ما الذي تتطلبه الفوترة الإلكترونية «فاتورة» في المرحلتين الأولى والثانية، وكيف يلبّيها ERPNext، وخطوات تجهيز شركتك في السعودية قبل موعد الربط.",
    intro:
      "يستطيع ERPNext تلبية قواعد الفوترة الإلكترونية في السعودية، المعروفة باسم «فاتورة» والصادرة عن هيئة الزكاة والضريبة والجمارك. فالنظام الأساسي يقفل الفواتير بعد إصدارها ويصحّحها بإشعارات دائنة، كما تتطلب المرحلة الأولى. وفي المرحلة الثانية يُنشئ تطبيق إضافي فاتورة XML ورمز QR والختم التشفيري، ويربط ERPNext بمنصة الهيئة. يشرح هذا الدليل المرحلتين، والمكوّنات التقنية بلغة مبسطة، ومواعيد الدفعات المعلنة، وكيف تختبر النظام قبل التشغيل.",
    sections: [
      {
        heading: "ما هو نظام «فاتورة»؟",
        paragraphs: [
          "«فاتورة» هو [نظام الفوترة الإلكترونية في السعودية](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/What-is-e-invoicing.aspx). يستبدل الفواتير الورقية والمكتوبة يدويًا بفواتير إلكترونية منظمة تستطيع الهيئة التحقق منها، للحد من الأخطاء والتهرب الضريبي.",
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
          "بدأت المرحلة الثانية في 1 يناير 2023، و[تُطبَّق على دفعات](https://zatca.gov.sa/en/E-Invoicing/Introduction/Pages/Roll-out-phases.aspx). تحدد الهيئة كل دفعة بحسب الإيرادات، وتُبلغ المنشآت المشمولة قبل موعدها بستة أشهر على الأقل.",
          "في هذه المرحلة تصدر الفواتير بصيغة XML محددة مع ختم تشفيري، ويرتبط نظامك بمنصة الهيئة. فالفواتير الضريبية القياسية بين المنشآت يجب أن تعتمدها الهيئة قبل إرسالها إلى المشتري، أما الفواتير المبسطة للمستهلكين فتُبلَّغ بها الهيئة خلال 24 ساعة.",
        ],
      },
      {
        heading: "أحدث الدفعات كما أعلنتها الهيئة",
        paragraphs: [
          "لا تُدخل الهيئة كل المنشآت في المرحلة الثانية في تاريخ واحد. فهي تحدد معايير كل دفعة بحسب الإيرادات الخاضعة لضريبة القيمة المضافة، والدفعتان الأخيرتان تشملان منشآت أصغر بكثير من السابق.",
          "[الدفعة الرابعة والعشرون](https://zatca.gov.sa/en/Pages/news-1426.aspx)، المعلنة في 26 سبتمبر 2025، تشمل المكلّفين الذين تجاوزت إيراداتهم الخاضعة للضريبة 375,000 ريال في 2022 أو 2023 أو 2024. وكان عليهم ربط أنظمتهم بمنصة «فاتورة» في موعد أقصاه 30 يونيو 2026.",
          "[الدفعة الخامسة والعشرون](https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx)، المعلنة في 24 يوليو 2026، تشمل المكلّفين الذين تجاوزت إيراداتهم الخاضعة للضريبة 187,500 ريال في 2022 أو 2023 أو 2024 أو 2025. وموعدها الأقصى 1 فبراير 2027.",
          "إن كانت إيراداتك أعلى من أحد الرقمين ولم تربط نظامك بعد، فابدأ الآن. وإن كانت أقل منهما، فالمرحلة الأولى تنطبق عليك اليوم، وتقول الهيئة إنها ستبلغ الدفعات اللاحقة قبل موعدها بستة أشهر على الأقل. والمعتبر هو الإشعار الذي ترسله الهيئة إلى منشأتك، فتأكد من وضعك لدى الهيئة أو مع مستشارك الضريبي.",
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
        heading: "المكوّنات التقنية للمرحلة الثانية بلغة مبسطة",
        paragraphs: [
          "يتولى تطبيق الربط هذا العمل عنك، لكن من المفيد أن تعرف المصطلحات التي سيستخدمها منفّذ النظام ورسائل الخطأ. وهي مأخوذة من [الدليل التقني التفصيلي](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-invoicing-Detailed-Technical-Guideline.pdf) الصادر عن الهيئة.",
        ],
        list: [
          "فاتورة XML: الفاتورة نفسها ملف XML منظّم يتبع معيار UBL 2.1. وتصل الفاتورة الضريبية القياسية إلى المشتري بصيغة XML، أو ملف PDF/A-3 مضمَّنًا فيه ملف XML.",
          "المعرّف الفريد (UUID) وعدّاد الفواتير: تحمل كل فاتورة معرّفًا فريدًا وعدّادًا يزيد مع كل مستند ولا يمكن إعادة ضبطه.",
          "تجزئة الفاتورة (Hash): التجزئة بصمة ثابتة الحجم للفاتورة تُحسب بخوارزمية SHA-256، وتثبت أن الملف لم يتغير. وتحفظ كل فاتورة أيضًا تجزئة الفاتورة التي قبلها، فتشكّل الفواتير سلسلة بلا فجوات.",
          "الختم التشفيري: ختم إلكتروني يثبت من أصدر الفاتورة وأن محتواها لم يتغير.",
          "معرّف الختم التشفيري (CSID): شهادة تعرّف نظام الفوترة لديك أمام الهيئة. في أثناء التسجيل يحصل النظام على معرّف خاص بفحوصات التوافق (Compliance CSID)، ثم يجتاز الفحوصات، ثم يحصل على معرّف الإنتاج (Production CSID). وله تاريخ انتهاء ويجب تجديده قبله.",
          "رمز QR: مجموعة حقول مرمَّزة بصيغة Tag-Length-Value (TLV) ثم بصيغة Base64. يتضمن اسم البائع، ورقمه الضريبي، والتاريخ والوقت، والإجمالي شاملًا الضريبة، ومبلغ الضريبة، وفي المرحلة الثانية تجزئة الفاتورة وبيانات التوقيع أيضًا.",
          "الاعتماد (Clearance): للفواتير الضريبية القياسية بين المنشآت. يُرسل ملف XML إلى الهيئة أولًا، فتتحقق منه وتضيف ختمها ورمز QR وتعيده. وبعد ذلك فقط يُرسل إلى المشتري.",
          "الإبلاغ (Reporting): للفواتير المبسطة الصادرة للمستهلكين. يختم نظامك الفاتورة ويضيف رمز QR بنفسه، ويستلمها العميل فورًا، ويُرسل ملف XML إلى الهيئة خلال 24 ساعة.",
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
        heading: "قائمة اختبار قبل التشغيل",
        paragraphs: [
          "تنشر الهيئة [بوابة للمطوّرين](https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/Pages/default.aspx) فيها بيئة تجريبية للربط وأدوات للتحقق، فيمكن تجربة التسجيل وإرسال الفواتير من دون المساس بالسجلات الحقيقية. نفّذ هذه الاختبارات أولًا على نسخة من نظام ERPNext لديك:",
        ],
        list: [
          "اكتمال التسجيل: يُستخدم رمز التحقق خلال مدة صلاحيته البالغة ساعة واحدة، ويحصل النظام على معرّف الإنتاج (Production CSID)",
          "تسجيل كل فرع أو جهاز يصدر فواتير، لا المقر الرئيسي فقط",
          "فاتورة ضريبية قياسية لعميل مسجل في الضريبة تُعتمد وتعود بختم الهيئة ورمز QR",
          "فاتورة مبسطة تُختم وتُطبع برمز QR يمكن مسحه ويُبلَّغ بها",
          "إشعار دائن وإشعار مدين يشير كل منهما إلى فاتورته الأصلية ويُقبلان",
          "فواتير فيها خصم، وأصناف خاضعة لنسبة الصفر أو معفاة، ودفعة مقدمة، تُقبل كلها",
          "فاتورة خاطئة عمدًا تُرفض، وفريقك يعرف كيف يصحّحها ويعيد إرسالها",
          "فاتورة أُنشئت والاتصال مقطوع تُحفظ وتُرسل عند عودة الاتصال",
          "الردود التي تحمل عبارة «مقبولة مع تحذيرات» تُراجَع ولا تُهمل",
          "الفاتورة المطبوعة تُظهر النص العربي والأرقام الضريبية ورمز QR",
        ],
      },
      {
        heading: "الفاتورة العربية والتفاصيل المهمة",
        paragraphs: [
          "[يجب أن تكون الفواتير الضريبية في السعودية باللغة العربية](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-Invoicing_Detailed__Guideline.pdf)، ويجوز أن تتضمن لغة أخرى. وتستطيع نماذج الطباعة في ERPNext عرض [العربية والإنجليزية جنبًا إلى جنب](/insights/erpnext-in-arabic)، مع الرقم الضريبي للبائع والمشتري، وتفاصيل الضريبة، ورمز QR في مواضعها المطلوبة.",
          "معظم المشكلات عند التشغيل سببها البيانات لا البرنامج: عملاء بلا أرقام ضريبية أو عناوين كاملة، أو أصناف بلا قالب ضريبي صحيح، أو عنوان شركة لا يطابق سجلات الهيئة. وتنظيف هذه البيانات مبكرًا يوفّر وقتًا كبيرًا.",
        ],
      },
      {
        heading: "أسباب شائعة لرفض الهيئة للفاتورة",
        paragraphs: [
          "تردّ الهيئة على كل إرسال بأحد ثلاثة ردود: مقبولة، أو مقبولة مع تحذيرات، أو مرفوضة. ويوضح [الدليل التفصيلي للفوترة الإلكترونية](https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Documents/E-Invoicing_Detailed__Guideline.pdf) أن المستند المرفوض فيه خطأ جسيم واحد على الأقل. ومن الأمثلة التي يذكرها:",
          "أما التحذيرات ففئة مستقلة. فغياب رقم المبنى في العنوان، أو عميل من المنشآت بلا معرّف إضافي، يُقبل مع تحذير. وتقول الهيئة إن التحذيرات ينبغي تصحيحها في الفاتورة التالية، وإنها قد تصبح أسباب رفض مستقبلًا، وإن تكرارها قد يعرّض المكلّف لمراجعة أدق.",
          "الفاتورة المرفوضة لا تُلغى ولا تُعدَّل في مكانها. بل تصحّح الخطأ وترسلها مستندًا جديدًا له قيمة عدّاد وتجزئة خاصتان به. وفي ERPNext يعني ذلك عادةً تصحيح بيانات العميل أو الصنف أو الضريبة أولًا، ولهذا تُعدّ نظافة البيانات الأساسية أهم ما في هذه القائمة.",
        ],
        list: [
          "غياب حقول إلزامية، مثل تاريخ إصدار الفاتورة أو نوعها",
          "قيم ضريبية مُدخلة بشكل خاطئ، مثل نسبة ليست رقمًا مجردًا بين 0 و100 بمنزلتين عشريتين على الأكثر",
          "تاريخ إصدار لاحق للتاريخ الحالي",
          "كمية في أحد بنود الفاتورة ليست أكبر من الصفر",
          "شهادة غير صالحة، وهذه تُعيد خطأ في التصريح لا نتيجة تحقق",
        ],
      },
      {
        heading: "إن كنت تستخدم ERPNext حاليًا",
        paragraphs: [
          "تحقق من نسخة ERPNext التي تعمل بها، لأن تطبيقات الربط تدعم نسخًا محددة، [وقد تحتاج الأنظمة القديمة إلى ترقية أولًا](/insights/erpnext-cost). ثم اختبر الدورة كاملة على نسخة من نظامك، بما فيها المرتجعات والإشعارات الدائنة، قبل ربط بيئة الإنتاج.",
          "خطّط للانتقال قبل موعد دفعتك بوقت كافٍ. فاعتماد الفواتير من الهيئة يغيّر طريقة عمل فريق المبيعات اليومية، لذا درّبهم قبل التشغيل.",
        ],
      },
      {
        heading: "وماذا عن بقية دول الخليج؟",
        paragraphs: [
          "[أعلنت الإمارات نظامها الخاص للفوترة الإلكترونية](/insights/erpnext-uae-e-invoicing)، ويُطبَّق على مراحل تبدأ بالشركات الأكبر، كما [أعلنت عُمان برنامجها الخاص](/insights/erpnext-oman-e-invoicing). وتختلف التفاصيل عن السعودية، لذا راجع القواعد في كل بلد تصدر فيه فواتير. ولأن القواعد والمواعيد تتغير، تأكد مما ينطبق عليك مع مستشارك الضريبي.",
        ],
      },
    ],
    cta: {
      heading: "تستعد لنظام «فاتورة»؟",
      body: "نُعدّ ERPNext مع الربط مع هيئة الزكاة، ونماذج الفواتير العربية، وضريبة القيمة المضافة، ونختبرها قبل التشغيل.",
      label: "استشارات وتنفيذ أنظمة ERP",
    },
  },
  {
    slug: "erpnext-cost",
    date: "2026-11-08",
    updated: "2026-11-15",
    service: "erp-implementation",
    category: "أنظمة ERP",
    title: "كم تكلفة نظام ERPNext؟ الترخيص والاستضافة والتطبيق بالتفصيل",
    description:
      "ERPNext بلا رسوم ترخيص، فعلى ماذا تدفع إذن؟ شرح لتكلفة الاستضافة والتطبيق والتخصيص والدعم، وكيف تبقي الميزانية تحت السيطرة.",
    intro:
      "ترخيص ERPNext لا يكلّف شيئًا: فهو مفتوح المصدر، وبلا رسوم لكل مستخدم. ما تدفع مقابله هو الاستضافة والتطبيق والتخصيص إن وُجد والدعم المستمر. وتضع نطاقات السوق المنشورة التطبيق الصغير بين 2,000 و12,000 دولار تقريبًا، والتطبيق الكبير أو الواسع التخصيص عند 25,000 دولار فأكثر، مع استضافة تبدأ من نحو 5 دولارات شهريًا. يشرح هذا الدليل كل جزء، وما الذي يرفعه أو يخفضه، وكيف تختلف السنة الأولى عما بعدها، وكيف تضع ميزانيتك.",
    sections: [
      {
        heading: "البرنامج نفسه: بلا رسوم ترخيص",
        paragraphs: [
          "يصدر ERPNext [برخصة GNU GPL](https://www.gnu.org/licenses/gpl-3.0.html) مفتوحة المصدر. يمكنك استخدامه لأي عدد من المستخدمين والشركات دون رسوم ترخيص، وكل الوحدات متاحة.",
          "وهذا أكبر فرق عن الأنظمة المرخّصة لكل مستخدم، حيث ترتفع التكلفة مع كل موظف تضيفه. أما مع ERPNext فإضافة المستخدمين لا تغيّر ما تدفعه مقابل البرنامج.",
        ],
      },
      {
        heading: "الاستضافة",
        paragraphs: [
          "يحتاج ERPNext إلى خادم. يمكنك استئجاره على [Frappe Cloud](https://frappe.io/cloud/pricing)، خدمة الاستضافة التابعة للشركة المطوّرة للنظام، التي تتولى التحديثات والنسخ الاحتياطية مقابل رسوم شهرية، أو تشغيله على خادمك الخاص أو لدى مزوّد سحابي تختاره.",
          "يعتمد حجم الخادم على عدد من يستخدمون النظام في الوقت نفسه وحجم بياناتك. ويمكن للشركة الصغيرة أن تبدأ بخطة متواضعة وترتقي مع نموها.",
        ],
      },
      {
        heading: "التطبيق: الجزء الأكبر من التكلفة",
        paragraphs: ["يذهب معظم الميزانية إلى التطبيق، أي إعداد ERPNext وفق طريقة عمل شركتك، ويشمل عادةً:"],
        list: [
          "فهم إجراءاتك: المبيعات والمشتريات والمخزون والحسابات والموافقات",
          "إعداد دليل الحسابات والضرائب والمستودعات وقوائم الأسعار",
          "تصميم الفواتير والمستندات [بالعربية أو الإنجليزية أو كليهما](/insights/erpnext-in-arabic)",
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
          "المتطلبات المحلية، مثل [الربط مع هيئة الزكاة في السعودية](/insights/erpnext-zatca-e-invoicing)",
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
        heading: "السنة الأولى مقارنة بالسنوات التالية",
        paragraphs: [
          "لميزانية ERPNext شكلان. تحمل السنة الأولى التكاليف التي تُدفع مرة واحدة: التطبيق، ونقل البيانات، وتصميم المستندات، والتدريب، والأجهزة إن وُجدت، وإعداد الفوترة الإلكترونية إن كنت تصدر فواتير في السعودية. وتبدأ الاستضافة والدعم في السنة نفسها، لكنهما صغيران إلى جانبها.",
          "ومن السنة الثانية تختفي تكاليف المرة الواحدة. ويبقى: الاستضافة، وخطة الدعم أو ساعاته، والترقيات. ولأن ERPNext [بلا رسوم لكل مستخدم](https://frappe.io/erpnext)، فهذه التكاليف لا ترتفع عندما تضيف موظفين. ولا ترتفع الاستضافة إلا عندما يحتاج النظام إلى خادم أكبر.",
          "والترقيات هي تكلفة السنوات التالية التي ينبغي التخطيط لها. تقول Frappe إنها تعتزم دعم نسختين رئيسيتين من ERPNext في الوقت نفسه، وتقدّر ذلك بنحو سنتين ونصف إلى 3 سنوات من الدعم لكل نسخة. فخطّط لترقية رئيسية ضمن هذه المدة، وتوقّع أن ترتفع تكلفتها كلما زادت الشيفرة الخاصة في نظامك.",
          "وهذا هو الفرق الأساسي عن الأنظمة المرخّصة لكل مستخدم، حيث تكبر الفاتورة السنوية كلما كبر الفريق.",
        ],
      },
      {
        heading: "تكاليف يغفل عنها الكثيرون",
        paragraphs: [
          "وقت فريقك هو التكلفة الخفية: لا بد أن ينظّف أحدهم البيانات، ويجيب عن أسئلة طريقة العمل، ويختبر النظام قبل التشغيل. وخصّص ميزانية لتشغيل النظامين القديم والجديد معًا لفترة قصيرة، ولأي أجهزة مثل قارئات الباركود وطابعات الملصقات وأجهزة نقاط البيع.",
        ],
      },
      {
        heading: "نطاقات التكلفة المعتادة",
        paragraphs: [
          "تجمع الأرقام التالية أسعار Frappe المنشورة مع نطاقات ينشرها شركاء ERPNext. استخدمها لتكوين تصور عن الميزانية لا كعرض سعر.",
        ],
        table: {
          head: ["البند", "بالدولار", "بالريال السعودي"],
          rows: [
            ["ترخيص ERPNext", "0", "0"],
            ["استضافة مشتركة على Frappe Cloud، شهريًا", "من 5", "من نحو 19"],
            ["خادم على Frappe Cloud، شهريًا", "من 20–40", "من نحو 75–150"],
            ["خادمك الخاص (معالجان و4 غيغابايت)، شهريًا", "حتى نحو 24", "حتى نحو 90"],
            ["تطبيق صغير: الحسابات والمخزون، أقل من 20 مستخدمًا", "2,000–12,000", "7,500–45,000"],
            ["تطبيق متوسط: يضيف التصنيع أو الموارد البشرية", "12,000–25,000", "45,000–94,000"],
            ["تطبيق كبير أو بتخصيص واسع", "25,000–75,000 فأكثر", "94,000–281,000 فأكثر"],
            ["خطة الدعم، شهريًا", "200–1,000", "750–3,750"],
            ["الربط مع هيئة الزكاة", "تطبيق مجتمعي مجاني، والتنفيذ المدفوع من نحو 800–1,000", "التنفيذ المدفوع من نحو 3,000–3,750"],
          ],
          note: "أسعار الاستضافة هي أسعار البداية المنشورة من Frappe. أما نطاقات التطبيق والدعم فهي تقديرات ينشرها شركاء ERPNext، وليست بيانات سوق موثقة ولا قائمة أسعارنا: يُسعَّر تطبيق ERPNext لكل شركة بعد تحديد إجراءاتها ومدة التنفيذ. جُمعت في نوفمبر 2026.",
        },
      },
      {
        heading: "مثال عملي: ميزانية شركة تجارية بـ15 مستخدمًا",
        paragraphs: [
          "لنأخذ شركة تجارية لديها 15 مستخدمًا، وشركة واحدة، ومستودعان، وعملاء في السعودية. تريد الحسابات والمشتريات والمبيعات والمخزون، مع فواتير باللغتين. لا نذكر هنا أسعارًا جديدة: كل بند أدناه يشير إلى صف في الجدول أعلاه.",
          "ولتحويل البنود إلى ميزانية، اجمع بنود المرة الواحدة لتحصل على رقم السنة الأولى، ثم أضف اثني عشر شهرًا من الاستضافة والدعم لتحصل على التكلفة الجارية. وما ينقل هذه الشركة إلى صف التطبيق المتوسط هو النطاق لا عدد الموظفين: إضافة التصنيع، أو الموارد البشرية والرواتب، أو شركة ثانية.",
        ],
        list: [
          "الترخيص: لا شيء، لـ15 مستخدمًا أو لـ50.",
          "الاستضافة: أحد صفوف الاستضافة الثلاثة. ابدأ بخطة صغيرة وارتقِ إن أصبح النظام بطيئًا.",
          "التطبيق: صف التطبيق الصغير، لأن النطاق هو الحسابات والمخزون لأقل من 20 مستخدمًا. وموقع الشركة داخل هذا النطاق يعتمد على نظافة بياناتها وعدد المستندات المطلوب تصميمها.",
          "الربط مع هيئة الزكاة: الصف الأخير. التطبيق المجتمعي مجاني، أما الإعداد والتسجيل والاختبار فهي العمل الذي يُخصَّص له مبلغ.",
          "الدعم: صف خطة الدعم، ابتداءً من شهر التشغيل.",
          "الأجهزة: قارئات باركود أو طابعات ملصقات للمستودعين، تُشترى على حدة.",
          "وقتك أنت: شخص من طرفك طوال مدة المشروع، لتنظيف البيانات والإجابة عن الأسئلة والاختبار.",
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
        heading: "تكلفة التطبيق السيئ",
        paragraphs: [
          "العرض الأرخص ليس دائمًا المشروع الأرخص. فالإنفاق الزائد الحقيقي يأتي من عمل يُنفَّذ مرتين، وقلّما يظهر في الفاتورة الأولى:",
          "ويمكن تجنّب كل ذلك بقرارات تُتخذ قبل بدء المشروع: نطاق مكتوب، وبيانات نظيفة، وتشغيل على مراحل، وصاحب قرار واحد. ويعرض [دليل ما هو نظام ERP](/insights/what-is-an-erp-system) الأسباب الشائعة لفشل المشاريع، وتبيّن [صفحة تنفيذ نظام ERP](/services/erp-implementation) كيف يُحدَّد نطاق المشروع.",
        ],
        list: [
          "إعادة العمل: دليل حسابات أو هيكل أصناف أُعدّ على عجل يصبح تغييره مكلفًا بعد أن تتراكم عليه آلاف المعاملات.",
          "فشل الاستخدام: إن لم يُدرَّب الفريق عاد إلى الجداول، فتدفع الشركة ثمن نظام وهي ما زالت تعمل بالقديم.",
          "بيانات افتتاحية سيئة: الأرصدة الافتتاحية الخاطئة والسجلات المكررة تعني شهورًا من التصحيح وتقارير لا يثق بها أحد.",
          "تخصيص مفرط: الشيفرة المكتوبة لنسخ النظام القديم يجب فحصها، وغالبًا تعديلها، عند كل ترقية رئيسية.",
          "إغفال الامتثال: إعداد فوترة إلكترونية لم يُختبر جيدًا يفشل عندما تُرفض الفواتير الحقيقية، فتتعطل الفوترة إلى أن يُصلَح.",
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
      label: "استشارات وتنفيذ أنظمة ERP",
    },
  },
];

// Longer guides are kept one per file in ./guides, each with its English and
// Arabic versions, and join the lists here.
const GUIDES: { en: Article; ar: Article }[] = [erpnextVsOdoo, uaeEInvoicing, omanEInvoicing];
for (const guide of GUIDES) {
  EN.push(guide.en);
  AR.push(guide.ar);
}

const BY_LOCALE: Record<Locale, Article[]> = { en: EN, ar: AR };

export function getArticles(locale: Locale): Article[] {
  return BY_LOCALE[locale];
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return BY_LOCALE[locale].find((a) => a.slug === slug);
}

// Guides that are also useful on a second service page, besides the one they
// lead to: the two website guides apply to stores, and choosing an agency
// covers how its design process works.
const ALSO_FOR: Record<string, string[]> = {
  "how-much-does-a-website-cost": ["ecommerce"],
  "how-to-choose-a-web-design-company": ["ecommerce", "user-experience-design"],
};

/** The guides shown on a service page, in its "related guides" block. */
export function getArticlesForService(locale: Locale, service: string): Article[] {
  return BY_LOCALE[locale].filter(
    (article) => article.service === service || ALSO_FOR[article.slug]?.includes(service),
  );
}

/** Up to three other guides on the same subject, for the end of a guide. */
export function getRelatedArticles(locale: Locale, slug: string): Article[] {
  const article = getArticle(locale, slug);
  if (!article) return [];
  return BY_LOCALE[locale].filter((a) => a.slug !== slug && a.service === article.service).slice(0, 3);
}

export const ARTICLE_SLUGS = EN.map((a) => a.slug);
