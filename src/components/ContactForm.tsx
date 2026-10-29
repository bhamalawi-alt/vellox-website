"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { contactCopy } from "../content/pages";
import { WHATSAPP, whatsappHref } from "../content/site";
import { getUi } from "../content/ui";
import { arrow, dir, localePath, type Locale } from "../lib/i18n";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null;

type Status = "idle" | "pending" | "success" | "error";

const fieldBase =
  "w-full rounded-lg border border-white/45 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors hover:border-white/60 focus:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const labelBase =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/70";

const pillBase =
  "cursor-pointer rounded-full border border-white/45 px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-white/80 transition-colors hover:border-white/60 hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white peer-checked:border-white peer-checked:bg-white/10 peer-checked:text-white";

const inlineLink =
  "underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function ContactForm({ locale }: { locale: Locale }) {
  const COPY = contactCopy(locale);
  const ui = getUi(locale).form;
  const [status, setStatus] = useState<Status>("idle");
  const pending = status === "pending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim() !== "") {
      setStatus("success");
      return;
    }
    if (!ENDPOINT) return;
    setStatus("pending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          message: data.get("message"),
          interests: data.getAll("interests[]"),
          // Which language the enquiry came in, so replies can match it.
          _language: locale,
        }),
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    // method/action keep a plain POST to Formspree working if JS fails, so
    // personal data never lands in a GET query string.
    <form
      onSubmit={handleSubmit}
      method="post"
      action={ENDPOINT ?? undefined}
      dir={dir(locale)}
      aria-label={ui.aria}
      aria-busy={pending}
      className="relative space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
    >
      {!ENDPOINT && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-lg border border-dashed border-white/40 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white"
        >
          {ui.notConfigured}{" "}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={inlineLink} dir="ltr">
            {WHATSAPP.display}
          </a>
          .
        </p>
      )}

      <div aria-hidden="true" className="h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-gotcha">{ui.honeypot}</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="_language" value={locale} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelBase}>
            {COPY.form.fields[0]}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelBase}>
            {COPY.form.fields[1]}
          </label>
          {/* Addresses and numbers read left-to-right whatever the page direction. */}
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelBase}>
            {COPY.form.fields[2]}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            className={fieldBase}
          />
        </div>
        <div>
          <label htmlFor="contact-company" className={labelBase}>
            {COPY.form.fields[3]}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelBase}>
          {COPY.form.projectLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className={`${fieldBase} resize-none`}
        />
      </div>

      <fieldset>
        <legend className={`${labelBase} mb-3`}>
          {COPY.form.interestsLabel}
        </legend>
        <ul className="flex flex-wrap gap-2">
          {COPY.form.interestOptions.map((title, i) => (
            <li key={title}>
              <input
                type="checkbox"
                name="interests[]"
                value={title}
                id={`contact-interest-${i}`}
                className="peer sr-only"
              />
              <label htmlFor={`contact-interest-${i}`} className={pillBase}>
                {title}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <p className="text-xs leading-relaxed text-white/70">
        {COPY.form.privacyNote}{" "}
        <Link
          href={localePath(locale, "/privacy")}
          className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ui.privacyLink}
        </Link>
        .
      </p>

      <div aria-live="polite">
        {status === "success" && (
          <p
            role="status"
            aria-live="polite"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white"
          >
            {ui.success}
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm leading-relaxed text-white"
          >
            {ui.error}{" "}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={inlineLink} dir="ltr">
              {WHATSAPP.display}
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || !ENDPOINT}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-[12px] uppercase tracking-[0.12em] text-black transition-colors hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {pending ? ui.sending : COPY.form.submitLabel}{" "}
        <span aria-hidden="true">{arrow(locale)}</span>
      </button>
    </form>
  );
}
