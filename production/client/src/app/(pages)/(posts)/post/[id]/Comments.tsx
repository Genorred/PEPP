import React from "react";
import { CommentTemplate } from "./CommentTemplate";
import { GetCommentsByPostIdQueryVariables, useInfiniteGetCommentsByPostIdQuery } from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ postId }: {
  postId: number
}) => {
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
      <CommentForm postId={postId} />
      {data?.pages.map((page, index) => (
        page.comments.data.map((comment, index) => (
          <Comment comment={{...comment, postId}} key={comment.id} />
        ))
      ))}
    </div>
  );
};

export default Comments;