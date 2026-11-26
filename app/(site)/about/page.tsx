import type { Metadata } from "next";

import { DEMO, demoWhatsApp } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-14">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">About</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">About Demo Hardware Co.</h1>
      <div className="mt-6 rounded-lg border-l-4 border-hivis bg-sand p-5">
        <p className="font-semibold">This company doesn&rsquo;t exist.</p>
        <p className="mt-1 text-steel">
          Demo Hardware Co. is a made-up supplier. Its products, brands and prices are invented. The website is real:{" "}
          <a href={DEMO.githzwebUrl} className="font-semibold text-char underline underline-offset-2">
            githzweb
          </a>{" "}
          built it to show Malaysian suppliers what their own catalogue website could look like.
        </p>
      </div>
      <h2 className="mt-12 text-2xl font-black tracking-tight">What this demo shows</h2>
      <ul className="mt-4 space-y-3 text-steel">
        <li>
          <strong className="text-char">A full product catalogue:</strong> 100+ products in collections, with
          sizes, model numbers and specs.
        </li>
        <li>
          <strong className="text-char">Search that understands model numbers:</strong> type &ldquo;kt ag125&rdquo;
          or &ldquo;M10&rdquo; and the right items come up.
        </li>
        <li>
          <strong className="text-char">WhatsApp enquiries on every product,</strong> with the product name already
          filled in.
        </li>
        <li>
          <strong className="text-char">An editing screen (Sanity Studio)</strong> where staff add products and
          change prices without code.
        </li>
        <li>
          <strong className="text-char">Products imported automatically</strong> from a spreadsheet, the same way
          githzweb moves a client&rsquo;s existing catalogue.
        </li>
      </ul>
      <a
        href={demoWhatsApp("about page")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-md bg-char px-5 py-3 font-semibold text-white"
      >
        Talk to githzweb about your catalogue
      </a>
    </div>
  );
}
