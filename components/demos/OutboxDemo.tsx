"use client";

import { useEffect, useRef, useState } from "react";
import DemoFrame, { DemoButton, DemoToggle } from "./DemoFrame";

// Every inspector action goes into an outbox on the phone and replays in order
// once there's signal. Each SKU is its own lane, so one failed upload pauses
// only that SKU, never the whole day's work.

type Job = { id: number; sku: "A" | "B"; action: string; failing?: boolean };
const ACTIONS = ["claim", "defect +1", "photo", "complete"];

export default function OutboxDemo() {
    const [online, setOnline] = useState(false);
    const [queue, setQueue] = useState<Job[]>([]);
    const [synced, setSynced] = useState<Job[]>([]);
    const [blocked, setBlocked] = useState<Set<"A" | "B">>(new Set());
    const [failNext, setFailNext] = useState(false);
    const nextId = useRef(1);
    const step = useRef<Record<"A" | "B", number>>({ A: 0, B: 0 });

    function add(sku: "A" | "B") {
        const action = ACTIONS[step.current[sku]++ % ACTIONS.length];
        const job: Job = { id: nextId.current++, sku, action, failing: failNext };
        setFailNext(false);
        setQueue((q) => [...q, job]);
    }

    // Drain one job at a time: the oldest job whose SKU lane isn't blocked.
    useEffect(() => {
        if (!online) return;
        const job = queue.find((j) => !blocked.has(j.sku));
        if (!job) return;
        const t = setTimeout(() => {
            if (job.failing) {
                setBlocked((b) => new Set(b).add(job.sku));
                return;
            }
            setQueue((q) => q.filter((j) => j.id !== job.id));
            setSynced((s) => [...s, job].slice(-8));
        }, 600);
        return () => clearTimeout(t);
    }, [online, queue, blocked]);

    function retry() {
        setQueue((q) => q.map((j) => ({ ...j, failing: false })));
        setBlocked(new Set());
    }

    function reset() {
        setOnline(false);
        setQueue([]);
        setSynced([]);
        setBlocked(new Set());
        setFailNext(false);
        nextId.current = 1;
        step.current = { A: 0, B: 0 };
    }

    return (
        <DemoFrame
            title="Try it: inspect with no signal"
            hint="Log work on two items while offline, then go online. Make one upload fail and see what stops."
            controls={
                <>
                    <DemoToggle label="Online" checked={online} onChange={setOnline} />
                    <DemoToggle label="Fail next upload" checked={failNext} onChange={setFailNext} />
                    {blocked.size > 0 && <DemoButton onClick={retry}>Retry</DemoButton>}
                    <DemoButton onClick={reset}>Reset</DemoButton>
                </>
            }
        >
            <div className="grid gap-4 sm:grid-cols-[10rem_1fr_1fr]">
                <div className="flex flex-col gap-2">
                    <p className="font-mono text-micro uppercase text-muted-foreground">Phone</p>
                    <DemoButton primary onClick={() => add("A")}>Ring SKU A</DemoButton>
                    <DemoButton primary onClick={() => add("B")}>Pendant SKU B</DemoButton>
                    <p className={`mt-1 text-small ${online ? "text-[var(--portfolio-accent)]" : "text-muted-foreground"}`}>
                        {online ? "Signal: syncing" : "No signal: saving locally"}
                    </p>
                </div>

                <div>
                    <p className="mb-2 font-mono text-micro uppercase text-muted-foreground">Outbox ({queue.length})</p>
                    <ol className="flex flex-col gap-1.5" aria-live="polite">
                        {queue.length === 0 && <li className="text-small text-muted-foreground">Empty</li>}
                        {queue.map((j) => {
                            const stuck = blocked.has(j.sku);
                            return (
                                <li
                                    key={j.id}
                                    className={`flex items-center justify-between rounded-sm border px-2.5 py-1.5 font-mono text-[12px] ${
                                        stuck ? "border-red-500/40 text-red-500" : "border-border/60 text-foreground/80"
                                    }`}
                                >
                                    <span>#{j.id} {j.sku} · {j.action}</span>
                                    {stuck && <span>{j.failing ? "failed" : "waiting"}</span>}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div>
                    <p className="mb-2 font-mono text-micro uppercase text-muted-foreground">Server</p>
                    <ol className="flex flex-col gap-1.5">
                        {synced.length === 0 && <li className="text-small text-muted-foreground">Nothing yet</li>}
                        {synced.map((j) => (
                            <li key={j.id} className="rounded-sm border border-[var(--portfolio-accent)]/40 px-2.5 py-1.5 font-mono text-[12px] text-[var(--portfolio-accent)] animate-in fade-in duration-300">
                                #{j.id} {j.sku} · {j.action}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </DemoFrame>
    );
}
