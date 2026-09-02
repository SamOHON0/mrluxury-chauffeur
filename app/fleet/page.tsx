import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { VEHICLES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Fleet | MR Luxury Chauffeur",
  description:
    "The MR Luxury fleet: a fully electric Mercedes-Benz EQS SUV, finished to first-class standard.",
};

export default function FleetPage() {
  const eqs = VEHICLES[0];
  const others = VEHICLES.slice(1);

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
            The <span className="text-gold-500">fleet</span>
          </h1>
          <p className="mt-4 max-w-lg text-ink-400">
            Four vehicles, one standard. Led by the {eqs.note.toLowerCase()},
            the {eqs.name}.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/fleet-hero.jpeg"
              alt="Mercedes-Benz EQS SUV outside the showroom"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/interior.jpeg", alt: "EQS SUV cockpit and steering wheel" },
            { src: "/images/interior-3.jpeg", alt: "EQS SUV dashboard with ambient lighting" },
            { src: "/images/rear-seats.jpeg", alt: "EQS SUV rear passenger seats" },
            { src: "/images/interior-2.jpeg", alt: "EQS SUV front cabin in cream leather" },
            { src: "/images/studio-side.jpeg", alt: "EQS SUV side profile" },
            { src: "/images/studio-rear.jpeg", alt: "EQS SUV rear view" },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 0.05}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Spec cards: name, value, why it matters */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {[
            {
              k: "Power",
              v: "Fully electric",
              why: "Zero tailpipe emissions and near-silent at any speed.",
            },
            {
              k: "Passengers",
              v: "Seats 4",
              why: "Space for four adults without anyone compromising.",
            },
            {
              k: "Luggage",
              v: "4 large cases",
              why: "Full-size cases in the boot, hand luggage in the cabin.",
            },
            {
              k: "Cabin",
              v: "Nappa leather",
              why: "Cream leather, ambient lighting and rear seat controls.",
            },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-7">
                <p className="text-xs font-semibold text-ink-400">{s.k}</p>
                <p className="font-display mt-2 text-2xl text-gold-400">
                  {s.v}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {s.why}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The rest of the fleet. Photo slots activate when client photos arrive. */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-100">
              Also in the garage
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                  {v.image && (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-semibold text-gold-500">
                      {v.note}
                    </p>
                    <h3 className="font-display mt-2 text-2xl text-ink-100">
                      {v.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">
                      {v.body}
                    </p>
                    <p className="mt-5 border-t border-white/5 pt-4 text-xs text-ink-400">
                      Seats {v.passengers}, room for {v.luggage} cases
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 text-center">
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
