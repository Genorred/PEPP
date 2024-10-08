import React from 'react'
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, withReact, ReactEditor } from 'slate-react'
import withEmbeds from "@/features/PostEditor/lib/withEmbeds";
import EditorInput from "@/features/PostEditor/ui/EditorInput";
import ToolBar from "@/features/PostEditor/ui/ToolBar";



type CustomElementType = 'code'
  | 'link'
  | 'my4x4_attachment'
  | 'my4x4_manufacturer'
  | 'my4x4_manufacturer_model'
  | 'my4x4_manufacturer_part'
  | 'my4x4_project'
  | 'paragraph'
  | 'youtube'

type CustomElement = {
  type: CustomElementType,
  children: CustomText[],
  href?: string,
}

type CustomText = {
  attachmentId?: string,
  text: string,
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor,
    Element: CustomElement,
    Text: CustomText,
  }
}

export const createWrappedEditor = () => withEmbeds(withReact(createEditor()))

type EditorProps = {
  children: React.ReactNode,
  editor: any,
  // initialValue: Descendant[],
}
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
    ],
  },
]
const Editor = (props: EditorProps) => {
  const {
    children,
    editor,
    // initialValue,
  } = props

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          op => op.type !== 'set_selection',
        )

        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}
    >
      {React.Children.map(children, child => React.cloneElement(child, { editor }))}
    </Slate>
  )
}

Editor.Input = EditorInput
Editor.ToolBar = ToolBar

export default Editor
