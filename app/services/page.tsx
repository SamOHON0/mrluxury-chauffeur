import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services | MR Luxury Chauffeur",
  description:
    "Airport transfers, corporate travel, weddings, private tours of Ireland and hourly chauffeur hire in a fully electric Mercedes-Benz EQS SUV.",
};

const FEATURED = [
  {
    title: "Airport Transfers",
    body: "Flight tracked from departure, met in arrivals, luggage handled. Dublin Airport to any address in Ireland at a fixed, pre-agreed fare. Early flights and late landings are exactly why this service exists.",
    img: "/images/airport.jpeg",
    alt: "EQS SUV waiting at the airport at sunset",
  },
  {
    title: "Corporate Travel",
    body: "A quiet cabin, punctual arrivals and a chauffeur who understands discretion. Take the call, finish the deck, or simply arrive composed. Regular routes and account billing available for businesses.",
    img: "/images/rear-seats.jpeg",
    alt: "Rear passenger seats of the EQS SUV",
  },
];

const MORE = [
  {
    title: "Weddings & Occasions",
    body: "The right arrival on the day it matters most. Ribbons, requests and precise timing all handled in advance.",
  },
  {
    title: "Private Tours of Ireland",
    body: "Wicklow, Kilkenny, the Cliffs, or a route built entirely around you. Full-day tours, door to door, at your pace.",
  },
  {
    title: "Hourly Hire",
    body: "The car and chauffeur at your disposal from two hours to multi-day engagements. Ideal for meetings, events and evenings out.",
  },
  {
    title: "Point to Point",
    body: "Any pickup, any destination, one fixed fare agreed before you travel. Simple as that.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
            Every journey, <span className="text-gold-500">handled</span>
          </h1>
          <p className="mt-4 max-w-lg text-ink-400">
            From the fully electric EQS SUV to the seven-seat V-Class, every
            service is delivered by a chauffeur who plans the details before
            you think of them.
          </p>
        </Reveal>

        {/* Two featured services with imagery */}
        <div className="mt-16 space-y-16">
          {FEATURED.map((s, i) => (
            <Reveal key={s.title}>
              <div
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-ink-100">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-400">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Remaining services: simple two-column editorial list */}
        <div className="mt-20 grid gap-x-16 gap-y-12 border-t border-white/10 pt-16 md:grid-cols-2">
          {MORE.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <h3 className="font-display text-2xl text-ink-100">{s.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-400">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <Link
            href="/book"
            className="inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
          >
            Book Now
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
