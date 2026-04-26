import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LockedLevelNotice } from "@/components/explorer-module-flow";
import { ModuleAccessGate } from "@/components/module-access-gate";
import { getModule, levels } from "@/data/curriculum";

export function generateStaticParams() {
  return levels.flatMap((level) =>
    level.modules.map((module) => ({
      level: level.id,
      module: module.id,
    })),
  );
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ level: string; module: string }>;
}) {
  const { level: levelId, module: moduleId } = await params;
  const { level, module } = getModule(levelId, moduleId);

  if (!level || !module) {
    notFound();
  }

  const lessonKey = `${level.id}:${module.id}`;

  return (
    <main>
      <section className="border-b border-[var(--line)] bg-[var(--panel)]">
        <div className="mx-auto max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href={`/levels/${level.id}`}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-black"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {level.name}
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-[var(--teal-dark)]">
                {level.label} · {module.number}
              </p>
              <h1 className="mt-2 max-w-4xl text-4xl font-black tracking-normal sm:text-5xl">{module.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{module.coreConcept}</p>
            </div>
          </div>
        </div>
      </section>

      {level.access === "locked_future" ? (
        <LockedLevelNotice levelName={level.name} />
      ) : (
        <ModuleAccessGate level={level} module={module} lessonKey={lessonKey} />
      )}
    </main>
  );
}
