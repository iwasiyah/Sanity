

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: 'obym4sfw', 
  dataset: 'production', 
  apiVersion: '2024-08-08', 
  useCdn: true, 
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
