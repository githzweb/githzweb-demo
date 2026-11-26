"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Brand, Collection, Product } from "@/lib/catalogue";

import { ProductCard } from "./ProductCard";

const PRICE_BANDS = [
  { id: "u20", label: "Under RM20", test: (p: Product) => p.price != null && !p.priceOnRequest && p.price < 20 },
  { id: "20-100", label: "RM20 – RM100", test: (p: Product) => p.price != null && !p.priceOnRequest && p.price >= 20 && p.price <= 100 },
  { id: "100-300", label: "RM100 – RM300", test: (p: Product) => p.price != null && !p.priceOnRequest && p.price > 100 && p.price <= 300 },
  { id: "300+", label: "Over RM300", test: (p: Product) => p.price != null && !p.priceOnRequest && p.price > 300 },
  { id: "por", label: "Price on request", test: (p: Product) => p.priceOnRequest || p.price == null },
];

const SORTS = [
  { id: "relevance", label: "Best match" },
  { id: "name", label: "Name A–Z" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function haystack(p: Product) {
  const text = [
    p.name,
    p.model,
    p.brand?.name,
    p.category,
    p.collection.title,
    ...p.variants.flatMap((v) => [v.label, v.model]),
    ...p.specs.map((s) => s.value),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return { text, tight: compact(text) };
}

function score(p: Product, tokens: string[]) {
  if (!tokens.length) return 1;
  const h = haystack(p);
  let s = 0;
  for (const t of tokens) {
    const tc = compact(t);
    if (!h.text.includes(t) && !(tc && h.tight.includes(tc))) return 0;
    if (p.name.toLowerCase().includes(t)) s += 3;
    if (compact(p.model).startsWith(tc) || p.variants.some((v) => v.model && compact(v.model).startsWith(tc))) s += 5;
    s += 1;
  }
  return s;
}

type Props = {
  products: Product[];
  collections: Collection[];
  brands: Brand[];
  /** On a collection page the collection filter is fixed. */
  lockedCollection?: string;
};

export function ProductBrowser({ products, collections, brands, lockedCollection }: Props) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [col, setCol] = useState<string[]>(lockedCollection ? [lockedCollection] : (params.get("collection")?.split(",").filter(Boolean) ?? []));
  const [brand, setBrand] = useState<string[]>(params.get("brand")?.split(",").filter(Boolean) ?? []);
  const [band, setBand] = useState<string[]>(params.get("price")?.split(",").filter(Boolean) ?? []);
  const [sort, setSort] = useState(params.get("sort") ?? "relevance");

  // Keep the address bar in sync so a filtered list can be shared on WhatsApp.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (!lockedCollection && col.length) sp.set("collection", col.join(","));
    if (brand.length) sp.set("brand", brand.join(","));
    if (band.length) sp.set("price", band.join(","));
    if (sort !== "relevance") sp.set("sort", sort);
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [q, col, brand, band, sort, lockedCollection]);

  const tokens = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);

  const results = useMemo(() => {
    const list = products
      .map((p) => ({ p, s: score(p, tokens) }))
      .filter(({ p, s }) => {
        if (s === 0) return false;
        if (col.length && !col.includes(p.collection.slug)) return false;
        if (brand.length && !(p.brand && brand.includes(p.brand.slug))) return false;
        if (band.length && !PRICE_BANDS.filter((b) => band.includes(b.id)).some((b) => b.test(p))) return false;
        return true;
      });
    const price = (p: Product) => (p.priceOnRequest || p.price == null ? Number.POSITIVE_INFINITY : p.price);
    list.sort((a, b) => {
      if (sort === "name") return a.p.name.localeCompare(b.p.name);
      if (sort === "price-asc") return price(a.p) - price(b.p);
      if (sort === "price-desc") return (price(b.p) === Infinity ? -1 : price(b.p)) - (price(a.p) === Infinity ? -1 : price(a.p));
      return b.s - a.s || a.p.name.localeCompare(b.p.name);
    });
    return list.map((x) => x.p);
  }, [products, tokens, col, brand, band, sort]);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const activeCount = (lockedCollection ? 0 : col.length) + brand.length + band.length;
  const clearAll = () => {
    setQ("");
    if (!lockedCollection) setCol([]);
    setBrand([]);
    setBand([]);
    setSort("relevance");
  };

  const Check = ({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) => (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[14px]">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#1c1f23]" />
      <span className="flex-1">{label}</span>
      {count != null ? <span className="font-mono text-[11px] text-steel">{count}</span> : null}
    </label>
  );

  const filters = (
    <div className="space-y-7">
      {!lockedCollection ? (
        <fieldset>
          <legend className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Collection</legend>
          {collections.map((c) => (
            <Check key={c.slug} checked={col.includes(c.slug)} onChange={() => toggle(col, setCol, c.slug)} label={c.title} count={c.count} />
          ))}
        </fieldset>
      ) : null}
      <fieldset>
        <legend className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Brand</legend>
        {brands.map((b) => (
          <Check key={b.slug} checked={brand.includes(b.slug)} onChange={() => toggle(brand, setBrand, b.slug)} label={b.name} />
        ))}
      </fieldset>
      <fieldset>
        <legend className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Price</legend>
        {PRICE_BANDS.map((b) => (
          <Check key={b.id} checked={band.includes(b.id)} onChange={() => toggle(band, setBand, b.id)} label={b.label} />
        ))}
      </fieldset>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Filters: sidebar on desktop, collapsible on phone */}
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2.5 rounded-md border border-rule bg-white px-3.5 py-3 focus-within:border-char">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-steel" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or model, e.g. grinder, KT-AG125, M10"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-steel/70"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-steel">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-rule bg-white px-3 py-3">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <details className="mt-3 rounded-md border border-rule lg:hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
            Filters{activeCount ? ` (${activeCount})` : ""}
          </summary>
          <div className="border-t border-rule p-4">{filters}</div>
        </details>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-steel" aria-live="polite">
            <strong className="text-char">{results.length}</strong> {results.length === 1 ? "product" : "products"}
            {q.trim() ? (
              <>
                {" "}
                for &ldquo;<strong className="text-char">{q.trim()}</strong>&rdquo;
              </>
            ) : null}
          </p>
          {activeCount || q ? (
            <button onClick={clearAll} className="text-sm font-semibold underline underline-offset-2">
              Clear all
            </button>
          ) : null}
        </div>

        {results.length ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {results.map((p) => (
              <li key={p._id} className="flex">
                <div className="flex w-full">
                  <ProductCard product={p} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-rule p-10 text-center">
            <p className="font-semibold">No products match.</p>
            <p className="mt-1 text-sm text-steel">Try a shorter search, or clear the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
