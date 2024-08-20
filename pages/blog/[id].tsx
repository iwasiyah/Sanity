import { GetStaticPaths, GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../../src/sanity/lib/sanity'; // Adjust the path as needed
import { FC } from 'react';

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

type PostProps = {
  post: BlogPost;
};

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.image && (
        <img
          src={urlFor(post.image).url()}
          alt={post.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-gray-600 mb-4">By {post.author.name}</p>
      {post.description && (
        <p className="text-gray-700 mb-4">{post.description}</p>
      )}
      <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = [
    '0973da9d-c97b-4b6c-a363-6e6f29ea01c5',
    '46a99d5e-81e0-42a2-9a07-02c0fec5dcc9',
    'a7c4f360-d139-4157-ab55-e58a20909f01',
    'cccf2803-d0af-4bcd-933a-ae499c36a6f2',
    'd471d719-b028-401c-998a-9c4de8f4dc99',
    'eeca9a96-ca99-40b0-8710-f8773da3beb4',
    'f28c0101-b628-4a31-adb7-6313e1a89487'
  ];

  const paths = ids.map(id => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  const query = `*[_type == "blogPost" && _id == $id][0]{
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

  const post: BlogPost = await sanityClient.fetch(query, { id });

  return {
    props: {
      post,
    },
  };
};

export default Post;
