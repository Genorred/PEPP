"use client";
import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";

const Page = () => {
    return (
        <>
            <PostsFilter />
          <PostsList />

        </>
    );
};

export default Page;