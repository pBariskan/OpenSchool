import { LevelCard } from "@/components/level-card";
import { levels } from "@/data/curriculum";

export default function LevelsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-7">
        <p className="text-xs font-black uppercase tracking-normal text-[var(--teal-dark)]">Curriculum</p>
        <h1 className="mt-2 text-4xl font-black tracking-normal">Choose a level</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </main>
  );
}
