"use client";
import React, { useState } from "react";
import Container from "@/shared/ui/Container";
import { PostDetailsI } from "@/entities/Post/model";
import { EditPost } from "@/widgets/Editor";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { editorTransformation } from "@/features/PostEditor/consts/editor";
import { PostQuery } from "@/shared/api/graphql/graphql";


const Page = ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const { data, isLoading } = usePostQuery(graphqlClient, { id }, {
    enabled: !!id
  });
  return (
    <>
      { isLoading && data
        ?
        <div>

        </div>
        :
        <EditPost data={data!.post.body} post={data!.post}/>
      }
    </>
  );
};

export default Page;