const LAYERS = [
    {
        label: "Frontend (3 Apps)",
        nodes: ["Retailer Portal (B2B Orders)", "Staff Operations (CAD Workflow)", "Analytics & Timings"],
    },
    {
        label: "Core Services",
        nodes: ["Express API (REST + Auth)", "Socket.IO (Live Chat & Status)", "BullMQ (Async Job Queue)"],
    },
    {
        label: "Storage & Workers",
        nodes: ["MySQL (Order & User State)", "Redis (Session & Socket PubSub)", "AWS S3 (CAD 3D Files & Images)"],
    },
];

export default function ArchitectureFlow() {
    return (
        <div className="not-prose my-8 rounded-xl border border-border/80 bg-card/60 p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
                    System Architecture · Turborepo Monorepo
                </span>
                <span className="font-mono text-micro text-muted-foreground">
                    End-to-End Flow
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                {LAYERS.map(({ label, nodes }) => (
                    <div key={label} className="rounded-lg border border-border/60 bg-muted/30 p-4 flex flex-col gap-2.5">
                        <span className="font-mono text-micro uppercase text-muted-foreground">{label}</span>
                        <div className="space-y-1.5">
                            {nodes.map((node) => (
                                <div key={node} className="px-2.5 py-1.5 rounded-md bg-background border border-border/50 text-small font-medium text-foreground">
                                    {node}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between text-micro font-mono text-muted-foreground">
                <span>Deploy: Docker · Nginx reverse proxy · pm2 process manager</span>
                <span>Self-hosted Linux VPS</span>
            </div>
        </div>
    );
}
