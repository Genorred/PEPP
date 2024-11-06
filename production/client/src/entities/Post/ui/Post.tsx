import React from "react";
import Link from "next/link";
import Card from "@/shared/ui/Card";
import ThoughtsPopup from "@/entities/Post/ui/ThoughtsPopup";
import Rating from "@/shared/ui/Rating";
import { PostI } from "@/entities/Post/model";
import mockedImage from "../Strosherer.jpg";
import Image from "next/image";

const Post = (post: PostI) => {
  return (
     <Link href={"/post/" + post.id}>
          <Card className={"rounded-2xl relative font-outline"} key={post.id} variant={"subSection"}>
            <div className="flex justify-between">
              <h2 className="ml-2">
                {post.title}
              </h2>
              <ThoughtsPopup />
            </div>
            <div>
              <Rating className="ml-1" stars={post.rating} />
              <p>
                {post.description}
              </p>
              <Image src={mockedImage} alt={"Strosherer"} quality={1} width={0} height={0}
                     className="-z-20 rounded-2xl blur-[4px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full absolute object-cover" />
              <Image src={mockedImage} alt={"Strosherer"} quality={1} width={0} height={0}
                     className="-z-10 border-2 shadow-2xl rounded-2xl blur-[1px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-[90%] absolute object-contain" />
            </div>
          </Card>
        </Link>
  );
};

export default Post;