import { createClient, groq } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env'

export async function getPrizesCount(): Promise<number> {
  
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  });
  const query = groq`count(*[_type == "prize"])`;
  return client.fetch(
    query,
    {},
    { cache: "no-store", next: { revalidate: 0 } },
  );
}