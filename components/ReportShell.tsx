import type { ReactNode } from "react";

import { PrintButton } from "@/components/tools/PrintButton";
import { DEMO, demoWhatsApp } from "@/lib/site";

/** Page wrapper that makes a report look like the PDF a client would receive. */
export function ReportShell({
  kind,
  title,
  period,
  intro,
  context,
  children,
}: {
  kind: string;
  title: string;
  period: string;
  intro: string;
  context: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-10 md:py-14 print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border-l-4 border-hivis bg-sand px-5 py-4 print:hidden">
        <p className="text-sm">
          <strong>Sample report.</strong> This is the format githzweb sends clients. It&rsquo;s written about the demo
          shop, using numbers measured on these demo pages.
        </p>
        <div className="flex items-center gap-3">
          <PrintButton label="Save as PDF" />
          <a href={demoWhatsApp(context)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-2">
            Get one for your site &rarr;
          </a>
        </div>
      </div>

      <article className="rounded-xl border border-rule bg-white print:border-0">
        <header className="relative overflow-hidden rounded-t-xl bg-char p-8 text-white md:p-10 print:rounded-none">
          <div className="hazard absolute inset-x-0 top-0 h-1.5" aria-hidden />
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-hivis">{kind}</p>
              <h1 className="mt-2 text-3xl leading-tight font-black tracking-tight md:text-4xl">{title}</h1>
              <p className="mt-2 text-white/70">
                Prepared for {DEMO.name} · {period}
              </p>
            </div>
            <div className="text-right text-sm text-white/70">
              <p className="text-lg font-black text-white">
                githz<span className="text-hivis">web</span>
              </p>
              <p>githzweb.netlify.app</p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-white/85">{intro}</p>
        </header>
        <div className="space-y-10 p-6 md:p-10">{children}</div>
        <footer className="border-t border-rule px-6 py-4 text-xs text-steel md:px-10">
          Sample report by githzweb about a fictional company (Demo Hardware Co.). Numbers marked
          &ldquo;measured&rdquo; come from tests on the live demo pages; numbers marked &ldquo;example&rdquo; show the format only.
        </footer>
      </article>
    </div>
  );
}

export function Stat({ big, label, note }: { big: string; label: string; note?: string }) {
  return (
    <div className="rounded-lg border border-rule p-4 break-inside-avoid">
      <p className="text-xl leading-tight font-black tracking-tight sm:text-2xl md:text-3xl">{big}</p>
      <p className="mt-1 text-sm font-semibold">{label}</p>
      {note ? <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-steel">{note}</p> : null}
    </div>
  );
}

export function SectionTitle({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 border-b-2 border-char pb-2 text-xl font-black tracking-tight">
      <span className="font-mono text-sm text-steel">{n}</span>
      {children}
    </h2>
  );
}
