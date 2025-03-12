"use client";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FileTextIcon } from "lucide-react";
import {
  GetUserFriendRequestsQueryVariables,
  GetUserFriendsQueryVariables, useAcceptUserFriendRequestsMutation,
  useGetUserFriendRequestsCountQuery,
  useInfiniteGetUserFriendRequestsQuery
} from "@/shared/api/graphql/generated";
import { PostRecommendationsQueryVariables } from "@/shared/api/graphql/graphql";
import { useIntersectionObserver } from "usehooks-ts";
import Image from "next/image";
import { userSlice } from "@/entities/User/model/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { queryClient } from "@/shared/api/base";
import { notificationsSlice } from "@/widgets/Navbar/model/notifications.slice";

const IncomingRequests = ({ userId }: {
  userId: number
}) => {
  const user = useSelector(userSlice.selectors.user);
  const [handledRequests, setHandledRequests] = useState<number[]>([]);
  const { data: countData, isLoading: isCountLoading } = useGetUserFriendRequestsCountQuery({
    userId
  });
  console.log(countData);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteGetUserFriendRequestsQuery({}, {
    getNextPageParam: (lastPage, allPages) => (
      countData?.userFriendRequestsQuantity && countData?.userFriendRequestsQuantity - (
        allPages.length * lastPage.userFriendRequests.length) > 1 ?
        {
          cursorId: lastPage.userFriendRequests[lastPage.userFriendRequests.length - 1].id
        } as GetUserFriendRequestsQueryVariables
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

  const dispatch = useDispatch();
  const {mutate: acceptRequest} = useAcceptUserFriendRequestsMutation({
    onSuccess: (data, variables, context)=> {
      toast.success("User accepted!");
      setHandledRequests(prev => [...prev, variables.id])
      queryClient.setQueryData(useGetUserFriendRequestsCountQuery.getKey({userId}), {
        userFriendRequestsQuantity: (countData?.userFriendRequestsQuantity ?? 1) -1
      } )
      dispatch(notificationsSlice.actions.decreaseUserRequests());
    }
  })
  const onAccept = (id: number) => () => {
    acceptRequest({
      id
    })
  }
  const [showThoughts, setShowThoughts] = useState(false);
  if (!user || user?.id !== userId) return null;
  if ( countData && !countData.userFriendRequestsQuantity) return null;
  return (
    <Dialog open={showThoughts} onOpenChange={setShowThoughts}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileTextIcon className="w-4 h-4 mr-2" />
          Incoming Requests
        </Button>
      </DialogTrigger>

      <DialogContent>
        {data?.pages.length && !isLoading
          ?
          <>
            <DialogTitle>{countData?.userFriendRequestsQuantity} Requests</DialogTitle>
            {data.pages.map(requests =>
              requests.userFriendRequests.filter(v => !handledRequests.includes(v.id))
                .map(request =>
                <div className="flex items-center mb-4" key={request.id}>
                  {request.anotherUser.img ? (
                    <Image
                      src={request.anotherUser.img}
                      alt={request.anotherUser.username}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
                  )}
                  <h3 className="font-semibold">{request.anotherUser.username}</h3>
                  <Button className="ml-auto" onClick={onAccept(request.id)}>
                    Accept
                  </Button>
                </div>
              )
            )}
            {hasNextPage ?
              isLoading
                ?
                "loading next page..."
                :
                <div className="h-1 w-full" ref={ref} />
              : null
            }
          </> :
          "loading requests..."
        }
      </DialogContent>
    </Dialog>
  );
};

export default IncomingRequests;