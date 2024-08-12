import { type SchemaTypeDefinition } from 'sanity';
import blogPost from '././schemas/blogPost';
import author from '././schemas/author';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, author],
};
