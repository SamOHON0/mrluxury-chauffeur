"use client";

import { useMemo, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import {
  FLAT_ROUTES,
  HOURLY,
  DISTANCE_NOTE,
  hourlyQuote,
  flatQuote,
  isNightTime,
  type RateMode,
} from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

const TABS: { id: RateMode; label: string }[] = [
  { id: "distance", label: "Distance" },
  { id: "hourly", label: "Hourly" },
  { id: "flat", label: "Set Routes" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function BookingWidget() {
  const [mode, setMode] = useState<RateMode>("distance");
  const [status, setStatus] = useState<Status>("idle");

  // Ride details
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [hours, setHours] = useState(HOURLY.minimumHours);
  const [routeId, setRouteId] = useState<string>(FLAT_ROUTES[0].id);
  const [passengers, setPassengers] = useState(1);

  // Contact details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const night = isNightTime(time);

  const estimate = useMemo(() => {
    if (mode === "hourly") return hourlyQuote(hours, night);
    if (mode === "flat") return flatQuote(routeId, night);
    return null;
  }, [mode, hours, routeId, night]);

  const summary = useMemo(() => {
    const route =
      mode === "flat"
        ? FLAT_ROUTES.find((r) => r.id === routeId)?.label
        : `${pickup || "?"} to ${dropoff || "?"}`;
    const core = `Booking request: ${route} on ${date || "?"} at ${time || "?"}, ${passengers} passenger(s)`;
    const extra = mode === "hourly" ? `, ${hours}h hourly hire` : "";
    const est = estimate ? `. Estimated fare EUR ${estimate}` : "";
    return `${core}${extra}${est}. Name: ${name || "?"}`;
  }, [mode, routeId, pickup, dropoff, date, time, passengers, hours, estimate, name]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode, date, time, pickup, dropoff, hours, routeId,
          passengers, name, email, phone, notes, estimate, night,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500";
  const labelCls = "mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-200";

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink-900 p-10 text-center">
        <h3 className="font-display text-2xl text-ink-100">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
          Thank you, {name.split(" ")[0] || "there"}. Your chauffeur booking is
          being confirmed and you will hear back within the hour.
        </p>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink-100 hover:border-gold-500 hover:text-gold-400"
        >
          <WhatsappLogo size={18} weight="fill" />
          Follow up on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-ink-900 p-6 md:p-8">
      {/* Mode tabs */}
      <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMode(t.id)}
            className={`py-3 text-sm font-semibold transition-colors ${
              mode === t.id
                ? "bg-gold-500 text-ink-950"
                : "bg-ink-800 text-ink-200 hover:text-gold-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="bk-date" className={labelCls}>Pickup date</label>
          <input id="bk-date" type="date" required value={date}
            onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="bk-time" className={labelCls}>Pickup time</label>
          <input id="bk-time" type="time" required value={time}
            onChange={(e) => setTime(e.target.value)} className={inputCls} />
          {night && (
            <p className="mt-2 text-xs text-gold-400">
              A {HOURLY.nightSurchargePct}% night surcharge applies between 22:00 and 06:00.
            </p>
          )}
        </div>

        {mode === "flat" ? (
          <div className="md:col-span-2">
            <label htmlFor="bk-route" className={labelCls}>Route</label>
            <select id="bk-route" value={routeId}
              onChange={(e) => setRouteId(e.target.value)} className={inputCls}>
              {FLAT_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} (from EUR {r.price})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="bk-pickup" className={labelCls}>Pickup location</label>
              <input id="bk-pickup" type="text" required placeholder="e.g. Dublin Airport, Terminal 2"
                value={pickup} onChange={(e) => setPickup(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label htmlFor="bk-dropoff" className={labelCls}>
                {mode === "hourly" ? "Starting point" : "Drop-off location"}
              </label>
              <input id="bk-dropoff" type="text" required placeholder="e.g. The Shelbourne, St Stephen's Green"
                value={dropoff} onChange={(e) => setDropoff(e.target.value)} className={inputCls} />
            </div>
          </>
        )}

        {mode === "hourly" && (
          <div>
            <label htmlFor="bk-hours" className={labelCls}>
              Hours ({HOURLY.minimumHours}h minimum)
            </label>
            <input id="bk-hours" type="number" min={HOURLY.minimumHours} max={12}
              value={hours} onChange={(e) => setHours(Number(e.target.value))} className={inputCls} />
          </div>
        )}

        <div>
          <label htmlFor="bk-pax" className={labelCls}>Passengers</label>
          <select id="bk-pax" value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))} className={inputCls}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estimate strip */}
      <div className="mt-8 rounded-lg border border-gold-500/25 bg-gold-500/5 px-5 py-4">
        {estimate ? (
          <p className="text-sm text-ink-100">
            Estimated fare:{" "}
            <span className="font-display text-xl text-gold-400">EUR {estimate}</span>
            <span className="ml-2 text-xs text-ink-400">confirmed before travel</span>
          </p>
        ) : (
          <p className="text-sm text-ink-200">{DISTANCE_NOTE}</p>
        )}
      </div>

      {/* Contact */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={labelCls}>Full name</label>
          <input id="bk-name" type="text" required value={name}
            onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="bk-phone" className={labelCls}>Phone</label>
          <input id="bk-phone" type="tel" required placeholder="+353"
            value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="bk-email" className={labelCls}>Email</label>
          <input id="bk-email" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="bk-notes" className={labelCls}>Notes (optional)</label>
          <textarea id="bk-notes" rows={3} placeholder="Flight number, child seat, extra stops..."
            value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong sending your request. Please try again, or book
          directly on WhatsApp below.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex-1 rounded-full bg-gold-500 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Request Booking"}
        </button>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-sm font-semibold text-ink-100 transition-colors hover:border-gold-500 hover:text-gold-400"
        >
          <WhatsappLogo size={18} weight="fill" />
          Book via WhatsApp
        </a>
      </div>
    </form>
  );
}
