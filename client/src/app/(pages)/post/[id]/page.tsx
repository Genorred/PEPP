"use client";
import { Pen, PenOff } from "lucide-react";
import React, { createElement, useEffect, useMemo, useRef, useState } from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { PostDetailsI } from "@/entities/Post/model";
import { cn } from "@/shared/lib/utils";
import Editor, { createWrappedEditor } from "../../../../features/PostEditor/ui/Editor";
import usePostForm from "@/features/PostEditor/lib/usePostForm";

const Page = () => {
  const [isReadonly, setIsReadonly] = useState(true);
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
  const postFormPayload = usePostForm();
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
  console.log(editor);
  const ModeChanger = isReadonly ? PenOff : Pen;
  const readOnlyMargin = useRef('');
  const setPadding = () => {
    const element = parent?.current;
    console.log('xd', element, isReadonly)
    if (element) {
      if (isReadonly) {
        element.style.marginLeft = "0"
      } else {
        if (readOnlyMargin?.current){
          element.style.marginLeft = readOnlyMargin.current.toString();
        } else {
          const marginLeft = window.getComputedStyle(element).marginLeft;
          element.style.marginLeft = marginLeft.toString();
          readOnlyMargin.current = marginLeft.toString();
        }
      }
    }
  };
  useEffect(() => {
    const element = parent?.current;
    window.addEventListener("resize", () => {
      if (element) {
        element.style.marginLeft = ''
      }
    })
    if (element) {
      const marginLeft = window.getComputedStyle(element).marginLeft;
      element.style.marginLeft = marginLeft.toString();
      readOnlyMargin.current = marginLeft.toString();
    }
  }, []);
  return (
    <div className="relative">
      <ModeChanger className="absolute top-4 right-4" onClick={() => {
        setPadding()
        setIsReadonly(prev => !prev);
      }} />
      <MaxWidthWrapper className={cn({"ml-0": !isReadonly}, "transition-all")} ref={parent}>
        <Editor editor={editor}>
          <Editor.ToolBar />
          <Editor.Input />
        </Editor>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;