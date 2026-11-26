"use client";

import Link from "next/link";
import { useState } from "react";

import type { Variant } from "@/lib/catalogue";
import { quote, useQuote } from "@/lib/quoteStore";

export function AddToQuote({ slug, variants }: { slug: string; variants: Variant[] }) {
  const lines = useQuote();
  const [variant, setVariant] = useState(variants[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inQuote = lines.filter((l) => l.slug === slug).reduce((n, l) => n + l.qty, 0);

  return (
    <div className="mt-3 rounded-md border border-rule p-3">
      <div className="flex flex-wrap items-end gap-2">
        {variants.length ? (
          <label className="flex-1 text-xs text-steel">
            Size
            <select value={variant} onChange={(e) => setVariant(e.target.value)} className="mt-1 block w-full rounded-md border border-rule bg-white px-2 py-2 text-sm text-char">
              {variants.map((v) => (
                <option key={v.label}>{v.label}</option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="w-20 text-xs text-steel">
          Qty
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="mt-1 block w-full rounded-md border border-rule px-2 py-2 text-sm text-char"
          />
        </label>
        <button
          onClick={() => {
            quote.add(slug, variant, qty);
            setAdded(true);
          }}
          className="rounded-md bg-char px-4 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          Add to quote
        </button>
      </div>
      {added || inQuote ? (
        <p className="mt-2 text-sm">
          {inQuote} in your quote ·{" "}
          <Link href="/tools/quote" className="font-semibold underline underline-offset-2">
            View quote &rarr;
          </Link>
        </p>
      ) : null}
    </div>
  );
}
