"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Play } from "lucide-react";
import { type Level } from "@/data/curriculum";
import { useProgress } from "@/components/progress-provider";

export function ModuleList({ level }: { level: Level }) {
  const progress = useProgress();

  return (
    <div className="grid gap-3">
      {level.modules.map((module) => {
        const key = `${level.id}:${module.id}`;
        const isDone = progress.isLessonComplete(key);

        return (
          <Link
            href={`/levels/${level.id}/modules/${module.id}`}
            key={module.id}
            className="focus-ring grid gap-4 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 transition hover:border-[var(--teal)] sm:grid-cols-[96px_1fr_auto] sm:items-center"
          >
            <div className="flex items-center gap-3 sm:block">
              <span className="grid size-11 place-items-center rounded-lg bg-[var(--ink)] text-sm font-black text-white">
                {module.number}
              </span>
              <span className="sm:sr-only">{isDone ? "Complete" : "Open"}</span>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-normal">{module.title}</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{module.coreConcept}</p>
            </div>
            <div className="flex items-center gap-3 text-sm font-black">
              {module.activity ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-[rgba(19,127,114,0.1)] px-2 py-1 text-[var(--teal-dark)]">
                  <Play size={14} aria-hidden="true" />
                  Activity
                </span>
              ) : null}
              {isDone ? (
                <CheckCircle2 className="text-[var(--teal)]" size={20} aria-hidden="true" />
              ) : (
                <Circle className="text-[var(--muted)]" size={20} aria-hidden="true" />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
