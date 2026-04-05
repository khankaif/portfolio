import { defineType, defineField } from 'sanity'

export const stackBlock = defineType({
    name: 'stackBlock',
    title: 'Built With',
    type: 'object',
    fields: [
        defineField({
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. React, TypeScript, Supabase, Socket.IO',
        }),
    ],
    preview: {
        select: { technologies: 'technologies' },
        prepare({ technologies }) {
            return { title: 'Built With', subtitle: technologies?.join(', ') }
        },
    },
})
