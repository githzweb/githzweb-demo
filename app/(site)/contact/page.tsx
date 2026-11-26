import type { Metadata } from "next";

import { DEMO, demoWhatsApp } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-14">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Get in touch</h1>
      <p className="mt-4 max-w-xl text-steel">
        On a real client site this page has the shop&rsquo;s address, opening hours, map and enquiry form. Because
        Demo Hardware Co. is fictional, every message here goes to <strong className="text-char">githzweb</strong>,
        the team that built it.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={demoWhatsApp("contact page")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-wa p-6 font-semibold text-white hover:brightness-95"
        >
          <span className="block text-lg">WhatsApp githzweb</span>
          <span className="mt-1 block text-sm font-normal text-white/85">Ask about a catalogue site like this one</span>
        </a>
        <a href={DEMO.githzwebUrl} className="rounded-lg border border-rule p-6 font-semibold hover:border-char">
          <span className="block text-lg">Visit githzweb.netlify.app</span>
          <span className="mt-1 block text-sm font-normal text-steel">Services, prices and a real case study</span>
        </a>
      </div>
      <dl className="mt-10 grid gap-x-8 gap-y-3 rounded-lg border border-rule p-6 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-steel">Opening hours (example)</dt>
          <dd className="font-medium">Mon–Fri 8:30am–6pm · Sat 8:30am–1pm</dd>
        </div>
        <div>
          <dt className="text-steel">Address (example)</dt>
          <dd className="font-medium">Not a real address: this shop is fictional</dd>
        </div>
      </dl>
    </div>
  );
}
