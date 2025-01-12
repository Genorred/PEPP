import React, { useRef, useState } from "react";
import { Separator } from "@/shared/ui/separator";
import { GetCommentsByParentIdQuery, useInfiniteGetCommentsByParentIdQuery } from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import { GetCommentsByParentIdQueryVariables } from "@/shared/api/graphql/graphql";
import Reply from "@/app/(pages)/(posts)/post/[id]/Reply";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { scrollSlice } from "@/widgets/Navbar/model";

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

  const repliesEnum = useRef<Record<number, HTMLElement>>({});
  const commentMap = React.useMemo(() => {
    const map = new Map<number, GetCommentsByParentIdQuery["replies"]["data"][number]>();
    data?.pages.forEach((page) =>
      page.replies.data.forEach((comment) => {
        map.set(comment.id, comment);
      })
    );
    return map;
  }, [data?.pages]);
  const [returnTo, setReturnTo] = useState<number | null>(null);
  const isReturnScrolling = useSelector(scrollSlice.selectors.isScrolling);
  const isMobile = useSelector(scrollSlice.selectors.isMobile);
  return (
    <>
      {returnTo ?
        <Button className={cn("sticky flex m-4 ml-auto transition-all top-16 mr-8",
          {
            'opacity-0': isMobile
          },
          {
            'opacity-100': !isReturnScrolling
          }
       )} onClick={() => {
          repliesEnum.current[returnTo].scrollIntoView({ behavior: "smooth", block: "center" });
          setReturnTo(null);
        }}>
          Return
        </Button> : null
      }
      {data?.pages.map(page => (
        page.replies.data.map((reply, index) => (
            <div key={reply.id} className="w-full"
                 ref={(replyComponent) => {
                   if (replyComponent)
                     repliesEnum.current[reply.id] = replyComponent;
                 }}>
              {index > 0 && <Separator className="my-4" />}
              <Reply
                onFindRespondedComment={() => {
                  if (reply.respondedCommentId) {
                    console.log(repliesEnum.current);
                    repliesEnum.current[reply.respondedCommentId].scrollIntoView({ behavior: "smooth", block: "center" });
                    setReturnTo(reply.id);
                  }
                }}
                comment={{
                  ...reply,
                  postId,
                  parentId,
                  respondedComment: reply.respondedCommentId ? commentMap.get(reply.respondedCommentId) : undefined
                }} />
            </div>
          )
        )))}
    </>
  );
};

export default Replies;