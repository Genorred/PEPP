import { useSlate } from 'slate-react'
import CustomEditor from "@/features/PostEditor/ui/CustomEditor";
import { Button } from "@/shared/ui/button";
type BlockButtonProps = {
  children: React.ReactElement,
  format: 'heading-one' | 'heading-two' | 'ordered-list' | 'unordered-list',
}

const BlockButton = (props: BlockButtonProps) => {
  const { children, format } = props

  const editor = useSlate()

  const isActive = CustomEditor.isBlockActive(editor, format)

  return (
    <Button
      aria-label={format}
      // backgroundColor={isActive ? 'ButtonText' : undefined}
      // color={isActive ? 'white' : undefined}
      // icon={children}
      onMouseDown={(event) => {
        event.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
      variant="ghost"
      // marginRight="1"
      // variant={isActive ? 'solid' : 'outline'}
    >{children}</Button>
  )
}

export default BlockButton
