"use client";

import { useEffect, useRef, useState } from "react";
import DemoFrame, { DemoButton, DemoToggle, LogLine } from "./DemoFrame";

// One sent message reaches the screen four ways. Without a shared identity the
// UI can't tell they are the same message: it duplicates it, then a stale
// re-fetch makes it vanish. With a client ID stamped before sending, every copy
// collapses into one row.

type Msg = { key: string; clientId?: string; serverId?: number; text: string; mine: boolean; status: "sending" | "sent" };
type Log = { t: string; text: string; tone?: "bad" | "good" };

const SEED: Msg[] = [
    { key: "s1", serverId: 1, text: "Can we lower the shank to 1.6mm?", mine: false, status: "sent" },
    { key: "s2", serverId: 2, text: "Yes — revised CAD by tomorrow.", mine: true, status: "sent" },
];

const REPLIES = ["Sending render v3 now.", "Quote updated for 18k white.", "Approved, moving to production."];

export default function ChatSyncDemo() {
    const [withId, setWithId] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>(SEED);
    const [log, setLog] = useState<Log[]>([]);
    const [busy, setBusy] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const nextId = useRef(3);
    const sent = useRef(0);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    function reset(v = withId) {
        timers.current.forEach(clearTimeout);
        setWithId(v);
        setMsgs(SEED);
        setLog([]);
        setBusy(false);
        nextId.current = 3;
        sent.current = 0;
    }

    function send() {
        const text = REPLIES[sent.current++ % REPLIES.length];
        const clientId = `c${Date.now()}`;
        const serverId = nextId.current++;
        const snapshot = msgs.filter((m) => m.serverId !== undefined); // what a stale page fetch would return
        const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
        const say = (t: string, text: string, tone?: Log["tone"]) => setLog((l) => [...l, { t, text, tone }]);
        setBusy(true);
        setLog([]);

        // 1. optimistic copy
        setMsgs((m) => [...m, { key: clientId, clientId: withId ? clientId : undefined, text, mine: true, status: "sending" }]);
        say("+0ms", "Optimistic copy shown");

        // 2. socket echo
        at(450, () => {
            setMsgs((m) => {
                if (withId) return m.map((x) => (x.clientId === clientId ? { ...x, serverId, status: "sent" } : x));
                return m.some((x) => x.serverId === serverId) ? m : [...m, { key: `s${serverId}`, serverId, text, mine: true, status: "sent" }];
            });
            say("+450ms", withId ? "Socket echo matched by client ID" : "Socket echo has no match: appended", withId ? "good" : "bad");
        });

        // 3. POST response
        at(800, () => {
            setMsgs((m) => (withId ? m : m.filter((x) => x.key !== clientId)));
            say("+800ms", withId ? "POST response: already confirmed" : "POST response: optimistic copy removed");
        });

        // 4. paginated re-fetch that was issued before the insert landed
        at(1250, () => {
            setMsgs((m) => {
                if (withId) return m;
                return snapshot;
            });
            say(
                "+1250ms",
                withId ? "Stale re-fetch merged; local row kept" : "Stale re-fetch replaced the list: message gone",
                withId ? "good" : "bad",
            );
            setBusy(false);
        });
    }

    return (
        <DemoFrame
            title="Try it: send a message"
            hint="Watch the four copies of one message arrive. Then turn on client IDs."
            controls={
                <>
                    <DemoToggle label="Match on client ID" checked={withId} onChange={(v) => reset(v)} />
                    <DemoButton primary onClick={send} disabled={busy}>Send</DemoButton>
                    <DemoButton onClick={() => reset()}>Reset</DemoButton>
                </>
            }
        >
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
                <ul className="flex min-h-48 flex-col gap-2" aria-live="polite">
                    {msgs.map((m) => (
                        <li
                            key={m.key}
                            className={`max-w-[85%] rounded-md px-3 py-2 text-small ${m.mine ? "self-end bg-foreground text-background" : "self-start bg-muted text-foreground"}`}
                        >
                            {m.text}
                            {m.mine && (
                                <span className="ml-2 font-mono text-[10px] opacity-60">{m.status === "sending" ? "sending" : `#${m.serverId}`}</span>
                            )}
                        </li>
                    ))}
                </ul>
                <ol className="flex flex-col gap-1 border-t border-border/60 pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                    {log.length === 0 && <li className="text-small text-muted-foreground">Event log appears here.</li>}
                    {log.map((l, i) => (
                        <LogLine key={i} t={l.t} tone={l.tone}>{l.text}</LogLine>
                    ))}
                </ol>
            </div>
        </DemoFrame>
    );
}
