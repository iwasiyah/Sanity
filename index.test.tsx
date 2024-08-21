import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Blog from '../pages/index'; 

const mockPosts = [
  {
    _id: '1',
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    author: { name: 'John Doe' },
    body: 'This is a test blog post body.',
    image: null,
    description: 'A short description',
    categories: [{ title: 'Category 1' }],
    batch: { name: 'Batch 1' },
  },
];

describe('Blog Page', () => {
  it('should render blog posts', () => {
    render(<Blog posts={mockPosts} />);

    // Check if the title is rendered
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText('A short description')).toBeInTheDocument();

    // Check if the author name is rendered
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
  });

  it('should sort blog posts by category', () => {
    render(<Blog posts={mockPosts} />);

    // Your sorting test logic here
  });
});
