import { PostQuery } from "@/shared/api/graphql/graphql";
import { usePublishPostVersionMutation, useUpdatePostMutation } from "@/shared/api/graphql/generated";
import { HandleWorkFormT } from "@/widgets/Editor/ui/SaveWork";
import { graphqlClient } from "@/shared/api/base";
import { useEditorRef } from "@udecode/plate-common/react";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import onPostSubmit from "@/widgets/Editor/lib/onPostSubmit";
import { BaseSyntheticEvent, useState } from "react";
import { buttonNames } from "@/widgets/Editor/consts";
import { CreatePostParams } from "@/widgets/Editor/lib/useSavePost";
import topicsFilter from "@/widgets/PostsFilter/ui/TopicsFilter";

type onSaveT = (isPublished: boolean) => (args: HandleWorkFormT) => void
const useUpdatePostSubmit = (onSave: onSaveT, isVersion: boolean, createdId?: number | null, data?: CreatePostParams | null) => {
  const { mutate: updatePost } = useUpdatePostMutation(graphqlClient);
  const { mutate: onPublishVersion } = usePublishPostVersionMutation(graphqlClient);
  const plateState = useEditorRef();

  function onUpdate(values: HandleWorkFormT, isPublished?: boolean) {
    const previousData: Parameters<typeof onUpdate>['0'] = {
      title: data!.title,
      topics: (data!.topics instanceof String ? [data!.topics] : data!.topics) as string[],
      subTopics: (data!.subTopics instanceof String ? [data!.subTopics] : data!.subTopics) as string[]
    };
    if(isPublished)
      previousData.isPublished = isPublished
    updatePost({
      ...getChangedFields<HandleWorkFormT>(previousData, values),
      id: createdId!,
      body: plateState.children as any,
    });
  }

  return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
    if (event) {
      // @ts-ignore
      const name = event.nativeEvent!.submitter.name; // Кнопка, вызвавшая сабмит
      console.log("Кнопка вызвавшая сабмит:", name);
      if (name === buttonNames.save) {
        if (createdId && data)
          onUpdate(values);
        else {
          onSave(false)(values);
        }
      } else {
        if (createdId && data) {
          if (isVersion) {
            onPublishVersion({postId: createdId});
          } else {
            onUpdate(values, true)
          }
        }
        else
          onSave(true)(values);
      }
    }
  };
};
export default useUpdatePostSubmit;