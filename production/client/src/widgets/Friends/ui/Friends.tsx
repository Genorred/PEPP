'use client'
import React from "react";
import { PostRecommendationsQueryVariables } from "@/shared/api/graphql/graphql";
import {
  GetUserFriendsCountQuery,
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables,
  useGetUserFriendsCountQuery,
  useInfiniteGetUserFriendsQuery
} from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import Container from "@/shared/ui/Container";
import Image from "next/image";
import { FileX } from "lucide-react";

const Friends = ({ userId, friends, count }: {
  friends: GetUserFriendsQuery
  count: GetUserFriendsCountQuery
  userId: number
}) => {
  const defaultParams = {
    userId
  } as GetUserFriendsQueryVariables;
  const { data: countData, isLoading: isCountLoading } = useGetUserFriendsCountQuery({
    userId
  }, {
    initialData: count
  });
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteGetUserFriendsQuery(defaultParams, {
    initialData: { pages: [friends], pageParams: [defaultParams]},
    getNextPageParam: (lastPage, allPages) => (
      countData?.userFriendsQuantity && countData?.userFriendsQuantity - (
        allPages.length * lastPage.userFriends.length) > 1 ?
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

  console.log(data?.pages[0]);
  return (
    <div>
      {countData?.userFriendsQuantity && data?.pages.length
        ?
        <>
          <Container className="flex flex-col gap-4 flex-wrap" variant={"section"}>
            <h2>{countData?.userFriendsQuantity} Requests</h2>
            {data.pages.map(friends =>
              friends.userFriends.map(friend =>
                <div className="flex items-center mb-4" key={friend.anotherUser.id}>
                  {friend.anotherUser.img ? (
                    <Image
                      src={friend.anotherUser.img}
                      alt={friend.anotherUser.username}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                  )}
                  <h3 className="font-semibold">{friend.anotherUser.username}</h3>
                </div>
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
            "loading..."
          </h2>
          :
          <div
            className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
            <FileX className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Friends Found</h2>
            <p className="text-gray-600 max-w-md">
              We couldn't find any at the moment. Check back later or try a different search.
            </p>
          </div>
      }

    </div>
  );
};

export default Friends;