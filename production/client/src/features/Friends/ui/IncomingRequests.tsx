"use client";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FileTextIcon } from "lucide-react";
import {
  GetUserFriendRequestsQueryVariables,
  useAcceptUserFriendRequestsMutation,
  useGetUserFriendRequestsCountQuery,
  useInfiniteGetUserFriendRequestsQuery,
  useRemoveFriendshipMutation
} from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import Image from "next/image";
import { userSlice } from "@/entities/User/model/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { notificationsSlice } from "@/features/Notifications/model/notifications.slice";
import { queryClient } from "@/shared/api/queryClient";

const IncomingRequests = ({ userId }: {
  userId: number
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSlice.selectors.user);
  const [showThoughts, setShowThoughts] = useState(false);
  const [handledRequests, setHandledRequests] = useState<number[]>([]);
  const { data: countData, isLoading: isCountLoading } = useGetUserFriendRequestsCountQuery({
    userId
  });
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

  const decreaseUserRequests = (id: number) => {
    setHandledRequests(prev => [...prev, id]);
    queryClient.setQueryData(useGetUserFriendRequestsCountQuery.getKey({ userId }), {
      userFriendRequestsQuantity: (countData?.userFriendRequestsQuantity ?? 1) - 1
    });
    dispatch(notificationsSlice.actions.decreaseUserRequests());
  };
  const { mutate: acceptRequest } = useAcceptUserFriendRequestsMutation({
    onSuccess: (_, variables) => {
      toast.success("Friendship accepted!");
      decreaseUserRequests(variables.id);
    }
  });

  const { mutate: deleteUser } = useRemoveFriendshipMutation({
    onSuccess: (data) => {
      decreaseUserRequests(data.removeFriendship.id);
      toast.success("Friendship denied!");
    }
  });

  const onAccept = (id: number) => () => {
    acceptRequest({
      id
    });
  };
  const onDeleteUser = (id: number) => () => {
    deleteUser({ anotherUserId: id });
  };

  if (!user || user?.id !== userId) return null;
  if (countData && !countData.userFriendRequestsQuantity) return null;
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
                    <Button className="ml-auto gap-4" onClick={onDeleteUser(request.anotherUser.id)}>
                      Deny
                    </Button>
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