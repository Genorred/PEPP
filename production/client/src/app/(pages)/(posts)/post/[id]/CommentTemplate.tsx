"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CalendarIcon, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import CommentForm from "@/app/(pages)/(posts)/post/[id]/CommentForm";

export interface UserCommentTemplateI {
  username: string;
  img?: string | null;
}

export interface CommentTemplateI {
  id: number;
  user: UserCommentTemplateI;
  postId: number;
  createdAt: string;
  message: string;
}


interface Props {
  comment: CommentTemplateI;
  className?: string;
  cardTop?: React.ReactNode;
  cardBottom?: React.ReactNode;
  cardFooter?: React.ReactNode;
  replyFormProps: Omit<Parameters<typeof CommentForm>["0"], "state">;
}

export function CommentTemplate({
                                  comment,
                                  className,
                                  cardTop,
                                  cardFooter,
                                  cardBottom,
                                  replyFormProps
                                }: Props) {
  const state = useState(false);
  const [isReplying, setIsReplying] = state;

  return (
    <Card className={cn("w-full mb-4", className)}>
      {cardTop}
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
          {cardBottom}
        </div>
        {isReplying &&
          <CommentForm {...replyFormProps} isReplyingState={state} />
        }
      </CardContent>
      {cardFooter}
    </Card>
  );
}

