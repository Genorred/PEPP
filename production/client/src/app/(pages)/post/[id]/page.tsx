"use client";
import { Pen, PenOff } from "lucide-react";
import React, { createElement, useEffect, useMemo, useRef, useState } from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { PostDetailsI } from "@/entities/Post/model";
import { cn } from "@/shared/lib/utils";
import Editor, { createWrappedEditor } from "../../../../features/PostEditor/ui/Editor";
import usePostForm from "@/features/PostEditor/lib/usePostForm";
import useModeChanger from "@/app/(pages)/post/[id]/useModeChanger";
import ModeChanger from "@/app/(pages)/post/[id]/ModeChanger";

const Page = () => {
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
  const editor = usePostForm().editor;
  const {parent, isReadonly, setIsReadonly, setPadding} = useModeChanger()
  return (
    <Editor editor={editor}>
      <div className={cn("relative flex flex-wrap", { "flex-col-reverse": isReadonly })}>
        <ModeChanger isReadonly={isReadonly} setIsReadonly={setIsReadonly} setPadding={setPadding}/>
        <MaxWidthWrapper className={cn({ "mx-0": !isReadonly }, "transition-all min-w-[640px]")} ref={parent}>
          <Editor.Input />
        </MaxWidthWrapper>
        <MaxWidthWrapper className="min-w-40 flex-1">
          <Editor.ToolBar />
        </MaxWidthWrapper>
      </div>
    </Editor>
  );
};

export default Page;