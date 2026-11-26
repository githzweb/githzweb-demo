"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { answer, SUGGESTIONS, type BotLink, type MiniProduct } from "@/lib/faq";
import { demoWhatsApp } from "@/lib/site";

type Msg = { from: "bot" | "you"; text: string; links?: BotLink[]; handover?: boolean };

const WELCOME: Msg = {
  from: "bot",
  text: "Hi! I can answer questions about delivery, payment, bulk prices and warranty, or find a product by name or model number.",
};

export function FaqBot({ products }: { products: MiniProduct[] }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-faq", show);
    return () => window.removeEventListener("open-faq", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function ask(q: string) {
    const question = q.trim();
    if (!question) return;
    const a = answer(question, products);
    setMsgs((m) => [
      ...m,
      { from: "you", text: question },
      a
        ? { from: "bot", text: a.text, links: a.links }
        : { from: "bot", text: "I'm not sure about that one. A person can help on WhatsApp.", handover: true },
    ]);
    setText("");
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(text);
  };

  return (
    <div className="print:hidden">
      {open ? (
        <div
          role="dialog"
          aria-label="Questions? Ask the shop assistant"
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(560px,80vh)] flex-col overflow-hidden rounded-xl border border-rule bg-white shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[370px]"
        >
          <div className="flex items-center justify-between bg-char px-4 py-3 text-white">
            <div>
              <p className="font-bold">Shop assistant</p>
              <p className="text-xs text-white/60">Instant answers · demo, no AI fees</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded px-2 py-1 text-lg hover:bg-white/10">
              ✕
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-sand p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "you" ? "justify-end" : ""}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-[14px] leading-snug ${
                    m.from === "you" ? "bg-char text-white" : "border border-rule bg-white"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.links?.length ? (
                    <ul className="mt-2 space-y-1.5">
                      {m.links.map((l) => (
                        <li key={l.href}>
                          {l.href.startsWith("http") ? (
                            <a href={l.href} className="font-semibold underline underline-offset-2">
                              {l.label}
                            </a>
                          ) : (
                            <Link href={l.href} onClick={() => setOpen(false)} className="font-semibold underline underline-offset-2">
                              {l.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {m.handover ? (
                    <a
                      href={demoWhatsApp(`FAQ assistant: "${msgs[i - 1]?.text ?? ""}"`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block rounded-md bg-wa px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      Chat on WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-rule bg-white p-3">
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="shrink-0 rounded-full border border-rule px-3 py-1 text-xs hover:border-char"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a question or model number…"
                aria-label="Your question"
                className="flex-1 rounded-md border border-rule px-3 py-2.5 text-sm outline-none focus:border-char"
              />
              <button className="rounded-md bg-char px-4 text-sm font-semibold text-white">Ask</button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-char py-3 pr-5 pl-4 font-semibold text-white shadow-xl hover:bg-black"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-hivis text-sm text-char" aria-hidden>
            ?
          </span>
          Questions?
        </button>
      )}
    </div>
  );
}
