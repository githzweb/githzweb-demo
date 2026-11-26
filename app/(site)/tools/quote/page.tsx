import type { Metadata } from "next";

import { QuoteTool, type QuoteProduct } from "@/components/tools/QuoteTool";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Quote generator" };

export default async function QuotePage() {
  const products: QuoteProduct[] = (await getProducts()).map((p) => ({
    slug: p.slug,
    name: p.name,
    model: p.model,
    brand: p.brand?.name,
    unit: p.unit,
    price: p.priceOnRequest || p.price == null ? null : p.price,
    variants: p.variants,
  }));
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10 md:py-14">
      <div className="print:hidden">
        <ToolHeader
          title="Quote generator"
          intro="Customers build their own quote from the catalogue: sizes, quantities and bulk discounts worked out automatically, then printed as a PDF or sent on WhatsApp."
          saves="the back-and-forth of typing quotes in Excel or Word for every enquiry, and pricing mistakes."
          context="quote generator tool"
        />
      </div>
      <QuoteTool products={products} />
    </div>
  );
}
