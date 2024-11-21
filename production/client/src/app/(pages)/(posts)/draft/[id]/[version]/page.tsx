'use client'
import React, { useEffect } from "react";
import { useDraftQuery, usePostQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { EditPost } from "@/widgets/Editor";
import { focusedPostSlice } from "@/widgets/Editor/model/focused-post.slice";
import { useDispatch } from "react-redux";
import { PostKeys } from "@/widgets/Editor/model/model";


const Page = ({ params }: {
  params: Promise<{
    id: string
    version: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const version = Number(React.use(params).version);

  const { data, isLoading } = useDraftQuery(graphqlClient, { id, version }, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!id
  });

  const dispatch = useDispatch()
  const queryKey = useDraftQuery.getKey({id})
  useEffect(() => {
    dispatch(focusedPostSlice.actions.setInitialDataQuery(queryKey as PostKeys))
    dispatch(focusedPostSlice.actions.setVersionId(id))
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