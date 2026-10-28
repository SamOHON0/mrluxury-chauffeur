"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-8">
        <Link href="/" className="font-display text-lg tracking-wide text-ink-100">
          Mr <span className="text-gold-500">Luxury</span> Chauffeur
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-200 transition-colors hover:text-gold-400"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-950 transition-transform hover:bg-gold-400 active:scale-[0.98]"
          >
            Book Now
          </Link>
        </div>

        <button
          className="text-ink-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-ink-950 px-4 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-ink-200"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-ink-950"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
