import { defineField, defineType } from "sanity";
import { Phone } from "lucide-react";

export default defineType({
  name: "prize",
  title: "Prize Requests",
  type: "document",
  icon: Phone,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "phoneNumber",
    },
  },
});
