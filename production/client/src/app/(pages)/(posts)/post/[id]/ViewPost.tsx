'use client'
import React from "react";
import { Editor } from "@/features/PostEditor/ui/plate-ui/editor";
import { usePostEditor } from "@/widgets/Editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";

const ViewPost = ({post, id}: {
  id: number
  post: PostQuery
}) => {
  const { data, isLoading } = usePostQuery(graphqlClient, { id }, {
    initialData: post,
    enabled: !!id
  });
  usePostEditor((data ?? post).post.body);
  return (
    <section className={"mt-4 ml-4 relative flex justify-center max-w-full"}
    >
      <div className={"max-w-[90%]"}>
        <Editor />
      </div>
    </section>
  );
};

export default ViewPost;