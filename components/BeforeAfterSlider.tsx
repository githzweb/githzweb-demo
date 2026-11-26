"use client";

/* eslint-disable @next/next/no-img-element -- small static screenshots, static export */
import { useState } from "react";

/** Drag (or use arrow keys on) the handle to compare the old and new site. */
export function BeforeAfterSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative overflow-hidden rounded-[28px] border-[10px] border-char bg-char shadow-2xl select-none">
        <img src={after} alt={`${alt}: after`} className="block w-full" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${alt}: before`} className="block h-full w-full object-cover object-top" draggable={false} />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-hivis" />
          <div className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full bg-hivis font-bold text-char shadow-lg">
            ⇆
          </div>
        </div>
        <span className="absolute top-3 left-3 rounded bg-char/85 px-2 py-0.5 font-mono text-[11px] text-white">BEFORE</span>
        <span className="absolute top-3 right-3 rounded bg-hivis px-2 py-0.5 font-mono text-[11px] text-char">AFTER</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-3 text-center text-sm text-steel">Drag across the screen to compare</p>
    </div>
  );
}
