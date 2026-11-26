import { DemoBanner } from "@/components/DemoBanner";
import { Footer, Header } from "@/components/SiteChrome";
import { FaqBot } from "@/components/tools/FaqBot";
import { getProducts } from "@/lib/catalogue";
import type { MiniProduct } from "@/lib/faq";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  // A small product index so the FAQ assistant can answer "price of KT-AG125".
  const mini: MiniProduct[] = (await getProducts()).map((p) => ({
    slug: p.slug,
    name: p.name,
    model: p.model,
    price: p.priceOnRequest || p.price == null ? null : p.price,
    variants: p.variants.map((v) => v.label),
  }));
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FaqBot products={mini} />
    </>
  );
}
