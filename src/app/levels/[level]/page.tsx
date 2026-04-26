import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { LockedLevelNotice } from "@/components/explorer-module-flow";
import { ModuleList } from "@/components/module-list";
import { getLevel, levels } from "@/data/curriculum";

export function generateStaticParams() {
  return levels.map((level) => ({ level: level.id }));
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelId } = await params;
  const level = getLevel(levelId);

  if (!level) {
    notFound();
  }
  const isLocked = level.access === "locked_future";

  return (
    <main>
      <section className="border-b border-[var(--line)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Link href="/levels" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-black">
            <ArrowLeft size={16} aria-hidden="true" />
            Levels
          </Link>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-[var(--teal-dark)]">{level.label}</p>
              <h1 className="mt-2 text-5xl font-black tracking-normal">{level.name}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{level.summary}</p>
              <p className="mt-4 max-w-3xl text-sm font-bold leading-6">{level.target}</p>
            </div>
            <div className="rounded-lg border border-[var(--line)] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">Access</p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-black">
                {isLocked ? <LockKeyhole size={22} aria-hidden="true" /> : null}
                {isLocked ? "Locked for now" : "Open in MVP"}
              </p>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">Future price: {level.priceLabel}</p>
            </div>
          </div>
        </div>
      </section>
      {isLocked ? (
        <LockedLevelNotice levelName={level.name} />
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <ModuleList level={level} />
        </section>
      )}
    </main>
  );
}
