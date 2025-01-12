import React from "react";
import {
  CommentTemplate,
  CommentTemplateI,
  UserCommentTemplateI
} from "@/app/(pages)/(posts)/post/[id]/CommentTemplate";
import { CornerDownRight } from "lucide-react";

const Reply = ({ comment, onFindRespondedComment }: {
  comment: CommentTemplateI & {
    parentId?: number;
    respondedComment?: {
      id: number
      user: UserCommentTemplateI
      message: string
    };
  };
  onFindRespondedComment: () => void;
}) => {
  return (
    <CommentTemplate comment={comment} className={"ml-4"}
                     replyFormProps={{
                       postId: comment.postId,
                       parentId: comment.parentId,
                       respondedCommentId: comment.id
                     }}
                     cardTop={comment.respondedComment && (
                       <div className="mb-2 p-2 bg-muted rounded-md text-sm"
                            onClick={onFindRespondedComment}>
                         <div className="flex items-center mb-1">
                           <CornerDownRight className="w-4 h-4 mr-2" />
                           <span className="font-semibold">{comment.respondedComment.user.username}</span>
                         </div>
                         <p className="text-muted-foreground line-clamp-2">{comment.respondedComment.message}</p>
                       </div>
                     )} />
  );
};

export default Reply;