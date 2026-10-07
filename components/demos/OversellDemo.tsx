"use client";

import { useEffect, useRef, useState } from "react";
import DemoFrame, { DemoButton, DemoToggle } from "./DemoFrame";

// Two sales of 1.00 ct against a lot holding 1.20 ct, at the same moment.
// Without a row lock both read 1.20 and both succeed. With SELECT ... FOR UPDATE
// the second waits, re-reads 0.20 and is refused.

type Step = { tx: 1 | 2; text: string; tone?: "bad" | "good" | "wait"; balance?: number };

const UNLOCKED: Step[] = [
    { tx: 1, text: "BEGIN" },
    { tx: 2, text: "BEGIN" },
    { tx: 1, text: "SELECT balance → 1.20 ct" },
    { tx: 2, text: "SELECT balance → 1.20 ct" },
    { tx: 1, text: "1.20 ≥ 1.00, INSERT −1.00" },
    { tx: 2, text: "1.20 ≥ 1.00, INSERT −1.00" },
    { tx: 1, text: "COMMIT", balance: 0.2 },
    { tx: 2, text: "COMMIT: sold stock that wasn't there", tone: "bad", balance: -0.8 },
];

const LOCKED: Step[] = [
    { tx: 1, text: "BEGIN" },
    { tx: 2, text: "BEGIN" },
    { tx: 1, text: "SELECT … FOR UPDATE → lot locked" },
    { tx: 2, text: "SELECT … FOR UPDATE → waiting for lock", tone: "wait" },
    { tx: 1, text: "balance 1.20 ≥ 1.00, INSERT −1.00" },
    { tx: 1, text: "COMMIT, lock released", balance: 0.2 },
    { tx: 2, text: "lock acquired, balance → 0.20 ct" },
    { tx: 2, text: "0.20 < 1.00: insufficient stock, ROLLBACK", tone: "good" },
];

export default function OversellDemo() {
    const [locked, setLocked] = useState(false);
    const [shown, setShown] = useState(0);
    const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const steps = locked ? LOCKED : UNLOCKED;
    const running = shown > 0 && shown < steps.length;
    const balance = steps.slice(0, shown).reduce((b, s) => s.balance ?? b, 1.2);

    useEffect(() => () => clearInterval(timer.current), []);

    function run() {
        clearInterval(timer.current);
        setShown(1);
        let n = 1;
        timer.current = setInterval(() => {
            n += 1;
            setShown(n);
            if (n >= steps.length) clearInterval(timer.current);
        }, 650);
    }

    function toggle(v: boolean) {
        clearInterval(timer.current);
        setLocked(v);
        setShown(0);
    }

    return (
        <DemoFrame
            title="Try it: two sales at once"
            hint="Lot UD-114 holds 1.20 ct. Two people each sell 1.00 ct in the same instant."
            controls={
                <>
                    <DemoToggle label="Row lock (FOR UPDATE)" checked={locked} onChange={toggle} />
                    <DemoButton primary onClick={run} disabled={running}>{shown ? "Run again" : "Run"}</DemoButton>
                </>
            }
        >
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_9rem]">
                {[1, 2].map((tx) => (
                    <div key={tx}>
                        <p className="mb-2 font-mono text-micro uppercase text-muted-foreground">Sale {tx}</p>
                        <ol className="flex flex-col gap-1.5">
                            {steps.map((s, i) =>
                                s.tx === tx && i < shown ? (
                                    <li
                                        key={i}
                                        className={`rounded-sm border px-2.5 py-1.5 font-mono text-[12px] animate-in fade-in slide-in-from-left-1 duration-300 ${
                                            s.tone === "bad"
                                                ? "border-red-500/40 text-red-500"
                                                : s.tone === "good"
                                                  ? "border-[var(--portfolio-accent)]/50 text-[var(--portfolio-accent)]"
                                                  : s.tone === "wait"
                                                    ? "border-dashed border-border text-muted-foreground"
                                                    : "border-border/60 text-foreground/80"
                                        }`}
                                    >
                                        {s.text}
                                    </li>
                                ) : null,
                            )}
                        </ol>
                    </div>
                ))}
                <div className="flex flex-col justify-between rounded-sm border border-border/60 p-3">
                    <p className="font-mono text-micro uppercase text-muted-foreground">Lot balance</p>
                    <p className={`text-stat font-medium tabular-nums ${balance < 0 ? "text-red-500" : "text-foreground"}`}>
                        {balance.toFixed(2)} ct
                    </p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className={`h-full transition-all duration-500 ${balance < 0 ? "bg-red-500" : "bg-[var(--portfolio-accent)]"}`}
                            style={{ width: `${Math.max(4, (Math.abs(balance) / 1.2) * 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </DemoFrame>
    );
}
