import React from "react";
import { Separator } from "@/shared/ui/separator";
import { GetCommentsByParentIdQuery, useInfiniteGetCommentsByParentIdQuery } from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import { GetCommentsByParentIdQueryVariables } from "@/shared/api/graphql/graphql";
import { Comment } from "./Comment";

const Replies = ({ parentId, postId }: {
  parentId: number;
  postId: number;
}) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteGetCommentsByParentIdQuery({ parentId }, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.replies.totalPages - allPages.length > 1 ?
        {
          parentId,
          skipPages: allPages.length
        } as GetCommentsByParentIdQueryVariables : undefined;
    }
  });

  const [ref] = useIntersectionObserver({
    onChange: isIntersecting => {
      if (isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    }
  });
  const commentMap = React.useMemo(() => {
    const map = new Map<number, GetCommentsByParentIdQuery["replies"]["data"][number]>();
    data?.pages.forEach((page) =>
      page.replies.data.forEach((comment) => {
        map.set(comment.id, comment)
      })
    );
    return map;
  }, [data?.pages]);
  return (
    <>
      {data?.pages.map(page => (
        page.replies.data.map((reply, index) => (
            <div key={reply.id} className="w-full">
              {index > 0 && <Separator className="my-4" />}
              <Comment
                comment={{
                  ...reply,
                  postId,
                  parentId,
                  respondedComment: reply.respondedCommentId ? commentMap.get(reply.respondedCommentId) : undefined
                }} isReply={true} />
            </div>
          )
        )))}
    </>
  );
};

export default Replies;