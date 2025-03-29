import React, { useState } from "react";
import { CalendarIcon, CornerDownRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import CommentForm from "@/features/Comment/ui/CommentForm";
import { UserCommentTemplateI } from "@/features/Comment/model/model";

const Reply = ({ comment, onFindRespondedComment, onCreate }: {
  comment: {
    id: number;
    user: UserCommentTemplateI;

    createdAt: string;
    message: string;
    respondedComment?: {
      id: number
      user: UserCommentTemplateI
      message: string
    };
  };
  onFindRespondedComment?: () => void;
  onCreate: (respondedCommentId?: number) => (message: string, onError?: () => void) => void;
}) => {
  const state = useState(false);
  const [isReplying, setIsReplying] = state;
  return (
    <Card className={"w-full mb-4"}>
      {comment.respondedComment && (
        <div className="mb-2 p-2 bg-muted rounded-md text-sm"
             onClick={onFindRespondedComment}>
          <div className="flex items-center mb-1">
            <CornerDownRight className="w-4 h-4 mr-2" />
            <span className="font-semibold">{comment.respondedComment.user.username}</span>
          </div>
          <p className="text-muted-foreground line-clamp-2 break-words">{comment.respondedComment.message}</p>
        </div>
      )}
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
        {/*<div className="flex items-center mb-2">*/}
        {/*  {[1, 2, 3, 4, 5].map((star) => (*/}
        {/*    <Star*/}
        {/*      key={star}*/}
        {/*      className={`w-5 h-5 ${*/}
        {/*        star <= comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"*/}
        {/*      }`}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}
        <p className="mb-4">{comment.message}</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsReplying(!isReplying)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {isReplying ? "Cancel" : "Reply"}
          </Button>
        </div>
        {isReplying &&
          <CommentForm onCreate={onCreate(comment.id)} isReplyingState={state} placeholder={"reply"} />}
      </CardContent>
    </Card>
  );
};

export default Reply;