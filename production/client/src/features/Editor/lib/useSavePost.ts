import {
  useCreatePostMutation,
  useCreateVersionPostMutation,
  usePublishPostVersionMutation,
  useUpdatePostMutation
} from "@/shared/api/graphql/generated";
import { HandleWorkFormT } from "@/features/Editor/ui/SaveWork";
import { useEditorRef } from "@udecode/plate-common/react";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import { BaseSyntheticEvent } from "react";
import { buttonNames } from "@/features/Editor/consts/buttonNames";
import { useDispatch, useSelector } from "react-redux";
import { focusedPostSlice, mutatedData } from "@/features/Editor/model/focused-post.slice";
import { useFetchPostQuery } from "@/features/Editor/lib/useFetchPostQuery";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type CreatePostParams = Parameters<ReturnType<typeof useCreatePostMutation>["mutateAsync"]>["0"]
const useSavePost = () => {

    const plateState = useEditorRef();

    const { mutateAsync: createPost } = useCreatePostMutation();
    const { mutateAsync: createVersionPost } = useCreateVersionPostMutation();
    const { mutateAsync: update } = useUpdatePostMutation();
    const { mutateAsync: publishVersion } = usePublishPostVersionMutation();

    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector(focusedPostSlice.selectors.all);
    const initialData = useFetchPostQuery(data.initialDataQueryKey);


    return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
      // @ts-ignore
      const name: (typeof buttonNames)[keyof typeof buttonNames] = event.nativeEvent?.submitter.name; // Кнопка, вызвавшая сабмит
      console.log("Кнопка вызвавшая сабмит:", name);
      if (name === buttonNames.publish) {
        let idToNav: number

        if (data.versionId) { // works
          publishVersion({
            postId: data.versionId
          }).then((result) => {
            toast.success("The post version was successfully created!");
            dispatch(focusedPostSlice.actions.setVersionId(null));
            dispatch(focusedPostSlice.actions.setDraftId(null));
            router.push("/post/" + result.publish.id);
          });
        } else if (data.draftId) {// works
          update({
            id: data.draftId,
            isPublished: true
          }).then((result) => {
            toast.success("The draft was successfully published!");
            dispatch(focusedPostSlice.actions.setSourceId(result.updatePost.id));
            dispatch(focusedPostSlice.actions.setDraftId(null));
            router.push("/post/" + result.updatePost.id);
          });
        } else if (data.sourceId) {
          const variables = {
            ...values,
            published: true,
            postId: data.sourceId,
            body: plateState.children as any
          };
          createVersionPost(variables).then((result) => {
            toast.success("The post version was successfully published!");
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
            router.push("/post/" + result.createVersionPost.id);
          });
        } else {//works
          const variables = {
            ...values,
            body: plateState.children as any,
            isPublished: true
          };
          createPost(variables).then((result) => {
            toast.success("The post was successfully published!");
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
            dispatch(focusedPostSlice.actions.setSourceId(result.createPost.id));
            router.push("/post/" + result.createPost.id);
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
            toast.success("The draft was successfully updated!");
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
          });
        } else if (data.sourceId) {// works
          createVersionPost({
            ...values,
            published: false,
            postId: data.sourceId,
            body: plateState.children as any
          }).then((result) => {
            toast.success("The post version was successfully saved!");
            dispatch(focusedPostSlice.actions.setVersionId(result.createVersionPost.id));
          });
        } else {
          createPost({
            ...values,
            body: plateState.children as any,
            isDraft: true
          }).then((result) => {
            toast.success("The draft was successfully saved!");
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