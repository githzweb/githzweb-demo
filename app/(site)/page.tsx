import { DEMO, demoWhatsApp } from "@/lib/site";

// Milestone 0 placeholder. The full catalogue home page arrives in Milestone 1.
export default function Home() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:py-28">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Johor · Supplying contractors &amp; workshops</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] font-black tracking-tight md:text-7xl">
          Tools and site supplies, <span className="bg-hivis px-2">easy to find.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-steel">{DEMO.tagline}</p>
        <p className="mt-10 inline-block rounded-md border border-rule bg-white px-4 py-3 text-sm text-steel">
          The full product catalogue is being set up. Check back soon.
        </p>
        <div className="mt-6">
          <a
            href={demoWhatsApp("home page")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-char px-5 py-3 font-semibold text-white"
          >
            Ask githzweb about a site like this
          </a>
        </div>
      </div>
    </section>
  );
}
