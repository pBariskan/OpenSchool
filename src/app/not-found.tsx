import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-black uppercase tracking-normal text-[var(--coral)]">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal">That lesson path does not exist.</h1>
        <Link
          href="/levels"
          className="focus-ring mt-8 inline-flex rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white"
        >
          Back to levels
        </Link>
      </div>
    </main>
  );
}
