import { defineType, defineField } from 'sanity'

export const statsBlock = defineType({
    name: 'statsBlock',
    title: 'Stats',
    type: 'object',
    fields: [
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. €1M, 50+, 6' }),
                        defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. raised, retailers, weeks' }),
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Stats', subtitle: 'Outcome numbers' }
        },
    },
})
