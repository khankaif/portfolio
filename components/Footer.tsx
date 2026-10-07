import Link from "next/link";
import { Github, Linkedin, MapPin, Mail } from "lucide-react";

const linkClass = "hover:text-foreground hover:underline underline-offset-4 transition-all flex items-center gap-1.5";

function Shortcut({ keys, label }: { keys: string; label: string }) {
    return (
        <span className="hidden md:flex items-center gap-1 font-mono whitespace-nowrap">
            <kbd className="px-1.5 rounded-sm border border-border bg-muted text-foreground">G</kbd>
            <kbd className="px-1.5 rounded-sm border border-border bg-muted text-foreground">{keys}</kbd>
            <span className="ml-1">{label}</span>
        </span>
    );
}

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background pt-8 pb-12 mt-20 flex justify-center">
            <div className="w-full max-w-content px-6 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 text-small text-muted-foreground">
                <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 shrink-0 rounded-full bg-[var(--portfolio-accent)] animate-pulse" />
                        <span className="text-foreground">Open to Product Engineer roles — India, EU, US, Canada or remote.</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                        <span className="flex items-center gap-1.5 whitespace-nowrap"><MapPin size={14} /> Mumbai, IN</span>
                        <Shortcut keys="P" label="Work" />
                        <Shortcut keys="A" label="About" />
                        <Link href="/lab" className={linkClass}>Lab</Link>
                    </div>
                </div>

                <div className="flex gap-4 sm:gap-6 flex-wrap justify-start font-medium">
                    <a href="mailto:kaifkhan9619@gmail.com" className={linkClass}>
                        <Mail size={14} /> Email
                    </a>
                    <a href="https://github.com/khankaif" target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <Github size={14} /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/khankaif/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <Linkedin size={14} /> LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
