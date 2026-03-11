"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const CHAR_SET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#!%&()*+,-./:;<=>?@[\\]^_`{|}~";

const ASCIIBackground = ({ speed = 100 }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const containerRef = useRef<HTMLDivElement>(null);
    const gridDataRef = useRef<string[][]>([]);
    const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });

    // 1. Calculate dimensions based on window size
    useEffect(() => {
        const calculateDimensions = () => {
            const charWidth = 12 * 0.6;
            const lineHeight = 12 * 1.2;
            const cols = Math.ceil(window.innerWidth / charWidth);
            const rows = Math.ceil(window.innerHeight / lineHeight);
            setDimensions({ cols, rows });
        };

        calculateDimensions();
        window.addEventListener("resize", calculateDimensions);
        return () => window.removeEventListener("resize", calculateDimensions);
    }, []);

    // 2. Initialize the grid data structure
    useEffect(() => {
        const { cols, rows } = dimensions;
        if (cols === 0 || rows === 0) return;

        gridDataRef.current = Array.from({ length: rows }, () =>
            Array.from(
                { length: cols },
                () => CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
            )
        );

        if (containerRef.current) {
            containerRef.current.textContent = gridDataRef.current
                .map((row) => row.join(" "))
                .join("\n");
        }
    }, [dimensions]);

    // 3. Animation loop — direct DOM mutation for performance
    useEffect(() => {
        if (dimensions.cols === 0) return;

        const intervalId = setInterval(() => {
            const grid = gridDataRef.current;
            if (!grid || grid.length === 0) return;

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (Math.random() > 0.95) {
                        grid[i][j] = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
                    }
                }
            }

            if (containerRef.current) {
                containerRef.current.textContent = grid
                    .map((row) => row.join(" "))
                    .join("\n");
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [dimensions, speed]);

    return (
        <div
            ref={containerRef}
            className="matrix-background"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                color: isDark ? "white" : "#010101",
                fontFamily: "monospace",
                whiteSpace: "pre",
                overflow: "hidden",
                pointerEvents: "none",
                fontSize: "12px",
                lineHeight: "1.2",
                opacity: 0.5,
                zIndex: 1,
                mixBlendMode: "overlay",
                transition: "color 0.3s ease",
            }}
            aria-hidden="true"
        >
            <style>{`
        .matrix-background {
          mask-image: linear-gradient(to bottom, transparent 20%, white 80%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 20%, black 80%);
        }
      `}</style>
        </div>
    );
};

export default ASCIIBackground;