import type { Metadata } from "next";
import Link from "next/link";

import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { demoWhatsApp } from "@/lib/site";
import m from "@/content/rebuild-measurements.json";

export const metadata: Metadata = { title: "Before & after: website rebuild" };

type Row = { label: string; before: string; after: string; better: boolean };

function Table({ rows, caption }: { rows: Row[]; caption: string }) {
  return (
  <table className="w-full text-sm">
    <caption className="mb-3 text-left font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">{caption}</caption>
    <thead>
      <tr className="border-b-2 border-char text-left">
        <th className="py-2 pr-3" />
        <th className="py-2 pr-3">Before</th>
        <th className="py-2">After</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r) => (
        <tr key={r.label} className="border-b border-rule">
          <td className="py-3 pr-3 text-steel">{r.label}</td>
          <td className="py-3 pr-3">{r.before}</td>
          <td className="py-3 font-bold">
            {r.better ? <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#1d9a4a] align-middle" aria-hidden /> : null}
            {r.after}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" });

export default function RebuildPage() {
  const b = m.before;
  const a = m.after;
  const mb = (kb: number) => (kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`);

  const measured: Row[] = [
    { label: "Speed score (Lighthouse, mobile)", before: `${b.performance}/100`, after: `${a.performance}/100`, better: a.performance > b.performance },
    { label: "Main content shows after", before: `${b.lcpSeconds}s`, after: `${a.lcpSeconds}s`, better: a.lcpSeconds < b.lcpSeconds },
    { label: "Data downloaded", before: mb(b.pageWeightKb), after: mb(a.pageWeightKb), better: a.pageWeightKb < b.pageWeightKb },
    { label: "Accessibility score", before: `${b.accessibility}/100`, after: `${a.accessibility}/100`, better: a.accessibility > b.accessibility },
  ];

  const features: Row[] = [
    { label: "Customers can search products", before: "No", after: "Yes, by name or model", better: true },
    { label: "Works on phones", before: "Scroll sideways", after: "Yes", better: true },
    { label: "Prices & sizes", before: "“Please call” / PDF", after: "On every product page", better: true },
    { label: "Enquiry", before: "Phone number", after: "WhatsApp with product filled in", better: true },
    { label: "Updating products", before: "Pay a developer", after: "Edit yourself in Studio", better: true },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Website rebuild demo</p>
      <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight md:text-6xl">
        Same shop. <span className="bg-hivis px-2">New website.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-steel">
        Many suppliers still run a site like the &ldquo;before&rdquo; version: a giant banner, a PDF catalogue and
        &ldquo;please call for price&rdquo;. This is what a githzweb rebuild changes, measured on the two live pages.
      </p>

      <div className="mt-12 grid items-start gap-12 md:grid-cols-[380px_1fr]">
        <BeforeAfterSlider before="/rebuild/before.jpg" after="/rebuild/after.jpg" alt="Demo Hardware Co. home page on a phone" />
        <div className="space-y-10">
          <Table rows={measured} caption="Measured" />
          <Table rows={features} caption="What customers can do" />
          <p className="text-xs text-steel">
            Measured with {m.measuredWith} on {fmtDate(a.fetchTime)}. Before ={" "}
            <Link href="/before" className="underline underline-offset-2">
              /before
            </Link>
            , after ={" "}
            <Link href="/" className="underline underline-offset-2">
              home page
            </Link>
            . Scores vary a little between runs. SEO scores are left out because this whole demo is hidden from
            Google on purpose; on a real client site, the rebuild also fixes titles, sitemaps and structured data.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link href="/before" className="rounded-xl border border-rule p-6 hover:border-char">
          <p className="font-mono text-xs text-steel">OPEN</p>
          <p className="mt-1 text-xl font-black">The old &ldquo;before&rdquo; site &rarr;</p>
          <p className="mt-1 text-sm text-steel">Try it on your phone. It&rsquo;s slow on purpose.</p>
        </Link>
        <Link href="/seo-report" className="rounded-xl border border-rule p-6 hover:border-char">
          <p className="font-mono text-xs text-steel">REPORT</p>
          <p className="mt-1 text-xl font-black">The SEO audit of the old site &rarr;</p>
          <p className="mt-1 text-sm text-steel">Top 10 problems and what the rebuild fixed.</p>
        </Link>
        <Link href="/products" className="rounded-xl border border-rule p-6 hover:border-char">
          <p className="font-mono text-xs text-steel">OPEN</p>
          <p className="mt-1 text-xl font-black">The new catalogue &rarr;</p>
          <p className="mt-1 text-sm text-steel">Search 101 products by name or model number.</p>
        </Link>
      </div>

      <div className="mt-10 rounded-xl bg-char p-8 text-white">
        <h2 className="text-2xl font-black tracking-tight">Is your website the &ldquo;before&rdquo;?</h2>
        <p className="mt-2 max-w-xl text-white/75">
          githzweb moves sites off old builders, Framer, Wix or WordPress, imports your products automatically and keeps
          old links working for Google.
        </p>
        <a
          href={demoWhatsApp("rebuild before & after")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-md bg-hivis px-5 py-3 font-semibold text-char hover:bg-hivis-dark"
        >
          Ask about a rebuild on WhatsApp
        </a>
      </div>
    </div>
  );
}
