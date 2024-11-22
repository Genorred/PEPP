"use client";
import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";
import { PostI } from "@/entities/Post";

const Page = () => {
  const posts = usePost
  return (
    <>
      <PostsFilter />
      <PostsList posts={posts}/>

    </>
  );
};

export default Page;