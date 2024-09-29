import React from "react";
import MarkButton from "@/features/PostEditor/ui/MarkButton";
import {BoldIcon, ItalicIcon, UnderlineIcon, LucideList, LucideListOrdered} from "lucide-react"
import BlockButton from "@/features/PostEditor/ui/BlockButton";

const ToolBar = () => (
  <>
      <MarkButton format="bold"><BoldIcon /></MarkButton>
      <MarkButton format="italic"><ItalicIcon /></MarkButton>
      <MarkButton format="underline"><UnderlineIcon /></MarkButton>

      <BlockButton format="heading-one"><h1>H1</h1></BlockButton>
      <BlockButton format="heading-two"><h1>H2</h1></BlockButton>

      <BlockButton format="ordered-list"><LucideList /></BlockButton>
      <BlockButton format="unordered-list"><LucideListOrdered /></BlockButton>
  </>
  // <Flex borderBottomWidth="1px" paddingBottom="2" marginBottom="2">

  // </Flex>
)

export default ToolBar
