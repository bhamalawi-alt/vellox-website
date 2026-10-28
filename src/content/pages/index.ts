// One accessor per page: the English module or its Arabic twin under
// ../ar/pages/, picked by locale. The Arabic modules are typed against the
// English shapes, so a missing key fails `typecheck` rather than rendering blank.

import type { Locale } from "../../lib/i18n";
import { pick } from "../../lib/i18n";
import * as aboutEn from "./about";
import * as aboutAr from "../ar/pages/about";
import * as contactEn from "./contact";
import * as contactAr from "../ar/pages/contact";
import * as homeEn from "./home";
import * as homeAr from "../ar/pages/home";
import * as insightsEn from "./insights";
import * as insightsAr from "../ar/pages/insights";
import * as portfolioEn from "./portfolio";
import * as portfolioAr from "../ar/pages/portfolio";
import * as privacyEn from "./privacy";
import * as privacyAr from "../ar/pages/privacy";
import * as servicesIndexEn from "./services-index";
import * as servicesIndexAr from "../ar/pages/services-index";
import * as termsEn from "./terms";
import * as termsAr from "../ar/pages/terms";
import * as brandStrategyEn from "./brand-strategy";
import * as brandStrategyAr from "../ar/pages/brand-strategy";
import * as brandIdentityEn from "./brand-identity";
import * as brandIdentityAr from "../ar/pages/brand-identity";
import * as uxdEn from "./user-experience-design";
import * as uxdAr from "../ar/pages/user-experience-design";
import * as visualContentEn from "./visual-content";
import * as visualContentAr from "../ar/pages/visual-content";
import * as webDevEn from "./web-development";
import * as webDevAr from "../ar/pages/web-development";
import * as ecommerceEn from "./ecommerce";
import * as ecommerceAr from "../ar/pages/ecommerce";
import * as webMobileEn from "./web-mobile-applications";
import * as webMobileAr from "../ar/pages/web-mobile-applications";
import * as erpEn from "./erp-implementation";
import * as erpAr from "../ar/pages/erp-implementation";

export const homeCopy = (l: Locale) => pick(l, homeEn.COPY, homeAr.COPY);
export const aboutCopy = (l: Locale) => pick(l, aboutEn.COPY, aboutAr.COPY);
export const contactCopy = (l: Locale) => pick(l, contactEn.COPY, contactAr.COPY);
export const insightsCopy = (l: Locale) => pick(l, insightsEn.COPY, insightsAr.COPY);
export const portfolioCopy = (l: Locale) => pick(l, portfolioEn.COPY, portfolioAr.COPY);
export const privacyCopy = (l: Locale) => pick(l, privacyEn.COPY, privacyAr.COPY);
export const termsCopy = (l: Locale) => pick(l, termsEn.COPY, termsAr.COPY);
export const servicesIndexCopy = (l: Locale) =>
  pick(l, servicesIndexEn.COPY, servicesIndexAr.COPY);

// The service pages share one shape apart from the ERP page, which has no
// hero fields of its own; the page component only reads the common part.
export type ServicePageCopy = {
  included: { num: string; title: string; body: string }[];
  approach?: { heading: string; steps: { num: string; title: string; body: string }[] };
  related?: { heading: string; sub: string };
  cta?: { heading: string; body: string };
};

const SERVICE_PAGES: Record<string, { en: ServicePageCopy; ar: ServicePageCopy }> = {
  "brand-strategy": { en: brandStrategyEn.COPY, ar: brandStrategyAr.COPY },
  "brand-identity": { en: brandIdentityEn.COPY, ar: brandIdentityAr.COPY },
  "user-experience-design": { en: uxdEn.COPY, ar: uxdAr.COPY },
  "visual-content": { en: visualContentEn.COPY, ar: visualContentAr.COPY },
  "web-development": { en: webDevEn.COPY, ar: webDevAr.COPY },
  ecommerce: { en: ecommerceEn.COPY, ar: ecommerceAr.COPY },
  "web-mobile-applications": { en: webMobileEn.COPY, ar: webMobileAr.COPY },
  "erp-implementation": { en: erpEn.COPY, ar: erpAr.COPY },
};

export function serviceCopy(locale: Locale, slug: string): ServicePageCopy | undefined {
  const entry = SERVICE_PAGES[slug];
  return entry ? pick(locale, entry.en, entry.ar) : undefined;
}
