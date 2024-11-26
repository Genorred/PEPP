"use client";
import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";
import { GeneralPostI } from "@/entities/Post";
import { useInfinitePostRecommendationsQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";

const Page = () => {
  const { data: posts, isLoading, fetchNextPage, hasNextPage, hasPreviousPage}  = useInfinitePostRecommendationsQuery(apiClient);
  return (
    <>
      {isLoading || !posts || !(posts.pages.length > 0)
      ? 'Loading...'
      :
        <>
          <PostsFilter />
          <PostsList posts={posts.pages[0].algoPosts}/>
        </>
      }

    </>
  );
};

export default Page;