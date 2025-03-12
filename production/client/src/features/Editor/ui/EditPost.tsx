import React from "react";
import ModeChanger from "@/features/Editor/ui/ModeChanger";
import { FixedToolbar } from "@/entities/Post/ui/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/entities/Post/ui/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/entities/Post/ui/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/entities/Post/ui/plate-ui/floating-toolbar-buttons";
import { CommentsPopover } from "@/entities/Post/ui/plate-ui/comments-popover";
import { Editor } from "@/entities/Post/ui/plate-ui/editor";
import { usePostEditor } from "@/features/Editor";
import { useFetchPostQuery } from "@/features/Editor/lib/useFetchPostQuery";
import { useSelector } from "react-redux";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";

export const EditPost = () => {
  const queryKey = useSelector(focusedPostSlice.selectors.queryKey);
  const data = useFetchPostQuery(queryKey);
  console.log(data, "goalll");
  usePostEditor(data?.body);
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
  );
};