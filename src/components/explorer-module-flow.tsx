"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Mail,
  PenLine,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { ActivityPlayground } from "@/components/activity-playground";
import { CompletionControls } from "@/components/completion-controls";
import { type Module } from "@/data/curriculum";

const phaseTone = {
  hook: "bg-[rgba(219,91,69,0.09)] text-[var(--coral)]",
  explain: "bg-[rgba(19,127,114,0.1)] text-[var(--teal-dark)]",
  simulate: "bg-[rgba(194,135,36,0.13)] text-[#785115]",
  recall: "bg-[rgba(111,92,194,0.12)] text-[var(--violet)]",
  play: "bg-[rgba(30,37,36,0.08)] text-[var(--ink)]",
  review: "bg-white text-[var(--muted)]",
};

export function ExplorerModuleFlow({
  module,
  lessonKey,
}: {
  module: Module;
  lessonKey: string;
}) {
  const hookStorageKey = useMemo(() => {
    const numericPart = module.number.replace(/\D/g, "");
    if (module.id === "what-is-ai") {
      return `module_${numericPart}_checked_hook_v1`;
    }
    return `module_${numericPart}_hook`;
  }, [module.id, module.number]);

  const [draft, setDraft] = useState("");
  const [hookAnswer, setHookAnswer] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(hookStorageKey);
  });

  const canStart = draft.trim().length >= 10;
  const activityKey = `${lessonKey}:${module.activity?.id ?? "activity"}`;

  function startLearning() {
    if (!canStart) return;
    const answer = draft.trim();
    window.localStorage.setItem(hookStorageKey, answer);
    setHookAnswer(answer);
  }

  function resetHook() {
    window.localStorage.removeItem(hookStorageKey);
    setDraft("");
    setHookAnswer(null);
  }

  if (!hookAnswer && module.id === "what-is-ai") {
    return (
      <M1HookGate
        question={module.hookQuestion ?? "Choose the best answer."}
        onStart={(answer) => {
          window.localStorage.setItem(hookStorageKey, answer);
          setHookAnswer(answer);
        }}
      />
    );
  }

  if (!hookAnswer) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[rgba(219,91,69,0.1)] text-[var(--coral)]">
              <PenLine size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-[var(--coral)]">Hook · answer before content</p>
              <h2 className="mt-1 text-2xl font-black tracking-normal">Start with your own guess</h2>
            </div>
          </div>
          <p className="mt-6 text-2xl font-black leading-9">{module.hookQuestion}</p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="focus-ring mt-6 min-h-40 w-full resize-y rounded-lg border border-[var(--line)] bg-white p-4 text-base leading-7"
            placeholder="Write at least 10 characters. There is no wrong answer."
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-[var(--muted)]">{Math.min(draft.trim().length, 10)}/10 characters</p>
            <button
              type="button"
              disabled={!canStart}
              onClick={startLearning}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              Start learning
              <Sparkles size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-6">
        <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[rgba(19,127,114,0.1)] text-[var(--teal-dark)]">
              <Target size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-normal">Learning goal</h2>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">{module.learningGoal}</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-[var(--coral)]">Your opening answer</p>
              <p className="mt-2 text-base font-bold leading-7">{hookAnswer}</p>
            </div>
            <button
              type="button"
              onClick={resetHook}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-black"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reset
            </button>
          </div>
        </section>

        {module.id === "what-is-ai" ? (
          <WhatIsAiLesson hookAnswer={hookAnswer} lessonKey={lessonKey} />
        ) : (
          <GenericInteractiveLesson module={module} activityKey={activityKey} />
        )}
      </div>

      <aside className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 lg:sticky lg:top-4 lg:self-start">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-[var(--ink)] text-white">
            <BookOpen size={20} aria-hidden="true" />
          </span>
          <h2 className="text-xl font-black tracking-normal">Explorer flow</h2>
        </div>
        <div className="mt-5 grid gap-3">
          <InfoRow label="Estimated time" value={`${module.estimatedMinutes ?? 15} min`} />
          <InfoRow label="Learning phases" value={`${module.phaseDesign?.length ?? 6} phases`} />
          <InfoRow label="Access" value="Open" />
        </div>
        <div className="mt-5">
          <CompletionControls lessonKey={lessonKey} />
        </div>
      </aside>
    </section>
  );
}

