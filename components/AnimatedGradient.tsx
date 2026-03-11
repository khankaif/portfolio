"use client";

import { useEffect, useRef, useMemo, CSSProperties } from "react";
import { ShaderMount } from "./ShaderMount";
import {
    PatternShapes,
    PatternShape,
    warpFragmentShader,
    getShaderColorFromString,
} from "./warp-shader";

// ------------------------------------------------------------
// Preset templates 
// ------------------------------------------------------------
export const gradientPresets = {
    Lava: {
        color1: "#00E1FF",
        color2: "#217AFF",
        color3: "#000000",
        rotation: 114,
        proportion: 100,
        scale: 0.52,
        speed: 30,
        distortion: 7,
        swirl: 18,
        swirlIterations: 20,
        softness: 100,
        offset: 717,
        shape: "Edge" as keyof typeof PatternShapes,
        shapeSize: 12,
    },
} as const;

export type GradientPreset = keyof typeof gradientPresets;

// Speed easing
function speedEase(t: number): number {
    const c1 = 0.65, c2 = 0, c3 = 0.88, c4 = 0.77;
    const u = t;
    return (
        3 * (1 - u) * (1 - u) * u * c2 +
        3 * (1 - u) * u * u * c4 +
        u * u * u * 1
    ) * (c1 + c3) * 0.5 * u + u * 0.15;
}

function computeSpeed(rawSpeed: number): number {
    return speedEase(rawSpeed / 100) * 5;
}

// ------------------------------------------------------------
// Props
// ------------------------------------------------------------
export interface AnimatedGradientProps {
    preset?: GradientPreset;
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    scale?: number;
    distortion?: number;
    swirl?: number;
    swirlIterations?: number;
    softness?: number;
    proportion?: number;
    rotation?: number;
    seed?: number;
    shape?: keyof typeof PatternShapes;
    shapeSize?: number;
    className?: string;
    style?: CSSProperties;
}

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------
export default function AnimatedGradient({
    preset = "Lava", // Defaulting strictly to Lava
    color1: customColor1,
    color2: customColor2,
    color3: customColor3,
    speed: customSpeed,
    scale: customScale,
    distortion: customDistortion,
    swirl: customSwirl,
    swirlIterations: customSwirlIterations,
    softness: customSoftness,
    proportion: customProportion,
    rotation: customRotation,
    seed: customSeed,
    shape: customShape,
    shapeSize: customShapeSize,
    className,
    style,
}: AnimatedGradientProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mountRef = useRef<ShaderMount | null>(null);

    const values = useMemo(() => {
        const base = gradientPresets[preset];
        return {
            color1: customColor1 ?? base.color1,
            color2: customColor2 ?? base.color2,
            color3: customColor3 ?? base.color3,
            speed: customSpeed ?? base.speed,
            scale: customScale ?? base.scale,
            distortion: customDistortion ?? base.distortion,
            swirl: customSwirl ?? base.swirl,
            swirlIterations: customSwirlIterations ?? base.swirlIterations,
            softness: customSoftness ?? base.softness,
            proportion: customProportion ?? base.proportion,
            rotation: customRotation ?? base.rotation,
            seed: customSeed ?? base.offset,
            shape: (customShape ?? base.shape) as keyof typeof PatternShapes,
            shapeSize: customShapeSize ?? base.shapeSize,
        };
    }, [
        preset, customColor1, customColor2, customColor3,
        customSpeed, customScale, customDistortion, customSwirl,
        customSwirlIterations, customSoftness, customProportion,
        customRotation, customSeed, customShape, customShapeSize,
    ]);

    const uniforms = useMemo(() => ({
        u_scale: values.scale,
        u_rotation: (values.rotation * Math.PI) / 180,
        u_color1: getShaderColorFromString(values.color1),
        u_color2: getShaderColorFromString(values.color2),
        u_color3: getShaderColorFromString(values.color3),
        u_proportion: values.proportion / 100,
        u_softness: values.softness / 100,
        u_distortion: values.distortion / 50,
        u_swirl: values.swirl / 100,
        u_swirlIterations: values.swirl === 0 ? 0 : values.swirlIterations,
        u_shapeScale: values.shapeSize / 100,
        u_shape: PatternShapes[values.shape] as PatternShape,
    }), [values]);

    const speed = useMemo(() => computeSpeed(values.speed), [values.speed]);
    const seed = useMemo(() => values.seed * 10, [values.seed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        try {
            mountRef.current = new ShaderMount(
                canvas,
                warpFragmentShader,
                uniforms,
                undefined,
                speed,
                seed
            );
        } catch (e) {
            console.error("Failed to initialize AnimatedGradient shader:", e);
        }
        return () => {
            mountRef.current?.dispose();
            mountRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        mountRef.current?.setUniforms(uniforms);
    }, [uniforms]);

    useEffect(() => {
        mountRef.current?.setSpeed(speed);
    }, [speed]);

    useEffect(() => {
        mountRef.current?.setSeed(seed);
    }, [seed]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                display: "block",
                width: "100%",
                height: "100%",
                ...style,
            }}
        />
    );
}