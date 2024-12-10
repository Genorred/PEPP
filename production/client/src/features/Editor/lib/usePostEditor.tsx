import { useEffect } from "react";
import { useEditorRef } from "@udecode/plate-common/react";

export const usePostEditor = (data?: any[]) => {
  const editor = useEditorRef();
  useEffect(() => {
    console.log(data, editor);
    if (data && data.length > 0) {
      editor.tf.setValue(data);
    }
  }, [data]);
  //
  // useEffect(() => {
  //   return () => {
  //     editorTransformation.setValue([])
  //   }
  // }, []);
};