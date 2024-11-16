import { PostQuery } from "@/shared/api/graphql/graphql";
import {
  useCreatePostMutation,
  useCreateVersionPostMutation,
  useUpdatePostMutation
} from "@/shared/api/graphql/generated";
import { HandleWorkFormT } from "@/widgets/Editor/ui/SaveWork";
import { graphqlClient } from "@/shared/api/base";
import { useEditorRef } from "@udecode/plate-common/react";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import React, { BaseSyntheticEvent, useState } from "react";
import onPostSubmit from "@/widgets/Editor/lib/onPostSubmit";
import useUpdatePostSubmit from "@/widgets/Editor/lib/useUpdatePostSubmit";
import { useRouter } from "next/navigation";

export type CreatePostParams = Parameters<ReturnType<typeof useCreatePostMutation>['mutateAsync']>["0"]
const useCreatePostSubmit = ({referenceId, versionPost}: {
  referenceId?: number
  versionPost?: PostQuery["post"]
}) => {

  const [createdId, setCreatedId] = useState<number | null | undefined>(referenceId);
  const router = useRouter();
  const { mutateAsync: createPost } = useCreatePostMutation(graphqlClient);
  const { mutateAsync: createVersionPost } = useCreateVersionPostMutation(graphqlClient);
  const plateState = useEditorRef();

  const [createdPostData, setCreatedPostData] = useState<CreatePostParams | null>(null);

  function onSave(publish: boolean) {
    return (values: HandleWorkFormT) => {
      const data = {
        ...values,
        body: plateState.children as any,
        title: "",
      } as const;
      console.log(data);
      setCreatedPostData(data);

      referenceId
        //make version draft of existing post
        ? (() => {
            createVersionPost({
              ...data,
              postId: referenceId,
              published: publish, // or publish immediately
            }).then((result) => {
              if (publish){
                setCreatedId(result.createVersionPost.id);
                router.push("/post/" + result.createVersionPost.id);
              }
            });
          }
        )()

        :
        //publish post from scratch
        (() => {
            createPost(data).then((result) => {
              if (publish) {
                setCreatedId(result.createPost.id);
                router.push("/post/" + result.createPost.id);
              }
            });
          }
        )();
    };
  }

  return useUpdatePostSubmit(onSave, createdId, createdPostData);
};

export default useCreatePostSubmit;