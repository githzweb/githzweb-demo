import Link from "next/link";

import { DEMO, NAV, demoWhatsApp } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${DEMO.name} home`}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-hivis font-black text-char">DH</span>
      <span className="leading-tight">
        <span className="block text-[17px] font-extrabold tracking-tight">Demo Hardware Co.</span>
        <span className="block font-mono text-[10px] uppercase tracking-widest text-steel">Tools · Fasteners · Supplies</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="border-b border-rule bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[15px] font-medium text-steel hover:text-char">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={demoWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-char px-4 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          Get a quote
        </a>
      </div>
      <div className="hazard h-1" aria-hidden />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-char text-white/80">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">Demo Hardware Co.</p>
          <p className="mt-2 text-sm">{DEMO.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white/50">Pages</p>
          <ul className="space-y-1.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white/50">About this demo</p>
          <p>
            A fictional company. This catalogue website was built by{" "}
            <a href={DEMO.githzwebUrl} className="font-semibold text-hivis hover:underline">
              githzweb
            </a>{" "}
            to show what we build for Malaysian suppliers.
          </p>
        </div>
      </div>
    </footer>
  );
}
