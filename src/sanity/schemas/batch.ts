import { type SchemaTypeDefinition } from "sanity";
  const batch: SchemaTypeDefinition = {
    name: 'batch',
    title: 'Batch',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Batch Name',
        type: 'string',
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'datetime',
      },
    ],
  };
  
  export default batch;