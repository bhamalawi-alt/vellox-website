import { PortfolioPage, portfolioMetadata } from "../../../../components/pages/PortfolioPage";

export const metadata = portfolioMetadata("ar");

export default function Page() {
  return <PortfolioPage locale="ar" />;
}
