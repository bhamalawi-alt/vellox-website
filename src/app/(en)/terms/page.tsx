import { TermsPage, termsMetadata } from "../../../components/pages/LegalPages";

export const metadata = termsMetadata("en");

export default function Page() {
  return <TermsPage locale="en" />;
}
