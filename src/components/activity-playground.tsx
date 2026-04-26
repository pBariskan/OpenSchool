"use client";

import { useMemo, useState } from "react";
import { Award, Check, Minus, Plus, RotateCcw } from "lucide-react";
import { type Activity } from "@/data/curriculum";
import { useProgress } from "@/components/progress-provider";

export function ActivityPlayground({
  activity,
  activityKey,
}: {
  activity: Activity;
  activityKey: string;
}) {
  const progress = useProgress();

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-[var(--teal-dark)]">Activity</p>
          <h2 className="mt-1 text-2xl font-black tracking-normal">{activity.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{activity.prompt}</p>
        </div>
        {progress.isActivityComplete(activityKey) ? (
          <span className="inline-flex items-center gap-2 rounded-md bg-[rgba(19,127,114,0.1)] px-3 py-2 text-sm font-black text-[var(--teal-dark)]">
            <Award size={16} aria-hidden="true" />
            Activity complete
          </span>
        ) : null}
      </div>
      <div className="mt-6">
        {activity.type === "pixel-grid" ? <PixelGrid onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "card-sort" ? <CardSort onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "clustering" ? <ClusteringLab onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "reward-loop" ? <RewardLoop onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "network-visualizer" ? <NetworkVisualizer onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "confusion-matrix" ? <ConfusionMatrix onComplete={() => progress.completeActivity(activityKey)} /> : null}
        {activity.type === "concept-check" ? <ConceptCheck onComplete={() => progress.completeActivity(activityKey)} /> : null}
      </div>
    </section>
  );
}

