/* PLACEHOLDER RATES - confirm every figure with the client before launch.
   These exist so the booking engine works end to end during development. */

export type RateMode = "distance" | "hourly" | "flat";

export const VEHICLES = [
  {
    id: "eqs-suv",
    name: "Mercedes-Benz EQS SUV",
    passengers: 4,
    luggage: 4,
    note: "Fully electric flagship",
  },
] as const;

export const HOURLY = {
  ratePerHour: 90, // placeholder
  minimumHours: 2,
  nightSurchargePct: 20, // applies 22:00 - 06:00, mirrors industry standard
};

export const FLAT_ROUTES = [
  { id: "dub-city", label: "Dublin Airport to City Centre", price: 95 },
  { id: "dub-south", label: "Dublin Airport to South Dublin", price: 110 },
  { id: "dub-kildare", label: "Dublin Airport to Kildare", price: 160 },
  { id: "city-city", label: "Within Dublin City", price: 85 },
] as const; // placeholder prices

export function isNightTime(time: string): boolean {
  if (!time) return false;
  const hour = parseInt(time.split(":")[0] ?? "", 10);
  if (Number.isNaN(hour)) return false;
  return hour >= 22 || hour < 6;
}

export function hourlyQuote(hours: number, night: boolean): number {
  const h = Math.max(hours, HOURLY.minimumHours);
  const base = h * HOURLY.ratePerHour;
  return night ? Math.round(base * (1 + HOURLY.nightSurchargePct / 100)) : base;
}

export function flatQuote(routeId: string, night: boolean): number | null {
  const route = FLAT_ROUTES.find((r) => r.id === routeId);
  if (!route) return null;
  return night
    ? Math.round(route.price * (1 + HOURLY.nightSurchargePct / 100))
    : route.price;
}

/* Distance mode: without a Google Maps key we cannot compute km, so distance
   requests are sent as quote requests answered personally. When
   NEXT_PUBLIC_GOOGLE_MAPS_KEY is added, wire Distance Matrix here. */
export const DISTANCE_NOTE =
  "Exact fares for custom routes are confirmed personally within the hour.";
