"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedGradient from "@/components/AnimatedGradient";
import ASCIIBackground from "@/components/ASCIIBackground";
import { useTheme } from "@/components/ThemeProvider";
import ScrambleText from "@/components/ScrambleText";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className="relative isolate w-full min-h-[92svh] flex items-center overflow-hidden px-6 pt-24 pb-16">
            {/* Background — faded toward the bottom so it hands off to the page */}
            <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                <AnimatedGradient
                    color1={isDark ? "#00E1FF" : "#FF9F21"}
                    color2={isDark ? "#217AFF" : "#FF0303"}
                    color3={isDark ? "#000000" : "#fff"}
                />
                <ASCIIBackground speed={50} opacity={isDark ? 0.35 : 0.12} />
            </div>

            <motion.div
                className="relative w-full max-w-content mx-auto flex flex-col gap-6"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={item}
                    className="flex items-center gap-2 font-mono text-micro uppercase text-muted-foreground"
                >
                    <span style={{ color: "var(--portfolio-accent)" }}>Kaif Khan</span>
                    <span>/ Product Engineer · Mumbai</span>
                </motion.div>

                <motion.h1
                    variants={item}
                    className="text-display font-medium text-foreground max-w-[20ch]"
                >
                    I build the software that runs{" "}
                    <ScrambleText text="real businesses." trigger="mount" hold={500} duration={1200} delay={600} />
                </motion.h1>

                <motion.p variants={item} className="text-body text-muted-foreground max-w-prose">
                    Four years designing SaaS products, now shipping them end to end — from the Figma file
                    to the database to the server it runs on. Lately: an order and CAD-approval platform for
                    a jewelry manufacturer, and an offline-first inspection app used on factory floors.
                </motion.p>

                <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-2">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background text-small font-medium hover:opacity-90 transition-opacity"
                    >
                        See the work
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center h-11 px-5 rounded-full border border-border bg-background/60 backdrop-blur-sm text-small font-medium text-foreground hover:bg-muted transition-colors"
                    >
                        Get in touch
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
