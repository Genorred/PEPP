import React, { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useCreateCommentMutation } from "@/shared/api/graphql/generated";

const CommentForm = ({ postId, respondedCommentId, isReplyingState, parentId }: {
  postId: number
  parentId?: number
  respondedCommentId?: number
  isReplyingState?: [boolean, Dispatch<SetStateAction<boolean>>];
}) => {
  const [isWriting, setIsWriting] = isReplyingState?? useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { mutate: createComment } = useCreateCommentMutation();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (replyMessage.length > 0) {
      createComment({
        message: replyMessage.trim(),
        postId,
        parentId,
        respondedCommentId
      });
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value);
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <Textarea
        onFocus={() => setIsWriting(true)}
        onChange={onChange}
        value={replyMessage}
        placeholder={`Write your ${respondedCommentId ? "reply" : "comment"}...`}
        className="min-h-[100px] mb-2"
      />
      {isWriting && (
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" type={"button"} size="sm" onClick={() => setIsWriting(false)}>
            Cancel
          </Button>
          <Button size="sm">
            Submit Message
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;