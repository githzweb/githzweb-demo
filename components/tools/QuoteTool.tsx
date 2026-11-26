"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { quote, useQuote } from "@/lib/quoteStore";
import { DEMO } from "@/lib/site";

export type QuoteProduct = {
  slug: string;
  name: string;
  model: string;
  brand?: string;
  unit?: string;
  price: number | null;
  variants: { label: string; model?: string }[];
};

// Demo trade-discount rule (on priced items only).
const DISCOUNTS = [
  { min: 5000, rate: 0.1 },
  { min: 1000, rate: 0.05 },
];

const rm = (n: number) => `RM${n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function quoteNumber(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `QT-${String(h % 100000).padStart(5, "0")}`;
}

export function QuoteTool({ products }: { products: QuoteProduct[] }) {
  const lines = useQuote();
  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products]);
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState({ name: "", company: "", phone: "" });

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "");
    if (q.length < 2) return [];
    return products
      .filter((p) => `${p.name} ${p.model} ${p.brand ?? ""} ${p.variants.map((v) => `${v.label} ${v.model ?? ""}`).join(" ")}`.toLowerCase().replace(/[^a-z0-9 ]/g, "").includes(q))
      .slice(0, 6);
  }, [search, products]);

  const rows = lines
    .map((l, index) => ({ l, index, p: bySlug.get(l.slug) }))
    .filter((r): r is { l: (typeof lines)[number]; index: number; p: QuoteProduct } => Boolean(r.p));
  const subtotal = rows.reduce((s, r) => s + (r.p.price ?? 0) * r.l.qty, 0);
  const porCount = rows.filter((r) => r.p.price == null).length;
  const disc = DISCOUNTS.find((d) => subtotal >= d.min);
  const discount = disc ? subtotal * disc.rate : 0;
  const total = subtotal - discount;
  const qNo = quoteNumber(JSON.stringify(lines) + customer.company);
  const nextTier = [...DISCOUNTS].reverse().find((d) => subtotal < d.min);

  const waText = [
    `Hi githzweb, I made this quote in your hardware demo (${qNo}):`,
    ...rows.map((r) => `• ${r.l.qty} × ${r.p.name}${r.l.variant ? ` (${r.l.variant})` : ""}: ${r.p.price == null ? "price on request" : rm(r.p.price * r.l.qty)}`),
    `Total: ${rm(total)}${porCount ? ` + ${porCount} item(s) on request` : ""}`,
    "I'd like a quote tool like this for my business.",
  ].join("\n");

  return (
    <div>
      {/* Controls (hidden when printing) */}
      <div className="grid gap-4 print:hidden md:grid-cols-[1fr_320px]">
        <div className="relative rounded-xl border border-rule p-5">
          <label className="block">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Add products</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or model, e.g. hex bolt, KT-DD18"
              className="mt-2 w-full rounded-md border border-rule px-3.5 py-3 outline-none focus:border-char"
            />
          </label>
          {matches.length ? (
            <ul className="mt-2 divide-y divide-rule rounded-md border border-rule">
              {matches.map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                  <span>
                    <span className="font-semibold">{p.name}</span>{" "}
                    <span className="font-mono text-xs text-steel">{p.model}</span>
                  </span>
                  <button
                    onClick={() => {
                      quote.add(p.slug, p.variants[0]?.label ?? "", 1);
                      setSearch("");
                    }}
                    className="shrink-0 rounded-md bg-char px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          ) : search.trim().length >= 2 ? (
            <p className="mt-2 text-sm text-steel">No matches.</p>
          ) : (
            <p className="mt-2 text-sm text-steel">
              Or browse{" "}
              <Link href="/products" className="underline underline-offset-2">
                all products
              </Link>{" "}
              and press &ldquo;Add to quote&rdquo;.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-rule p-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Quote for</span>
          {(["name", "company", "phone"] as const).map((k) => (
            <input
              key={k}
              value={customer[k]}
              onChange={(e) => setCustomer({ ...customer, [k]: e.target.value })}
              placeholder={k === "name" ? "Your name" : k === "company" ? "Company" : "Phone (optional)"}
              className="mt-2 w-full rounded-md border border-rule px-3 py-2.5 text-sm outline-none focus:border-char"
            />
          ))}
          <p className="mt-2 text-xs text-steel">Stays in your browser. Nothing is sent anywhere.</p>
        </div>
      </div>

      {/* The quote document */}
      <article className="mt-8 rounded-xl border border-rule bg-white p-6 md:p-10 print:mt-0 print:border-0 print:p-0">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-4 border-char pb-6">
          <div>
            <p className="flex items-center gap-2 text-xl font-black">
              <span className="grid h-8 w-8 place-items-center rounded bg-hivis text-sm">DH</span>
              {DEMO.name}
            </p>
            <p className="mt-1 text-xs text-steel">Demo company by githzweb. Not a real quote.</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-2xl font-black tracking-tight">QUOTATION</p>
            <p className="font-mono">{qNo}</p>
            <p className="text-steel" suppressHydrationWarning>
              {new Date().toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })} · valid 14 days
            </p>
          </div>
        </header>

        {customer.name || customer.company ? (
          <p className="mt-5 text-sm">
            <span className="text-steel">Prepared for: </span>
            <strong>{[customer.name, customer.company].filter(Boolean).join(", ")}</strong>
            {customer.phone ? <span className="text-steel"> · {customer.phone}</span> : null}
          </p>
        ) : null}

        {rows.length ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-char text-left">
                  <th className="py-2 pr-3">Item</th>
                  <th className="py-2 pr-3">Option</th>
                  <th className="w-24 py-2 pr-3 text-right">Qty</th>
                  <th className="py-2 pr-3 text-right">Unit price</th>
                  <th className="py-2 text-right">Amount</th>
                  <th className="w-8 print:hidden" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ l, index, p }) => (
                  <tr key={`${l.slug}|${l.variant}|${index}`} className="border-b border-rule align-top">
                    <td className="py-3 pr-3">
                      <span className="font-semibold">{p.name}</span>
                      <span className="block font-mono text-[11px] text-steel">
                        {p.variants.find((v) => v.label === l.variant)?.model ?? p.model} · per {p.unit}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      {p.variants.length ? (
                        <>
                          <select
                            value={l.variant}
                            onChange={(e) => quote.update(index, { variant: e.target.value })}
                            className="rounded border border-rule bg-white px-1.5 py-1 print:hidden"
                          >
                            {p.variants.map((v) => (
                              <option key={v.label}>{v.label}</option>
                            ))}
                          </select>
                          <span className="hidden print:inline">{l.variant}</span>
                        </>
                      ) : (
                        <span className="text-steel">–</span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <input
                        type="number"
                        min={1}
                        value={l.qty}
                        onChange={(e) => quote.update(index, { qty: Math.max(1, Number(e.target.value) || 1) })}
                        className="w-16 rounded border border-rule px-1.5 py-1 text-right print:hidden"
                        aria-label={`Quantity of ${p.name}`}
                      />
                      <span className="hidden print:inline">{l.qty}</span>
                    </td>
                    <td className="py-3 pr-3 text-right">{p.price == null ? <span className="text-steel">On request</span> : rm(p.price)}</td>
                    <td className="py-3 text-right font-semibold">{p.price == null ? "–" : rm(p.price * l.qty)}</td>
                    <td className="py-3 pl-2 text-right print:hidden">
                      <button onClick={() => quote.remove(index)} aria-label={`Remove ${p.name}`} className="text-steel hover:text-char">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="ml-auto mt-6 w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-steel">Subtotal</dt>
                <dd>{rm(subtotal)}</dd>
              </div>
              {disc ? (
                <div className="flex justify-between text-[#1d7a3a]">
                  <dt>Trade discount {disc.rate * 100}%</dt>
                  <dd>−{rm(discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between border-t-2 border-char pt-2 text-lg font-black">
                <dt>Total</dt>
                <dd>{rm(total)}</dd>
              </div>
              {porCount ? <p className="text-xs text-steel">+ {porCount} item(s) priced on request, added when confirmed.</p> : null}
              {nextTier ? (
                <p className="text-xs text-steel print:hidden">
                  Add {rm(nextTier.min - subtotal)} more to get {nextTier.rate * 100}% trade discount.
                </p>
              ) : null}
            </dl>
          </div>
        ) : (
          <p className="mt-8 rounded-lg border border-dashed border-rule p-8 text-center text-steel">
            Your quote is empty. Search above to add products.
          </p>
        )}

        <footer className="mt-10 border-t border-rule pt-4 text-xs text-steel">
          Prices in RM, excluding SST and delivery. Demo terms: 50% deposit, balance before delivery. Bulk discounts:
          5% over RM1,000, 10% over RM5,000.
        </footer>
      </article>

      {rows.length ? (
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button onClick={() => window.print()} className="rounded-md bg-char px-5 py-3 font-semibold text-white hover:bg-black">
            Print / save as PDF
          </button>
          <a
            href={`https://wa.me/${DEMO.whatsapp}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-wa px-5 py-3 font-semibold text-white hover:brightness-95"
          >
            Send this quote on WhatsApp
          </a>
          <button onClick={() => quote.clear()} className="rounded-md border border-rule px-5 py-3 font-semibold hover:border-char">
            Clear quote
          </button>
        </div>
      ) : null}
    </div>
  );
}
