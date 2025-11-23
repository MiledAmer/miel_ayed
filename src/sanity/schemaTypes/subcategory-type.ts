import { ChartColumnStacked } from 'lucide-react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  icon: ChartColumnStacked,
  fields: [
    defineField({
      name: 'name',
      title: 'Subcategory Name',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'fr', type: 'string', title: 'French'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'name.fr',
    },
  },
})
