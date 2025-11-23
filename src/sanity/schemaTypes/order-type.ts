import { defineArrayMember, defineField, defineType } from "sanity";
import type { ReactNode } from "react";
import { ShoppingCart } from "lucide-react";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: ShoppingCart,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
      rows: 3,
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      readOnly: true,
      of: [
        defineArrayMember({
          type: "object",
          name: "orderItem",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "variantKey",
              title: "Variant Key",
              type: "string",
              hidden: true, // Hidden because it's for internal reference
            }),
            defineField({
              name: "weight",
              title: "Weight",
              type: "string",
              description: "Snapshot of the weight at time of order",
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              description: "Unit price at time of order",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              productName: "product.title.en",
              weight: "weight",
              quantity: "quantity",
              price: "price",
              media: "product.image",
            },
            prepare(selection) {
              const { productName, weight, quantity, price, media } = selection as {
                productName: string | undefined;
                weight: string | undefined;
                quantity: number | undefined;
                price: number | undefined;
                media: unknown;
              };
              return {
                title: `${productName ?? "Unknown Product"} (${weight ?? "Default"})`,
                subtitle: `${quantity ?? 0} x ${price ?? 0} DT`,
                media: media as ReactNode,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "orderNumber",
      status: "status",
      date: "orderDate",
    },
    prepare(selection) {
      const { title, subtitle, status, date } = selection as {
        title: string | undefined;
        subtitle: string | undefined;
        status: string | undefined;
        date: string | undefined;
      };
      return {
        title: title ?? "Unknown Customer",
        subtitle: `${subtitle ?? "No ID"} - ${status ?? "Unknown"} - ${date ? new Date(date).toLocaleDateString() : "No Date"}`,
      };
    },
  },
});
