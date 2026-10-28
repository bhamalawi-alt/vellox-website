import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandMark } from "../BrandLogo";
import { PageHero } from "../PageHero";
import { ArrowLink } from "../ui/arrow-link";
import { getSite } from "../../content/site";
import { getUi } from "../../content/ui";
import { arrow, localePath, type Locale } from "../../lib/i18n";
import { getProject, getProjects, paragraphs } from "../../lib/projects";
import { BASE, pageMeta } from "../../lib/seo";
import { breadcrumbLink, jsonLd, primaryCtaSoft } from "./shared";

// A static export needs at least one generated route, so with no published
// projects (all unpublished or deleted in the CMS) a placeholder slug keeps the
// build working; it renders the 404 page and is never linked.
const NO_PROJECTS = "_none";

export function projectParams() {
  const slugs = getProjects().map((project) => ({ slug: project.slug }));
  return slugs.length > 0 ? slugs : [{ slug: NO_PROJECTS }];
}

export function projectMetadata(locale: Locale, slug: string): Metadata {
  const project = getProject(slug);
  if (!project) return {};
  const ui = getUi(locale);
  const meta = pageMeta({
    title: `${project.title} — ${ui.portfolioTitleSuffix}`,
    // CMS summaries are one sentence; the tail gives the snippet the studio
    // name and the services, which the summary alone leaves out.
    description: ui.projectDescription(project.summary, project.tags, project.industry),
    path: `/portfolio/${project.slug}`,
    locale,
  });
  if (project.cover) {
    meta.openGraph = {
      ...meta.openGraph,
      images: [{ url: project.cover, alt: project.coverAlt || project.title }],
    };
  }
  return meta;
}

export function ProjectPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const ui = getUi(locale);
  const site = getSite(locale);
  const href = (path: string) => localePath(locale, path);
  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];
  const details = [
    { term: ui.details.industry, value: project.industry },
    { term: ui.details.location, value: project.location },
    { term: ui.details.year, value: project.year },
  ].filter((d) => d.value);
  const url = BASE + href(`/portfolio/${project.slug}`);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url,
        inLanguage: locale,
        ...(project.cover ? { image: `${BASE}${project.cover}` } : {}),
        creator: { "@id": `${BASE}/#organization` },
        keywords: project.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.breadcrumbPortfolio, item: BASE + href("/portfolio") },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <PageHero
        before={
          <nav
            aria-label={ui.breadcrumbAria}
            className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60"
          >
            <Link href={href("/portfolio")} className={breadcrumbLink}>
              {ui.breadcrumbPortfolio}
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
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{ui.live}</dt>
                  <dd className="mt-1 text-sm">
                    <ArrowLink href={project.liveUrl} className="text-white">
                      {ui.visitSite}
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
              <h2 className="display mb-2 text-3xl md:text-5xl">{ui.theProject}</h2>
              {paragraphs(project.body).map((p) => (
                <p key={p.slice(0, 48)} className="text-lg leading-relaxed md:text-xl">
                  {p}
                </p>
              ))}
            </div>
            {project.results.length > 0 ? (
              <aside className="md:col-span-4">
                <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">{ui.results}</h2>
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
            <h2 id="project-gallery" className="display mb-10 text-3xl md:text-5xl">{ui.gallery}</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <li
                  key={g.image}
                  className={`overflow-hidden rounded-2xl bg-white/5 ${i % 3 === 0 ? "sm:col-span-2" : ""}`}
                >
                  <img
                    src={g.image}
                    alt={g.alt || ui.galleryImageAlt(project.title, i + 1)}
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
            <h2 className="display text-4xl leading-[1.05] md:text-6xl">{ui.haveProjectLikeThis}</h2>
            <Link href={href("/contact")} className={`${primaryCtaSoft} mt-10`}>
              {site.CTA_ITEM.label} <span aria-hidden="true">{arrow(locale)}</span>
            </Link>
          </div>
          {next && next.slug !== project.slug ? (
            <div className="md:text-end">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{ui.nextProject}</p>
              <ArrowLink href={href(`/portfolio/${next.slug}`)} className="display text-2xl text-white md:text-3xl">
                {next.title}
              </ArrowLink>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
