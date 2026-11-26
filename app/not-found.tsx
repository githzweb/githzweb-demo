import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-steel">Demo Hardware Co. (demo by githzweb)</p>
      <h1 className="mt-3 text-5xl font-black tracking-tight">Page not found</h1>
      <p className="mt-4 text-steel">This page doesn&rsquo;t exist, or it&rsquo;s still being built.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-char px-5 py-3 font-semibold text-white">
        Back to home
      </Link>
    </main>
  );
}
