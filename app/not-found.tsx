import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-4 pt-16 text-center">
      <p className="font-display text-6xl text-gold-500">404</p>
      <h1 className="font-display mt-4 text-2xl text-ink-100 md:text-3xl">
        This road goes nowhere
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
        The page you are looking for has moved or never existed. Your chauffeur
        knows the way back.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-400"
      >
        Back to Home
      </Link>
    </div>
  );
}
