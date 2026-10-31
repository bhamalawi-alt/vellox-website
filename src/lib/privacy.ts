import type { LegalSection } from "../components/LegalPage";

type PrivacyCopy = {
  sections: LegalSection[];
  analytics: { off: string; on: string[]; processor: string };
};

// Sections the copy is written in: 1 = "What we collect", 3 = "Who processes
// it for us". The analytics wording goes into those two, and which version
// shows follows whether Google Analytics is switched on.
const COLLECT = 1;
const PROCESSORS = 3;

export function privacySections(copy: PrivacyCopy, analyticsOn: boolean): LegalSection[] {
  return copy.sections.map((section, index) => {
    if (index === COLLECT) {
      const extra = analyticsOn ? copy.analytics.on : [copy.analytics.off];
      return { ...section, paragraphs: [...section.paragraphs, ...extra] };
    }
    if (index === PROCESSORS && analyticsOn) {
      const [first, ...rest] = section.paragraphs;
      return { ...section, paragraphs: [first, copy.analytics.processor, ...rest] };
    }
    return section;
  });
}
