"use client";
import React from "react";
import { Editor } from "@/entities/Post/ui/plate-ui/editor";
import { usePostEditor } from "@/features/Editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { PostInfo } from "@/widgets/PostInfo/ui/PostInfo";
import Container from "@/shared/ui/Container";

const ViewPost = ({ post, id }: {
  id: number
  post: PostQuery
}) => {
  const { data, isLoading } = usePostQuery(apiClient, { id }, {
    initialData: post,
    enabled: !!id
  });
  usePostEditor((data ?? post).post.body);
  return (
    <Container>
      <PostInfo {...post.post} id={id} />
      <div className={"max-w-[90%]"}>
        <Editor readOnly={true} />
      </div>

    </Container>
  );
};

export default ViewPost;