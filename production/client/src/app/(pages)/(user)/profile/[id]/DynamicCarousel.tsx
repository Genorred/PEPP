"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { useSelector } from "react-redux";
import { Avatar } from "@/entities/Post/ui/plate-ui/avatar";
import {
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables,
  useGetUsersFriendshipQuery,
  useInfiniteGetUserFriendsQuery,
  useRemoveFriendshipMutation,
  useSendFriendshipRequestMutation
} from "@/shared/api/graphql/generated";
import { useParams } from "next/navigation";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Handshake } from "lucide-react";
import { PostRecommendationsQueryVariables } from "@/shared/api/graphql/graphql";
import { useIntersectionObserver } from "usehooks-ts";
import { queryClient } from "@/shared/api/base";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

const DynamicCarousel = ({ friends, friendsCount }: {
  friends: GetUserFriendsQuery,
  friendsCount: number
}) => {
  const params = useParams<{
    id: string
  }>();
  const id = Number(params.id);
  const user = useSelector(userSlice.selectors.user);
  const usersFriendshipVars = {
    userId1: id,
    userId2: user?.id ?? 0
  };
  const { data: usersFriendship } = useGetUsersFriendshipQuery(usersFriendshipVars, {
    enabled: !!user
  });

  const { mutate: sendFriendshipMutation, isLoading: isSendingFriendship } = useSendFriendshipRequestMutation({
    onSuccess: () => {
      queryClient.setQueryData(useGetUsersFriendshipQuery.getKey(usersFriendshipVars), {});
    }
  });
  const { mutate: removeFriendshipMutation, isLoading: isRemovingFriendship } = useRemoveFriendshipMutation({

    onSuccess: () => {
      queryClient.setQueryData(useGetUsersFriendshipQuery.getKey(usersFriendshipVars), null);
    }
  });

  const onSendRequest = () => {
    sendFriendshipMutation({
      receiverId: id
    });
  };
  const onRemoveRequest = () => {
    removeFriendshipMutation({
      anotherUserId: id
    });
  };

  const defaultParams = {
    userId: id
  } as GetUserFriendsQueryVariables;
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteGetUserFriendsQuery(defaultParams, {
    initialData: { pages: [friends], pageParams: [defaultParams] },
    getNextPageParam: (lastPage, allPages) => (
      friendsCount ? friendsCount - (
        allPages.length * lastPage.userFriends.length) > 1 ?
        {
          ...defaultParams,
          skipPages: allPages.length
        } as PostRecommendationsQueryVariables
        : undefined : undefined
    )
  });

  const [ref] = useIntersectionObserver({
    onChange: isIntersecting => {
      if (isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    }
  });
  const isSameUser = user && user?.id === id;
  return (
    <div className="p-2 mx-12 flex items-center flex-col">
      {
        user ? !isSameUser ? usersFriendship ?
          (
            usersFriendship.usersFriendship?.isAccepted
              ?
              <Button className="flex gap-2" onClick={onRemoveRequest} disabled={isRemovingFriendship}>
                Discard friendship
                <Handshake />
              </Button>
              :
              <Button className="flex gap-2" variant="outline" onClick={onRemoveRequest}
                      disabled={isRemovingFriendship}>
                Remove a request
                <Handshake />
              </Button>
          )
          : (
            <Button className="flex gap-2" onClick={onSendRequest} disabled={isSendingFriendship}>
              Send a request
              <Handshake />
            </Button>
          ) : null : null
      }
      {friends.userFriends.length > 0 ? (
          <>
            <Link href={"/friends/" + id}
                  className={cn(buttonVariants({ variant: "secondary" }), "w-[184px] my-2")}>
              Friends
            </Link>
            <Carousel className="flex w-full">
              <CarouselPrevious />
              <CarouselContent className="flex-1">
                {data?.pages.map(friends =>
                  friends.userFriends.map(({ anotherUser: friend }) =>
                    <CarouselItem key={friend.id}
                                  className="basis-[20%] min-[400px]:basis-1/6 min-[600px]:basis-[10%] min-[900px]:basis-1/12 min-[1040px]:basis-[6%] xl:basis-[10%]">
                      <Avatar className={""}>
                        {friend.id}
                      </Avatar>
                    </CarouselItem>
                  )
                )}
                <div className="h-1 w-full" ref={ref} />
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </>
        ) :
        <div>
          {
            `${isSameUser
              ? "You don't"
              : "User doesn't"
            } have any friends yet`
          }
        </div>
      }
    </div>
  );
};

export default DynamicCarousel;