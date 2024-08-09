export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'author',
        type: 'reference',
        to: {type: 'author'},
      },
      {
        name: 'body',
        type: 'blockContent',
        title: 'Body',
      },
    ],
  };
  
 

 
  