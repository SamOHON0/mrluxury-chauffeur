import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Suitcase } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { VEHICLES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Fleet | MR Luxury Chauffeur",
  description:
    "The MR Luxury fleet: Mercedes-Benz EQS SUV, S-Class, E-Class and V-Class, each finished to first-class standard and driven by a professional chauffeur.",
};

/* The lead vehicle is shown with the wider showroom photograph;
   the rest use their own studio shots. */
const SHOWCASE_IMAGE: Record<string, string> = {
  "eqs-suv": "/images/fleet-hero.jpeg",
};

const CABIN = [
  { k: "Power", v: "Fully electric", why: "Zero tailpipe emissions and near-silent at any speed." },
  { k: "Cabin", v: "Nappa leather", why: "Cream leather, ambient lighting and rear seat controls." },
];

export default function FleetPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
            The <span className="text-gold-500">fleet</span>
          </h1>
          <p className="mt-4 max-w-xl text-ink-400">
            Four Mercedes-Benz, one standard. Whichever you travel in, the
            chauffeur, the preparation and the discretion are the same.
          </p>
        </Reveal>

        {/* Quick pick: jump to any vehicle */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {VEHICLES.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-ink-200 transition-colors hover:border-gold-500 hover:text-gold-400"
              >
                {v.name.replace("Mercedes-Benz ", "")}
              </a>
            ))}
          </div>
        </Reveal>

        {/* One showcase band per vehicle, equal billing */}
        <div className="mt-16 space-y-20">
          {VEHICLES.map((v, i) => {
            const src = SHOWCASE_IMAGE[v.id] ?? v.image;
            return (
              <section key={v.id} id={v.id} className="scroll-mt-28">
                <Reveal>
                  {src && (
                    <div className="overflow-hidden rounded-2xl bg-ink-900">
                      <Image
                        src={src}
                        alt={v.name}
                        width={1600}
                        height={1000}
                        priority={i === 0}
                        sizes="(max-width: 1280px) 100vw, 1200px"
                        className="h-auto w-full"
                      />
                    </div>
                  )}
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="mt-8 grid gap-8 md:grid-cols-[1.6fr_1fr]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">
                        {v.note}
                      </p>
                      <h2 className="font-display mt-3 text-3xl text-ink-100 md:text-4xl">
                        {v.name}
                      </h2>
                      <p className="mt-4 max-w-lg leading-relaxed text-ink-400">
                        {v.body}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {v.idealFor.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-ink-900 px-3.5 py-1.5 text-xs text-ink-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-10 md:justify-end">
                      <div>
                        <Users size={22} className="text-gold-500" />
                        <p className="font-display mt-2 text-2xl text-ink-100">
                          {v.passengers}
                        </p>
                        <p className="text-xs text-ink-400">Passengers</p>
                      </div>
                      <div>
                        <Suitcase size={22} className="text-gold-500" />
                        <p className="font-display mt-2 text-2xl text-ink-100">
                          {v.luggage}
                        </p>
                        <p className="text-xs text-ink-400">Large cases</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>

        {/* Inside the lead car */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-100">
              Inside the EQS SUV
            </h2>
            <p className="mt-3 max-w-md text-ink-400">
              Cream Nappa leather, ambient lighting and a cabin quiet enough to
              work or sleep in.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/interior.jpeg", alt: "EQS SUV cockpit and steering wheel" },
              { src: "/images/interior-3.jpeg", alt: "EQS SUV dashboard with ambient lighting" },
              { src: "/images/rear-seats.jpeg", alt: "EQS SUV rear passenger seats" },
              { src: "/images/interior-2.jpeg", alt: "EQS SUV front cabin in cream leather" },
              { src: "/images/console.jpeg", alt: "EQS SUV centre console and media screen" },
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {CABIN.map((s, i) => (
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
        </div>

        <Reveal className="mt-20 text-center">
          <p className="font-display text-2xl text-ink-100">
            Not sure which suits your journey?
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-400">
            Tell us where you are going and how many are travelling, and we will
            recommend the right car.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
          >
            Book Now
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
