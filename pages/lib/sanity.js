import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'obym4sfw',  
  dataset: 'localblog',         
  apiVersion: '2023-08-08',      
  useCdn: true,                 
})

export default client
