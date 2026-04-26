"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { ExplorerModuleFlow } from "@/components/explorer-module-flow";
import { useProgress } from "@/components/progress-provider";
import { type Level, type Module } from "@/data/curriculum";

export function ModuleAccessGate({
  level,
  module,
  lessonKey,
}: {
  level: Level;
  module: Module;
  lessonKey: string;
}) {
  const progress = useProgress();
  const moduleIndex = level.modules.findIndex((item) => item.id === module.id);
  const previousModule = moduleIndex > 0 ? level.modules[moduleIndex - 1] : undefined;
  const isLocked = Boolean(previousModule && progress.ready && !progress.isLessonComplete(`${level.id}:${previousModule.id}`));

  if (previousModule && !progress.ready) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-8">
          <h2 className="text-2xl font-black tracking-normal">Checking module progress</h2>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">We are checking which modules you have unlocked on this device.</p>
        </div>
      </section>
    );
  }

  if (isLocked && previousModule) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-8">
          <span className="mx-auto grid size-12 place-items-center rounded-lg bg-[rgba(30,37,36,0.08)] text-[var(--ink)]">
            <LockKeyhole size={24} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-normal">Module locked</h2>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">
            Complete {previousModule.number}: {previousModule.title} before opening this module.
          </p>
          <Link
            href={`/levels/${level.id}/modules/${previousModule.id}`}
            className="focus-ring mt-6 inline-flex rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white"
          >
            Go to {previousModule.number}: {previousModule.title}
          </Link>
        </div>
      </section>
    );
  }

  return <ExplorerModuleFlow key={lessonKey} module={module} lessonKey={lessonKey} />;
}
