import Link from "next/link";
import { getSite } from "../content/site";
import { getUi } from "../content/ui";
import { localePath, type Locale } from "../lib/i18n";
import { BrandLockup, BrandMark } from "./BrandLogo";
import { LanguageSwitch } from "./LanguageSwitch";
import { ArrowLink } from "./ui/arrow-link";
import { CookieSettingsButton } from "./AnalyticsConsent";
import { ANALYTICS_ENABLED } from "../lib/analytics";

const linkBase =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const ui = getUi(locale);
  const href = (path: string) => localePath(locale, path);
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 md:pt-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <BrandLockup height={32} className="mb-6 h-8 w-auto" />
            <p className="max-w-xs text-base leading-relaxed text-white/70">
              {site.TAGLINE}
            </p>
            <ArrowLink
              href={href(site.CTA_ITEM.href)}
              className="display mt-8 text-2xl text-white md:text-3xl"
            >
              {site.CTA_ITEM.label}
            </ArrowLink>
          </div>

          {site.FOOTER_COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <ArrowLink href={href(link.href)} className="text-sm text-white/85 hover:text-white">
                      {link.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label={ui.follow} className="lg:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              {ui.follow}
            </h2>
            <ul className="mt-4 flex flex-col">
              {site.SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <ArrowLink href={social.href} className="text-sm text-white/85 hover:text-white">
                    {social.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>{site.COPYRIGHT}</p>
          <nav aria-label={ui.legal} className="flex flex-wrap items-center gap-x-6">
            <Link href={href("/privacy")} className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              {ui.privacy}
            </Link>
            <Link href={href("/terms")} className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              {ui.terms}
            </Link>
            {ANALYTICS_ENABLED ? (
              <CookieSettingsButton
                label={ui.consent.settings}
                className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}
              />
            ) : null}
            <span className="inline-flex min-h-11 items-center gap-2">
              <span aria-current="true" className="text-white/40">
                {ui.currentLanguage}
              </span>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <LanguageSwitch
                locale={locale}
                className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}
              />
            </span>
            <a href="#top" className={`inline-flex min-h-11 items-center hover:text-white ${linkBase}`}>
              {ui.backToTop} ↑
            </a>
          </nav>
        </div>
        <p className="pb-6 text-xs text-white/50">
          Interface components adapted from{" "}
          <a href="https://skiper-ui.com" className={`underline underline-offset-2 hover:text-white ${linkBase}`}>
            Skiper UI
          </a>{" "}
          and{" "}
          <a href="https://www.vengenceui.com" className={`underline underline-offset-2 hover:text-white ${linkBase}`}>
            Vengeance UI
          </a>
          .
        </p>
      </div>

      <div aria-hidden="true" className="pointer-events-none flex justify-center pt-4">
        <BrandMark height={420} className="h-[42vw] max-h-[420px] w-auto translate-y-[18%] opacity-[0.07]" />
      </div>
    </footer>
  );
}
