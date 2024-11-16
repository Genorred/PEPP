import { useEffect } from "react";
import { editorTransformation } from "@/features/PostEditor/consts/editor";

export const usePostEditor = (data?: any[]) => {
  useEffect(() => {
    if(data && data.length > 0) {
      editorTransformation.setValue(data)
    }
  }, [data]);

  useEffect(() => {
    return () => {
      editorTransformation.setValue([])
    }
  }, []);
}