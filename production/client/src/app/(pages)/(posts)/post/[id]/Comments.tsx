import React, { useState } from "react";
import { CommentTemplateI } from "./CommentTemplate";
import {
  GetCommentsByPostIdQueryVariables,
  useCreateCommentMutation,
  useInfiniteGetCommentsByPostIdQuery
} from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import CommentForm from "./CommentForm";
import PostComment from "./PostComment";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";

const Comments = ({ postId }: {
  postId: number
}) => {
  const [leavedComments, setLeavedComments] = useState<(CommentTemplateI & {
    repliesQuantity: number
  })[]>([]);
  const user = useSelector(userSlice.selectors.user);
  const { mutate: createComment } = useCreateCommentMutation({
    onSuccess: (data, variables) => {
      setLeavedComments(state => [...state, {
        id: data.createComment.id,
        ...variables,
        user: user!,
        createdAt: (new Date()).getTime(),
        repliesQuantity: 0
      }]);
    }
  });
  const onCreate = (replyMessage: string, onError?: () => void) => {
    createComment({
      message: replyMessage.trim(),
      postId
    }, {onError});
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetCommentsByPostIdQuery({ postId }, {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.comments.totalPages - allPages.length > 1 ?
          {
            postId,
            skipPages: allPages.length
          } as GetCommentsByPostIdQueryVariables : undefined;
      }
    });
  const [ref] = useIntersectionObserver({
    onChange: isIntersecting => {
      if (isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    }
  });
  return (
    <div className="space-y-4">
      <CommentForm onCreate={onCreate} />
      {
        leavedComments.map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))
      }
      {data?.pages.map((page, index) => (
        page.comments.data.map((comment, index) => (
          <PostComment comment={{ ...comment, postId }} key={comment.id} />
        ))
      ))}
      <div className="h-1 w-full" ref={ref} />
    </div>
  );
};

export default Comments;