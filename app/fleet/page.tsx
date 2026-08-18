import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/site";
import { VEHICLES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Fleet | MR Luxury Chauffeur",
  description:
    "The MR Luxury fleet: a fully electric Mercedes-Benz EQS SUV, finished to first-class standard.",
};

export default function FleetPage() {
  const eqs = VEHICLES[0];

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
            The <span className="text-gold-500">fleet</span>
          </h1>
          <p className="mt-4 max-w-lg text-ink-400">
            One vehicle, chosen deliberately. {eqs.note}, seating{" "}
            {eqs.passengers} with room for {eqs.luggage} cases.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={IMAGES.heroEqs}
              alt="Mercedes-Benz EQS SUV exterior"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.interior}
                alt="EQS SUV interior"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={IMAGES.detail}
                alt="EQS SUV detail"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </Reveal>
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
