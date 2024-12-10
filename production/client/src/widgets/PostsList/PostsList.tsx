"use client";
import React from "react";
import Container from "@/shared/ui/Container";
import { Post } from "@/entities/Post";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useSelector } from "react-redux";
import { useInfinitePostRecommendationsQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";


const PostsList = () => {
  const filters = useSelector(filtersSlice.selectors.filter);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage
  } = useInfinitePostRecommendationsQuery(apiClient);

  return (
    <>
      {isLoading
        ?
        "Loading..."
        :
        <>
          {data?.pages
            ?
            <Container className="flex gap-4 flex-wrap" variant={"section"}>
              {data.pages.map(posts =>
                posts.algoPosts.posts.map(post =>
                  <Post key={post.id} {...post} />
                )
              )}
            </Container>
            :
            "NO posts found"
          }

        </>
      }
    </>
  );
};

export default PostsList;