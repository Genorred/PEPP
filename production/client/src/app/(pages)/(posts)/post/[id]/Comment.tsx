"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarIcon, ChevronDown, CornerDownRight, MessageCircle, Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { GetCommentsByParentIdQuery, GetCommentsByPostIdQuery } from "@/shared/api/graphql/graphql";
import { queryClient } from "@/shared/api/base";
import { useInfiniteGetCommentsByParentIdQuery } from "@/shared/api/graphql/generated";
import Replies from "@/app/(pages)/(posts)/post/[id]/Replies";
import CommentForm from "@/app/(pages)/(posts)/post/[id]/CommentForm";

interface User {
  username: string;
  img?: string;
}

interface Comment {
  id: number;
  user: User;
  postId: number;
  createdAt: string;
  message: string;
  replies?: Comment[];
  repliesQuantity: number
  respondedComment?: {
    id: number
    user: User
    message: string
  };
}


interface CommentProps {
  comment: Comment
  isReply?: boolean;
}

const maxDepth = 3;

export function Comment({ comment, isReply }: CommentProps) {
  const state = useState(false);
  const [isReplying, setIsReplying] = state
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <Card className={`w-full mb-4 ${isReply ? "ml-4" : ""}`}>
      {comment.respondedComment && isReply && (
        <div className="mb-2 p-2 bg-muted rounded-md text-sm">
          <div className="flex items-center mb-1">
            <CornerDownRight className="w-4 h-4 mr-2" />
            <span className="font-semibold">{comment.respondedComment.user.username}</span>
          </div>
          <p className="text-muted-foreground line-clamp-2">{comment.respondedComment.message}</p>
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
          {!isReply && comment.repliesQuantity && (
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
              {showReplies ? "Hide" : "Show"} Replies ({comment.repliesQuantity})
            </Button>
          )}
        </div>
        {isReplying && (
          <CommentForm postId={comment.postId} parentId={comment.id} state={state}
          respondedCommentId={isReply ? comment.id : undefined}/>
        )}
      </CardContent>
      {!isReply && comment.repliesQuantity && (
        <CardFooter className="flex flex-col items-start pt-0">
          <div
            id={`replies-${comment.id}`}
            className={`w-full transition-all duration-300 ease-in-out ${
              showReplies ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {
              showReplies && (
                <Replies parentId={comment.id} postId={comment.postId}/>
              )
            }
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

