"use client";
import React, { FC } from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import TopicsFilter from "@/widgets/PostsFilter/ui/TopicsFilter";

interface Props {
}
const PostsFilter: FC<Props> = () => {
    return (
        <MaxWidthWrapper className="my-4" role={"navigation"} variant={"section"}>
            <TopicsFilter />
       </MaxWidthWrapper>
    );
};

export default PostsFilter;