import { getChangedFields } from "@/shared/utils/getChangedFields";
import { focusedPostSlice, mutatedData } from "@/features/Editor/model/focused-post.slice";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useFetchPostQuery } from "@/features/Editor/lib/useFetchPostQuery";
import { useEditorRef } from "@udecode/plate-common/react";
import { HandleWorkFormT } from "@/features/Editor/ui/SaveWork";
import { Value } from "@udecode/slate";

export const useGetUpdatedFields = () => {
  const plateState = useEditorRef();
  const data = useSelector(focusedPostSlice.selectors.all);
  const initialData = useFetchPostQuery(data.initialDataQueryKey);

  return useCallback((values: HandleWorkFormT) => getChangedFields<mutatedData>({
      title: data?.mutatedData?.title ?? initialData?.title!,
      topics: data?.mutatedData?.topics ?? initialData?.topics?.map(topic => topic.title) ?? [],
      subTopics: data?.mutatedData?.subTopics ?? initialData?.subTopics?.map(topic => topic.title) ?? [],
      body: data?.mutatedData?.body ?? initialData?.body
    }, {
      ...values,
      body: plateState.children
    }
  ) as Partial<HandleWorkFormT> & {
    body: Value
  }, [data, initialData, plateState]);
};