import { defineType, defineField } from 'sanity'

export const outcomeBlock = defineType({
    name: 'outcomeBlock',
    title: 'Outcome',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Outcome Description',
            type: 'text',
            rows: 4,
            description: 'What changed because of your work? Concrete business results.',
        }),
    ],
    preview: {
        select: { title: 'text' },
        prepare({ title }) {
            return { title: 'Outcome', subtitle: title }
        },
    },
})
