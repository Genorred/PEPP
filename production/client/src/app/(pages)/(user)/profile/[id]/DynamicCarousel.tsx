import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import styles from './carousel-item.module.css'
import { useSelector } from "react-redux";
import { scrollSlice } from "@/widgets/Navbar/model";
import { Avatar } from "@/entities/Post/ui/plate-ui/avatar";
import { cn } from "@/shared/lib/utils";
import { GetUserFriendshipsQuery } from "@/shared/api/graphql/generated";

const DynamicCarousel = ({ friends, friendsCount }: {
  friends: GetUserFriendshipsQuery,
  friendsCount: number
}) => {

  return (
    <div className="p-2 mx-12">
    <Carousel className="flex w-full">
      <CarouselPrevious />
      <CarouselContent className='flex-1'>
        {friends.userFriends.map((value, index) => (
            <CarouselItem key={index}
                          className='basis-[20%] min-[400px]:basis-1/6 min-[600px]:basis-[10%] min-[900px]:basis-1/12 min-[1040px]:basis-[6%] xl:basis-[10%]'>
                  <Avatar className={''}>
                    {value.anotherUser.id}
                  </Avatar>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default DynamicCarousel;