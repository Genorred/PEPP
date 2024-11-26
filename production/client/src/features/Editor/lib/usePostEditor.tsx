import { useEffect } from "react";
import { editorTransformation } from "@/features/Editor/consts/editor";
import { useEditorRef } from "@udecode/plate-common/react";

export const usePostEditor = (data?: any[]) => {
  const editor = useEditorRef()
  useEffect(() => {
    console.log(data, editor)
    if(data && data.length > 0) {
      editor.tf.setValue(data)
    }
  }, [data]);
  //
  // useEffect(() => {
  //   return () => {
  //     editorTransformation.setValue([])
  //   }
  // }, []);
}