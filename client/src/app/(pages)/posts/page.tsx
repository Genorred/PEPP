"use client"
import React, {useState} from 'react';
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import {ToggleGroup, ToggleGroupItem} from "@/shared/ui/toggle-group";
import {Bold, Italic, Underline} from "lucide-react";
import PostsFilter from "@/features/posts";
import PostsList from "@/entities/Post";

const Page = () => {
    return (
        <>
            <PostsFilter />
          <PostsList />

        </>
    );
};

export default Page;