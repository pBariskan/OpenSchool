import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, Layers3 } from "lucide-react";
import "./globals.css";
import { ProgressProvider } from "@/components/progress-provider";

export const metadata: Metadata = {
  title: "AI Explorer",
  description: "Interactive AI and machine learning curriculum across three learning levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <header className="border-b border-[var(--line)] bg-[rgba(255,253,248,0.88)] backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-[var(--ink)] text-white">
                  <BrainCircuit size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-black tracking-normal">AI Explorer</span>
                  <span className="block text-xs font-bold uppercase tracking-normal text-[var(--muted)]">
                    Interactive ML Curriculum
                  </span>
                </span>
              </Link>
              <nav className="flex items-center gap-2">
                <Link
                  href="/levels"
                  className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-bold"
                >
                  <Layers3 size={16} aria-hidden="true" />
                  Levels
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
