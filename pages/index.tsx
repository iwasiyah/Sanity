import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../src/sanity/lib/sanity';
import { FC } from 'react';

type Author = {
  name: string;
  bio?: string;
  image?: any;
};

type BlogPost = {
  title: string;
  slug: string;
  author: Author;
  body: any;
};

type BlogProps = {
  posts: BlogPost[];
};

const Blog: FC<BlogProps> = ({ posts }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">By {post.author.name}</p>
            {post.author.image && (
              <img
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="text-gray-800">{post.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blogPost"]{
    title,
    slug,
    author->{
      name,
      bio,
      image
    },
    body
  }`;

  const posts: BlogPost[] = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
