import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tools" };

const TOOLS = [
  { t: "Excel → catalogue importer", d: "Upload a messy product sheet and see it cleaned into product pages." },
  { t: "Quote generator", d: "Pick products and quantities and get a printable quote." },
  { t: "FAQ assistant", d: "Instant answers to delivery, payment and stock questions." },
  { t: "Printable catalogue", d: "A PDF catalogue that updates itself from the website." },
];

// Milestone 2 replaces this page with the working tools.
export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-14">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Coming next</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Business tools</h1>
      <p className="mt-4 max-w-xl text-steel">
        Small automations that save a supplier&rsquo;s team hours every week. They&rsquo;re being built now.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((x) => (
          <li key={x.t} className="rounded-lg border border-dashed border-rule p-6">
            <span className="rounded bg-sand px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-steel">Soon</span>
            <h2 className="mt-3 text-lg font-bold">{x.t}</h2>
            <p className="mt-1 text-sm text-steel">{x.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
