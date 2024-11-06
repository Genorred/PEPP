"use client";
import React, { createElement, useEffect, useMemo, useRef, useState } from "react";
import Container from "@/shared/ui/Container";
import { PostDetailsI } from "@/entities/Post/model";
import { cn } from "@/shared/lib/utils";
import usePostForm from "@/features/PostEditor/lib/usePostForm";
import ModeChanger from "@/app/(pages)/post/[id]/ModeChanger";
import { Box, Container, Stack } from "@mui/material";
import { Editor, EditorInput } from "@/features/PostEditor";
import ToolBar from "@/features/PostEditor/ui/ToolBar";

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
  const [isReadonly, setIsReadonly] = useState(false);
  return (
    <Box sx={{
      marginTop: 4
    }}>
      <Editor editor={editor}>
        <Stack  justifyContent={'center'} sx={{position: 'relative'}} direction={'row'}
        >
          <ModeChanger isReadonly={isReadonly} setIsReadonly={setIsReadonly} />
          <Container component={'div'} sx={{
            maxWidth: 'fit-content',
            marginX: 0,
            minWidth: 640
          }} >
            <EditorInput />
          </Container>
          <Stack sx={{
            overflow: 'hidden',
            transitionProperty: 'all',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
            flex: isReadonly ? 0 : 'auto'}} direction={'row'}>
            <ToolBar />
          </Stack>
        </Stack>
      </Editor>
    </Box>
  );
};

export default Page;