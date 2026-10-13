import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    // WebGPU shaders import as typed modules (vgpu).
    turbopack: { rules: { "*.wgsl": { loaders: ["@vgpu/wgsl/loader-webpack"], as: "*.js" } } },
    async redirects() {
        return [
            {
                source: "/projects/:slug*",
                destination: "/works/:slug*",
                permanent: true,
            },
            {
                source: "/projects",
                destination: "/works",
                permanent: true,
            },
            {
                source: "/work",
                destination: "/works",
                permanent: true,
            },
        ];
    },
};

// Plugins by name so Turbopack can serialise them. remark-gfm = tables.
export default createMDX({ options: { remarkPlugins: [["remark-gfm"]] } })(nextConfig);
