import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-lg text-ink-100">
            MR <span className="text-gold-500">Luxury</span> Chauffeur
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">
            Private chauffeur service in Dublin. Fully electric, quietly
            exceptional.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink-200">Explore</p>
          <ul className="space-y-2 text-ink-400">
            <li><Link href="/fleet" className="hover:text-gold-400">Fleet</Link></li>
            <li><Link href="/#services" className="hover:text-gold-400">Services</Link></li>
            <li><Link href="/book" className="hover:text-gold-400">Book Now</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink-200">Contact</p>
          <ul className="space-y-2 text-ink-400">
            <li>
              <a href={SITE.phoneHref} className="hover:text-gold-400">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold-400">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-ink-400">
        {new Date().getFullYear()} MR Luxury Chauffeur. All rights reserved.
      </div>
    </footer>
  );
}
