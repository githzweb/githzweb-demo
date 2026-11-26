"use client";

// Quote basket kept in the visitor's browser (localStorage), shared by the
// "Add to quote" buttons, the header badge and the quote generator page.

import { useSyncExternalStore } from "react";

export type QuoteLine = { slug: string; variant: string; qty: number };

const KEY = "demo-hardware-quote";
const listeners = new Set<() => void>();
let cache: string | null = null;

function read(): string {
  if (cache === null) {
    try {
      cache = window.localStorage.getItem(KEY) ?? "[]";
    } catch {
      cache = "[]";
    }
  }
  return cache;
}

function write(lines: QuoteLine[]) {
  cache = JSON.stringify(lines);
  try {
    window.localStorage.setItem(KEY, cache);
  } catch {
    /* private mode: keep in memory only */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

const parsedCache = new Map<string, QuoteLine[]>();
function parse(s: string): QuoteLine[] {
  let v = parsedCache.get(s);
  if (!v) {
    try {
      v = JSON.parse(s) as QuoteLine[];
    } catch {
      v = [];
    }
    parsedCache.clear();
    parsedCache.set(s, v);
  }
  return v;
}

export function useQuote() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return parse(raw);
}

export const quote = {
  add(slug: string, variant: string, qty = 1) {
    const lines = parse(read());
    const i = lines.findIndex((l) => l.slug === slug && l.variant === variant);
    write(i >= 0 ? lines.map((l, k) => (k === i ? { ...l, qty: l.qty + qty } : l)) : [...lines, { slug, variant, qty }]);
  },
  update(index: number, patch: Partial<QuoteLine>) {
    write(parse(read()).map((l, k) => (k === index ? { ...l, ...patch } : l)));
  },
  remove(index: number) {
    write(parse(read()).filter((_, k) => k !== index));
  },
  clear() {
    write([]);
  },
};
