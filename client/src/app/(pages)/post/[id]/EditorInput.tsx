import { useCallback } from 'react'
import { Editable } from 'slate-react'

import { Heading } from "lucide-react";
import ImageEmbed from "@/app/(pages)/post/[id]/Elements/ImageEmbed";
import Link from "@/app/(pages)/post/[id]/Elements/Link";
import ListItem from "@/app/(pages)/post/[id]/Elements/ListItem";
import AttachmentEmbed from "@/app/(pages)/post/[id]/Elements/AttachmentEmbed";
import ManufacturerEmbed from "@/app/(pages)/post/[id]/Elements/ManufacturerEmbed";
import ManufacturerModelEmbed from "@/app/(pages)/post/[id]/Elements/ManufacturerModelEmbed";
import ManufacturerPartEmbed from "@/app/(pages)/post/[id]/Elements/ManufacturerPartEmbed";
import ProjectEmbed from "@/app/(pages)/post/[id]/Elements/ProjectEmbed";
import List from "@/app/(pages)/post/[id]/Elements/List";
import YouTubeVideo from "@/app/(pages)/post/[id]/Elements/YouTubeVideo";
import DefaultElement from "@/app/(pages)/post/[id]/Elements/DefaultElement";
import Leaf from "@/app/(pages)/post/[id]/Leaves/Leaf";
import CustomEditor from "@/app/(pages)/post/[id]/CustomEditor";

type EditorInputProps = {
  editor?: any,
  readOnly?: boolean,
}

const EditorInput = (props: EditorInputProps) => {
  const { editor, readOnly = false } = props

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'heading-one':
        return <Heading as="h1" size="xl" {...props} />
      case 'heading-two':
        return <Heading as="h2" size="lg" {...props} />
      case 'image':
        return <ImageEmbed {...props} />
      case 'link':
        return <Link {...props} />
      case 'list-item':
        return <ListItem {...props} />
      case 'my4x4_attachment':
        return <AttachmentEmbed {...props} />
      case 'my4x4_manufacturer':
        return <ManufacturerEmbed {...props} />
      case 'my4x4_manufacturer_model':
        return <ManufacturerModelEmbed {...props} />
      case 'my4x4_manufacturer_part':
        return <ManufacturerPartEmbed {...props} />
      case 'my4x4_project':
        return <ProjectEmbed {...props} />
      case 'ordered-list':
        return <List {...props} />
      case 'unordered-list':
        return <List {...props} />
      case 'youtube':
        return <YouTubeVideo {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <Editable
      // className={styles.root}
      onChange={(value) => {
        console.log('onChange', value)
      }}
      onKeyDown={(event) => {
        if (!event.ctrlKey) {
          return
        }

        // Replace the `onKeyDown` logic with our new commands.
        switch (event.key) {
          case 'b': {
            event.preventDefault()
            CustomEditor.toggleMark(editor, 'bold')
            break
          }
          case 'i': {
            event.preventDefault()
            CustomEditor.toggleMark(editor, 'italic')
            break
          }
        }
      }}
      onPaste={async (event) => {
        CustomEditor.handlePaste(editor, event)
      }}
      readOnly={readOnly}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      style={{ minHeight: readOnly ? undefined : 180 }}
    />
  )
}

export default EditorInput
