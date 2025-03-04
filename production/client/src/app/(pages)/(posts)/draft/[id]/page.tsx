"use client";
import React, { useEffect } from "react";
import { useDraftQuery } from "@/shared/api/graphql/generated";
import { EditPost } from "@/features/Editor";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useDispatch } from "react-redux";
import { PostKeys } from "@/features/Editor/model/model";


const Page = ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const { data, isLoading } = useDraftQuery({ id }, {
    enabled: !!id
  });

  const dispatch = useDispatch();
  const queryKey = useDraftQuery.getKey({ id });
  console.log(queryKey);
  useEffect(() => {
    console.log(queryKey);
    dispatch(focusedPostSlice.actions.setInitialDataQuery(queryKey as PostKeys));
    dispatch(focusedPostSlice.actions.setDraftId(id));
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