import Image from "next/image";
import Link from "next/link";
import {
  AirplaneTilt,
  Briefcase,
  Diamond,
  MapTrifold,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { IMAGES, whatsappLink } from "@/lib/site";

const SERVICES = [
  {
    icon: AirplaneTilt,
    title: "Airport Transfers",
    body: "Met at arrivals, flight tracked, no waiting. Dublin Airport to anywhere in Ireland.",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    body: "Discreet, punctual and quiet enough to take a call. Account billing available.",
  },
  {
    icon: Diamond,
    title: "Weddings & Occasions",
    body: "Arrive properly on the day it matters most. Ribbons and requests welcome.",
  },
  {
    icon: MapTrifold,
    title: "Private Tours of Ireland",
    body: "Full-day tours at your pace. Your itinerary or ours, door to door.",
  },
  {
    icon: Clock,
    title: "Hourly Hire",
    body: "The car and chauffeur at your disposal. Two hour minimum, no rushing.",
  },
  {
    icon: ShieldCheck,
    title: "Point to Point",
    body: "Any pickup, any destination, one fixed price agreed before you travel.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero: full-bleed image, black on the left fading into the car on the right */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src={IMAGES.heroEqs}
          alt="Mercedes-Benz EQS SUV, MR Luxury Chauffeur"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-right"
        />
        {/* Mobile: bottom-to-top fade, car visible up top, copy on the dark base */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 from-25% via-ink-950/60 via-55% to-ink-950/15 md:hidden" />
        {/* Desktop: left-to-right fade, solid black over the copy, clear over the car */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-950 from-15% via-ink-950/75 via-45% to-transparent md:block" />
        {/* Bottom anchor so the section settles into the page below */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-end px-4 pb-20 pt-16 md:items-center md:px-8 md:pb-0 md:pt-[72px]">
          <Reveal>
            <h1 className="font-display text-4xl leading-tight text-ink-100 md:text-5xl lg:text-6xl">
              Private chauffeur
              <br />
              service, <span className="text-gold-500">Dublin.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-200">
              A fully electric Mercedes-Benz EQS SUV, a professional chauffeur,
              and every detail handled.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400 active:scale-[0.98]"
              >
                Book Now
              </Link>
              <a
                href={whatsappLink("Hi, I'd like to enquire about a chauffeur booking.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 bg-ink-950/40 px-7 py-3 text-sm font-semibold text-ink-100 backdrop-blur-sm transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/5 bg-ink-900 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-100 md:text-4xl">
              Wherever you need to be
            </h2>
            <p className="mt-3 max-w-lg text-ink-400">
              One car, one chauffeur, every kind of journey.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <s.icon size={30} className="text-gold-500" />
                <h3 className="mt-4 text-lg font-semibold text-ink-100">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Airport transfers: split feature */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/airport.jpeg"
                alt="EQS SUV at the airport at sunset"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl text-ink-100 md:text-4xl">
              Landings, handled
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-400">
              Your flight is tracked, your chauffeur waits in arrivals, and the
              car is already cool or warm before you reach it. Dublin Airport to
              any address in Ireland.
            </p>
            <Link
              href="/book"
              className="mt-7 inline-block rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Book Now
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Fleet band: full-width image with overlay copy */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[480px] w-full">
          <Image
            src={IMAGES.cityDrive}
            alt="EQS SUV driving through the city"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/50 to-transparent" />
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-4 md:px-8">
            <Reveal>
              <h2 className="font-display max-w-xl text-3xl leading-tight text-ink-100 md:text-4xl">
                The Mercedes-Benz EQS SUV
              </h2>
              <p className="mt-4 max-w-md text-ink-200">
                Fully electric, whisper quiet, and finished to a standard the
                journey deserves.
              </p>
              <Link
                href="/fleet"
                className="mt-7 inline-block rounded-full border border-gold-500 px-7 py-3 text-sm font-semibold text-gold-400 transition-colors hover:bg-gold-500 hover:text-ink-950"
              >
                View the Fleet
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works: steps beside the car */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl text-ink-100 md:text-4xl">
                Booked in a minute
              </h2>
            </Reveal>
            <div className="mt-12 space-y-10">
              {[
                {
                  t: "Request",
                  b: "Choose your route, date and time. Every journey is quoted personally within the hour.",
                },
                {
                  t: "Confirm",
                  b: "We confirm your chauffeur and final price by email or WhatsApp.",
                },
                {
                  t: "Travel",
                  b: "Your chauffeur arrives early, tracks your flight if needed, and handles the rest.",
                },
              ].map((step, i) => (
                <Reveal key={step.t} delay={i * 0.08}>
                  <div className="flex gap-6">
                    <span className="font-display text-4xl text-gold-500/60">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink-100">
                        {step.t}
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-400">
                        {step.b}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[8/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/fleet-hero.jpeg"
                alt="Mercedes-Benz EQS SUV outside the showroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 bg-ink-900 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="font-display text-center text-3xl text-ink-100 md:text-4xl">
              Good questions
            </h2>
          </Reveal>
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-white/5 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-100 md:text-4xl">
            Your chauffeur is a minute away
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
          >
            Book Now
          </Link>
        </Reveal>
      </section>
    </>
  );
}
