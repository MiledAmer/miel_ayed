import { defineField, defineType } from "sanity";
import { VariantPreviewInput } from "../components/VariantPreviewInput";
import { PackageSearch } from "lucide-react";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageSearch,
  fields: [
    defineField({
      name:"isTopSale",
      title:"Is Top Sale",
      type:"boolean",
      initialValue:false,
    }),
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
      name: "selectedVariant",
      title: "Preview Variant",
      type: "object",
      description:
        "Select which variant to display as preview. Add variants first.",
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
      components:{
        input: VariantPreviewInput,
      },
      hidden: ({ document }) => {
        const variants = document?.variants as
          | Array<{ _key?: string }>
          | undefined;
        return !variants || variants.length === 0;
      },
      validation: (Rule) =>
        Rule.required().custom((selectedVariant, context) => {
          // if (!selectedVariant) return true;
          
          const variantKey = (selectedVariant as { _key?: string })?._key;
          if (!variantKey) return "Selected variant must have a valid key.";
          
          const variants = (context.document?.variants as Array<{ _key?: string }>) ?? [];
          const variantExists = variants.some((v) => v._key === variantKey);
          
          if (!variantExists) {
            return "Selected variant does not exist in the variants list. Please select a valid variant.";
          }
          
          return true;
        }),
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description:
        "Clear this field to select a different category. Clear subcategory to change the category.",
      readOnly: ({ document }) => !!document?.subcategory,
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "subcategory" }],
      hidden: ({ document }) => !document?.category,
      options: {
        filter: ({ document }) => {
          const category = document?.category as { _ref?: string } | undefined;
          const categoryId = category?._ref;
          if (!categoryId) {
            return { filter: "false" };
          }
          return {
            filter:
              "_id in *[_type == 'category' && _id == $categoryId][0].subcategories[]._ref",
            params: { categoryId },
          };
        },
      },
      validation: (Rule) =>
        Rule.custom(async (subcategory, context) => {
          if (!subcategory) return true;

          const category = (
            context.document?.category as { _ref?: string } | undefined
          )?._ref;
          if (!category) return true;

          const client = context.getClient({ apiVersion: "2023-01-01" });
          const result = await client.fetch<string[]>(
            `*[_type == 'category' && _id == $categoryId][0].subcategories[]._ref`,
            { categoryId: category },
          );

          const subcategoryId = (subcategory as { _ref?: string })?._ref;
          if (result?.includes(subcategoryId ?? "")) {
            return true;
          }

          return "This subcategory does not belong to the selected category. Please clear and select a valid subcategory.";
        }),
      description:
        "Select a category first to choose a subcategory. If you change category, clear this field and select again.",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
    },
  },
});
