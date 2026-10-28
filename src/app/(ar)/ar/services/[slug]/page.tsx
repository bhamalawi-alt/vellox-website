import type { Metadata } from "next";
import { ServicePage, serviceMetadata, serviceParams } from "../../../../../components/pages/ServicePage";

export function generateStaticParams() {
  return serviceParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata("ar", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServicePage locale="ar" slug={slug} />;
}
