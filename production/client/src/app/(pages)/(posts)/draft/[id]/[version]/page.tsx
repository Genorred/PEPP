"use client";
import React, { useEffect } from "react";
import { useDraftQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { EditPost } from "@/features/Editor";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useDispatch } from "react-redux";
import { PostKeys } from "@/features/Editor/model/model";


const Page = ({ params }: {
  params: Promise<{
    id: string
    version: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const version = Number(React.use(params).version);

  const { data, isLoading } = useDraftQuery( { id, version }, {
    enabled: !!id
  });

  const dispatch = useDispatch();
  const queryKey = useDraftQuery.getKey({ id });
  useEffect(() => {
    dispatch(focusedPostSlice.actions.setInitialDataQuery(queryKey as PostKeys));
    dispatch(focusedPostSlice.actions.setVersionId(id));
  }, []);
  return (
    <>
      {isLoading
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