"use client";

export function PrintButton({ label = "Print / save as PDF" }: { label?: string }) {
  return (
    <button onClick={() => window.print()} className="rounded-md bg-char px-5 py-3 font-semibold text-white hover:bg-black print:hidden">
      {label}
    </button>
  );
}
