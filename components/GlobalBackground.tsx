"use client";

import AnimatedGradient from "@/components/AnimatedGradient";
import { useTheme } from "@/components/ThemeProvider";

const GlobalBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    // overflow-hidden is key here to clip the scaled edges
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      
      {/* 1. We move the blur here 
         2. scale-110 pushes the 'ugly' blurry edges off-screen 
      */}
      <div className="absolute inset-0 blur-md scale-110">
        <AnimatedGradient
          color1={isDark ? "#00E1FF" : "#FF9F21"}
          color2={isDark ? "#217AFF" : "#FF0303"}
          color3={isDark ? "#000000" : "#fff"}
        />
      </div>

      {/* The Dimming Layer 
         Added backdrop-blur-sm as requested to further soften the underlying colors
      */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-3xl" />
    </div>
  );
};

export default GlobalBackground;