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
        <section className="relative isolate w-full min-h-[92svh] flex items-center overflow-hidden px-6 pt-32 sm:pt-40 pb-20 sm:pb-28">
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
                className="relative w-full max-w-content mx-auto flex flex-col gap-7 sm:gap-8"
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
                    Four years as a product designer, now a full-stack engineer who owns the system end to
                    end: schema, API, real-time UI and the deploy. I'm the main engineer on a B2B jewelry
                    ordering platform that went from 14 to 63 orders a month after launch. My strongest work
                    is on data integrity: rules enforced in the database, safe migrations, and checking
                    changes against production data before they ship.
                </motion.p>

                <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-2">
                    <Link
                        href="/work"
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
