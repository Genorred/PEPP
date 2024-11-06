"use client";

import React, { useState } from "react";
import ModeChanger from "@/widgets/Editor/ui/ModeChanger";
import { Plate } from "@udecode/plate-common/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FixedToolbar } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/features/PostEditor/ui/plate-ui/fixed-toolbar-buttons";
import { Editor } from "@/features/PostEditor/ui/plate-ui/editor";
import { FloatingToolbar } from "@/features/PostEditor/ui/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/features/PostEditor/ui/plate-ui/floating-toolbar-buttons";
import { CommentsPopover } from "@/features/PostEditor/ui/plate-ui/comments-popover";
import { editor } from "@/features/PostEditor/consts/editor";
import { EditPost } from "@/widgets/Editor";

export default function Page() {
  return (
    <EditPost />
)
  ;
}