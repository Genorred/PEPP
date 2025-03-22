"use client";
import React from "react";
import { useDraftsQuery } from "@/shared/api/graphql/generated";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { useRouter } from "next/navigation";
import PostDraftCard from "@/entities/Post/ui/PostDraftCard";
import Loading from "@/shared/ui/Loading";

const DraftsList = () => {
  const router = useRouter();
  const user = useSelector(userSlice.selectors.user);
  if (!user) router.push("/");
  const { data, isLoading } = useDraftsQuery();
  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <>
      {data.userDrafts.map(post =>
        <PostDraftCard {...post} key={post.id} />
      )}
    </>
  );
};

export default DraftsList;