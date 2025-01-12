import React from "react";
import {
  PostDocument,
  PostQueryVariables,
  PostsIdDocument,
  PostsIdQuery,
  PostsIdQueryVariables
} from "@/shared/api/graphql/generated";
import { apiClient, serverApiClient } from "@/shared/api/base";
import { PostQuery } from "@/shared/api/graphql/graphql";
import ViewPost from "../ViewPost";

export async function generateStaticParams() {
  const data: PostsIdQuery = await serverApiClient.request(PostsIdDocument, {
    token: process.env.NEXTJS_ENDPOINTS,
    isArchived: true
  } as PostsIdQueryVariables);

  return data.allPosts.map((post) => ({
    id: String(post.id),
    version: post.version
  }));
}

const Page = async ({ params }: {
  params: {
    id: string
    version: string
  }
}) => {
  const id = Number(params.id);
  const version = Number(params.version);
  const post: PostQuery = await serverApiClient.request(PostDocument, {
    id,
    version
  } as PostQueryVariables);

  return <ViewPost post={post} id={id} />;
};

export default Page;