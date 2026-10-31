export const COPY = {
  "metaTitle": "Privacy Policy — Vellox Studio",
  "title": "Privacy Policy",
  "updated": "October 26, 2026",
  "intro": "This policy explains what personal data Vellox Studio collects through this website, why, and the rights you have over it.",
  "sections": [
    {
      "heading": "Who we are",
      "paragraphs": [
        "Vellox Studio (\"we\", \"us\") operates velloxstudio.com and is the controller of the personal data described here. For any privacy question or request, email info@velloxstudio.com or message us on WhatsApp at +20 105 521 2405.",
      ],
    },
    {
      "heading": "What we collect",
      "paragraphs": [
        "Contact form: your name, email address, and message, plus your phone number, company, and the services you select if you choose to give them.",
        "Hosting logs: when you visit the site, our hosting provider processes technical data such as your IP address, browser type, and the pages requested, to deliver the site and protect it from abuse.",
      ],
    },
    {
      "heading": "Why we use it and our legal basis",
      "paragraphs": [
        "We use contact form data only to reply to your enquiry and, if you ask us to, to prepare a proposal. The legal basis is taking steps at your request before entering into a contract, and our legitimate interest in answering business enquiries.",
        "We use hosting logs to run and secure the website, based on our legitimate interest in keeping the site available and safe.",
      ],
    },
    {
      "heading": "Who processes it for us",
      "paragraphs": [
        "Formspree, Inc. receives and delivers contact form submissions to us. Cloudflare, Inc. hosts the website and processes hosting logs. Both act as our processors and may process data outside your country, including in the United States, under standard contractual clauses or an equivalent safeguard.",
        "We never sell your data or share it with anyone for their own marketing.",
      ],
    },
    {
      "heading": "How long we keep it",
      "paragraphs": [
        "We keep enquiries for up to 24 months after our last contact with you, unless they lead to a client engagement, in which case we keep them for as long as the engagement and our legal record-keeping duties require.",
      ],
    },
    {
      "heading": "Your rights",
      "paragraphs": [
        "Depending on where you live, you can ask to access, correct, delete, or export your personal data, to restrict or object to how we use it, and to withdraw consent where we rely on it. Email info@velloxstudio.com or message us on WhatsApp at +20 105 521 2405 and we will reply within one month.",
        "You also have the right to complain to your local data protection authority.",
      ],
    },
    {
      "heading": "Changes",
      "paragraphs": [
        "If we change how we handle personal data, we will update this page and the date above.",
      ],
    },
  ],
  // Shown in "What we collect" and "Who processes it for us" depending on
  // whether Google Analytics is switched on (src/lib/analytics.ts).
  "analytics": {
    "off": "We do not use analytics, advertising trackers, or marketing cookies on this website.",
    "on": [
      "Analytics, only if you accept: Google Analytics sets cookies (named _ga) and records which pages you view, how you arrived, your approximate location, and your device and browser type. We use this to see which pages help visitors. If you decline, no analytics cookies are set and nothing is sent to Google. We use no advertising trackers or marketing cookies.",
      "The legal basis for analytics is your consent. You can change your choice at any time with the Cookie settings link at the bottom of every page. Google keeps analytics data for 14 months.",
    ],
    "processor": "Google Ireland Limited and Google LLC provide Google Analytics and receive analytics data only if you accept analytics cookies.",
  },
};

export type PageCopy = typeof COPY;
