"use client";

import React, { useEffect } from "react";
import ModeChanger from "@/features/Editor/ui/ModeChanger";
import { FixedToolbar } from "@/entities/Post/ui/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/entities/Post/ui/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/entities/Post/ui/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/entities/Post/ui/plate-ui/floating-toolbar-buttons";
import { CommentsPopover } from "@/entities/Post/ui/plate-ui/comments-popover";
import { Editor } from "@/entities/Post/ui/plate-ui/editor";
import { useDispatch } from "react-redux";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useEditorRef } from "@udecode/plate-common/react";

export default function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(focusedPostSlice.actions.resetAll());
  }, []);
  const editor = useEditorRef();
  editor.tf.reset();
  return (
    <section className={"mt-4 ml-4 relative flex justify-center max-w-full"}
    >
      <div className={"max-w-[90%] overflow-x-auto"}>
        <div>
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <Editor />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
          <CommentsPopover />
          {/*<PlateContent />*/}
        </div>
      </div>
      <ModeChanger />
    </section>
  )
    ;
}