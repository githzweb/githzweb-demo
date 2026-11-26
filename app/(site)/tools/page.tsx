import type { Metadata } from "next";
import Link from "next/link";

import { OpenFaq } from "@/components/tools/OpenFaq";
import { demoWhatsApp } from "@/lib/site";

export const metadata: Metadata = { title: "Business tools" };

const TOOLS = [
  {
    href: "/tools/importer",
    t: "Excel → catalogue importer",
    d: "Upload a messy product sheet. Names get tidied, sizes grouped, duplicates merged and missing prices flagged, ready for the website.",
    saves: "Days of retyping",
  },
  {
    href: "/tools/quote",
    t: "Quote generator",
    d: "Customers pick products and quantities, bulk discounts apply automatically, and the quote prints as a PDF or goes to WhatsApp.",
    saves: "Typing quotes in Excel",
  },
  {
    href: "#faq",
    t: "FAQ assistant",
    d: "The “Questions?” button on every page answers delivery, payment and stock questions, and finds products by model number, in English and Malay.",
    saves: "Answering the same WhatsApps",
  },
  {
    href: "/tools/catalogue",
    t: "Printable catalogue",
    d: "A print-ready PDF catalogue made from the live product list, so it's never out of date.",
    saves: "Re-doing the PDF catalogue",
  },
];

const CARD = "group flex h-full w-full flex-col rounded-xl border border-rule p-6 transition-colors hover:border-char hover:bg-sand";

function card(x: (typeof TOOLS)[number], i: number) {
  return (
    <>
      <span className="font-mono text-xs text-steel">0{i + 1}</span>
      <span className="mt-2 block text-xl font-black tracking-tight group-hover:underline">{x.t}</span>
      <span className="mt-2 block flex-1 text-steel">{x.d}</span>
      <span className="mt-4 block text-sm">
        <span className="rounded bg-hivis px-2 py-0.5 font-semibold">Saves: {x.saves}</span>
      </span>
    </>
  );
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Automation demos</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Business tools</h1>
      <p className="mt-4 max-w-2xl text-lg text-steel">
        Small automations that save a supplier&rsquo;s team hours every week. All four run in the browser: no
        monthly AI fees, and no customer data sent anywhere.
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {TOOLS.map((x, i) => (
          <li key={x.t}>
            {x.href === "#faq" ? (
              <OpenFaq className={CARD}>{card(x, i)}</OpenFaq>
            ) : (
              <Link href={x.href} className={CARD}>
                {card(x, i)}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <h2 className="mt-14 text-2xl font-black tracking-tight">Sample reports</h2>
      <p className="mt-2 max-w-2xl text-steel">What clients receive from githzweb, written about this demo shop.</p>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { href: "/rebuild", t: "Before & after", d: "The old site vs the rebuild, with measured speed results." },
          { href: "/seo-report", t: "SEO audit", d: "Top 10 problems that hide a site from Google, in plain English." },
          { href: "/care-report", t: "Monthly care report", d: "What was done this month, health checks and next steps." },
        ].map((r) => (
          <li key={r.href}>
            <Link href={r.href} className={CARD}>
              <span className="block text-lg font-black tracking-tight group-hover:underline">{r.t}</span>
              <span className="mt-1 block text-sm text-steel">{r.d}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-xl bg-char p-8 text-white">
        <h2 className="text-2xl font-black tracking-tight">Want one of these for your business?</h2>
        <p className="mt-2 max-w-xl text-white/75">githzweb builds tools like these into your own website, set up around how your team works.</p>
        <a
          href={demoWhatsApp("tools page")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-md bg-hivis px-5 py-3 font-semibold text-char hover:bg-hivis-dark"
        >
          Ask githzweb on WhatsApp
        </a>
      </div>
    </div>
  );
}