function PixelGrid({ onComplete }: { onComplete: () => void }) {
  const [cells, setCells] = useState<number[]>([
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ]);

  const active = cells.reduce((sum, value) => sum + value, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
      <div className="grid aspect-square w-full max-w-[280px] grid-cols-5 gap-2">
        {cells.map((value, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Pixel ${index + 1}`}
            onClick={() => setCells((current) => current.map((cell, cellIndex) => (cellIndex === index ? 1 - cell : cell)))}
            className={`focus-ring rounded-md border border-[var(--line)] transition ${
              value ? "bg-[var(--ink)]" : "bg-white"
            }`}
          />
        ))}
      </div>
      <div>
        <div className="grid grid-cols-5 gap-1 font-mono text-sm font-bold">
          {cells.map((value, index) => (
            <span key={index} className="grid h-9 place-items-center rounded-md bg-white">
              {value}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-[var(--muted)]">{active} bright pixels encoded as 1s</p>
        <CompleteButton onComplete={onComplete} label="Save decoded grid" />
      </div>
    </div>
  );
}

function CardSort({ onComplete }: { onComplete: () => void }) {
  const examples = [
    { label: "Red round fruit", answer: "Apple" },
    { label: "Yellow long fruit", answer: "Banana" },
    { label: "Green round fruit", answer: "Apple" },
  ];
  const challenge = "Yellow long snack";
  const [choice, setChoice] = useState<string | null>(null);
  const correct = choice === "Banana";

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {examples.map((example) => (
          <div key={example.label} className="rounded-lg border border-[var(--line)] bg-white p-4">
            <p className="text-sm font-black">{example.label}</p>
            <p className="mt-3 rounded-md bg-[rgba(19,127,114,0.1)] px-2 py-1 text-sm font-bold text-[var(--teal-dark)]">
              {example.answer}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-[var(--line)] bg-white p-4">
        <p className="text-sm font-black">{challenge}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Apple", "Banana"].map((answer) => (
            <button
              key={answer}
              type="button"
              onClick={() => setChoice(answer)}
              className={`focus-ring rounded-lg px-4 py-2 text-sm font-black ${
                choice === answer ? "bg-[var(--ink)] text-white" : "border border-[var(--line)] bg-white"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>
        {choice ? (
          <p className={`mt-4 text-sm font-bold ${correct ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
            {correct ? "The model used the pattern, not a memorized exact phrase." : "That label ignores the strongest pattern."}
          </p>
        ) : null}
      </div>
      <CompleteButton onComplete={onComplete} label="Complete sorter" disabled={!correct} />
    </div>
  );
}

function ClusteringLab({ onComplete }: { onComplete: () => void }) {
  const points = [
    { x: 18, y: 20, group: "A" },
    { x: 28, y: 26, group: "A" },
    { x: 22, y: 34, group: "A" },
    { x: 70, y: 24, group: "B" },
    { x: 82, y: 30, group: "B" },
    { x: 76, y: 40, group: "B" },
    { x: 48, y: 72, group: "C" },
    { x: 58, y: 78, group: "C" },
    { x: 40, y: 82, group: "C" },
  ];
  const [visible, setVisible] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="relative aspect-[4/3] rounded-lg border border-[var(--line)] bg-white">
        {points.map((point, index) => (
          <span
            key={`${point.x}-${point.y}`}
            className={`absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-xs font-black ${
              visible
                ? point.group === "A"
                  ? "border-[var(--teal)] bg-[rgba(19,127,114,0.18)]"
                  : point.group === "B"
                    ? "border-[var(--gold)] bg-[rgba(194,135,36,0.2)]"
                    : "border-[var(--coral)] bg-[rgba(219,91,69,0.18)]"
                : "border-[var(--ink)] bg-white"
            }`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {visible ? point.group : index + 1}
          </span>
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm leading-6 text-[var(--muted)]">
          The labels are hidden at first. The structure is already in the distances.
        </p>
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-black"
        >
          {visible ? <RotateCcw size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
          {visible ? "Hide labels" : "Reveal clusters"}
        </button>
        <CompleteButton onComplete={onComplete} label="Complete clustering" disabled={!visible} />
      </div>
    </div>
  );
}

function RewardLoop({ onComplete }: { onComplete: () => void }) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const total = left + right;
  const preference = total === 0 ? 50 : Math.round((right / total) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-lg border border-[var(--line)] bg-white p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setLeft((value) => value + 1)}
            className="focus-ring rounded-lg border border-[var(--line)] px-4 py-8 text-center font-black"
          >
            Left path
            <span className="mt-2 block text-sm text-[var(--coral)]">Reward -1</span>
          </button>
          <button
            type="button"
            onClick={() => setRight((value) => value + 1)}
            className="focus-ring rounded-lg border border-[var(--line)] px-4 py-8 text-center font-black"
          >
            Right path
            <span className="mt-2 block text-sm text-[var(--teal-dark)]">Reward +3</span>
          </button>
        </div>
        <div className="mt-5 h-4 rounded-full bg-[rgba(219,91,69,0.18)]">
          <div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${preference}%` }} />
        </div>
      </div>
      <div>
        <Metric label="Left tries" value={left} />
        <Metric label="Right tries" value={right} />
        <Metric label="Agent preference" value={`${preference}%`} />
        <CompleteButton onComplete={onComplete} label="Complete reward loop" disabled={total < 4 || preference < 60} />
      </div>
    </div>
  );
}

function NetworkVisualizer({ onComplete }: { onComplete: () => void }) {
  const [hidden, setHidden] = useState(4);
  const inputs = [0, 1, 2];
  const outputs = [0, 1];
  const hiddenNodes = Array.from({ length: hidden }, (_, index) => index);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <svg viewBox="0 0 520 320" role="img" aria-label="Neural network diagram" className="aspect-[13/8] w-full rounded-lg border border-[var(--line)] bg-white">
        {inputs.flatMap((input) =>
          hiddenNodes.map((node) => (
            <line key={`i-${input}-${node}`} x1="80" y1={80 + input * 80} x2="260" y2={48 + node * (224 / Math.max(hidden - 1, 1))} stroke="#d7d0c0" />
          )),
        )}
        {hiddenNodes.flatMap((node) =>
          outputs.map((output) => (
            <line key={`h-${node}-${output}`} x1="260" y1={48 + node * (224 / Math.max(hidden - 1, 1))} x2="440" y2={110 + output * 90} stroke="#d7d0c0" />
          )),
        )}
        {inputs.map((node) => (
          <circle key={`input-${node}`} cx="80" cy={80 + node * 80} r="22" fill="#137f72" />
        ))}
        {hiddenNodes.map((node) => (
          <circle key={`hidden-${node}`} cx="260" cy={48 + node * (224 / Math.max(hidden - 1, 1))} r="18" fill="#c28724" />
        ))}
        {outputs.map((node) => (
          <circle key={`output-${node}`} cx="440" cy={110 + node * 90} r="22" fill="#db5b45" />
        ))}
        <text x="80" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e2524">input</text>
        <text x="260" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e2524">hidden</text>
        <text x="440" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e2524">output</text>
      </svg>
      <div>
        <p className="text-sm font-black">Hidden neurons: {hidden}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setHidden((value) => Math.max(2, value - 1))}
            className="focus-ring grid size-11 place-items-center rounded-lg border border-[var(--line)] bg-white"
            aria-label="Remove hidden neuron"
          >
            <Minus size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setHidden((value) => Math.min(7, value + 1))}
            className="focus-ring grid size-11 place-items-center rounded-lg border border-[var(--line)] bg-white"
            aria-label="Add hidden neuron"
          >
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
        <CompleteButton onComplete={onComplete} label="Complete layer builder" />
      </div>
    </div>
  );
}

function ConfusionMatrix({ onComplete }: { onComplete: () => void }) {
  const [tp, setTp] = useState(42);
  const [fp, setFp] = useState(8);
  const [fn, setFn] = useState(10);
  const [tn, setTn] = useState(40);

  const metrics = useMemo(() => {
    const accuracy = safe((tp + tn) / (tp + fp + fn + tn));
    const precision = safe(tp / (tp + fp));
    const recall = safe(tp / (tp + fn));
    const f1 = safe((2 * precision * recall) / (precision + recall));
    return { accuracy, precision, recall, f1 };
  }, [fn, fp, tn, tp]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="grid grid-cols-2 gap-2">
        <Counter label="True positive" value={tp} setValue={setTp} />
        <Counter label="False positive" value={fp} setValue={setFp} />
        <Counter label="False negative" value={fn} setValue={setFn} />
        <Counter label="True negative" value={tn} setValue={setTn} />
      </div>
      <div>
        <Metric label="Accuracy" value={`${Math.round(metrics.accuracy * 100)}%`} />
        <Metric label="Precision" value={`${Math.round(metrics.precision * 100)}%`} />
        <Metric label="Recall" value={`${Math.round(metrics.recall * 100)}%`} />
        <Metric label="F1" value={`${Math.round(metrics.f1 * 100)}%`} />
        <CompleteButton onComplete={onComplete} label="Complete evaluation" />
      </div>
    </div>
  );
}

function ConceptCheck({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = selected === "learns";

  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-4">
      <p className="text-base font-black">Which description best matches machine learning?</p>
      <div className="mt-4 grid gap-2">
        {[
          ["rules", "A programmer writes every rule by hand."],
          ["learns", "A system improves by finding patterns in examples."],
          ["magic", "A computer understands the world like a person."],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`focus-ring rounded-lg border px-4 py-3 text-left text-sm font-bold ${
              selected === id ? "border-[var(--teal)] bg-[rgba(19,127,114,0.1)]" : "border-[var(--line)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {selected ? (
        <p className={`mt-4 text-sm font-bold ${correct ? "text-[var(--teal-dark)]" : "text-[var(--coral)]"}`}>
          {correct ? "That is the central learning idea." : "That answer misses the learning-from-examples part."}
        </p>
      ) : null}
      <CompleteButton onComplete={onComplete} label="Complete check" disabled={!correct} />
    </div>
  );
}

function Counter({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-3">
      <p className="text-xs font-black uppercase tracking-normal text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setValue((current) => Math.max(0, current - 1))}
          className="focus-ring grid size-9 place-items-center rounded-md border border-[var(--line)]"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setValue((current) => current + 1)}
          className="focus-ring grid size-9 place-items-center rounded-md border border-[var(--line)]"
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="mb-2 flex min-h-12 items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white px-3 py-2">
      <span className="text-sm font-bold text-[var(--muted)]">{label}</span>
      <span className="text-lg font-black">{value}</span>
    </div>
  );
}

function CompleteButton({
  onComplete,
  label,
  disabled,
}: {
  onComplete: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onComplete}
      className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-45"
    >
      <Check size={16} aria-hidden="true" />
      {label}
    </button>
  );
}

function safe(value: number) {
  return Number.isFinite(value) ? value : 0;
}
