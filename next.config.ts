import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {};

// Plugins by name so Turbopack can serialise them. remark-gfm = tables.
export default createMDX({ options: { remarkPlugins: [["remark-gfm"]] } })(nextConfig);
