import { PostQuery } from "@/shared/api/graphql/graphql";
import { useUpdatePostMutation } from "@/shared/api/graphql/generated";
import { HandleWorkFormT } from "@/widgets/Editor/ui/SaveWork";
import { graphqlClient } from "@/shared/api/base";
import { useEditorRef } from "@udecode/plate-common/react";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import onPostSubmit from "@/widgets/Editor/lib/onPostSubmit";
import { BaseSyntheticEvent } from "react";
import { buttonNames } from "@/widgets/Editor/consts";
import { CreatePostParams } from "@/widgets/Editor/lib/useCreatePostSubmit";
import topicsFilter from "@/widgets/PostsFilter/ui/TopicsFilter";

type onSaveT = (isPublished: boolean) => (args: HandleWorkFormT) => void
const useUpdatePostSubmit = (onSave: onSaveT, id?: number | null, data?: CreatePostParams | null) => {
  const { mutate: updatePost } = useUpdatePostMutation(graphqlClient);
  const plateState = useEditorRef();

  function onUpdate(values: HandleWorkFormT) {
    const previousData = {
      title: data!.title,
      topics: (data!.topics instanceof String ? [data!.topics] : data!.topics) as string[],
      subTopics: (data!.subTopics instanceof String ? [data!.subTopics] : data!.subTopics) as string[]
    };
    updatePost({
      ...getChangedFields<HandleWorkFormT>(previousData, values),
      id: id!,
      body: plateState.children as any,
      title: ""
    });
  }

  return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
    if (event) {
      // @ts-ignore
      const name = event.nativeEvent!.submitter.name; // Кнопка, вызвавшая сабмит
      console.log("Кнопка вызвавшая сабмит:", name);
      if (name === buttonNames.save) {
        if (id && data)
          onUpdate(values);
        else
          onSave(false)(values);
      } else {
        onSave(true)(values);
      }
    }
  };
};
export default useUpdatePostSubmit;