import { type SchemaTypeDefinition } from 'sanity';

const blogPost: SchemaTypeDefinition = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};

export default blogPost;
