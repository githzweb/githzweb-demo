import type { Metadata } from "next";

import { ImporterTool } from "@/components/tools/ImporterTool";
import { ToolHeader } from "@/components/tools/ToolHeader";

export const metadata: Metadata = { title: "Excel → catalogue importer" };

export default function ImporterPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <ToolHeader
        title="Excel → catalogue importer"
        intro="Drop in a messy price list and watch it become clean, website-ready products: names tidied, sizes grouped, duplicates merged, missing prices flagged."
        saves="days of retyping a product list by hand when moving to a new website, Shopee or Lazada."
        context="Excel importer tool"
      />
      <ImporterTool />
      <p className="mt-10 max-w-2xl text-sm text-steel">
        How it works: this demo uses clear rules that run in your browser (no paid AI service, nothing uploaded).
        For a real client project, githzweb combines rules like these with AI-assisted checking to move whole
        catalogues. The GNS Commercial Equipment site had 323 products imported this way.
      </p>
    </div>
  );
}
