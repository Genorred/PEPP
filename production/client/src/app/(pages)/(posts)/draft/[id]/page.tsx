'use client'
import React, { useEffect } from "react";
import { useDraftQuery, usePostQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { EditPost } from "@/features/Editor";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useDispatch } from "react-redux";
import { PostKeys } from "@/features/Editor/model/model";


const Page = ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const { data, isLoading } = useDraftQuery(apiClient, { id }, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id
  });

  const dispatch = useDispatch()
  const queryKey = useDraftQuery.getKey({id})
  console.log(queryKey);
  useEffect(() => {
    console.log(queryKey);
    dispatch(focusedPostSlice.actions.setInitialDataQuery(queryKey as PostKeys))
    dispatch(focusedPostSlice.actions.setDraftId(id))
  }, []);
  return (
    <>
      { isLoading
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