import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ProductBrowser } from "@/components/ProductBrowser";
import { getBrands, getCollections, getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "All products" };

export default async function ProductsPage() {
  const [products, collections, brands] = await Promise.all([getProducts(), getCollections(), getBrands()]);
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-steel">
        <Link href="/" className="hover:text-char">
          Home
        </Link>{" "}
        / <span className="text-char">Products</span>
      </nav>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">All products</h1>
      <p className="mt-2 max-w-2xl text-steel">
        {products.length} products across {collections.length} collections. Search by name or model number, then
        ask for a price on WhatsApp.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-steel">Loading products…</p>}>
          <ProductBrowser products={products} collections={collections} brands={brands} />
        </Suspense>
      </div>
    </div>
  );
}
