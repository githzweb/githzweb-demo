"use client";

import { useState } from "react";

import { cleanRows, type CleanResult, type Issue } from "@/lib/importer";

const ISSUE_STYLE: Record<Issue["kind"], { label: string; cls: string }> = {
  duplicate: { label: "Duplicate merged", cls: "bg-sand text-char" },
  "price-conflict": { label: "Price conflict", cls: "bg-[#ffe4dc] text-[#8a2a10]" },
  "missing-price": { label: "Missing price", cls: "bg-[#fff3cc] text-[#7a5a00]" },
  "no-code": { label: "Code assigned", cls: "bg-[#e6f0ff] text-[#1f4f99]" },
  uncategorised: { label: "No category", cls: "bg-[#fff3cc] text-[#7a5a00]" },
  review: { label: "Needs a human", cls: "bg-[#ffe4dc] text-[#8a2a10]" },
};

const money = (n: number | null) => (n == null ? "Ask" : `RM${n % 1 ? n.toFixed(2) : n}`);

export function ImporterTool() {
  const [result, setResult] = useState<CleanResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(buf: ArrayBuffer, name: string) {
    setBusy(true);
    setError("");
    try {
      const XLSX = await import("xlsx"); // loaded only when needed
      const wb = XLSX.read(buf);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: "", raw: false });
      const r = cleanRows(rows);
      if (!r.products.length) throw new Error("no products");
      setResult(r);
      setFileName(name);
    } catch {
      setResult(null);
      setError("Couldn't read products from that file. Try an .xlsx or .csv with one product per row.");
    } finally {
      setBusy(false);
    }
  }

  async function trySample() {
    const res = await fetch("/samples/messy-product-list.xlsx");
    await load(await res.arrayBuffer(), "messy-product-list.xlsx (sample)");
  }

  async function download() {
    if (!result) return;
    const XLSX = await import("xlsx");
    const rows = result.products.flatMap((p) =>
      p.variants.map((v) => ({
        Category: p.category,
        Product: p.name,
        "Size / option": v.label,
        "Item code": v.code,
        "Price (RM)": v.price ?? "",
        "Price on request": v.price == null ? "Yes" : "",
        "Sold per": p.unit,
      })),
    );
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clean catalogue");
    XLSX.writeFile(wb, "clean-catalogue.xlsx");
  }

  return (
    <div>
      {/* Step 1 */}
      <div className="rounded-xl border border-rule p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">Step 1 · Your price list</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={trySample}
            disabled={busy}
            className="rounded-md bg-char px-5 py-3 font-semibold text-white hover:bg-black disabled:opacity-60"
          >
            Try it with our messy sample
          </button>
          <label className="cursor-pointer rounded-md border border-char px-5 py-3 font-semibold hover:bg-sand">
            Upload your own .xlsx / .csv
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="sr-only"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) await load(await f.arrayBuffer(), f.name);
                e.target.value = "";
              }}
            />
          </label>
          <a href="/samples/messy-product-list.xlsx" download className="text-sm underline underline-offset-2">
            Download the sample to look at first
          </a>
        </div>
        <p className="mt-3 text-sm text-steel">
          Your file never leaves your computer: everything runs inside your browser.
        </p>
        {busy ? <p className="mt-3 text-sm">Cleaning…</p> : null}
        {error ? (
          <p role="alert" className="mt-3 text-sm font-semibold text-[#8a2a10]">
            {error}
          </p>
        ) : null}
      </div>

      {result ? (
        <>
          {/* Before */}
          <div className="mt-8 rounded-xl border border-rule p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">
              Before · {fileName} · {result.stats.rowsIn} rows
            </p>
            <div className="mt-4 max-h-64 overflow-auto rounded-md border border-rule">
              <table className="w-full text-left font-mono text-[12px]">
                <thead className="sticky top-0 bg-sand">
                  <tr>
                    {result.headerRow.map((h, i) => (
                      <th key={i} className="whitespace-nowrap px-3 py-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rawRows.slice(0, 40).map((r, i) => (
                    <tr key={i} className="border-t border-rule">
                      {result.headerRow.map((_, j) => (
                        <td key={j} className="whitespace-nowrap px-3 py-1.5 text-steel">
                          {r[j] || <span className="opacity-40">·</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              [`${result.stats.rowsIn} → ${result.stats.products}`, "rows became products"],
              [String(result.stats.variants), "sizes / variants grouped"],
              [String(result.stats.duplicatesRemoved), "duplicates merged"],
              [String(result.issues.filter((i) => i.kind === "missing-price" || i.kind === "review" || i.kind === "price-conflict").length), "things for a human to check"],
            ].map(([big, small]) => (
              <div key={small} className="rounded-xl bg-char p-5 text-white">
                <p className="text-3xl font-black">{big}</p>
                <p className="mt-1 text-sm text-white/70">{small}</p>
              </div>
            ))}
          </div>

          {/* Issues */}
          {result.issues.length ? (
            <div className="mt-8 rounded-xl border border-rule p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">What was fixed or flagged</p>
              <ul className="mt-4 space-y-2">
                {result.issues.map((i, k) => (
                  <li key={k} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                    <span className="font-mono text-xs text-steel">Row {i.row}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${ISSUE_STYLE[i.kind].cls}`}>{ISSUE_STYLE[i.kind].label}</span>
                    <span>{i.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* After */}
          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-steel">
                After · {result.stats.products} clean products, ready for the website
              </p>
              <button onClick={download} className="rounded-md bg-hivis px-4 py-2.5 text-sm font-semibold text-char hover:bg-hivis-dark">
                Download clean spreadsheet
              </button>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.products.map((p) => (
                <li key={`${p.name}|${p.unit}`} className="rounded-lg border border-rule p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-steel">{p.category}</p>
                  <p className="mt-1 font-bold leading-snug">{p.name}</p>
                  <p className="text-xs text-steel">Sold per {p.unit}</p>
                  <table className="mt-3 w-full text-[13px]">
                    <tbody>
                      {p.variants.map((v) => (
                        <tr key={v.code} className="border-t border-rule">
                          <td className="py-1.5 pr-2">{v.label}</td>
                          <td className="py-1.5 pr-2 font-mono text-[11px] text-steel">{v.code}</td>
                          <td className={`py-1.5 text-right font-semibold ${v.price == null ? "text-steel" : ""}`}>{money(v.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
