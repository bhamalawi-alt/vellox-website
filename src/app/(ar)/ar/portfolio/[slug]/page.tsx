import type { Metadata } from "next";
import { ProjectPage, projectMetadata, projectParams } from "../../../../../components/pages/ProjectPage";

export function generateStaticParams() {
  return projectParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata("ar", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectPage locale="ar" slug={slug} />;
}
