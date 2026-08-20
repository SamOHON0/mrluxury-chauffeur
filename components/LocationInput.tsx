"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "@phosphor-icons/react";

/* Predictive location input backed by Photon (OpenStreetMap geocoder).
   Free, no API key. Results are biased towards Dublin and filtered to
   Ireland. Swap for Google Places Autocomplete later if desired. */

type Suggestion = {
  label: string;
  detail: string;
};

function formatSuggestion(f: {
  properties: Record<string, string | undefined>;
}): Suggestion | null {
  const p = f.properties;
  if (p.country !== "Ireland") return null;
  const name = p.name ?? [p.housenumber, p.street].filter(Boolean).join(" ");
  if (!name) return null;
  const detail = [p.street !== name ? p.street : null, p.district, p.city, p.county]
    .filter((x): x is string => Boolean(x) && x !== name)
    .slice(0, 2)
    .join(", ");
  return { label: name, detail };
}

/* Bold the part of the suggestion that matches what was typed,
   Google Places style */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const idx = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (idx < 0) return <span className="text-ink-100">{text}</span>;
  return (
    <span className="text-ink-100">
      {text.slice(0, idx)}
      <span className="font-semibold">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </span>
  );
}

export default function LocationInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onCommit,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onCommit: (v: string) => void;
  required?: boolean;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function search(q: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          q
        )}&limit=6&lat=53.3498&lon=-6.2603&lang=en`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = (await res.json()) as {
          features: { properties: Record<string, string | undefined> }[];
        };
        const seen = new Set<string>();
        const items: Suggestion[] = [];
        for (const f of data.features ?? []) {
          const s = formatSuggestion(f);
          if (!s) continue;
          const key = `${s.label}|${s.detail}`;
          if (seen.has(key)) continue;
          seen.add(key);
          items.push(s);
          if (items.length >= 5) break;
        }
        setSuggestions(items);
        setOpen(items.length > 0);
        setActive(-1);
      } catch {
        /* aborted or offline: keep quiet */
      }
    }, 300);
  }

  function choose(s: Suggestion) {
    const full = s.detail ? `${s.label}, ${s.detail}` : s.label;
    onChange(full);
    onCommit(full);
    setOpen(false);
    setSuggestions([]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-200"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => {
          onChange(e.target.value);
          search(e.target.value);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => onCommit(value)}
        className="w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
      />
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-ink-800 shadow-xl shadow-black/40"
        >
          {suggestions.map((s, i) => (
            <li key={`${s.label}|${s.detail}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(s);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left ${
                  i === active ? "bg-ink-700" : ""
                }`}
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <span className="text-sm leading-snug">
                  <Highlight text={s.label} query={value} />
                  {s.detail && (
                    <span className="ml-1.5 text-xs text-ink-400">{s.detail}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
