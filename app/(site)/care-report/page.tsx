import type { Metadata } from "next";
import Link from "next/link";

import { ReportShell, SectionTitle, Stat } from "@/components/ReportShell";
import { formatPrice, getCareStats } from "@/lib/catalogue";
import m from "@/content/rebuild-measurements.json";

export const metadata: Metadata = { title: "Sample monthly care report" };

// Work actually done on the demo site this month (from the project's history).
const WORK_LOG = [
  { date: "26 Nov", item: "Set up hosting, CMS and the demo banner" },
  { date: "26 Nov", item: "Imported 101 products from a spreadsheet into the CMS" },
  { date: "26 Nov", item: "Added search, filters and product pages" },
  { date: "26 Nov", item: "Connected the CMS so publishing a change updates the site in about 2 minutes" },
  { date: "26 Nov", item: "Added quote generator, FAQ assistant, importer and printable catalogue" },
  { date: "26 Nov", item: "Fixed the header layout on very small phones" },
  { date: "26 Nov", item: "Built the before & after page with measured speed results" },
];

const NEXT_MONTH = [
  "Add real product photos for the 8 best sellers",
  "Set up Google Business Profile and link it to the site",
  "Add a Bahasa Malaysia version of the top pages",
  "Review prices on “price on request” items with the team",
];

export default async function CareReportPage() {
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const month = now.toLocaleDateString("en-MY", { month: "long", year: "numeric" });
  const s = await getCareStats(monthStart);
  const fmt = (iso: string) => new Date(iso).toLocaleString("en-MY", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kuala_Lumpur" });

  return (
    <ReportShell
      kind="Monthly website care"
      title={`Your website this month: ${month}`}
      period={`${month} · sample report`}
      intro="A one-page summary of what we did on your website this month, how it's performing, and what we suggest next. No jargon, nothing to action unless you want to."
      context="monthly care report"
    >
      <section>
        <SectionTitle n="01">At a glance</SectionTitle>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat big={`${m.after.performance}/100`} label="Speed score (mobile)" note="measured" />
          <Stat big={String(s.products)} label="Products live" note="from the CMS" />
          <Stat big={String(s.updatedThisMonth)} label="Products added or edited" note="from the CMS, this month" />
          <Stat big="99.9%" label="Uptime" note="example figure" />
        </div>
      </section>

      <section>
        <SectionTitle n="02">Work done this month</SectionTitle>
        <ul className="mt-5 divide-y divide-rule">
          {WORK_LOG.map((w) => (
            <li key={w.item} className="flex gap-4 py-2.5 text-sm break-inside-avoid">
              <span className="w-14 shrink-0 font-mono text-xs text-steel">{w.date}</span>
              {w.item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle n="03">Latest product changes</SectionTitle>
        <p className="mt-3 text-sm text-steel">The five most recently edited products, straight from the editing screen.</p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-char text-left">
              <th className="py-2 pr-3">Product</th>
              <th className="py-2 pr-3">Price now</th>
              <th className="py-2 text-right">Last edited</th>
            </tr>
          </thead>
          <tbody>
            {s.recent.map((r) => (
              <tr key={r.slug} className="border-b border-rule">
                <td className="py-2.5 pr-3">
                  <Link href={`/product/${r.slug}`} className="font-semibold hover:underline">
                    {r.name}
                  </Link>{" "}
                  <span className="font-mono text-xs text-steel">{r.model}</span>
                </td>
                <td className="py-2.5 pr-3">{formatPrice(r) ?? "On request"}</td>
                <td className="py-2.5 text-right text-steel">{fmt(r.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <SectionTitle n="04">Health checks</SectionTitle>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["Website online and loading", "Checked"],
            ["All product pages build without errors", "Checked"],
            ["Code backed up on GitHub", "Checked"],
            ["Content history kept in the CMS", "Checked"],
            ["WhatsApp buttons open the right number", "Checked"],
            ["Enquiries this month", "Example: 14 WhatsApp chats"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-3 rounded-md border border-rule px-3 py-2.5">
              <span>{k}</span>
              <span className={`text-xs font-semibold ${v.startsWith("Example") ? "text-steel" : "text-[#1d7a3a]"}`}>{v}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle n="05">Suggested for next month</SectionTitle>
        <ol className="mt-5 list-decimal space-y-1.5 pl-5 text-sm">
          {NEXT_MONTH.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-steel">
          Monthly care with githzweb starts from RM150/month and covers updates like these, small changes, checks and
          this report.
        </p>
      </section>
    </ReportShell>
  );
}
