import { describe, expect, it } from "bun:test";
import { fitDescription } from "./seo";

describe("fitDescription", () => {
  it("keeps the full text when it fits the search snippet", () => {
    expect(fitDescription("Short summary. A Vellox Studio project.", "Short summary.")).toBe(
      "Short summary. A Vellox Studio project.",
    );
  });
  it("falls back to the shorter text when the full one would be cut off", () => {
    const full = "x".repeat(161);
    expect(fitDescription(full, "Short summary.")).toBe("Short summary.");
  });
  it("trims the fallback at a word boundary when it is still too long", () => {
    const fallback = `${"word ".repeat(40)}end`;
    const out = fitDescription(`${fallback} more`, fallback);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toContain("wor…");
  });
});
