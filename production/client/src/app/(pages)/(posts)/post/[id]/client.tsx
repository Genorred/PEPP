"use client";
import React, { useEffect, useState } from "react";
import Container from "@/shared/ui/Container";
import { PostDetailsI } from "@/entities/Post/model";
import { EditPost } from "@/widgets/Editor";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { editorTransformation } from "@/features/PostEditor/consts/editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { useDispatch } from "react-redux";
import { focusedPostSlice } from "@/widgets/Editor/model/focused-post.slice";
import { PostKeys } from "@/widgets/Editor/model/model";


const Page = ({ post, id }: {
  id: number
  post: PostQuery;
}) => {
  const { data, isLoading } = usePostQuery(graphqlClient, { id }, {
    initialData: post,
    enabled: !!id
  });

  const dispatch = useDispatch()
  const queryKey = usePostQuery.getKey({id})
  useEffect(() => {
    dispatch(focusedPostSlice.actions.set({initialDataQueryKey: queryKey as PostKeys, sourceId: id}))
  }, []);
  return (
    <>
      { isLoading && data
        ?
        <div>

        </div>
        :
        <EditPost />
      }
    </>
  );
};

export default Page;
