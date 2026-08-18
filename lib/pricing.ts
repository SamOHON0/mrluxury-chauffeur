/* Fares are TBD for now: the widget shows "Estimated fare: TBD" for every
   mode and every request is quoted personally. The rate structures below are
   kept for when the client confirms pricing. */

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