export function LockedLevelNotice({ levelName }: { levelName: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
      <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-8">
        <span className="mx-auto grid size-12 place-items-center rounded-lg bg-[rgba(30,37,36,0.08)] text-[var(--ink)]">
          <LockKeyhole size={24} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-3xl font-black tracking-normal">{levelName} is locked for now</h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">
          This MVP only opens Level 1: Explorer. Engineer and Researcher will come back once their detailed module-design files are ready.
        </p>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
      <span className="text-sm font-bold text-[var(--muted)]">{label}</span>
      <span className="text-sm font-black">{value}</span>
    </div>
  );
}

const m1Phases = ["Explain", "Simulate", "Recall", "Play", "Review"] as const;

const m1HookOptions = [
  {
    id: "conscious",
    label: "It thinks like a conscious human, just much faster.",
    correct: false,
    explanation: "Current AI can imitate intelligent behaviour, but it is not conscious and does not think like a person.",
  },
  {
    id: "patterns",
    label: "It uses patterns learned from examples to produce useful outputs.",
    correct: true,
    explanation: "Exactly. Current AI maps inputs to useful outputs by learning statistical patterns from examples.",
  },
  {
    id: "fixed-rules",
    label: "It follows one giant list of fixed IF/THEN rules.",
    correct: false,
    explanation: "That describes a normal rule-based program better than modern AI. AI usually learns patterns from examples.",
  },
] as const;

function M1HookGate({
  question,
  onStart,
}: {
  question: string;
  onStart: (answer: string) => void;
}) {
  const [selected, setSelected] = useState<(typeof m1HookOptions)[number] | null>(null);
  const [checked, setChecked] = useState(false);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-[rgba(219,91,69,0.1)] text-[var(--coral)]">
            <PenLine size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-[var(--coral)]">Hook · checked question</p>
            <h2 className="mt-1 text-2xl font-black tracking-normal">Pick the best answer</h2>
          </div>
        </div>
        <p className="mt-6 text-2xl font-black leading-9">{question}</p>
        <div className="mt-6 grid gap-3">
          {m1HookOptions.map((option) => {
            const isSelected = selected?.id === option.id;
            const showState = checked && isSelected;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelected(option);
                  setChecked(false);
                }}
                className={`focus-ring rounded-lg border p-4 text-left text-base font-bold leading-7 ${
                  isSelected ? "border-[var(--ink)] bg-white" : "border-[var(--line)] bg-white"
                } ${showState && option.correct ? "border-[var(--teal)] bg-[rgba(19,127,114,0.1)]" : ""} ${
                  showState && !option.correct ? "border-[var(--coral)] bg-[rgba(219,91,69,0.1)]" : ""
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {checked && selected ? (
          <div className="mt-5 rounded-lg border border-[var(--line)] bg-white p-4">
            <p className={`flex items-center gap-2 font-black ${selected.correct ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
              {selected.correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
              {selected.correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-[var(--muted)]">{selected.explanation}</p>
          </div>
        ) : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={!selected}
            onClick={() => setChecked(true)}
            className="focus-ring rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black disabled:opacity-45"
          >
            Check answer
          </button>
          <button
            type="button"
            disabled={!checked}
            onClick={() => {
              if (!selected) return;
              onStart(`${selected.correct ? "Correct" : "Incorrect"}: ${selected.label}`);
            }}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45"
          >
            Start learning
            <Sparkles size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function WhatIsAiLesson({ hookAnswer, lessonKey }: { hookAnswer: string; lessonKey: string }) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">
      <PhaseStepper
        phases={m1Phases}
        current={phaseIndex}
        onSelect={setPhaseIndex}
      />
      <div className="mt-6">
        {phaseIndex === 0 ? <M1Explain onDone={() => setPhaseIndex(1)} /> : null}
        {phaseIndex === 1 ? <M1SpamSimulation onDone={() => setPhaseIndex(2)} /> : null}
        {phaseIndex === 2 ? <M1Recall onDone={() => setPhaseIndex(3)} hookAnswer={hookAnswer} /> : null}
        {phaseIndex === 3 ? <M1SortingGame onDone={() => setPhaseIndex(4)} /> : null}
        {phaseIndex === 4 ? <M1Review lessonKey={lessonKey} /> : null}
      </div>
    </section>
  );
}

function GenericInteractiveLesson({ module, activityKey }: { module: Module; activityKey: string }) {
  const phases = module.phaseDesign ?? [];
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = phases[phaseIndex];

  if (!phase) return null;

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">
      <PhaseStepper phases={phases.map((item) => item.title)} current={phaseIndex} onSelect={setPhaseIndex} />
      <article className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`grid size-11 place-items-center rounded-lg text-sm font-black ${phaseTone[phase.id]}`}>
            {phaseIndex + 1}
          </span>
          <div>
            <h2 className="text-3xl font-black tracking-normal">{phase.title}</h2>
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-black text-[var(--muted)]">
              <Clock3 size={14} aria-hidden="true" />
              {phase.duration}
            </p>
          </div>
        </div>
        <p className="mt-5 text-lg font-bold leading-8">{phase.summary}</p>
        <div className="mt-5 grid gap-3">
          {phase.deliverables.map((item, index) => (
            <div key={item} className="rounded-lg border border-[var(--line)] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">Step {index + 1}</p>
              <p className="mt-2 text-base leading-7">{item}</p>
            </div>
          ))}
        </div>
        {phase.id === "simulate" || phase.id === "play" ? (
          <div className="mt-6">
            {module.activity ? <ActivityPlayground activity={module.activity} activityKey={activityKey} /> : null}
          </div>
        ) : null}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setPhaseIndex((current) => Math.min(phases.length - 1, current + 1))}
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45"
            disabled={phaseIndex === phases.length - 1}
          >
            Next phase
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </article>
    </section>
  );
}

