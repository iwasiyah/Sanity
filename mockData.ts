
export const mockBlogPost = {
    _id: '1',
    title: 'Mock Blog Post',
    slug: 'mock-blog-post',
    author: { name: 'Mock Author' },
    body: '<p>This is mock content for testing.</p>',
    image: { url: () => 'https://via.placeholder.com/150' },
    description: 'This is a mock blog post for testing purposes.',
    categories: [{ title: 'Mock Category' }],
    batch: { name: 'Mock Batch' },
  };
  
  export const mockPosts = [mockBlogPost];
  