import React, { useEffect } from "react";
import ModeChanger from "@/widgets/Editor/ui/ModeChanger";
import { FixedToolbar } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/features/PostEditor/ui/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/features/PostEditor/ui/plate-ui/floating-toolbar-buttons";
import { CommentsPopover } from "@/features/PostEditor/ui/plate-ui/comments-popover";
import { Editor } from "@/features/PostEditor/ui/plate-ui/editor";
import { usePostEditor } from "@/widgets/Editor";
import { useGetFetchQuery } from "@/shared/api/useGetFetchQuery";
import { useFetchPostQuery } from "@/widgets/Editor/lib/useFetchPostQuery";
import { useSelector } from "react-redux";
import { focusedPostSlice } from "@/widgets/Editor/model/focused-post.slice";

export const EditPost = () => {
  const queryKey = useSelector(focusedPostSlice.selectors.queryKey)
  if (queryKey) {
    const data = useFetchPostQuery(queryKey);
    console.log(data, 'goalll');
    usePostEditor(data?.body);
  }
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