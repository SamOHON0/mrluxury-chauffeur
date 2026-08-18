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
