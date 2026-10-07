"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Home, FolderKanban, User, Send, Moon, Sun } from "lucide-react";
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
                fixed top-4 sm:top-6 left-1/2 z-50 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2
                max-w-[calc(100vw-2rem)] rounded-full border border-border bg-background/80 text-foreground
                backdrop-blur-md transition-all duration-300 ease-in-out
                ${isDark
                    ? "shadow-[0_0_0_1px_rgba(0,225,255,0.10),0_4px_28px_rgba(0,225,255,0.07)]"
                    : "shadow-[0_0_0_1px_rgba(255,159,33,0.10),0_4px_28px_rgba(255,159,33,0.07)]"
                }
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
                        aria-current={isActive ? "page" : undefined}
                        className={`
                            relative flex items-center justify-center gap-2
                            px-3 sm:px-3.5 h-10 rounded-full transition-all duration-300
                            ${isActive ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground hover:text-foreground"}
                        `}
                    >
                        <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                        <span className={`hidden sm:inline text-small ${isActive ? "font-semibold" : "font-medium"}`}>{label}</span>
                    </Link>
                );
            })}

            <div className="w-px h-5 mx-1 bg-border" />

            <button
                onClick={toggleTheme}
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>
        </nav>
    );
}
