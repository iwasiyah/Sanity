// components/BlogPostList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BlogPostList from './BlogPostList';
import { describe, it, expect, vi } from 'vitest';
import createClient from '@sanity/client';

// Mock the Sanity client
vi.mock('@sanity/client', () => {
  return {
    default: vi.fn(() => ({
      fetch: vi.fn().mockResolvedValue([
        { _id: '1', title: 'Fashion Hype & Self Confidence' },
        { _id: '2', title: 'Food Trends: Tea & Coffee 2024' },
      ]),
    })),
  };
});

describe('BlogPostList', () => {
  it('should fetch and display specific blog posts', async () => {
    render(<BlogPostList />);

    await waitFor(() => {
      expect(screen.getByText('Fashion Hype & Self Confidence')).toBeInTheDocument();
      expect(screen.getByText('Food Trends: Tea & Coffee 2024')).toBeInTheDocument();
    });
  });

  it('should display "No posts found" if no posts are returned', async () => {
   
    (createClient as any).mockImplementationOnce(() => ({
      fetch: vi.fn().mockResolvedValue([]),
    }));

    render(<BlogPostList />);

    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });
  });
});
