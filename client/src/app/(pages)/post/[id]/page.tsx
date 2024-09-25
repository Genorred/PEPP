"use client"
import React, { createElement, useMemo, useRef, useState } from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { PostDetailsI } from "@/entities/Post/model";
import { cn } from "@/shared/lib/utils";
import Editor, { createWrappedEditor } from "./Editor";
import usePostForm from "@/app/(pages)/post/[id]/usePostForm";

const Page = () => {
  const [isReadonly, setIsReadonly] = useState(false);
  const post: PostDetailsI = {
    title: "sdf",
    content: [
      {
        component: [
          "h1",
          {
            className: "title"
          },
          "xddd"
        ],
        xe: 500,
        xs: 0,
        ys: 0,
        ye: 500
      }
    ]
  };
  const parent = useRef<HTMLDivElement>(null);
  const maxWidth = parent?.current?.clientWidth;
  const ribbon = useRef<HTMLDivElement>(null);
  const postFormPayload = usePostForm()
  // const {
  //   callbacks: {
  //     //   createPost: createFn,
  //     //   insertRelatedEntity,
  //     //   publishPost: publishFn,
  //     //   unpublishPost: unpublishFn,
  //     //   updatePost: updateFn,
  //     //   selectCategoryKey,
  //     // },
  //     // categories,
  //     // categoryKeys,
  //   }, editor,
  //   // formPayload,
  //   // mutations: {
  //   //   createPost: {
  //   //     isLoading: isCreating,
  //   //   },
  //   //   updatePost: {
  //   //     isLoading: isUpdating,
  //   //   },
  //   // },
  //   // relatedEntities,
  //   // shouldUsePostEditor,
  // } = postFormPayload
  const editor = usePostForm().editor
  console.log(editor)
  return (
    <MaxWidthWrapper className={cn({"ml-0": isReadonly})} ref={parent}>
      <Editor editor={editor} >
        <Editor.ToolBar />
        <Editor.Input />
      </Editor>
    </MaxWidthWrapper>
  );
};

export default Page;