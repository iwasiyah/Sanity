// web/pages/index.tsx
import { GetStaticProps } from 'next'
import  client  from './lib/sanity'
import { allPostsQuery } from './lib/queries'
import PostCard from './components/PostCard'

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
 
}

interface HomeProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch(allPostsQuery)
  return { props: { posts } }
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <PostCard key={post.slug.current} post={post} />
      ))}
    </div>
  )
}

export default Home
