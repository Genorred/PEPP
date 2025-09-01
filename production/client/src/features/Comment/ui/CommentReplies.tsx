import React, { useRef, useState } from "react";
import { Separator } from "@/shared/ui/separator";
import { GetRepliesQuery, GetRepliesQueryVariables, useInfiniteGetRepliesQuery } from "@/shared/api/graphql/generated";
import { useIntersectionObserver } from "usehooks-ts";
import Reply from "@/features/Comment/ui/Reply";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSelector } from "react-redux";
import { scrollSlice } from "@/features/Scroll/model/model";

const CommentReplies = ({ parentId, postId, onCreate, createdReplies }: {
  parentId: number;
  postId: number;
  onCreate: (respondedCommentId?: number) => (message: string) => void;
  createdReplies: GetRepliesQuery["replies"]["data"]
}) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteGetRepliesQuery({ parentId }, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.replies.totalPages - allPages.length > 1 ?
        {
          parentId,
          skipPages: allPages.length
        } as GetRepliesQueryVariables : undefined;
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

  const replies = data?.pages
    .map((page) => page.replies.data).flat();
  const allReplies = replies
    ? [...replies, ...createdReplies.filter(createdReply => !replies.find(reply =>
      reply.id === createdReply.id))]
    : createdReplies;

  const commentMap = React.useMemo(() => {
    const map = new Map<number, GetRepliesQuery["replies"]["data"][number]>();
    allReplies.forEach((comment) => {
      map.set(comment.id, comment);
    });
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
            "opacity-0": isMobile
          },
          {
            "opacity-100": !isReturnScrolling
          }
        )} onClick={() => {
          repliesEnum.current[returnTo].scrollIntoView({ behavior: "smooth", block: "center" });
          setReturnTo(null);
        }}>
          Return
        </Button> : null
      }
      {replies?.length && allReplies.map((reply, index) => (
        <div key={reply.id} className="w-full"
             ref={(replyComponent) => {
               if (replyComponent)
                 repliesEnum.current[reply.id] = replyComponent;
             }}>
          {index > 0 && <Separator className="my-4" />}
          <Reply
            onFindRespondedComment={() => {
              if (reply.respondedCommentId) {
                console.log(reply.respondedCommentId);
                console.log(repliesEnum.current);
                repliesEnum.current[reply.respondedCommentId].scrollIntoView({ behavior: "smooth", block: "center" });
                setReturnTo(reply.id);
              }
            }}
            comment={{
              ...reply,
              respondedComment: reply.respondedCommentId ? commentMap.get(reply.respondedCommentId) : undefined
            }} onCreate={onCreate} />
        </div>
      ))
      }
    </>
  )
    ;
};

export default CommentReplies;