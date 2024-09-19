"use client"
import React, {FC} from 'react';
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import {FiltersI} from "@/features/posts/model/domain";
import TopicsFilter from "@/features/posts/TopicsFilter";
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