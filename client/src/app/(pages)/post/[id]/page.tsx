import React from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { PostDetailsI } from "@/entities/Post/model";

const Page = () => {
  const post: PostDetailsI = {
    id: "sdf",
    content: [
      {
        component: {
          arguments: {

          }
        }
      }
    ]
}
  return (
    <MaxWidthWrapper>
      <h1>
        {post.title}
      </h1>
    </MaxWidthWrapper>
  );
};

export default Page;