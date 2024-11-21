import React, { Suspense } from "react";
import { graphqlClient } from "@/shared/api/base";
import {
  PostsIdDocument,
  PostDocument,
  PostQuery,
  PostQueryVariables,
  PostsIdQueryVariables,
  PostsIdQuery
} from "@/shared/api/graphql/generated";
import Ssr from "@/app/(pages)/(posts)/post/[id]/ssr";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const data: PostsIdQuery = await graphqlClient.request(PostsIdDocument, {
    token: process.env.NEXTJS_ENDPOINTS
  } as PostsIdQueryVariables);

  return data.allPosts.map((post) => ({
    id: String(post.id)
  }));
}

const Page = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const id = Number(params.id);
  const post: PostQuery = await graphqlClient.request(PostDocument, {
    id
  } as PostQueryVariables);

  return (
    <Suspense fallback={null}>
      <Ssr id={id} data={post} />
    </Suspense>
  );
};

export default Page;