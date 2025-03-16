import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Drafts',
}
const Page = () => {
  return (
    <>
      <PostsFilter />
      <PostsList />
    </>
  );
};

export default Page;