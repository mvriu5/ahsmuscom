import type { SchemaTypeDefinition } from 'sanity'
import {postType} from "@/sanity/schemaTypes/postType"
import {projectType} from "@/sanity/schemaTypes/projectType"
import { codeType } from './codeType'
import { reactComponentType } from './reactComponentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, projectType, codeType, reactComponentType],
}
