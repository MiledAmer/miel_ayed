import { ChartColumnStacked } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: ChartColumnStacked,
  fields: [
    defineField({
      name: "LandingPageTopSales",
      title: "Add the category to langding page top sales section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "name",
      title: "Category Name",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "fr", type: "string", title: "French" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "subcategory" }] }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "name.fr",
    },
  },
});
