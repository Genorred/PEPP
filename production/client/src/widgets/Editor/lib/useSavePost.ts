import { PostQuery } from "@/shared/api/graphql/graphql";
import {
  useCreatePostMutation,
  useCreateVersionPostMutation, usePublishPostVersionMutation,
  useUpdatePostMutation
} from "@/shared/api/graphql/generated";
import { HandleWorkFormT } from "@/widgets/Editor/ui/SaveWork";
import { graphqlClient } from "@/shared/api/base";
import { useEditorRef } from "@udecode/plate-common/react";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import React, { BaseSyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonNames } from "@/widgets/Editor/consts";
import { useDispatch, useSelector } from "react-redux";
import { focusedPostSlice, mutatedData } from "@/widgets/Editor/model/focused-post.slice";
import { createValidFileMatcher } from "next/dist/server/lib/find-page-file";
import { useFetchPostQuery } from "@/widgets/Editor/lib/useFetchPostQuery";

export type CreatePostParams = Parameters<ReturnType<typeof useCreatePostMutation>["mutateAsync"]>["0"]
const useSavePost = () => {

    const plateState = useEditorRef();

    const { mutateAsync: createPost } = useCreatePostMutation(graphqlClient);
    const { mutateAsync: createVersionPost } = useCreateVersionPostMutation(graphqlClient);
    const { mutateAsync: update } = useUpdatePostMutation(graphqlClient);
    const { mutateAsync: publishVersion } = usePublishPostVersionMutation(graphqlClient);

    const dispatch = useDispatch();
    const data = useSelector(focusedPostSlice.selectors.all);
    const initialData = useFetchPostQuery(data.initialDataQueryKey);


    return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
      // @ts-ignore
      const name: (typeof buttonNames)[keyof typeof buttonNames] = event.nativeEvent?.submitter.name; // Кнопка, вызвавшая сабмит
      console.log("Кнопка вызвавшая сабмит:", name);
      if (name === buttonNames.publish) {

        if (data.versionId) { // works
          publishVersion({
            postId: data.versionId
          }).then(() => {
            dispatch(focusedPostSlice.actions.setVersionId(null));
            dispatch(focusedPostSlice.actions.setDraftId(null));
          });
        } else if (data.draftId) {// works
          update({
            id: data.draftId,
            isPublished: true
          }).then((result) => {
            dispatch(focusedPostSlice.actions.setSourceId(result.updatePost.id));
            dispatch(focusedPostSlice.actions.setDraftId(null));
          });
        } else if (data.sourceId) {
          const variables = {
            ...values,
            published: true,
            postId: data.sourceId,
            body: plateState.children as any
          };
          createVersionPost(variables).then((result) => {
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
          });
        } else {//works
          const variables = {
            ...values,
            body: plateState.children as any,
            isPublished: true
          };
          createPost(variables).then((result) => {
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
            dispatch(focusedPostSlice.actions.setSourceId(result.createPost.id));
          });
        }
      } else {
        if (data.draftId || data.versionId) { // just update
          const variables = getChangedFields<mutatedData>({
              title: data?.mutatedData?.title ?? initialData?.title!,
              topics: data?.mutatedData?.topics ?? initialData?.topics?.map(topic => topic.title) ?? [],
              subTopics: data?.mutatedData?.subTopics ?? initialData?.subTopics?.map(topic => topic.title) ?? [],
              body: data?.mutatedData?.body ?? initialData?.body
            }, {
              ...values,
              body: plateState.children as any
            }
          );
          update({
            id: data.draftId || data.versionId as number,
            ...variables
          }).then(() => {
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
          });
        } else if (data.sourceId) {// works
          createVersionPost({
            ...values,
            published: false,
            postId: data.sourceId,
            body: plateState.children as any
          }).then((result) => {
            dispatch(focusedPostSlice.actions.setVersionId(result.createVersionPost.id));
          });
        } else {
          createPost({
            ...values,
            body: plateState.children as any,
            isDraft: true
          }).then((result) => {
            dispatch(focusedPostSlice.actions.setDraftId(result.createPost.id));
          });
        }
      }
    };
  }
;

export default useSavePost;


// function onSave(publish: boolean) {
//   return (values: HandleWorkFormT) => {
//     const data = {
//       ...values,
//       body: plateState.children as any,
//       title: ""
//     } as const;
//     console.log(data);
//     setCreatedPostData(data);
//
//     referenceId
//       //make version draft of existing post
//       ? (() => {
//           createVersionPost({
//             ...data,
//             postId: referenceId,
//             published: publish // or publish immediately
//           }).then((result) => {
//             if (publish) {
//               setCreatedId(result.createVersionPost.id);
//               router.push("/post/" + result.createVersionPost.id);
//             } else {
//               setIsVersionDraft(true);
//             }
//           });
//         }
//       )()
//
//       :
//       //publish post from scratch
//       (() => {
//           createPost(data).then((result) => {
//             if (publish) {
//               setCreatedId(result.createPost.id);
//               router.push("/post/" + result.createPost.id);
//             }
//           });
//         }
//       )();
//   };
// }