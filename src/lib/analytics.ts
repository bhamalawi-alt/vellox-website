// Google Analytics 4, loaded only after the visitor accepts the consent
// banner. Paste the property's measurement ID ("G-…", GA4 Admin → Data
// streams → Web) below and rebuild. Left empty, nothing loads: no banner, no
// cookie-settings link, and the privacy policy keeps saying there is no
// analytics. The ID is public by design; it ships in every page anyway.
export const GA_MEASUREMENT_ID = "";

export function isMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{4,16}$/.test(id);
}

export const ANALYTICS_ENABLED = isMeasurementId(GA_MEASUREMENT_ID);

export type Consent = "granted" | "denied";

export const CONSENT_KEY = "vellox-analytics-consent";
// Fired by the footer's cookie-settings button to reopen the banner.
export const CONSENT_EVENT = "vellox:cookie-settings";

export function parseConsent(value: string | null): Consent | null {
  return value === "granted" || value === "denied" ? value : null;
}

// Runs only after consent, so analytics storage starts granted. Ads signals
// stay denied: the site runs no advertising.
export function gtagInitScript(id: string): string {
  return [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });",
    "gtag('js', new Date());",
    `gtag('config', '${id}');`,
  ].join("\n");
}
