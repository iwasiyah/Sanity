import { type SchemaTypeDefinition } from "sanity";
const category: SchemaTypeDefinition = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    ],
  };
  
  export default category;
  

  