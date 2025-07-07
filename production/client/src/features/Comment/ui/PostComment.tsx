import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { ChevronDown, MessageCircle } from "lucide-react";
import CommentReplies from "@/widgets/Comments/ui/CommentReplies";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import CommentForm from "@/features/Comment/ui/CommentForm";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { GetRepliesQuery, useCreateReplyMutation } from "@/shared/api/graphql/generated";
import Reply from "@/features/Comment/ui/Reply";
import { Separator } from "@/shared/ui/separator";
import UserLink from "@/entities/User/ui/UserLink";
import { CommentTemplateI } from "@/features/Comment/model/model";

const PostComment = ({ comment }: {
  comment: CommentTemplateI & {
    repliesQuantity: number
  }
}) => {
  const [leavedReplies, setLeavedReplies] = useState<GetRepliesQuery["replies"]["data"]>([]);
  const user = useSelector(userSlice.selectors.user);
  const { mutate: replyComment } = useCreateReplyMutation({
    onSuccess: (data, variables) => {
      setLeavedReplies(state => [...state, {
        id: data.createReply.id,
        ...variables,
        user: user!,
        createdAt: (new Date()).getTime(),
        likes: 0,
        dislikes: 0,
        repliesQuantity: 0,
        updatedAt: (new Date()).getTime()
      }]);
    }
  });
  const onCreate = (respondedCommentId?: number) => (replyMessage: string, onError?: () => void) => {
    replyComment({
      message: replyMessage.trim(),
      parentId: comment.id,
      postId: comment.postId,
      respondedCommentId
    }, { onError });
  };

  const [showReplies, setShowReplies] = useState(false);
  const state = useState(false);
  const [isReplying, setIsReplying] = state;

  const toggleReplies = () => {
    setShowReplies(showReplies => !showReplies);
  };
  return (

    <Card className={"w-full mb-4"}>
      <CardContent className="pt-4">
        <div className="flex items-center mb-4">
          <UserLink userId={comment.user.id} userImg={comment.user?.img} date={comment.createdAt}
                    username={comment.user.username} />
        </div>
        <p className="mb-4 break-words">{comment.message}</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" data-testid='reply-button' onClick={() => setIsReplying(!isReplying)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {isReplying ? "Cancel" : "Reply"}
          </Button>
          {comment.repliesQuantity || leavedReplies.length ? (
            <Button
              data-testid="open-replies-button"
              variant="ghost"
              size="sm"
              onClick={toggleReplies}
              className="flex items-center"
              aria-expanded={showReplies}
              aria-controls={`replies-${comment.id}`}
            >
              <ChevronDown
                className={`w-4 h-4 mr-2 transition-transform duration-200 ${showReplies ? "rotate-180" : ""}`} />
              {showReplies ? "Hide" : "Show"} Replies ({comment.repliesQuantity + leavedReplies.length})
            </Button>
          ) : null}
        </div>
        {isReplying &&
          <CommentForm onCreate={onCreate()} isReplyingState={state} placeholder={"reply"} />}
      </CardContent>
      {showReplies ? (
        <CardFooter className="flex flex-col items-start pt-0" data-testid='replies'>
          <div
            id={`replies-${comment.id}`}
            className={`w-full transition-all duration-300 ease-in-out ${
              showReplies ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {showReplies &&
              <CommentReplies
                createdReplies={leavedReplies}
                parentId={comment.id}
                postId={comment.postId}
                onCreate={onCreate}
              />

            }
          </div>
        </CardFooter>
      ) : null}
      {!showReplies && leavedReplies.length ? (
        <div
          className={`w-full p-4 transition-all duration-300 ease-in-out ${
            leavedReplies.length ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {
            leavedReplies.map((reply, index) => (
              <div key={reply.id} className="w-full">
                {index > 0 && <Separator className="my-4" />}
                <Reply comment={reply} onCreate={onCreate} key={reply.id} />
              </div>
            ))
          }
        </div>
      ) : null}

    </Card>)
    ;
};

export default PostComment;