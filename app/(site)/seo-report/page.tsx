import type { Metadata } from "next";
import Link from "next/link";

import { ReportShell, SectionTitle, Stat } from "@/components/ReportShell";
import { getProducts } from "@/lib/catalogue";
import audit from "@/content/seo-audit.json";
import m from "@/content/rebuild-measurements.json";

export const metadata: Metadata = { title: "Sample SEO audit report" };

const mbFromKb = (kb: number) => `${(kb / 1024).toFixed(1)} MB`;

export default async function SeoReportPage() {
  const productCount = (await getProducts()).length;
  const measuredOn = new Date(m.before.fetchTime).toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" });

  const issues = [
    {
      problem: "Huge, unoptimised images",
      why: `The page downloads ${mbFromKb(m.before.pageWeightKb)}. On mobile data the main content took ${m.before.lcpSeconds}s to appear, and most visitors leave before that.`,
      fix: `Convert to modern formats (saves about ${mbFromKb(audit.imageFormatSavingsKb)}) and serve the right size for each screen.`,
      measured: true,
    },
    {
      problem: "Text too small to read on phones",
      why: `Only ${audit.legibleTextBefore}% of the text is a readable size on a phone. Google ranks mobile-unfriendly pages lower.`,
      fix: "Mobile-first layout with readable type.",
      measured: true,
    },
    {
      problem: "Products have no pages of their own",
      why: "All products sit in one table, so Google can't show a page for “M10 hex bolt” or “brass ball valve 1 inch”. Each product is a missed search.",
      fix: `A page per product with its own title and description (${productCount} pages in the rebuild).`,
      measured: false,
    },
    {
      problem: "Catalogue only as a PDF",
      why: "Search engines and phone users struggle with a 24 MB PDF, and it goes out of date the day prices change.",
      fix: "Products live on the website; the PDF is generated from it automatically.",
      measured: false,
    },
    {
      problem: "No structured data",
      why: "Google gets no machine-readable product names, prices or brands, so no rich results in search.",
      fix: "Product and business JSON-LD on every relevant page.",
      measured: false,
    },
    {
      problem: "Menu links go nowhere",
      why: "The top menu points to “#”. Visitors and Google both hit dead ends.",
      fix: "Real pages for products, collections, about and contact.",
      measured: false,
    },
    {
      problem: "Images without set sizes",
      why: `${audit.unsizedImagesBefore} images have no width/height, so the page jumps around while loading.`,
      fix: "Every image gets fixed dimensions.",
      measured: true,
    },
    {
      problem: "Low-contrast text",
      why: `${audit.contrastIssuesBefore} text element is hard to read against its background.`,
      fix: "Colours chosen to pass contrast checks.",
      measured: true,
    },
    {
      problem: "“Please call” instead of prices",
      why: "Buyers comparing suppliers at night can't get an answer, so they move on.",
      fix: "Prices or a one-tap WhatsApp enquiry on every product.",
      measured: false,
    },
    {
      problem: "No search",
      why: "Contractors know the model number they want. Without search, they scroll or leave.",
      fix: "Instant search by name or model number.",
      measured: false,
    },
  ];

  const setup = [
    "Google Search Console verified and sitemap submitted",
    "Google Business Profile checked (name, hours, map pin, link to site)",
    "Unique page titles and descriptions for every page",
    "Share-preview images so links look good on WhatsApp and Facebook",
    "Old links redirected so existing Google rankings aren't lost",
    "Product and business structured data (JSON-LD)",
  ];

  return (
    <ReportShell
      kind="SEO audit"
      title="Why customers can't find Demo Hardware Co. on Google, and what we fixed"
      period={`Audit of the old site · measured ${measuredOn}`}
      intro="We tested the old website the way Google does, on a mid-range phone over mobile data. Below are the top problems in plain English, why each one costs you customers, and what the rebuild changed."
      context="SEO audit report"
    >
      <section>
        <SectionTitle n="01">Summary</SectionTitle>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat big={`${m.before.performance} → ${m.after.performance}`} label="Speed score (mobile)" note="measured" />
          <Stat big={`${m.before.lcpSeconds}s → ${m.after.lcpSeconds}s`} label="Main content appears" note="measured" />
          <Stat big={`${audit.legibleTextBefore}% → ${audit.legibleTextAfter}%`} label="Text readable on phones" note="measured" />
          <Stat big={`1 → ${productCount}`} label="Pages Google can rank" note="product pages" />
        </div>
      </section>

      <section>
        <SectionTitle n="02">Top 10 problems on the old site</SectionTitle>
        <ol className="mt-5 space-y-4">
          {issues.map((x, i) => (
            <li key={x.problem} className="grid gap-3 rounded-lg border border-rule p-4 break-inside-avoid md:grid-cols-[32px_1fr_1fr]">
              <span className="font-mono text-sm font-semibold text-steel">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-bold">{x.problem}</p>
                <p className="mt-1 text-sm text-steel">{x.why}</p>
              </div>
              <div className="text-sm">
                <p>
                  <span className="mr-1.5 rounded bg-[#e3f5e9] px-1.5 py-0.5 text-[11px] font-semibold text-[#1d7a3a]">Fixed</span>
                  {x.fix}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-steel">
                  {x.measured ? "measured by test" : "found by review"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionTitle n="03">Standard setup included with every githzweb site</SectionTitle>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {setup.map((s) => (
            <li key={s} className="flex gap-2.5 text-sm">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-char text-[11px] text-white">✓</span>
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-steel">
          The demo shop itself is hidden from Google on purpose (it&rsquo;s not a real business), so it has no search
          rankings to report. On a client site, this section also shows search clicks and top keywords from Search Console.
        </p>
      </section>

      <section className="print:hidden">
        <SectionTitle n="04">See it yourself</SectionTitle>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link href="/before" className="rounded-md border border-rule px-4 py-2.5 font-semibold hover:border-char">
            Old site &rarr;
          </Link>
          <Link href="/rebuild" className="rounded-md border border-rule px-4 py-2.5 font-semibold hover:border-char">
            Before &amp; after &rarr;
          </Link>
          <Link href="/" className="rounded-md border border-rule px-4 py-2.5 font-semibold hover:border-char">
            New site &rarr;
          </Link>
        </div>
      </section>
    </ReportShell>
  );
}
