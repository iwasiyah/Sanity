import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../src/sanity/lib/sanity';
import { FC, useState } from 'react';

type Author = {
  name: string;
  bio?: string;
  image?: any;
};

type Category = {
  title: string;
};

type Batch = {
  name: string;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  body: any;
  image?: any;
  description?: string;
  categories: Category[];
  batch: Batch;
};

type BlogProps = {
  posts: BlogPost[];
};

const Blog: FC<BlogProps> = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [sortOption, setSortOption] = useState('category'); // Default sorting option

  const sortPosts = (option: string) => {
    let sortedArray = [...posts];
    if (option === 'category') {
      sortedArray.sort((a, b) =>
        a.categories[0]?.title.localeCompare(b.categories[0]?.title)
      );
    } else if (option === 'batch') {
      sortedArray.sort((a, b) =>
        a.batch?.name.localeCompare(b.batch?.name)
      );
    }
    setSortedPosts(sortedArray);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Blogs by Wasia</h1>

        {/* Sorting Options */}
        <div className="mb-8">
          <label htmlFor="sort" className="mr-4">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              sortPosts(e.target.value);
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="category">Category</option>
            <option value="batch">Batch</option>
          </select>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedPosts.map((post) => (
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
              {post.categories && (
                <p className="text-sm text-gray-600 mb-2">Category: {post.categories[0]?.title}</p>
              )}
              {post.batch && (
                <p className="text-sm text-gray-600 mb-2">Batch: {post.batch.name}</p>
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
  const query = `*[_type == "blogPost"]{
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
    body,
    categories[]->{
      title
    },
    batch->{
      name
    }
  }`;

  const posts: BlogPost[] = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
