import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../src/sanity/lib/sanity';

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

export default function Blog({ posts }: BlogProps) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
          {post.author.image && (
            <img src={urlFor(post.author.image).url()} alt={post.author.name} />
          )}
          <div>{post.body}</div>
        </div>
      ))}
    </div>
  );
}

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
