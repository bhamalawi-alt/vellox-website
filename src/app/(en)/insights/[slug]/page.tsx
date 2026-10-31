import type { Metadata } from "next";
import { ArticlePage, articleMetadata, articleParams } from "../../../../components/pages/ArticlePage";

export function generateStaticParams() {
  return articleParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata("en", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage locale="en" slug={slug} />;
}
