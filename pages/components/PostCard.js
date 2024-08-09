// web/components/PostCard.js
import Link from 'next/link'

export default function PostCard({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>By {post.authorName}</p>
      <Link href={`/post/${post.slug.current}`}>
        <a>Read more</a>
      </Link>
    </article>
  )
}
