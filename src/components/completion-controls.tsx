"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useProgress } from "@/components/progress-provider";

export function CompletionControls({ lessonKey }: { lessonKey: string }) {
  const progress = useProgress();
  const isComplete = progress.isLessonComplete(lessonKey);

  return (
    <button
      type="button"
      onClick={() => progress.toggleLesson(lessonKey)}
      className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white sm:w-auto"
    >
      {isComplete ? <CheckCircle2 size={18} aria-hidden="true" /> : <Circle size={18} aria-hidden="true" />}
      {isComplete ? "Completed" : "Mark complete"}
    </button>
  );
}
