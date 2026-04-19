"use client";

import { motion } from "framer-motion";
import AnimatedGradient from "@/components/AnimatedGradient";
import ASCIIBackground from "@/components/ASCIIBackground";
import { useTheme } from "@/components/ThemeProvider";
import ScrambleText from "@/components/ScrambleText";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className="fixed inset-0 w-full flex items-center justify-center overflow-hidden px-6 text-center bg-background transition-colors duration-300">
            {/* Background Layer */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <AnimatedGradient
                    color1={isDark ? "#00E1FF" : "#FF9F21"}
                    color2={isDark ? "#217AFF" : "#FF0303"}
                    color3={isDark ? "#000000" : "#fff"}
                />
                <ASCIIBackground speed={50} />
            </div>

            {/* Content Layer */}
            <motion.div
                className="relative max-w-3xl"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Main Text Block */}
                <motion.p
                    variants={item}
                    className="font-medium leading-relaxed tracking-tight sm:text-[20px] text-foreground"
                >
                    I Build Products From Pixel to Production
                    <span className="mx-2 inline-block" aria-hidden="true">⚡</span>
                    <ScrambleText
                        text="Design Engineer"
                        trigger="mount"
                        hold={520}
                        duration={1300}
                        delay={700}
                    />{" who "}

                    <span className="inline-flex items-center gap-2">
                        <span className="font-semibold">
                            thinks in UX, ships in React
                        </span>
                        <span className="inline-block -rotate-12 transition-transform hover:rotate-0" aria-hidden="true">
                            🚀
                        </span>
                    </span>

                    <span className="block mt-1">no handoffs, no translation loss, just shipped products.</span>
                </motion.p>

                {/* Subtext */}
                <motion.p
                    variants={item}
                    className="mt-4 text-[15px] leading-relaxed text-muted-foreground"
                >
                    5 years building real products. Figma is where I start. Production is where I finish.
                </motion.p>
            </motion.div>
        </section>
    );
}