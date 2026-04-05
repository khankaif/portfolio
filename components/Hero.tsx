"use client";

import AnimatedGradient from "@/components/AnimatedGradient";
import ASCIIBackground from "@/components/ASCIIBackground";
import { useTheme } from "@/components/ThemeProvider";

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            className="fixed inset-0 w-full flex items-center justify-center overflow-hidden px-6 text-center transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
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
            <div className="relative max-w-3xl">

                {/* Main Text Block */}
                <p
                    className="font-medium leading-relaxed tracking-tight sm:text-[20px] transition-colors duration-300"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    I Build Products From Pixel to Production
                    <span className="mx-2 inline-block" aria-hidden="true">⚡</span>
                    <span className="glitch-animation">Design Engineer who </span>

                    <span className="inline-flex items-center gap-2">
                        <span
                            className="font-semibold"
                        >
                            thinks in UX, ships in React
                        </span>
                        <span className="inline-block -rotate-12 transition-transform hover:rotate-0" aria-hidden="true">
                            🚀
                        </span>
                    </span>

                    <span className="block mt-1">no handoffs, no translation loss, just shipped products.</span>
                </p>

                {/* Subtext */}
                <p
                    className="mt-4 text-[15px] leading-relaxed transition-colors duration-300"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    5 years building real products. Figma is where I start. Production is where I finish.
                </p>

            </div>
        </section>
    );
}