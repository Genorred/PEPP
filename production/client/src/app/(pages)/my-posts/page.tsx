import React from "react";
import { Metadata } from "next";
import MyPosts from "@/app/(pages)/my-posts/MyPosts";

export const metadata: Metadata = {
  title: 'My Drafts',
}
const Page = () => {
    return (
      <MyPosts />
    );
};

export default Page;