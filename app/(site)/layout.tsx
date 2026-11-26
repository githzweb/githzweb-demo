import { DemoBanner } from "@/components/DemoBanner";
import { Footer, Header } from "@/components/SiteChrome";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
