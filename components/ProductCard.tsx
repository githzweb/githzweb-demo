import Link from "next/link";

import { formatPrice, type Product } from "@/lib/catalogue";

import { Illustration } from "./Illustration";

export function ProductCard({ product }: { product: Product }) {
  const price = formatPrice(product);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-rule bg-white transition-shadow hover:shadow-[0_6px_24px_rgba(28,31,35,0.10)]"
    >
      <div className="relative grid aspect-[4/3] place-items-center bg-sand text-char">
        <Illustration name={product.illustration} className="h-20 w-20 transition-transform duration-300 group-hover:scale-110" />
        {product.variants.length > 0 ? (
          <span className="absolute right-2 top-2 rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-steel">
            {product.variants.length} sizes
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-steel">
          {product.brand?.name} · {product.model}
        </p>
        <h3 className="mt-1.5 flex-1 text-[15px] leading-snug font-semibold group-hover:underline">{product.name}</h3>
        <div className="mt-3 flex items-end justify-between gap-2">
          {price ? (
            <p>
              <span className="text-lg font-extrabold">{price}</span>
              <span className="ml-1 text-xs text-steel">/ {product.unit}</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-steel">Price on request</p>
          )}
        </div>
      </div>
    </Link>
  );
}
