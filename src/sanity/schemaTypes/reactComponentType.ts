import { defineField, defineType } from "sanity";

export const reactComponentType = defineType({
  name: "reactComponent",
  title: "React Component",
  type: "object",
  fields: [
    defineField({
      name: "component",
      title: "Component",
      type: "string",
      options: {
          list: [
              { title: "Crawl Animation", value: "crawlanimation" },
              { title: "Rendering Differences", value: "renderinganimation" },
              { title: "CWV Animation", value: "cwvanimation" },
              { title: "Responsiveness Animation", value: "responsivenessanimation" }
            ],
        },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      component: "component",
    },
    prepare(selection) {
      return {
        title: "React Component",
        subtitle: selection.component || "No component selected",
      };
    },
  },
});
