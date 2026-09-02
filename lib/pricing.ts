/* Fares are TBD for now: the widget shows "Estimated fare: TBD" for every
   mode and every request is quoted personally. The rate structures below are
   kept for when the client confirms pricing. */

export type RateMode = "distance" | "hourly" | "flat";

export type Vehicle = {
  id: string;
  name: string;
  passengers: number;
  luggage: number;
  note: string;
  body: string;
  image: string | null;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "eqs-suv",
    name: "Mercedes-Benz EQS SUV",
    passengers: 4,
    luggage: 4,
    note: "Fully electric flagship",
    body: "The headline act. Fully electric, whisper quiet and finished in cream Nappa leather.",
    image: "/images/studio-side.jpeg",
  },
  {
    id: "s-class",
    name: "Mercedes-Benz S-Class",
    passengers: 3,
    luggage: 2,
    note: "The flagship saloon",
    body: "The benchmark for rear-seat comfort. For clients who expect the best and notice the difference.",
    image: "/images/s-class.jpeg",
  },
  {
    id: "e-class",
    name: "Mercedes-Benz E-Class",
    passengers: 3,
    luggage: 2,
    note: "The executive saloon",
    body: "Quietly capable and endlessly composed. The right choice for airport runs and daily business travel.",
    image: "/images/e-class.jpeg",
  },
  {
    id: "v-class",
    name: "Mercedes-Benz V-Class",
    passengers: 7,
    luggage: 6,
    note: "Luxury for groups",
    body: "Seven seats and luggage to match, without giving up an inch of comfort. Families, golf trips and executive groups.",
    image: "/images/v-class.jpeg",
  },
];

export const HOURLY = {
  minimumHours: 2,
};

export const FLAT_ROUTES = [
  {
    id: "dub-city",
    label: "Dublin Airport to City Centre",
    from: "Dublin Airport",
    to: "Dublin City Centre",
  },
  {
    id: "dub-south",
    label: "Dublin Airport to South Dublin",
    from: "Dublin Airport",
    to: "Dundrum, Dublin",
  },
  {
    id: "dub-kildare",
    label: "Dublin Airport to Kildare",
    from: "Dublin Airport",
    to: "Naas, Kildare",
  },
  {
    id: "city-city",
    label: "Within Dublin City",
    from: "Dublin City Centre",
    to: "",
  },
] as const;

export const FARE_NOTE =
  "Estimated fare: TBD. Every journey is quoted personally within the hour.";
