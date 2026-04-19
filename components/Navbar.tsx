"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, FolderKanban, Heart, Send, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/about", label: "About", icon: Heart },
    { href: "/contact", label: "Contact", icon: Send },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                // Scrolling up or near the top
                setIsVisible(true);
            } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                // Scrolling down and past threshold
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const isDark = theme === "dark";

    return (
        <nav
            className={`
                fixed top-6 left-1/2 z-50 flex items-center gap-1 sm:gap-2 px-3 py-2
                rounded-full border border-border bg-background/80 text-foreground
                backdrop-blur-md transition-all duration-300 ease-in-out
                ${isDark
                    ? "shadow-[0_0_0_1px_rgba(0,225,255,0.10),0_4px_28px_rgba(0,225,255,0.07)]"
                    : "shadow-[0_0_0_1px_rgba(255,159,33,0.10),0_4px_28px_rgba(255,159,33,0.07)]"
                }
                ${isVisible ? "-translate-x-1/2 translate-y-0 opacity-100" : "-translate-x-1/2 -translate-y-[150%] opacity-0 pointer-events-none"}
            `}
        >
            {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                    <Link
                        key={href}
                        href={href}
                        className={`
                            relative flex items-center justify-center
                            w-10 h-10 rounded-full transition-all duration-300
                            ${isActive ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground hover:text-foreground"}
                        `}
                        title={label}
                    >
                        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}

            <div className="w-px h-5 mx-1 bg-border" />

            <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 cursor-pointer"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
                {theme === "dark" ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>
        </nav>
    );
}