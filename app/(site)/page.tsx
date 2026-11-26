import Link from "next/link";

import { Illustration } from "@/components/Illustration";
import { ProductCard } from "@/components/ProductCard";
import { getBrands, getCollections, getProducts } from "@/lib/catalogue";
import { demoWhatsApp } from "@/lib/site";

const POINTS = [
  { t: "Search by model number", d: "Type KT-AG125 or just “grinder” and find it in seconds." },
  { t: "Trade & bulk pricing", d: "Contractors get quantity prices. Ask on WhatsApp." },
  { t: "Every size listed", d: "Screws, bolts and fittings with every size and model number." },
  { t: "Quick quotes", d: "Send your list and get a quote back the same day." },
];

export default async function Home() {
  const [products, collections, brands] = await Promise.all([getProducts(), getCollections(), getBrands()]);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      {/* Hero with search */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">
              Supplying contractors &amp; workshops
            </p>
            <h1 className="mt-4 text-[44px] leading-[1.02] font-black tracking-tight md:text-7xl">
              Tools and site supplies, <span className="bg-hivis px-2">easy to find.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-steel">
              {products.length} products from {brands.length} brands. Search by name or model number, then ask for
              a price on WhatsApp.
            </p>
            <form action="/products" className="mt-8 flex max-w-xl gap-2">
              <label className="flex flex-1 items-center gap-2.5 rounded-md border border-char/20 bg-white px-4 py-3.5 focus-within:border-char">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-steel" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span className="sr-only">Search products</span>
                <input name="q" type="search" placeholder="e.g. drill, M10 bolt, ball valve" className="w-full bg-transparent outline-none" />
              </label>
              <button className="rounded-md bg-char px-5 font-semibold text-white hover:bg-black">Search</button>
            </form>
            <p className="mt-3 text-sm text-steel">
              Popular:{" "}
              {["grinder", "wall plug", "MCB", "safety boots"].map((t, i) => (
                <span key={t}>
                  {i ? " · " : ""}
                  <Link href={`/products?q=${encodeURIComponent(t)}`} className="underline underline-offset-2 hover:text-char">
                    {t}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          <div className="hidden grid-cols-2 gap-3 md:grid">
            {collections.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="group grid aspect-square place-items-center rounded-xl border border-rule bg-white text-char hover:border-char"
              >
                <Illustration name={c.icon} className="h-16 w-16 transition-transform group-hover:-rotate-6" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1240px] px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight">Shop by collection</h2>
          <Link href="/products" className="text-sm font-semibold underline underline-offset-2">
            All products &rarr;
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {collections.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/products/${c.slug}`}
                className="group flex h-full flex-col items-start rounded-lg border border-rule p-4 transition-colors hover:border-char hover:bg-sand"
              >
                <Illustration name={c.icon} className="h-11 w-11 text-char" />
                <span className="mt-4 font-bold leading-tight">{c.title}</span>
                <span className="mt-1 font-mono text-xs text-steel">{c.count} products</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured */}
      <section className="bg-sand py-14">
        <div className="mx-auto max-w-[1240px] px-4">
          <h2 className="text-3xl font-black tracking-tight">Popular with contractors</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {featured.map((p) => (
              <li key={p._id} className="flex">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-[1240px] px-4 py-14">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((x) => (
            <li key={x.t} className="bg-white p-6">
              <span className="block h-1.5 w-8 bg-hivis" aria-hidden />
              <h3 className="mt-4 font-bold">{x.t}</h3>
              <p className="mt-1.5 text-sm text-steel">{x.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-[1240px] px-4 pb-6">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Brands we carry (fictional)</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/products?brand=${b.slug}`}
                className="block rounded-lg border border-rule px-4 py-4 text-center hover:border-char"
              >
                <span className="block text-lg font-black tracking-tight">{b.name}</span>
                <span className="block text-xs text-steel">{b.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1240px] px-4 py-14">
        <div className="relative overflow-hidden rounded-xl bg-char p-8 text-white md:p-12">
          <div className="hazard absolute inset-x-0 top-0 h-1.5" aria-hidden />
          <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-4xl">Have a long list? Send it over.</h2>
          <p className="mt-3 max-w-xl text-white/75">
            Paste your item list into WhatsApp and get a quote back. (In this demo, the chat goes to githzweb, the
            team that built this website.)
          </p>
          <a
            href={demoWhatsApp("quote request")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-md bg-hivis px-5 py-3 font-semibold text-char hover:bg-hivis-dark"
          >
            Request a quote on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
