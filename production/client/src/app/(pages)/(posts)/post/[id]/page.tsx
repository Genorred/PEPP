import React, { Suspense } from "react";
import { serverApiClient } from "@/shared/api/base";
import {
  PostDocument,
  PostQuery,
  PostQueryVariables,
  PostsIdDocument,
  PostsIdQuery,
  PostsIdQueryVariables
} from "@/shared/api/graphql/generated";
import Ssr from "@/app/(pages)/(posts)/post/[id]/ssr";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data: PostsIdQuery = await serverApiClient.request(PostsIdDocument, {
      token: process.env.NEXTJS_ENDPOINTS
    } as PostsIdQueryVariables);

    // const data: PostsIdQuery = await fetch(serverBaseUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query:PostsIdDocument,
    //   }),
    //   next: { revalidate: 10 },
    // }).then((res) => res.json());
    return data.allPosts.map((post) => ({
      id: String(post.id)
    }));
  } catch (e) {
    console.error(e);
  }
}

const Page = async ({ params }: {
  params: {
    id: string
  }
}) => {
  const id = Number(params.id);
  const post: PostQuery = await serverApiClient.request(PostDocument, {
    id
  } as PostQueryVariables, {});

  return (
    <Suspense fallback={null}>
      <Ssr id={id} data={post} />
    </Suspense>
  );
};

export default Page;