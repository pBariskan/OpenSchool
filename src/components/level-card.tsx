"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole, LockOpen, Sparkles } from "lucide-react";
import { type Level } from "@/data/curriculum";
import { useProgress } from "@/components/progress-provider";

const accentClasses = {
  teal: "border-[rgba(19,127,114,0.35)] bg-[rgba(19,127,114,0.08)]",
  gold: "border-[rgba(194,135,36,0.35)] bg-[rgba(194,135,36,0.1)]",
  coral: "border-[rgba(219,91,69,0.35)] bg-[rgba(219,91,69,0.09)]",
};

export function LevelCard({ level }: { level: Level }) {
  const progress = useProgress();
  const complete = progress.levelProgress(level.id);
  const isLocked = level.access === "locked_future";

  const body = (
    <>
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-white px-2.5 py-1 text-xs font-black uppercase tracking-normal text-[var(--muted)]">
            {level.label}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--line)] bg-white px-2.5 py-1 text-xs font-black">
            {isLocked ? <LockKeyhole size={13} aria-hidden="true" /> : <LockOpen size={13} aria-hidden="true" />}
            {isLocked ? "Locked" : "MVP open"}
          </span>
        </div>
        <h2 className="mt-5 text-3xl font-black tracking-normal">{level.name}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{level.summary}</p>
        <p className="mt-4 text-sm font-bold leading-6">{level.target}</p>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between text-sm font-black">
          <span>{level.modules.length} modules</span>
          <span>{level.priceLabel}</span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white">
          <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${isLocked ? 0 : complete}%` }} />
        </div>
        <div className="mt-5 flex items-center justify-between text-sm font-black">
          <span className="inline-flex items-center gap-2">
            {isLocked ? <LockKeyhole size={16} aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}
            {isLocked ? "Detailed content coming later" : `${complete}% complete`}
          </span>
          {isLocked ? null : <ArrowRight size={18} aria-hidden="true" />}
        </div>
      </div>
    </>
  );

  if (isLocked) {
    return (
      <div
        aria-disabled="true"
        className={`grid min-h-[360px] content-between rounded-lg border p-5 opacity-75 ${accentClasses[level.accent]}`}
      >
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/levels/${level.id}`}
      className={`focus-ring grid min-h-[360px] content-between rounded-lg border p-5 transition hover:-translate-y-0.5 hover:bg-white ${accentClasses[level.accent]}`}
    >
      {body}
    </Link>
  );
}
