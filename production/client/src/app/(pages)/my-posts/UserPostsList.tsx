"use client";
import React from "react";
import Container from "@/shared/ui/Container";
import { Post } from "@/entities/Post";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useSelector } from "react-redux";
import {
  GetUserPostsQueryVariables,
  useInfiniteGetUserPostsQuery,
  useInfinitePostRecommendationsQuery
} from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import { PostRecommendationsQueryVariables } from "@/shared/api/graphql/graphql";
import { FileX } from "lucide-react";


const UserPostsList = ({userId}: {
  userId: number
}) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteGetUserPostsQuery({
    userId
  }, {
    getNextPageParam: (lastPage, allPages) => (
      lastPage.userPosts.totalPages - allPages.length > 1 ?
        {
          userId,
          skipPages: allPages.length
        } as GetUserPostsQueryVariables
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
      {data?.pages[0].userPosts.totalPages
        ?
        <>
          <Container className="flex gap-4 flex-wrap" variant={"section"}>
            {data.pages.map(posts =>
              posts.userPosts.data.map(post =>
                <Post key={post.id} {...post} hideUser />
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
          <h2 className='text-2xl font-semibold text-gray-800 mb-2 '>
            "loading..."
          </h2>
          :
          <div
            className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
            <FileX className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Posts Found</h2>
            <p className="text-gray-600 max-w-md">
              We couldn't find any posts at the moment. Check back later or try a different search.
            </p>
          </div>
      }

    </>
  );
};

export default UserPostsList;