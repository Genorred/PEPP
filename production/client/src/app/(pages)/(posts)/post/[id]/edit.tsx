"use client";
import React, { useEffect, useState } from "react";
import Container from "@/shared/ui/Container";
import { PostDetailsI } from "@/entities/Post/model";
import { EditPost } from "@/features/Editor";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { editorTransformation } from "@/features/Editor/consts/editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { useDispatch } from "react-redux";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { PostKeys } from "@/features/Editor/model/model";


const Page = ({ post, id }: {
  id: number
  post: PostQuery;
}) => {
  const { data, isLoading } = usePostQuery(apiClient, { id }, {
    initialData: post,
    enabled: !!id
  });

  const dispatch = useDispatch()
  const queryKey = usePostQuery.getKey({id})
  useEffect(() => {
    dispatch(focusedPostSlice.actions.setInitialDataQuery(queryKey as PostKeys))
    dispatch(focusedPostSlice.actions.setSourceId(id))
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
