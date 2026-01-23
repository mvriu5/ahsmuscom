import {defineField, defineType} from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'link',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'detailedDescription',
            type: 'text',
        }),
        defineField({
            name: 'live',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'popoverContent',
            type: 'array',
            of: [{type: 'block'}],
        }),
    ],
})
