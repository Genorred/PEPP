"use client";
import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";
import { PostI } from "@/entities/Post";
import { useInfinitePostRecommendationsQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";

const Page = () => {
  const { data: posts, isLoading, fetchNextPage, hasNextPage, hasPreviousPage}  = useInfinitePostRecommendationsQuery(graphqlClient);
  return (
    <>
      {isLoading && posts
      ? 'Loading...'
      :
        <>
          <PostsFilter />
          <PostsList posts={posts!.pages[0].algoPosts}/>
        </>
      }

    </>
  );
};

export default Page;