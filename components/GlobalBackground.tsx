"use client";

import AnimatedGradient from "@/components/AnimatedGradient";
import ASCIIBackground from "@/components/ASCIIBackground";
import { useTheme } from "@/components/ThemeProvider";

export default function GlobalBackground() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: "var(--bg-primary)" }}>
            <AnimatedGradient
                color1={isDark ? "#00E1FF" : "#FF9F21"}
                color2={isDark ? "#217AFF" : "#FF0303"}
                color3={isDark ? "#000000" : "#fff"}
            />
            <ASCIIBackground speed={50} />
        </div>
    );
}