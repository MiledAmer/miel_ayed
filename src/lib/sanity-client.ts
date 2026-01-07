import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { env } from "@/env";

const createSanityClient = () =>
  createClient({
    projectId,
    dataset,
    apiVersion,
    token: env.SANITY_API_TOKEN,
    useCdn: false,
  });

const globalForSanity = globalThis as unknown as {
  sanityClient: ReturnType<typeof createSanityClient> | undefined;
};

export const client = globalForSanity.sanityClient ?? createSanityClient();

if (env.NODE_ENV !== "production") globalForSanity.sanityClient = client;
