import { describe, expect, it } from "bun:test";
import { gtagInitScript, isMeasurementId, parseConsent } from "./analytics";
import { privacySections } from "./privacy";
import { COPY as PRIVACY_EN } from "../content/pages/privacy";
import { COPY as PRIVACY_AR } from "../content/ar/pages/privacy";

describe("measurement id", () => {
  it("accepts a GA4 id", () => {
    expect(isMeasurementId("G-AB12CD34EF")).toBe(true);
  });
  it("rejects empty, Universal Analytics and malformed ids", () => {
    expect(isMeasurementId("")).toBe(false);
    expect(isMeasurementId("UA-12345-1")).toBe(false);
    expect(isMeasurementId("G-ab12'); alert(1);//")).toBe(false);
  });
});

describe("stored consent", () => {
  it("reads only the two known values", () => {
    expect(parseConsent("granted")).toBe("granted");
    expect(parseConsent("denied")).toBe("denied");
    expect(parseConsent(null)).toBe(null);
    expect(parseConsent("yes")).toBe(null);
  });
});

describe("gtag init", () => {
  it("configures the id and denies every ads signal", () => {
    const script = gtagInitScript("G-AB12CD34EF");
    expect(script).toContain(`gtag('config', 'G-AB12CD34EF')`);
    expect(script).toContain(`analytics_storage: 'granted'`);
    expect(script).toContain(`ad_storage: 'denied'`);
    expect(script).toContain(`ad_user_data: 'denied'`);
    expect(script).toContain(`ad_personalization: 'denied'`);
  });
});

describe("privacy policy analytics wording", () => {
  for (const [name, copy] of [["en", PRIVACY_EN], ["ar", PRIVACY_AR]] as const) {
    it(`${name}: says there is no analytics while analytics is off`, () => {
      const collect = privacySections(copy, false)[1].paragraphs;
      expect(collect).toContain(copy.analytics.off);
      expect(collect.some((p) => p.includes("Google"))).toBe(false);
    });
    it(`${name}: names Google Analytics and consent once it is on`, () => {
      const sections = privacySections(copy, true);
      const all = sections.flatMap((s) => s.paragraphs);
      expect(all).not.toContain(copy.analytics.off);
      for (const p of copy.analytics.on) expect(sections[1].paragraphs).toContain(p);
      expect(sections[3].paragraphs).toContain(copy.analytics.processor);
    });
  }
});
