"use client";
import React from "react";
import Container from "@/shared/ui/Container";
import { Post } from "@/entities/Post";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useSelector } from "react-redux";
import { useInfinitePostRecommendationsQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { useIntersectionObserver } from "usehooks-ts";
import { PostRecommendationsQueryVariables } from "@/shared/api/graphql/graphql";


const PostsList = () => {
  const { rating, createdAt, ...filters } = useSelector(filtersSlice.selectors.filter);
  const defaultParams = {
    ...filters,
    rating: rating ? rating.toUpperCase() || undefined : undefined,
    createdAt: createdAt ? createdAt.toUpperCase() || undefined : undefined
  } as PostRecommendationsQueryVariables;
  console.log(defaultParams);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfinitePostRecommendationsQuery(defaultParams, {
    getNextPageParam: (lastPage, allPages) => (
      lastPage.algoPosts.totalPages - allPages.length > 1 ?
        {
          ...defaultParams,
          skipPages: allPages.length
        } as PostRecommendationsQueryVariables
        : undefined
    )
  });

  const [ref] = useIntersectionObserver({
    onChange: isIntersecting => {
      if (isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    }
  });

  return (
    <>
      {data?.pages
        ?
        <>
          <Container className="flex gap-4 flex-wrap" variant={"section"}>
            {data.pages.map(posts =>
              posts.algoPosts.data.map(post =>
                <Post key={post.id} {...post} />
              )
            )}
          </Container>
          {hasNextPage ?
            isLoading
              ?
              "loading next page..."
              :
              <div className="h-1 w-full" ref={ref} />
            : null
          }
        </>
        : isLoading
          ?
          "loading..."
          :
          "NO posts found"
      }

    </>
  );
};

export default PostsList;