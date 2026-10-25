import { PageHero } from "../components/PageHero";
import { ArrowLink } from "../components/ui/arrow-link";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page could not be found."
      after={
        <ArrowLink href="/" className="mt-10 text-sm uppercase tracking-[0.12em] text-white/80 hover:text-white">
          Back to home
        </ArrowLink>
      }
    />
  );
}
