import { DEMO, demoWhatsApp } from "@/lib/site";

/** Fixed notice on every page: this is a demo, not a real shop. */
export function DemoBanner() {
  return (
    <div className="sticky top-0 z-50 bg-char text-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-[13px]">
        <p>
          <span className="mr-2 rounded bg-hivis px-1.5 py-0.5 font-mono text-[11px] font-semibold text-char">DEMO</span>
          Demo site built by{" "}
          <a href={DEMO.githzwebUrl} className="font-semibold underline underline-offset-2">
            githzweb
          </a>
          . Not a real shop. Products and prices are made up.
        </p>
        <a
          href={demoWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-hivis hover:underline"
        >
          Want a site like this? &rarr;
        </a>
      </div>
    </div>
  );
}
