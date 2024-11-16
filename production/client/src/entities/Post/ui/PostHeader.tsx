import React from "react";
import { CardHeader } from "@/shared/ui/card";
import Image from "next/image"
import { ImageOff } from "lucide-react";

const PostHeader = ({img, title}: {
  img: string
  title: string
}) => {
  return (
    <div className="relative h-48">
      { img
      ?
        <Image src={img} alt={`image for post ${title}`} width={0} height={0}
               className="w-full h-full object-cover"
        />
      :
        <ImageOff />
      }
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <CardHeader className="absolute bottom-0 left-0 right-0 text-white">
        <h2 className="text-2xl font-bold">{title}</h2>
      </CardHeader>
    </div>
  );
};

export default PostHeader;