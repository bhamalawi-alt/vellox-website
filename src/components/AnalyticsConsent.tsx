"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  GA_MEASUREMENT_ID,
  gtagInitScript,
  leadEventFor,
  parseConsent,
  trackEvent,
  type Consent,
} from "../lib/analytics";
import { getUi } from "../content/ui";
import { localePath, type Locale } from "../lib/i18n";

type Gtag = (...args: unknown[]) => void;

const CHANGE_EVENT = "vellox:consent-change";
// Fallback when localStorage is blocked, so a choice still holds on this page.
let memory: Consent | null = null;

function readStored(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY)) ?? memory;
  } catch {
    return memory;
  }
}

function store(choice: Consent) {
  memory = choice;
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Private mode or blocked storage: the in-memory choice covers this page.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Removes the GA cookies after a visitor withdraws consent. They are set on
// the registrable domain, so clear both the host and the dotted parent.
function clearGaCookies() {
  const host = window.location.hostname;
  const parent = host.split(".").slice(-2).join(".");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${parent}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

// Consent banner plus the Google tag. The tag loads only once the visitor
// accepts; until then nothing is requested from Google. Rendered by SiteShell
// only when a measurement ID is set.
export function AnalyticsConsent({ locale }: { locale: Locale }) {
  const ui = getUi(locale).consent;
  // undefined on the server and during hydration, so the banner never
  // flashes for visitors who already chose.
  const consent = useSyncExternalStore(subscribe, readStored, () => undefined);
  const [reopened, setReopened] = useState(false);
  const open = consent === null || reopened;

  // Counts WhatsApp and email link clicks anywhere on the page as leads.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const lead = link ? leadEventFor(link.getAttribute("href") ?? "") : null;
      if (lead) trackEvent(lead.name, { ...lead.params, language: locale });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const choose = (choice: Consent) => {
    if (choice === "denied" && consent === "granted") {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
    store(choice);
    setReopened(false);
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            id="ga-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {gtagInitScript(GA_MEASUREMENT_ID)}
          </Script>
        </>
      ) : null}

      {open ? (
        <section
          aria-label={ui.aria}
          className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 text-white shadow-2xl shadow-black/40 print:hidden md:inset-x-auto md:start-8 md:bottom-8 md:max-w-md"
        >
          <p className="text-sm leading-relaxed text-white/85">
            {ui.text}{" "}
            <Link
              href={localePath(locale, "/privacy")}
              className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {getUi(locale).form.privacyLink}
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-ink transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {ui.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {ui.decline}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}

// Footer link that reopens the banner so visitors can change their choice.
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className={className}>
      {label}
    </button>
  );
}
