import type { Metadata } from "next";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | MR Luxury Chauffeur",
  description: "Contact MR Luxury Chauffeur in Dublin by phone, WhatsApp or email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-8">
      <Reveal>
        <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
          Get in <span className="text-gold-500">touch</span>
        </h1>
        <p className="mt-4 max-w-md text-ink-400">
          Calls and WhatsApp messages are answered personally, usually within
          minutes.
        </p>
      </Reveal>

      <div className="mt-12 space-y-6">
        <Reveal>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900 p-6 transition-colors hover:border-gold-500/50"
          >
            <Phone size={26} className="shrink-0 text-gold-500" />
            <div>
              <p className="text-sm text-ink-400">Phone and WhatsApp</p>
              <p className="text-lg font-semibold text-ink-100">{SITE.phone}</p>
            </div>
          </a>
        </Reveal>
        <Reveal delay={0.05}>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900 p-6 transition-colors hover:border-gold-500/50"
          >
            <EnvelopeSimple size={26} className="shrink-0 text-gold-500" />
            <div>
              <p className="text-sm text-ink-400">Email</p>
              <p className="text-lg font-semibold text-ink-100">{SITE.email}</p>
            </div>
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900 p-6">
            <MapPin size={26} className="shrink-0 text-gold-500" />
            <div>
              <p className="text-sm text-ink-400">Based in</p>
              <p className="text-lg font-semibold text-ink-100">{SITE.city}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
