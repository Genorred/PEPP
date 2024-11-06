import React from "react";
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

const EditPost = ({id}: {
  id?: number
}) => {
  const { data, isLoading } = id ? usePostQuery(graphqlClient, { id }, {
    onSuccess: (data) => {
      editorTransformation.setValue(data.post.body)
    }
  }) : {};

  return (
    <section className={'mt-4 ml-4 relative flex justify-center max-w-[100%]'}
    >
      <DndProvider backend={HTML5Backend}>
        <Plate editor={editor}>
          <div className={''} >
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
          <ModeChanger />
        </Plate>
      </DndProvider>
    </section>
  );
};

export default EditPost;