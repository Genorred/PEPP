import React, { useState } from "react";
import { CommentTemplateI } from "@/app/(pages)/(posts)/post/[id]/CommentTemplate";
import { Button } from "@/shared/ui/button";
import { CalendarIcon, ChevronDown, MessageCircle } from "lucide-react";
import Replies from "@/app/(pages)/(posts)/post/[id]/Replies";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Image from "next/image";
import CommentForm from "@/app/(pages)/(posts)/post/[id]/CommentForm";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { GetRepliesQuery, useCreateReplyMutation } from "@/shared/api/graphql/generated";
import Reply from "@/app/(pages)/(posts)/post/[id]/Reply";
import { Separator } from "@/shared/ui/separator";

const Comment = ({ comment }: {
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
        createdAt: "a moment ago",
        likes: 0,
        dislikes: 0,
        repliesQuantity: 0,
        updatedAt: "a moment ago"
      }]);
    }
  });
  const onCreate = (respondedCommentId?: number) => (replyMessage: string) => {
    replyComment({
      message: replyMessage.trim(),
      parentId: comment.id,
      postId: comment.postId,
      respondedCommentId
    });
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
          {comment.user.img ? (
            <Image
              src={comment.user.img}
              alt={comment.user.username}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
          )}
          <div>
            <h3 className="font-semibold">{comment.user.username}</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {comment.createdAt}
            </p>
          </div>
        </div>
        <p className="mb-4">{comment.message}</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsReplying(!isReplying)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {isReplying ? "Cancel" : "Reply"}
          </Button>
          {comment.repliesQuantity || leavedReplies.length ? (
            <Button
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
        <CardFooter className="flex flex-col items-start pt-0">
          <div
            id={`replies-${comment.id}`}
            className={`w-full transition-all duration-300 ease-in-out ${
              showReplies ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {showReplies &&
              <Replies
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

export default Comment;