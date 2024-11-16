"use client"
import type { Metadata } from "next";
import React from "react";
import Navbar from "@/widgets/Navbar";
import { Providers } from "@/widgets/Providers";
import { cn } from "@/shared/lib/utils";
import { DndProvider } from "react-dnd";
import { Plate } from "@udecode/plate-common/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { editor } from "@/features/PostEditor";


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
