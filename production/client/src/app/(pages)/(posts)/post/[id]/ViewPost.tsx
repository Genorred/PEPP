"use client";
import React from "react";
import { Editor } from "@/entities/Post/ui/plate-ui/editor";
import { usePostEditor } from "@/features/Editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { PostInfo } from "@/widgets/PostInfo/ui/PostInfo";
import Container from "@/shared/ui/Container";
import Thoughts from "@/app/(pages)/(posts)/post/[id]/Thoughts";
import { variants } from "@/entities/Post/ui/consts";
import { Tabs } from "@/shared/ui/tabs";

const ViewPost = ({ post, id }: {
  id: number
  post: PostQuery
}) => {
  const { data, isLoading } = usePostQuery({ id }, {
    initialData: post,
    enabled: !!id
  });
  usePostEditor((data ?? post).post.body);
  return (
    <Container>
      <PostInfo {...post.post} id={id} />
      <Editor readOnly={true} />

        <Thoughts postId={id}/>
    </Container>
  );
};

export default ViewPost;