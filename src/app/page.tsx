import Link from "next/link";
import { ArrowRight, Brain, Gamepad2, GraduationCap, Trophy } from "lucide-react";
import { LevelCard } from "@/components/level-card";
import { levels, totalModuleCount } from "@/data/curriculum";

export default function Home() {
  const featured = levels[0].modules.slice(1, 6);

  return (
    <main>
      <section className="border-b border-[var(--line)] bg-[var(--panel)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-[rgba(19,127,114,0.1)] px-3 py-1.5 text-xs font-black uppercase tracking-normal text-[var(--teal-dark)]">
                {totalModuleCount} modules
              </span>
              <span className="rounded-md bg-[rgba(194,135,36,0.14)] px-3 py-1.5 text-xs font-black uppercase tracking-normal text-[#785115]">
                MVP open access
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-normal sm:text-6xl">
              AI Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              A hands-on curriculum for learning machine learning through games, visual models, and short lessons across Explorer, Engineer, and Researcher levels.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/levels/explorer"
                className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white"
              >
                Start Explorer
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/levels"
                className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black"
              >
                View all levels
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-[var(--line)] bg-white p-4">
            {[
              ["Learn", "Build intuition before notation.", Brain],
              ["Play", "Use small activities to make abstractions visible.", Gamepad2],
              ["Advance", "Move from analogies to real ML mechanics.", GraduationCap],
              ["Track", "Save local progress across lessons.", Trophy],
            ].map(([title, body, Icon]) => (
              <div key={String(title)} className="grid grid-cols-[44px_1fr] gap-3 rounded-lg bg-[var(--background)] p-3">
                <span className="grid size-11 place-items-center rounded-lg bg-[var(--ink)] text-white">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-black">{String(title)}</span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{String(body)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--panel)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-[var(--coral)]">First activities</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal">Explorer play path</h2>
            </div>
            <Link href="/levels/explorer" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black">
              Open path
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {featured.map((module) => (
              <Link
                key={module.id}
                href={`/levels/explorer/modules/${module.id}`}
                className="focus-ring rounded-lg border border-[var(--line)] bg-white p-4 transition hover:border-[var(--teal)]"
              >
                <span className="text-xs font-black text-[var(--muted)]">{module.number}</span>
                <h3 className="mt-2 min-h-14 text-base font-black tracking-normal">{module.activity?.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{module.coreConcept}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
