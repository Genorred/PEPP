import React from "react";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { EditPost } from "@/widgets/Editor";
import Client from "./client";
import ViewPost from "@/app/(pages)/(posts)/post/[id]/ViewPost";

const Ssr = async ({ id, data }: {
  id: number
  data: PostQuery;
}) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const sub = accessToken && Number(jwt.decode(accessToken));

  if (sub === data.post.user.id) {
    return <Client post={data} id={id} />;
  } else {
    return <ViewPost post={data} id={id} />
  }
};

export default Ssr;