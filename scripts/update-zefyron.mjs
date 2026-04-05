import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'xqm9pi3l',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: 'skUYb4rqunEqOQj7DNrIE5R4aBrp01E8T15mnyxzLbb8EaIB9fwbEjlaxKEUpoMcq7GsTOLraTPUyWxDhrUIoqyyF0Az03MsF7074A5UfwgCaH6n9Gxrhco0u8J4j8gCIafIJP27tfMXiK1ei5LtlnGDnxuz16ZSARU2CV3ZpXaQSiPwKrUX',
    useCdn: false,
})

const ZEFYRON_ID = 'S5o1Jwhf1lEVJ6OxWn2nCv'

async function update() {
    try {
        const result = await client.patch(ZEFYRON_ID).set({
            title: 'Zefyron — SaaS UX/UI & Design System',
            slug: { _type: 'slug', current: 'zefyron-saas-platform' },
            date: '2025-07-01',
            description: 'Led all product design across a multi-tool SaaS ecosystem for startups, investors, and corporates — from design system to fundraise pitch decks. Four years, intern to full-time.',
            projectUrl: 'https://zefyron.com/en',
            timeline: 'Oct 2021 – Jul 2025',
            role: ['Product Designer'],
            content: [
                {
                    _type: 'challengeBlock',
                    _key: 'challenge-zefyron',
                    text: 'The innovation ecosystem — startups, investors, corporates, academia — had no unified infrastructure to connect them. Zefyron wanted to build an AI-driven global platform to bridge this gap: six interconnected tools covering deal flow, event management, pitch decks, investor databases, valuation, and more. The challenge wasn\'t just UI — it was creating a coherent, scalable UX language across an entirely new product category, from zero, while the company was still figuring out what it was building.',
                },
                {
                    _type: 'whatIDidBlock',
                    _key: 'whatidid-zefyron',
                    designItems: [
                        'Owned the full design ecosystem from day one — branding, UI/UX, web app design, graphic design, pitch decks, Webflow, and client brand identities',
                        'Built the design system before building the UI — unified components, tokens, and interaction patterns that scaled across 6+ distinct tools',
                        'Designed enterprise interfaces for deal flow platforms, event management tools, pitch deck builders, and investor databases (comparable to AngelList and PitchBook)',
                        'Conducted stakeholder research and mapped user journeys for three distinct personas: founders, investors, and corporate partners',
                        'Created pitch decks and brand materials that directly supported the €1M fundraise',
                        'Designed and built the Zefyron marketing website on Webflow with full brand expression',
                        'Produced client brand identities and graphic design collateral across the platform portfolio',
                        'Collaborated daily with engineering to ensure pixel-accurate implementation across web and mobile',
                    ],
                    engineeringItems: [],
                },
                {
                    _type: 'statsBlock',
                    _key: 'stats-zefyron',
                    stats: [
                        { _key: 'stat-z1', value: '€1M', label: 'raised with materials I designed' },
                        { _key: 'stat-z2', value: '6+', label: 'products designed end-to-end' },
                        { _key: 'stat-z3', value: '4 yrs', label: 'intern → full-time designer' },
                    ],
                },
                {
                    _type: 'outcomeBlock',
                    _key: 'outcome-zefyron',
                    text: 'Zefyron raised €1M with the platform and brand materials I designed as core parts of the pitch. The design system I built scaled across the full product suite and enabled faster development cycles across all six tools. I grew from intern to full-time over four years, taking on increasing ownership of the entire design function. The platform is live at zefyron.com. Detailed screens available on request due to NDA.',
                },
            ],
        }).commit()

        console.log(`✓ Updated Zefyron: ${result._id}`)
    } catch (err) {
        console.error('✗ Failed to update Zefyron:', err.message)
    }
}

update()
