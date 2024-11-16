import React, { useEffect } from "react";
import ModeChanger from "@/widgets/Editor/ui/ModeChanger";
import { editor, editorTransformation } from "@/features/PostEditor/consts/editor";
import { Plate } from "@udecode/plate-common/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FixedToolbar } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/features/PostEditor/ui/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/features/PostEditor/ui/plate-ui/floating-toolbar-buttons";
import { CommentsPopover } from "@/features/PostEditor/ui/plate-ui/comments-popover";
import { usePostQuery } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { Editor } from "@/features/PostEditor/ui/plate-ui/editor";
import { Value } from "@udecode/slate";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { usePostEditor } from "@/widgets/Editor";

const EditPost = ({ data, id, isDraft, post }: {
  data?: any[]
  id?: number
  isDraft?: boolean
  post?: PostQuery["post"]
}) => {
  usePostEditor(data);
  return (
    <section className={"mt-4 ml-4 relative flex justify-center max-w-full"}
    >
      <div className={"max-w-[90%]"}>
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
      <ModeChanger id={id} isDraft={isDraft} post={post}/>
    </section>
  );
};

export default EditPost;