# MR Luxury Chauffeur - Site Rebuild

Premium chauffeur site for mrluxurychauffeur.com. Next.js 15 (App Router), Tailwind v4, Motion. Built to replace the Wix site, with a native booking engine modelled on blacktiechauffeur.ie.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel. Zero config needed.
3. Add env vars from `.env.example` in Vercel project settings.
4. Point the mrluxurychauffeur.com domain at Vercel when ready to switch off Wix.

## Booking engine

`components/BookingWidget.tsx` + `app/api/quote/route.ts`.

Three modes, mirroring the Black Tie reference:

- **Distance**: pickup/dropoff, quoted personally (auto-fares come with the Maps key, see below)
- **Hourly**: instant estimate, 2h minimum, night surcharge after 22:00
- **Set Routes**: fixed-price list (Dublin Airport routes etc.), instant estimate

Submissions go to `/api/quote`:

- With `RESEND_API_KEY` set: emailed to `QUOTE_TO_EMAIL`
- Without: logged server-side; customer is offered the WhatsApp fallback either way

## IMPORTANT - placeholder data to confirm with the client

- **All prices in `lib/pricing.ts` are placeholders** (hourly rate, minimums, flat route fares, night surcharge %). Confirm with MR before launch.
- Images are hotlinked from the existing Wix CDN (`lib/site.ts`). Get the original photos from the client and move them to `public/images` before the Wix site is cancelled, or they disappear.
- Email delivery needs a free Resend account (resend.com) and a verified domain.

## Content to confirm with the client

- FAQ answers (`components/FAQ.tsx`) are written deliberately general. Confirm actual policies: cancellation terms, payment methods, child seats, coverage.
- Testimonials are NOT included yet. Pull real Google/WhatsApp reviews from MR and add a reviews section rather than inventing quotes.

## Phase 2 (not built yet)

- Google Places autocomplete + Distance Matrix auto-fares for the Distance tab (`NEXT_PUBLIC_GOOGLE_MAPS_KEY` is already plumbed in `.env.example`)
- Online payments (Stripe) once MR wants card-at-booking
- Testimonials/reviews section (needs real reviews)
- FAQs page
- Booking management/admin (currently email + WhatsApp only)
