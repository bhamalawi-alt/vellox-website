import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "../../../components/BrandLogo";
import { PageHero } from "../../../components/PageHero";
import { ArrowLink } from "../../../components/ui/arrow-link";
import { BASE, pageMeta } from "../../../lib/seo";
import { getProject, getProjects, paragraphs } from "../../../lib/projects";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/portfolio/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const meta = pageMeta({
    title: `${project.title} — Vellox Studio Portfolio`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
  if (project.cover) {
    meta.openGraph = {
      ...meta.openGraph,
      images: [{ url: project.cover, alt: project.coverAlt || project.title }],
    };
  }
  return meta;
}

export default async function ProjectPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];
  const details = [
    { term: "Industry", value: project.industry },
    { term: "Location", value: project.location },
    { term: "Year", value: project.year },
  ].filter((d) => d.value);
  const url = `${BASE}/portfolio/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url,
        ...(project.cover ? { image: `${BASE}${project.cover}` } : {}),
        creator: { "@id": `${BASE}/#organization` },
        keywords: project.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Portfolio", item: `${BASE}/portfolio` },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        before={
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
          >
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Portfolio
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
        }
        eyebrow={project.tags.join(" · ")}
        title={project.title}
        lede={project.summary}
      />

      <section className="bg-[#0a0a0a] pb-20 text-white md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#3730e8]/40 via-[#16143a] to-[#0a0a0a]">
            {project.cover ? (
              <img
                src={project.cover}
                alt={project.coverAlt || project.title}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BrandMark height={56} className="h-14 w-auto opacity-40" />
              </div>
            )}
          </div>
          {details.length > 0 ? (
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
              {details.map((d) => (
                <div key={d.term}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{d.term}</dt>
                  <dd className="mt-1 text-sm">{d.value}</dd>
                </div>
              ))}
              {project.liveUrl ? (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Live</dt>
                  <dd className="mt-1 text-sm">
                    <ArrowLink href={project.liveUrl} className="text-white">
                      Visit site
                    </ArrowLink>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
      </section>

      {project.body || project.results.length > 0 ? (
        <section className="bg-bg py-20 text-ink md:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-12">
            <div className="space-y-6 md:col-span-8">
              <h2 className="display mb-2 text-3xl md:text-5xl">The project</h2>
              {paragraphs(project.body).map((p) => (
                <p key={p.slice(0, 48)} className="text-lg leading-relaxed md:text-xl">
                  {p}
                </p>
              ))}
            </div>
            {project.results.length > 0 ? (
              <aside className="md:col-span-4">
                <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">Results</h2>
                <ul className="space-y-6">
                  {project.results.map((r) => (
                    <li key={r.label} className="border-t border-line pt-4">
                      <span className="display block text-4xl tracking-[-0.02em]">{r.value}</span>
                      <span className="mt-1 block text-sm text-muted">{r.label}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}

      {project.gallery.length > 0 ? (
        <section className="bg-[#0a0a0a] py-20 text-white md:py-28" aria-labelledby="project-gallery">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 id="project-gallery" className="display mb-10 text-3xl md:text-5xl">Gallery</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <li
                  key={g.image}
                  className={`overflow-hidden rounded-2xl bg-white/5 ${i % 3 === 0 ? "sm:col-span-2" : ""}`}
                >
                  <img
                    src={g.image}
                    alt={g.alt || `${project.title} — image ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-panel py-24 text-white md:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display text-4xl leading-[1.05] md:text-6xl">Have a project like this?</h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-white px-7 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a Project <span aria-hidden="true">→</span>
            </Link>
          </div>
          {next && next.slug !== project.slug ? (
            <div className="md:text-right">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Next project</p>
              <ArrowLink href={`/portfolio/${next.slug}`} className="display text-2xl text-white md:text-3xl">
                {next.title}
              </ArrowLink>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
