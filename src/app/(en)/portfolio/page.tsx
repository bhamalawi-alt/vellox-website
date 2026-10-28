import { PortfolioPage, portfolioMetadata } from "../../../components/pages/PortfolioPage";

export const metadata = portfolioMetadata("en");

export default function Page() {
  return <PortfolioPage locale="en" />;
}
