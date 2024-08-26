// components/BlogPostList.tsx

import React, { useEffect, useState } from 'react';
import createClient from '@sanity/client';

const client = createClient({
  projectId: 'obym4sfw',
  dataset: 'production',
  useCdn: false,
});

// Define the BlogPost type
interface BlogPost {
  _id: string;
  title: string;
  // Add any other fields that a blog post might have
}

const BlogPostList = () => {
  // Update the state hook with the correct type
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await client.fetch<BlogPost[]>('*[_type == "blogPost"]');
      setPosts(result);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <div key={post._id}>{post.title}</div>)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default BlogPostList;
