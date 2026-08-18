import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Book Now | MR Luxury Chauffeur",
  description:
    "Book a private chauffeur in Dublin. Distance, hourly or set-route pricing with instant estimates.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:px-8">
      <h1 className="font-display text-4xl text-ink-100 md:text-5xl">
        Book your <span className="text-gold-500">chauffeur</span>
      </h1>
      <p className="mt-4 max-w-lg text-ink-400">
        Instant estimates for hourly hire and set routes. Custom journeys are
        quoted personally within the hour.
      </p>
      <div className="mt-10">
        <BookingWidget />
      </div>
    </div>
  );
}
