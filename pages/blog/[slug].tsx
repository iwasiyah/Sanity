// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { sanityClient ,urlFor} from '../../src/sanity/lib/sanity';
import { FC } from 'react';

type Author = {
  name: string;
  bio?: string;
  image?: any;
};

type BlogPost = {
  title: string;
  slug: {
    current: string; // Ensure slug is an object with a 'current' string property
  };
  author: Author;
  body: any;
  image?: any;
  description?: string;
};

type BlogPostProps = {
  post: BlogPost;
};

const BlogPost: FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      {post.image && (
        <img
          src={urlFor(post.image).url()}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-gray-600 mb-4">By {post.author.name}</p>
      <div className="text-gray-800">{post.body}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blogPost"]{ slug }`;
  const posts = await sanityClient.fetch(query);

  
  console.log('Posts:', posts);

  const paths = posts.map((post: { slug: { current: string } }) => ({
    params: { slug: post.slug.current }, 
  }));

  console.log('Paths:', paths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    slug,
    author->{
      name,
      bio,
      image
    },
    image,
    description,
    body
  }`;

  const post = await sanityClient.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
