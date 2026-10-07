// From vgpu's Liquid Layout example (MIT, Vercel Labs): the two pieces of its
// layout store the liquid dynamics depend on.

export type Layer = "grid" | "panel";

/** Corner radius (CSS px) of a card; the DOM and the liquid share it. */
export function cornerRadius(width: number, height: number): number {
    return Math.round(Math.min(22, Math.max(10, Math.min(width, height) * 0.09)));
}
