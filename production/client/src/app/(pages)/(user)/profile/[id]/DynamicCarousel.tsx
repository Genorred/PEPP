"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { useSelector } from "react-redux";
import { Avatar } from "@/entities/Post/ui/plate-ui/avatar";
import { GetUserFriendshipsQuery, useSendFriendshipRequestMutation } from "@/shared/api/graphql/generated";
import { useParams } from "next/navigation";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button } from "@/shared/ui/button";
import { Handshake } from "lucide-react";

const DynamicCarousel = ({ friends, friendsCount }: {
  friends: GetUserFriendshipsQuery,
  friendsCount: number
}) => {
  const params = useParams<{
    id: string
  }>();
  const id = Number(params.id);
  const user = useSelector(userSlice.selectors.user);
  const { mutate: sendFriendshipMutation } = useSendFriendshipRequestMutation();

  const onSendRequest = () => {
    sendFriendshipMutation({
      receiverId: id
    });
  };
  return (
    <div className="p-2 mx-12">
      {
        user && user?.id !== id && (
          <Button className="flex gap-2 mx-auto" onClick={onSendRequest}>
            Send a request
            <Handshake />
          </Button>
        )
      }
      {friends.userFriends.length > 0 && (
        <Carousel className="flex w-full">
          <CarouselPrevious />
          <CarouselContent className="flex-1">
            {friends.userFriends.map((value, index) => (
                <CarouselItem key={index}
                              className="basis-[20%] min-[400px]:basis-1/6 min-[600px]:basis-[10%] min-[900px]:basis-1/12 min-[1040px]:basis-[6%] xl:basis-[10%]">
                  <Avatar className={""}>
                    {value.anotherUser.id}
                  </Avatar>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default DynamicCarousel;