"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Home, FolderKanban, User, Send, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Work", icon: FolderKanban },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Send },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            // Show near the top or when scrolling up; hide when scrolling down.
            setIsVisible(y < 50 || y < lastScrollY.current);
            lastScrollY.current = y;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDark = theme === "dark";

    return (
        <nav
            aria-label="Main"
            className={`
                fixed top-4 sm:top-6 left-1/2 z-50 flex items-center gap-1 p-1.5
                rounded-full border border-border/70 bg-background/80 text-foreground
                backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out
                ${isVisible ? "-translate-x-1/2 translate-y-0 opacity-100" : "-translate-x-1/2 -translate-y-[150%] opacity-0 pointer-events-none"}
            `}
        >
            {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                    <Link
                        key={href}
                        href={href}
                        aria-label={label}
                        title={label}
                        aria-current={isActive ? "page" : undefined}
                        className={`
                            relative isolate flex items-center justify-center
                            w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300
                            ${isActive ? "text-background" : "hover:bg-muted text-muted-foreground hover:text-foreground"}
                        `}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="nav-pill"
                                className="absolute inset-0 -z-10 rounded-full bg-foreground"
                                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                            />
                        )}
                        <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}

            <div className="w-px h-5 mx-0.5 bg-border" />

            <button
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
            </button>
        </nav>
    );
}
