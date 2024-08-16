import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../src/sanity/lib/sanity';
import { FC } from 'react';


type Author = {
  name: string;
  bio?: string;
  image?: any;
};

type BlogPost = {
  _id:any;
  title: string;
  slug: string;
  author: Author;
  body: any;
  image?: any;
  description?: string;
};

type BlogProps = {
  posts: BlogPost[];
};

const Blog: FC<BlogProps> = ({ posts }) => {
  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Blogs by Wasia</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
  <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg">
    {post.image && (
      <img
        src={urlFor(post.image).url()}
        alt={post.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
    )}
    <h2 className="text-2xl text-gray-700 font-semibold mb-2">{post.title}</h2>
    <p className="text-gray-600 mb-4">By {post.author.name}</p>
    {post.description && (
      <p className="text-gray-700 mb-4">{post.description}</p>
    )}
    <div className="text-gray-800">{post.body}</div>
  </div>
))}

        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blogPost" && _id == $id ]{
  _id,  
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

  const posts: BlogPost[] = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
