"use client"
import Container from "@/shared/ui/Container";
import React from "react";
import { useDraftsQuery, User } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { useRouter } from "next/navigation";
import PostDraftCard from "@/entities/Post/ui/PostDraftCard";

const DraftsList = () => {
  const router = useRouter();
  const user = useSelector(userSlice.selectors.user);
  if (!user) router.push("/");
  const { data, isLoading } = useDraftsQuery(graphqlClient)
  if(isLoading || !data) {
    return <div>Loading...</div>;
  }
  return (
    <Container className='flex gap-4 flex-wrap' variant={"section"}>
      {data.userDrafts.map(post =>
        <PostDraftCard {...post} key={post.id}/>
      )}
    </Container>
  );
};

export default DraftsList;