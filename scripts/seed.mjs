import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'xqm9pi3l',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: 'skUYb4rqunEqOQj7DNrIE5R4aBrp01E8T15mnyxzLbb8EaIB9fwbEjlaxKEUpoMcq7GsTOLraTPUyWxDhrUIoqyyF0Az03MsF7074A5UfwgCaH6n9Gxrhco0u8J4j8gCIafIJP27tfMXiK1ei5LtlnGDnxuz16ZSARU2CV3ZpXaQSiPwKrUX',
    useCdn: false,
})

const projects = [
    {
        _type: 'project',
        title: 'UnivDiam Custom Portal',
        slug: { _type: 'slug', current: 'univdiam-custom-portal' },
        date: '2025-01-01',
        description: 'End-to-end workflow platform for a B2B jewelry manufacturer — from custom order requests to production delivery. Designed and built solo.',
        projectUrl: 'https://www.skvinvest.de/portfolio',
        timeline: '3 months',
        role: ['Design Engineer'],
        content: [
            {
                _type: 'challengeBlock',
                _key: 'challenge-univdiam',
                text: 'UnivDiam was managing custom order requests through WhatsApp messages and email chains. Retailers would request custom pieces, UnivDiam would create CAD designs, and approvals happened over endless back-and-forth. There was no single source of truth — orders got lost, revisions were untraceable, and production timelines were invisible to both sides. The entire operation was held together by manual effort.',
            },
            {
                _type: 'whatIDidBlock',
                _key: 'whatidid-univdiam',
                designItems: [
                    'Mapped the full business process: request → CAD design → retailer approval → production → delivery',
                    'Designed UX for three user roles — retailer, UnivDiam admin, and production team',
                    'Built a component-based design system ensuring consistency across all platform states',
                    'Designed real-time order status flows with clear visual hierarchy for each stage',
                    'Created onboarding flows and empty states that made the platform self-explanatory',
                ],
                engineeringItems: [
                    'Built the full platform in React, TypeScript, and shadcn/ui — solo',
                    'Implemented real-time order status updates using Socket.IO',
                    'Integrated file upload and CAD asset management with preview support',
                    'Used React Query for server state management and optimistic UI updates',
                    'Deployed on Vercel with environment-based configuration for staging and production',
                ],
            },
            {
                _type: 'stackBlock',
                _key: 'stack-univdiam',
                technologies: ['React', 'TypeScript', 'shadcn/ui', 'TailwindCSS', 'React Query', 'Socket.IO', 'Supabase', 'Vercel'],
            },
            {
                _type: 'statsBlock',
                _key: 'stats-univdiam',
                stats: [
                    { _key: 'stat-1', value: '50+', label: 'retailers onboarded' },
                    { _key: 'stat-2', value: '3', label: 'months to ship' },
                    { _key: 'stat-3', value: '1', label: 'engineer — me' },
                ],
            },
            {
                _type: 'outcomeBlock',
                _key: 'outcome-univdiam',
                text: 'The platform replaced an entirely manual process. No more WhatsApp threads, no lost orders. Retailers raise requests, track CAD revisions, and approve designs in one place. UnivDiam has full visibility into every order stage, reducing back-and-forth by an estimated 70%. The platform is live and actively used across their retailer network.',
            },
        ],
    },
    {
        _type: 'project',
        title: 'Zefyron — B2B SaaS Platform',
        slug: { _type: 'slug', current: 'zefyron-saas-platform' },
        date: '2023-06-01',
        description: 'Enterprise deal flow, event management, and investor tooling for a European startup. Core design team member through a €1M raise.',
        projectUrl: 'https://zefyron.com/en',
        timeline: '3 years',
        role: ['Product Designer', 'Design Lead'],
        content: [
            {
                _type: 'challengeBlock',
                _key: 'challenge-zefyron',
                text: 'Zefyron needed to build an enterprise-grade platform from the ground up — covering deal flow management, event platforms, pitch deck tooling, and investor databases comparable to AngelList and PitchBook. The challenge was designing a coherent product experience across 5+ distinct tools, each serving different stakeholder journeys, while maintaining a unified design language that could scale as the company grew and raised funding.',
            },
            {
                _type: 'whatIDidBlock',
                _key: 'whatidid-zefyron',
                designItems: [
                    'Owned all product design across the platform — from initial research to developer handoff',
                    'Designed enterprise SaaS interfaces for deal platforms, event management, valuation tools, and pitch deck builders',
                    'Built and maintained a component-based design system used across web and mobile applications',
                    'Conducted stakeholder interviews to map user journeys for investors, founders, and event organizers',
                    'Created investor pitch decks and brand materials that directly supported the €1M fundraise',
                    'Collaborated with engineering to ensure pixel-accurate implementation across the product suite',
                ],
                engineeringItems: [],
            },
            {
                _type: 'statsBlock',
                _key: 'stats-zefyron',
                stats: [
                    { _key: 'stat-4', value: '€1M', label: 'raised while I was on the team' },
                    { _key: 'stat-5', value: '5+', label: 'products designed' },
                    { _key: 'stat-6', value: '3', label: 'years as core team' },
                ],
            },
            {
                _type: 'outcomeBlock',
                _key: 'outcome-zefyron',
                text: 'Zefyron successfully raised €1M with the platform and brand materials I designed as a core part of the pitch. The design system I built scaled across the full product suite and enabled faster development cycles. The platform is live at zefyron.com. Detailed screens available on request due to NDA.',
            },
        ],
    },
]

async function seed() {
    for (const project of projects) {
        try {
            const result = await client.create(project)
            console.log(`✓ Created: ${project.title} (${result._id})`)
        } catch (err) {
            console.error(`✗ Failed: ${project.title}`, err.message)
        }
    }
    console.log('\nDone. Open /studio to see your projects.')
}

seed()
