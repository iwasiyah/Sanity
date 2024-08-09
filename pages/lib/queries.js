
export const allPostsQuery = `*[_type == "post"]{
    title,
    slug,
    "authorName": author->name,
    body
  }`
  
  export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    title,
    "authorName": author->name,
    body
  }`
  