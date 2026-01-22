import type { SchemaTypeDefinition } from 'sanity'
import {postType} from "@/sanity/schemaTypes/postType";
import {projectType} from "@/sanity/schemaTypes/projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, projectType],
}
