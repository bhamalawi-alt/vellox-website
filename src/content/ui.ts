// Interface strings that are not page copy: header, footer, form states,
// breadcrumbs, notes. The Arabic twin in ./ar/ui.ts must have the same keys;
// content.test.ts checks that and `UiStrings` makes the compiler check it.

import type { Locale } from "../lib/i18n";
import { UI as AR } from "./ar/ui";

export const UI = {
  skipToContent: "Skip to content",
  menu: "Menu",
  close: "Close",
  homeAria: "Vellox Studio — home",
  mobileNavAria: "Mobile",
  // The switch shows the *other* language's name.
  switchLanguage: "عربي",
  switchLanguageAria: "التبديل إلى العربية",
  currentLanguage: "English",
  follow: "Follow",
  privacy: "Privacy",
  terms: "Terms",
  backToTop: "Back to top",
  legal: "Legal",
  lastUpdated: (date: string) => `Last updated ${date}.`,
  englishPrevails: "",
  opensInNewTab: " (opens in a new tab)",
  pause: "Pause",
  play: "Play",
  marqueeAria: " scrolling practice names",
  breadcrumbAria: "Breadcrumb",
  breadcrumbServices: "Services",
  breadcrumbPortfolio: "Portfolio",
  readReferences: "Read the references",
  viewPortfolio: "View portfolio",
  includes: (items: string, more: boolean) => ` Includes ${items}${more ? ", and more" : ""}.`,
  details: { industry: "Industry", location: "Location", year: "Year" },
  nextProject: "Next project",
  live: "Live",
  visitSite: "Visit site",
  viewProject: "View project",
  theProject: "The project",
  results: "Results",
  gallery: "Gallery",
  galleryImageAlt: (title: string, n: number) => `${title} — image ${n}`,
  portfolioTitleSuffix: "Vellox Studio Portfolio",
  projectDescription: (summary: string, tags: string[], industry: string) =>
    `${summary} A Vellox Studio project${tags.length ? `: ${tags.join(", ").toLowerCase()}` : ""}${
      industry ? ` for a ${industry.toLowerCase()} company` : ""
    }.`,
  haveProjectInMind: "Have a project in mind?",
  haveProjectLikeThis: "Have a project like this?",
  whatsIncluded: "What's included",
  timeline: "Timeline",
  viewService: "View service",
  allServices: "All services",
  allPracticeAreas: "All practice areas",
  contactDetails: "Contact details",
  sendMessage: "Send us a message",
  englishOnlyNote: "",
  notFound: {
    eyebrow: "404",
    title: "This page could not be found.",
    back: "Back to home",
  },
  form: {
    aria: "Project enquiry",
    honeypot: "Leave this field empty",
    sending: "Sending…",
    success: "Thanks — we typically reply within 24 hours.",
    error: "Something went wrong sending your message — please try again, or email us directly at",
    notConfigured: "Form delivery isn't configured yet — please email us directly at",
    privacyLink: "Privacy policy",
  },
  cta: {
    heading: "Ready to start a project?",
    body: "Tell us what you're building. We typically reply within 24 hours with a short diagnostic call to align on scope, timeline, and fit.",
  },
  globeBand: {
    heading: "Operating remotely across the EU and MENA.",
    body: "Wellness, fintech, and F&B founders — from positioning to production.",
  },
  statement: {
    heading: "One accountable team across strategy, design, and engineering.",
    sub: "No hand-offs, no translation loss, no surprises at launch.",
  },
  facts: {
    founded: "Founded",
    operating: "Operating",
    focus: "Focus",
    operatingValue: "Remote · EU · MENA",
    focusValue: "Wellness · Fintech · F&B",
  },
};

export type UiStrings = typeof UI;

export function getUi(locale: Locale): UiStrings {
  return locale === "ar" ? AR : UI;
}
