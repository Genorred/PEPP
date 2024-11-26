"use client";
import React from "react";
import { useDraftsQuery, User } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { useRouter } from "next/navigation";
import PostDraftCard from "@/entities/Post/ui/PostDraftCard";

const DraftsList = () => {
  const router = useRouter();
  const user = useSelector(userSlice.selectors.user);
  if (!user) router.push("/");
  const { data, isLoading } = useDraftsQuery(apiClient);
  if (isLoading || !data) {
    return <div>Loading...</div>;
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