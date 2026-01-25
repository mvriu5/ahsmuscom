import {defineField, defineType} from 'sanity'

export const codeType = defineType({
    name: 'code',
    title: 'Code Block',
    type: 'object',
    fields: [
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            description: 'The programming language of the code block (e.g., typescript, javascript, python).',
        }),
        defineField({
            name: 'filename',
            title: 'Filename',
            type: 'string',
            description: '(Optional) A filename to display for the code block.',
        }),
        defineField({
            name: 'code',
            title: 'Code',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'language',
            subtitle: 'filename',
        },
    },
})
