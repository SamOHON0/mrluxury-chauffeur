import { NextResponse } from "next/server";

/* Quote request handler.
   With RESEND_API_KEY set, sends the request by email via Resend.
   Without it, logs the request server-side and still returns ok so the
   customer gets the WhatsApp follow-up path. */

type QuotePayload = {
  mode: string;
  date: string;
  time: string;
  pickup?: string;
  dropoff?: string;
  hours?: number;
  routeId?: string;
  passengers: number;
  vehicle?: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  estimate?: number | null;
  night?: boolean;
};

function isValid(p: QuotePayload): boolean {
  return Boolean(p && p.date && p.time && p.name && p.email && p.phone);
}

export async function POST(req: Request) {
  let payload: QuotePayload;
  try {
    payload = (await req.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lines = [
    `New booking request (${payload.mode})`,
    ``,
    `Date: ${payload.date} at ${payload.time}${payload.night ? " (night rate)" : ""}`,
    payload.routeId ? `Route: ${payload.routeId}` : `From: ${payload.pickup ?? "-"}`,
    payload.mode !== "flat" ? `To: ${payload.dropoff ?? "-"}` : ``,
    payload.mode === "hourly" ? `Hours: ${payload.hours}` : ``,
    `Passengers: ${payload.passengers}`,
    payload.vehicle ? `Vehicle: ${payload.vehicle}` : ``,
    payload.estimate ? `Estimated fare: EUR ${payload.estimate}` : `Fare: to be quoted`,
    ``,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.notes ? `Notes: ${payload.notes}` : ``,
  ].filter(Boolean);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? "m.rahmann198929@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.log("[quote] RESEND_API_KEY not set. Request:\n" + lines.join("\n"));
    return NextResponse.json({ ok: true, delivery: "logged" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Mr Luxury Website <${from}>`,
      to: [to],
      reply_to: payload.email,
      subject: `Booking request: ${payload.date} ${payload.time} (${payload.name})`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[quote] Resend error:", res.status, detail);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivery: "email" });
}
