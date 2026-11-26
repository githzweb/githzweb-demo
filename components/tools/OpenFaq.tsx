"use client";

import type { ReactNode } from "react";

/** Opens the FAQ assistant (FaqBot listens for this event). */
export function OpenFaq({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-faq"))} className={`text-left ${className ?? ""}`}>
      {children}
    </button>
  );
}
