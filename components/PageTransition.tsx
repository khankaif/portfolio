"use client";

import { motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import GlobalBackground from "@/components/GlobalBackground";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <MotionConfig reducedMotion="user">
            {/* Accent wipe line — thin sweep on every navigation */}
            <motion.div
                key={`wipe-${pathname}`}
                className="fixed top-0 left-0 w-full h-[1.5px] z-[60] pointer-events-none"
                style={{ background: "var(--portfolio-accent)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }}
                transition={{ duration: 0.6, times: [0, 0.45, 1], ease: "easeInOut" }}
            />

            {/* Hero's gradient palette, dimmed — shared canvas for all inner pages.
                No animated blur here: filter animation on the whole page tree forces
                full-page repaints and made inner pages shimmer. */}
            {!isHome && <GlobalBackground />}

            {/* Page content */}
            <motion.div
                key={pathname}
                initial={isHome ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={isHome ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
                {children}
            </motion.div>
        </MotionConfig>
    );
}
