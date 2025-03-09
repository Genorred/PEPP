import React from "react";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Edit from "./edit";
import ViewPost from "@/app/(pages)/(posts)/post/[id]/ViewPost";
import { PostInfo } from "@/widgets/PostInfo/ui/PostInfo";
import Container from "@/shared/ui/Container";
import Thoughts from "@/app/(pages)/(posts)/post/[id]/Thoughts";

const Ssr = async ({ id, data }: {
  id: number
  data: PostQuery;
}) => {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  const sub = refreshToken && Number(jwt.decode(refreshToken)?.sub);
  console.log(refreshToken && jwt.decode(refreshToken));
  console.log(data);
  if (sub === data.post.user.id) {
    return (
      <Container>
        <PostInfo {...data.post} id={id} />
        <Edit post={data} id={id} />
        <Thoughts postId={id} />
      </Container>
    );
  } else {
    return <ViewPost post={data} id={id} />;
  }
};

export default Ssr;