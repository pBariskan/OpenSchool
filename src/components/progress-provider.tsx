"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { levels, type LevelId } from "@/data/curriculum";

type StoredProgress = {
  lessons: string[];
  activities: string[];
};

type ProgressContextValue = {
  ready: boolean;
  isLessonComplete: (lessonKey: string) => boolean;
  isActivityComplete: (activityKey: string) => boolean;
  toggleLesson: (lessonKey: string) => void;
  completeActivity: (activityKey: string) => void;
  levelProgress: (levelId: LevelId) => number;
};

const STORAGE_KEY = "ai-explorer-progress-v1";

const ProgressContext = createContext<ProgressContextValue | null>(null);

function persistProgress(nextLessons: Set<string>, nextActivities: Set<string>) {
  const payload: StoredProgress = {
    lessons: Array.from(nextLessons),
    activities: Array.from(nextActivities),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lessons, setLessons] = useState<Set<string>>(new Set());
  const [activities, setActivities] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as StoredProgress;
          setLessons(new Set(parsed.lessons ?? []));
          setActivities(new Set(parsed.activities ?? []));
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const payload: StoredProgress = {
      lessons: Array.from(lessons),
      activities: Array.from(activities),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activities, lessons, ready]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ready,
      isLessonComplete: (lessonKey) => lessons.has(lessonKey),
      isActivityComplete: (activityKey) => activities.has(activityKey),
      toggleLesson: (lessonKey) => {
        setLessons((current) => {
          const next = new Set(current);
          if (next.has(lessonKey)) {
            next.delete(lessonKey);
          } else {
            next.add(lessonKey);
          }
          persistProgress(next, activities);
          return next;
        });
      },
      completeActivity: (activityKey) => {
        setActivities((current) => {
          const next = new Set(current).add(activityKey);
          persistProgress(lessons, next);
          return next;
        });
      },
      levelProgress: (levelId) => {
        const level = levels.find((item) => item.id === levelId);
        if (!level) return 0;
        const completed = level.modules.filter((module) => lessons.has(`${levelId}:${module.id}`)).length;
        return Math.round((completed / level.modules.length) * 100);
      },
    }),
    [activities, lessons, ready],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
}
