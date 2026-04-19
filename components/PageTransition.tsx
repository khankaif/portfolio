"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme } = useTheme();
    const isHome = pathname === "/";
    const isDark = theme === "dark";

    // Accent glow colours — matches Hero gradient palette exactly
    const glowColor = isDark
        ? "rgba(0, 225, 255, 0.055)"
        : "rgba(255, 159, 33, 0.06)";

    return (
        <>
            {/* Accent wipe line — thin sweep on every navigation */}
            <motion.div
                key={`wipe-${pathname}`}
                className="fixed top-0 left-0 w-full h-[1.5px] z-[60] pointer-events-none"
                style={{ background: "var(--portfolio-accent)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }}
                transition={{ duration: 0.6, times: [0, 0.45, 1], ease: "easeInOut" }}
            />

            {/* Ambient corner glow — static, CSS only, only on inner pages */}
            {!isHome && (
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    aria-hidden="true"
                    style={{
                        background: `radial-gradient(ellipse 70% 55% at 100% 0%, ${glowColor} 0%, transparent 100%)`,
                        transition: "background 0.4s ease",
                    }}
                />
            )}

            {/* Page content */}
            <motion.div
                key={pathname}
                initial={
                    isHome
                        ? { opacity: 0 }
                        : { opacity: 0, y: 10, filter: "blur(8px)" }
                }
                animate={
                    isHome
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
                {children}
            </motion.div>
        </>
    );
}
