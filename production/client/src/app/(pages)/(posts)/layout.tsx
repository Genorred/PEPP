"use client";
import React from "react";
import { DndProvider } from "react-dnd";
import { Plate } from "@udecode/plate-common/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { editor } from "@/features/Editor";


export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        {children}
      </Plate>
    </DndProvider>
  );
}
