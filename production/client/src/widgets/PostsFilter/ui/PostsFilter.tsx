"use client";
import React, { FC } from "react";
import Container from "@/shared/ui/Container";
import TopicsFilter from "@/widgets/PostsFilter/ui/TopicsFilter";

interface Props {
}
const PostsFilter: FC<Props> = () => {
    return (
        <Container className="my-4" role={"navigation"} variant={"section"}>
            <TopicsFilter />
       </Container>
    );
};

export default PostsFilter;