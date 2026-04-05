import { defineType, defineField } from 'sanity'

export const mediaBlock = defineType({
    name: 'mediaBlock',
    title: 'The Work',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'Media Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
                        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                    ],
                    preview: {
                        select: { media: 'image', title: 'caption' },
                        prepare({ media, title }) {
                            return { media, title: title || 'Image' }
                        },
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { items: 'items' },
        prepare({ items }) {
            return { title: 'The Work', subtitle: `${items?.length ?? 0} image(s)` }
        },
    },
})
