import { defineType, defineField } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 2,
            description: 'One or two sentences shown as the project tagline.',
        }),
        defineField({
            name: 'projectUrl',
            title: 'Live URL',
            type: 'url',
        }),
        defineField({
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
            description: 'e.g. "6 weeks" or "Aug 2025 – Present"',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Design Engineer, Product Designer',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Full-width image shown at the top of the case study.',
        }),
        defineField({
            name: 'content',
            title: 'Content Blocks',
            type: 'array',
            description: 'Build the story. Add blocks in the order you want them to appear.',
            of: [
                { type: 'challengeBlock' },
                { type: 'whatIDidBlock' },
                { type: 'stackBlock' },
                { type: 'mediaBlock' },
                { type: 'statsBlock' },
                { type: 'outcomeBlock' },
            ],
        }),
    ],
    preview: {
        select: { title: 'title', media: 'heroImage', subtitle: 'description' },
    },
    orderings: [
        {
            title: 'Date, Newest First',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }],
        },
    ],
})