function PhaseStepper({
  phases,
  current,
  onSelect,
}: {
  phases: readonly string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {phases.map((phase, index) => (
        <button
          key={`${phase}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={`focus-ring rounded-lg border px-3 py-2 text-left text-sm font-black ${
            current === index ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--line)] bg-white"
          }`}
        >
          <span className="block text-xs opacity-70">Part {index + 1}</span>
          {phase}
        </button>
      ))}
    </div>
  );
}

const m1ExplainScreens = [
  {
    title: "AI is not magic.",
    body: "In AI, intelligence means taking in information and producing a useful output. That is powerful, but it is not mystery or consciousness.",
    takeaway: "AI is useful output from input, not a mind.",
  },
  {
    title: "Rules vs. examples.",
    body: "A normal program follows rules a programmer wrote. An AI system sees many examples and learns patterns that behave like rules.",
    takeaway: "Normal program: rules first. AI: examples first.",
  },
  {
    title: "Why now?",
    body: "The idea is old. What changed is the amount of data and the speed of computers. The recipe existed; the ingredients arrived late.",
    takeaway: "Modern AI needed data plus compute.",
  },
  {
    title: "Only narrow AI exists.",
    body: "A spam filter, chess engine, or face unlock system can do one kind of task. A general AI that can do everything a human can does not exist today.",
    takeaway: "All AI you use today is narrow AI.",
  },
];

function M1Explain({ onDone }: { onDone: () => void }) {
  const [screen, setScreen] = useState(0);
  const item = m1ExplainScreens[screen];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-[var(--teal-dark)]">Explain · screen {screen + 1}/4</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal">{item.title}</h2>
        </div>
        <div className="hidden h-2 w-36 rounded-full bg-white sm:block">
          <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${((screen + 1) / 4) * 100}%` }} />
        </div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_330px] lg:items-center">
        <div className="rounded-lg border border-[var(--line)] bg-white p-5">
          <p className="text-xl font-bold leading-9">{item.body}</p>
          <p className="mt-5 rounded-lg bg-[rgba(19,127,114,0.1)] p-4 text-base font-black text-[var(--teal-dark)]">
            Takeaway: {item.takeaway}
          </p>
        </div>
        <M1ExplainVisual screen={screen} />
      </div>
      <div className="mt-6 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => setScreen((value) => Math.max(0, value - 1))}
          disabled={screen === 0}
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black disabled:opacity-45"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={() => (screen === 3 ? onDone() : setScreen((value) => value + 1))}
          className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white"
        >
          {screen === 3 ? "Start simulation" : "Next"}
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function M1ExplainVisual({ screen }: { screen: number }) {
  if (screen === 0) {
    return (
      <div className="grid gap-3 rounded-lg border border-[var(--line)] bg-[var(--background)] p-4">
        {["Input: photo, text, sound", "Pattern engine", "Useful output"].map((label, index) => (
          <div key={label} className="flex items-center gap-3 rounded-lg bg-white p-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[var(--ink)] text-white">
              {index === 1 ? <BrainCircuit size={20} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
            </span>
            <span className="font-black">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (screen === 1) {
    return (
      <div className="grid gap-3 rounded-lg border border-[var(--line)] bg-white p-4">
        <div className="rounded-lg bg-[rgba(30,37,36,0.07)] p-4">
          <p className="text-sm font-black">Rule-based</p>
          <p className="mt-2 font-mono text-sm">IF raining THEN open umbrella</p>
        </div>
        <div className="rounded-lg bg-[rgba(19,127,114,0.1)] p-4">
          <p className="text-sm font-black text-[var(--teal-dark)]">Learning-based</p>
          <p className="mt-2 font-mono text-sm">1,000 cat photos → pattern → cat detector</p>
        </div>
      </div>
    );
  }

  if (screen === 2) {
    return (
      <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        {["1950s: idea", "2000s: data", "2010s: chips", "Today: usable AI"].map((label) => (
          <div key={label} className="mb-3 grid grid-cols-[18px_1fr] items-center gap-3 last:mb-0">
            <span className="size-4 rounded-full bg-[var(--gold)]" />
            <span className="rounded-lg bg-[var(--background)] p-3 text-sm font-black">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 rounded-lg border border-[var(--line)] bg-white p-4">
      <div className="rounded-lg border border-[rgba(19,127,114,0.35)] p-4">
        <p className="font-black text-[var(--teal-dark)]">Narrow AI</p>
        <p className="mt-2 text-sm">One task: spam, chess, face unlock.</p>
      </div>
      <div className="rounded-lg border border-[var(--line)] p-4 opacity-65">
        <p className="font-black">General AI</p>
        <p className="mt-2 text-sm">Everything a human can do. Not real today.</p>
      </div>
    </div>
  );
}

function M1SpamSimulation({ onDone }: { onDone: () => void }) {
  const [rule, setRule] = useState("");
  const [ruleTested, setRuleTested] = useState(false);
  const [accuracy, setAccuracy] = useState(40);
  const [trained, setTrained] = useState(0);
  const aiReady = accuracy >= 94;
  const normalizedRule = rule.toLowerCase();
  const catchesCurrent = ["urgent", "claim", "prize"].some((word) => normalizedRule.includes(word));

  function testRule() {
    setRuleTested(true);
  }

  function trainMore() {
    setTrained((value) => value + 1);
    setAccuracy((value) => (value < 85 ? 85 : value < 94 ? 94 : 98));
  }

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-normal text-[#785115]">Simulation</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal">Rules break. Learning generalises.</h2>
      <p className="mt-3 max-w-3xl text-base font-bold leading-7 text-[var(--muted)]">
        You are comparing two ways to catch spam. First, try a hand-written keyword rule. Then train the learning-based filter with examples and compare what each approach can handle.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--line)] bg-white p-4">
          <div className="flex items-center gap-2">
            <Mail size={19} aria-hidden="true" />
            <h3 className="text-xl font-black">Rule-based spam filter</h3>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">
            A rule-based system only checks the exact rule you write. Try a keyword like <span className="font-mono text-[var(--ink)]">Urgent</span>, <span className="font-mono text-[var(--ink)]">claim</span>, or <span className="font-mono text-[var(--ink)]">prize</span>.
          </p>
          <div className="mt-4 grid gap-2 text-sm">
            {["IF 'CLICK NOW' → spam", "IF 'free money' → spam", "IF 'lottery' → spam"].map((item) => (
              <p key={item} className="rounded-md bg-[var(--background)] p-2 font-mono">{item}</p>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-[var(--line)] p-3">
            <p className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">New email</p>
            <p className="mt-2 font-bold">Urgent: claim your prize before midnight</p>
          </div>
          <input
            value={rule}
            onChange={(event) => {
              setRule(event.target.value);
              setRuleTested(false);
            }}
            className="focus-ring mt-4 w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2"
            placeholder="Example: IF 'Urgent' → spam"
          />
          <button
            type="button"
            onClick={testRule}
            disabled={rule.trim().length < 3}
            className="focus-ring mt-3 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45"
          >
            Run this rule
          </button>
          {ruleTested ? (
            <div className="mt-4 grid gap-3">
              <div className={`rounded-lg p-3 text-sm font-bold ${catchesCurrent ? "bg-[rgba(19,127,114,0.1)] text-[var(--teal-dark)]" : "bg-[rgba(219,91,69,0.1)] text-[var(--coral)]"}`}>
                {catchesCurrent ? "Good: your rule catches this exact spam email." : "This rule does not catch the current spam email."}
              </div>
              <div className="rounded-lg bg-[rgba(219,91,69,0.1)] p-3">
                <p className="text-sm font-black text-[var(--coral)]">But now test the same rule on tomorrow&apos;s inbox:</p>
                <ul className="mt-2 grid gap-2 text-sm font-bold leading-6">
                  <li>Spam changed wording: &quot;Important: collect your reward before midnight&quot; → escapes your keyword rule.</li>
                  <li>Normal message: &quot;Urgent: your teacher moved tomorrow&apos;s meeting&quot; → may get wrongly marked as spam.</li>
                </ul>
              </div>
              <p className="rounded-lg bg-[var(--background)] p-3 text-sm font-black">
                Lesson: one manual rule can catch one phrase, but people can invent endless new phrases. You end up chasing language forever.
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border border-[var(--line)] bg-white p-4">
          <div className="flex items-center gap-2">
            <BrainCircuit size={19} aria-hidden="true" />
            <h3 className="text-xl font-black">Learning-based filter</h3>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-[var(--muted)]">
            This side does not use one keyword. It sees labelled examples and learns the broader pattern: suspicious offers, pressure, prizes, and scam-like wording.
          </p>
          <div className="mt-4 h-5 rounded-full bg-[var(--background)]">
            <div className="h-full rounded-full bg-[var(--teal)] transition-all" style={{ width: `${accuracy}%` }} />
          </div>
          <p className="mt-2 text-sm font-black">Accuracy: {accuracy}%</p>
          <div className="mt-4 grid gap-2">
            {["spam: free prize", "not spam: team meeting", "spam: urgent claim", "not spam: lunch plan"].map((item, index) => (
              <p key={item} className="rounded-md bg-[rgba(19,127,114,0.08)] p-2 text-sm font-bold">
                Example {index + 1}: {item}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={trainMore}
            className="focus-ring mt-4 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white"
          >
            Train on more emails
          </button>
          {aiReady ? (
            <p className="mt-3 rounded-lg bg-[rgba(19,127,114,0.1)] p-3 text-sm font-bold text-[var(--teal-dark)]">
              The AI can flag new scam phrasing because it learned a pattern across examples, not just one exact word.
            </p>
          ) : (
            <p className="mt-3 text-sm font-bold text-[var(--muted)]">Training rounds: {trained}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!ruleTested || !aiReady}
          onClick={onDone}
          className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45"
        >
          Continue to recall
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function M1Recall({ hookAnswer, onDone }: { hookAnswer: string; onDone: () => void }) {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [revealed, setRevealed] = useState(false);
  const ready = q1 && q2 && q3;
  const score = [q1 === "examples", q2 === "A spam filter that learned from millions of emails", q3 === "watch-history"].filter(Boolean).length;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-normal text-[var(--violet)]">Recall</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal">Answer before seeing explanations</h2>
      <div className="mt-5 grid gap-4">
        <QuestionBox title="1. Core difference">
          {[
            ["rules", "A normal program learns from examples; an AI only follows rules."],
            ["examples", "A normal program follows written rules; an AI learns patterns from examples."],
            ["speed", "The only difference is that AI programs run faster."],
          ].map(([id, label]) => (
            <ChoiceButton key={id} active={q1 === id} onClick={() => setQ1(id)}>
              {label}
            </ChoiceButton>
          ))}
        </QuestionBox>
        <QuestionBox title="2. Which one is narrow AI?">
          {["A robot that can do any task a human can", "A spam filter that learned from millions of emails", "A tax calculator using fixed formulas", "The human brain"].map((option) => (
            <ChoiceButton
              key={option}
              onClick={() => setQ2(option)}
              active={q2 === option}
            >
              {option}
            </ChoiceButton>
          ))}
        </QuestionBox>
        <QuestionBox title="3. YouTube recommends your next video. What did it most likely learn from?">
          {[
            ["watch-history", "Patterns in watch history, likes, skips, and similar users."],
            ["fixed-list", "A fixed alphabetical list written by a programmer."],
            ["camera", "Your phone camera secretly watching your face."],
          ].map(([id, label]) => (
            <ChoiceButton key={id} active={q3 === id} onClick={() => setQ3(id)}>
              {label}
            </ChoiceButton>
          ))}
        </QuestionBox>
      </div>
      {revealed ? (
        <div className="mt-5 rounded-lg border border-[var(--line)] bg-white p-4">
          <p className="font-black text-[var(--teal-dark)]">Score: {score}/3</p>
          <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-[var(--muted)]">
            <li>1. Correct: A normal program follows written rules; an AI learns patterns from examples.</li>
            <li>2. Correct: A spam filter is narrow AI because it performs one learned task.</li>
            <li>3. Correct: Recommendation systems learn from behaviour patterns like watch history and skips.</li>
          </ul>
          <p className="mt-4 text-sm font-bold text-[var(--muted)]">Your hook result: {hookAnswer}</p>
        </div>
      ) : null}
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" disabled={!ready} onClick={() => setRevealed(true)} className="focus-ring rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black disabled:opacity-45">
          Reveal answers
        </button>
        <button type="button" disabled={!revealed} onClick={onDone} className="focus-ring rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45">
          Start game
        </button>
      </div>
    </div>
  );
}

function QuestionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
      <p className="mb-3 font-black">{title}</p>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring rounded-lg border px-3 py-2 text-left text-sm font-bold ${
        active ? "border-[var(--teal)] bg-[rgba(19,127,114,0.1)]" : "border-[var(--line)] bg-white"
      }`}
    >
      {children}
    </button>
  );
}

const sortItems = [
  ["YouTube recommends your next video", "AI", "It learned from billions of watch patterns."],
  ["A calculator adds 2+2", "Not AI", "It follows a fixed formula."],
  ["Siri understands your voice", "AI", "It was trained on many voice recordings."],
  ["A fixed-timer traffic light", "Not AI", "It follows a schedule, not learned data."],
  ["Netflix suggests a film", "AI", "It uses viewing patterns from many users."],
  ["A smoke alarm beeps above a threshold", "Not AI", "It uses a hardcoded sensor threshold."],
  ["Gmail filters spam", "AI", "It learned from labelled emails."],
  ["A search box sorts alphabetically", "Not AI", "Alphabetical sorting is an algorithm, but not learning."],
] as const;

function M1SortingGame({ onDone }: { onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = sortItems.every(([item]) => answers[item]);
  const score = sortItems.filter(([item, answer]) => answers[item] === answer).length;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-normal text-[var(--ink)]">Play</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal">AI or Not AI?</h2>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">Choose a side for each card. Results unlock after all 8 are placed.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {sortItems.map(([item, correct, explanation]) => {
          const chosen = answers[item];
          const isCorrect = chosen === correct;
          return (
            <div key={item} className="rounded-lg border border-[var(--line)] bg-white p-4">
              <p className="font-black">{item}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["AI", "Not AI"].map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [item]: choice }))}
                    className={`focus-ring rounded-lg border px-3 py-2 text-sm font-black ${chosen === choice ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-[var(--line)] bg-white"}`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              {allAnswered ? (
                <p className={`mt-3 flex items-start gap-2 text-sm font-bold ${isCorrect ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
                  {isCorrect ? <CheckCircle2 size={16} aria-hidden="true" /> : <XCircle size={16} aria-hidden="true" />}
                  {explanation}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      {allAnswered ? (
        <div className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--background)] p-4">
          <p className="flex items-center gap-2 text-2xl font-black">
            <Trophy size={24} aria-hidden="true" />
            Score: {score}/8
          </p>
          <p className="mt-2 font-bold text-[var(--muted)]">
            {score === 8 ? "AI Expert." : score >= 6 ? "Good instincts." : score >= 4 ? "Getting there." : "Review the rules-vs-examples screen."}
          </p>
        </div>
      ) : null}
      <div className="mt-6 flex justify-end">
        <button type="button" disabled={!allAnswered} onClick={onDone} className="focus-ring rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:opacity-45">
          Review module
        </button>
      </div>
    </div>
  );
}

const finalCheckpointOptions = [
  {
    id: "rules",
    label: "AI is a giant set of IF/THEN rules written by programmers.",
    correct: false,
  },
  {
    id: "patterns",
    label: "AI learns patterns from examples and uses them to produce useful outputs.",
    correct: true,
  },
  {
    id: "conscious",
    label: "AI is useful because it understands and wants things like a person.",
    correct: false,
  },
] as const;

function M1Review({ lessonKey }: { lessonKey: string }) {
  const [choice, setChoice] = useState<(typeof finalCheckpointOptions)[number] | null>(null);
  const [checked, setChecked] = useState(false);
  const passed = checked && choice?.correct;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">Review</p>
      <h2 className="mt-2 text-3xl font-black tracking-normal">Final checkpoint</h2>
      <p className="mt-3 text-base font-bold leading-7 text-[var(--muted)]">
        Before marking this module complete, choose the statement that best summarizes what you learned.
      </p>

      <div className="mt-5 grid gap-3">
        {finalCheckpointOptions.map((option) => {
          const active = choice?.id === option.id;
          const showResult = checked && active;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setChoice(option);
                setChecked(false);
              }}
              className={`focus-ring rounded-lg border p-4 text-left text-base font-bold leading-7 ${
                active ? "border-[var(--ink)] bg-white" : "border-[var(--line)] bg-white"
              } ${showResult && option.correct ? "border-[var(--teal)] bg-[rgba(19,127,114,0.1)]" : ""} ${
                showResult && !option.correct ? "border-[var(--coral)] bg-[rgba(219,91,69,0.1)]" : ""
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {checked && choice ? (
        <div className="mt-5 rounded-lg border border-[var(--line)] bg-white p-4">
          <p className={`flex items-center gap-2 font-black ${choice.correct ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
            {choice.correct ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
            {choice.correct ? "Correct. You can finish the module." : "Not quite. AI is not hand-written rules or consciousness here. Pick the pattern-learning answer."}
          </p>
        </div>
      ) : null}

      <div className="mt-5 rounded-lg border border-[var(--line)] bg-white p-4">
        <p className="font-black">You should now be able to say:</p>
        <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-[var(--muted)]">
          <li>AI is not magic or consciousness.</li>
          <li>Normal programs follow written rules; AI learns from examples.</li>
          <li>Current AI is narrow: one task at a time.</li>
        </ul>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={!choice}
          onClick={() => setChecked(true)}
          className="focus-ring rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black disabled:opacity-45"
        >
          Check final answer
        </button>
        {passed ? (
          <button
            type="button"
            className="focus-ring rounded-lg bg-[rgba(19,127,114,0.1)] px-4 py-3 text-sm font-black text-[var(--teal-dark)]"
            disabled
          >
            Checkpoint passed
          </button>
        ) : null}
      </div>
      {passed ? (
        <div className="mt-6 rounded-lg border border-[var(--line)] bg-white p-4">
          <p className="font-black">Finish</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Mark the module complete. This saves progress locally.</p>
          <div className="mt-4">
            <CompletionControls lessonKey={lessonKey} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
