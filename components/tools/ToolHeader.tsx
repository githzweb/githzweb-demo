import Link from "next/link";

import { demoWhatsApp } from "@/lib/site";

/** Shared heading for each tool page: what it does, and what it saves. */
export function ToolHeader({ title, intro, saves, context }: { title: string; intro: string; saves: string; context: string }) {
  return (
    <div className="mb-8">
      <nav aria-label="Breadcrumb" className="text-sm text-steel">
        <Link href="/" className="hover:text-char">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/tools" className="hover:text-char">
          Tools
        </Link>{" "}
        / <span className="text-char">{title}</span>
      </nav>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-steel">{intro}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-lg border-l-4 border-hivis bg-sand px-5 py-4">
        <p className="text-sm">
          <strong>What this saves a supplier:</strong> {saves}
        </p>
        <a
          href={demoWhatsApp(context)}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto whitespace-nowrap text-sm font-semibold underline underline-offset-2"
        >
          Want this for your business? &rarr;
        </a>
      </div>
    </div>
  );
}
