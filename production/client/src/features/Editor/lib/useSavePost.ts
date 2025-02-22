import {
  useCreateDraftMutation,
  useCreatePostMutation,
  useCreateVersionDraftMutation, useCreateVersionPostMutation, usePublishDraftMutation,
  useUpdateDraftMutation,
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
import { useGetUpdatedFields } from "./useGetUpdatedFields";

export type CreatePostParams = Parameters<ReturnType<typeof useCreatePostMutation>["mutateAsync"]>["0"]
const useSavePost = () => {

    const plateState = useEditorRef();

    const { mutateAsync: createPost } = useCreatePostMutation();
    const { mutateAsync: createVersionDraft } = useCreateVersionDraftMutation();
    const { mutateAsync: createDraft } = useCreateDraftMutation();
    const { mutateAsync: createVersionPost } = useCreateVersionPostMutation();
    const { mutateAsync: updateDraft } = useUpdateDraftMutation();
    const { mutateAsync: publishDraft } = usePublishDraftMutation();

    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector(focusedPostSlice.selectors.all);
    const getUpdatedFields = useGetUpdatedFields();

    const navigate = (path: string) => {
      router.push(path);
    }


    return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
      // @ts-ignore
      const name: (typeof buttonNames)[keyof typeof buttonNames] = event.nativeEvent?.submitter.name; // Кнопка, вызвавшая сабмит
      console.log("Кнопка вызвавшая сабмит:", name);
      if (name === buttonNames.publish) {

        if (data.versionId || data.draftId) { // works
          publishDraft({
            ...getUpdatedFields(values),
            id: data.versionId || data.draftId as number
          }).then((result) => {
            toast.success("The post version was successfully created!");
            navigate("/post/" + result.publishDraft.id);
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
            navigate("/post/" + result.createVersion.id);
          });
        } else {//works
          const variables = {
            ...values,
            body: plateState.children as any
          };
          createPost(variables).then((result) => {
            toast.success("The post was successfully published!");
            navigate("/post/" + result.createPost.id);
          });
        }
      } else {
        if (data.draftId || data.versionId) { // just update
          const variables = getUpdatedFields(values)

          updateDraft({
            id: data.draftId || data.versionId as number,
            ...variables
          }).then(() => {
            toast.success("The draft was successfully updated!");
            dispatch(focusedPostSlice.actions.spreadMutatedData(variables));
          });
        } else if (data.sourceId) {// works
          createVersionDraft({
            ...values,
            postId: data.sourceId,
            body: plateState.children as any
          }).then((result) => {
            toast.success("The post version was successfully saved!");
            dispatch(focusedPostSlice.actions.setVersionId(result.createDraft.id));
          });
        } else {
          createDraft({
            ...values,
            body: plateState.children as any
          }).then((result) => {
            toast.success("The draft was successfully saved!");
            dispatch(focusedPostSlice.actions.setDraftId(result.createDraft.id));
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