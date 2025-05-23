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

export const dynamicParams = true;

interface Props {
  params: Promise<{
    id: string
  }>;
}

export async function generateStaticParams() {
  try {
    const data: PostsIdQuery = await serverApiClient.request(PostsIdDocument, {
      token: process.env.NEXTJS_ENDPOINTS
    } as PostsIdQueryVariables);
    console.log(data);

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
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const id = Number((await params).id);
  const data: PostQuery = await serverApiClient.request(PostDocument, {
    id
  } as PostQueryVariables, {});
  return {
    title: data.post.title,
    description: data.post.description
  };
}

const Page = async ({ params }: Props) => {
  const id = Number((await params).id);
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
