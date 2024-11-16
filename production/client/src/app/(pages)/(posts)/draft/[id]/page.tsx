'use client'
import React from "react";
import { useDraftQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { EditPost } from "@/widgets/Editor";
import { PostQuery } from "@/shared/api/graphql/graphql";


const Page = ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const id = Number(React.use(params).id);
  const { data, isLoading } = useDraftQuery(graphqlClient, { id }, {
    enabled: !!id
  });
  return (
    <>
      { isLoading
        ?
        <div>

        </div>
        :
        <EditPost data={data!.draft.body} id={id}/>
      }
    </>
  );
};

export default Page;