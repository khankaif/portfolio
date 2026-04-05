import { defineType, defineField } from 'sanity'

export const challengeBlock = defineType({
    name: 'challengeBlock',
    title: 'The Challenge',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Challenge Description',
            type: 'text',
            rows: 4,
            description: 'What problem existed before you? What was broken or missing?',
        }),
    ],
    preview: {
        select: { title: 'text' },
        prepare({ title }) {
            return { title: 'The Challenge', subtitle: title }
        },
    },
})
