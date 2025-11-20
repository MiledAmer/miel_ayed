import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "English" },
        { name: "fr", type: "string", title: "French" },
        { name: "ar", type: "string", title: "Arabic" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "English" },
        { name: "fr", type: "text", title: "French" },
        { name: "ar", type: "text", title: "Arabic" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Product Variants (Weight, Price, Availability)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "weight",
              title: "Weight",
              type: "string",
              placeholder: "e.g., 500g, 1kg",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            },
            {
              name: "availability",
              title: "Availability",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: {
              weight: "weight",
              price: "price",
              availability: "availability",
            },
            prepare({ weight, price, availability }) {
              return {
                title: `${weight} - ${price} DT`,
                subtitle: availability ? "Available" : "Out of Stock",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "subcategory" }] }],
      validation: (Rule) => {
        return Rule.required().min(1) && Rule.unique();
      },
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
    },
  },
});
