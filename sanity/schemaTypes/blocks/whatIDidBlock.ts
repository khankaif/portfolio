import { defineType, defineField } from 'sanity'

export const whatIDidBlock = defineType({
    name: 'whatIDidBlock',
    title: 'What I Did',
    type: 'object',
    fields: [
        defineField({
            name: 'designItems',
            title: 'Design Contributions',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each item = one bullet point under Design column',
        }),
        defineField({
            name: 'engineeringItems',
            title: 'Engineering Contributions',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Each item = one bullet point under Engineering column. Leave empty for design-only projects.',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'What I Did', subtitle: 'Design + Engineering' }
        },
    },
})
