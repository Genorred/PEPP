import React, { useState } from "react";
import { SortOrder, useGetCommentsByUserIdQuery } from "@/shared/api/graphql/generated";
import { useSelector } from "react-redux";
import { CornerDownRight, FileX, StickyNote } from "lucide-react";
import Container from "@/shared/ui/Container";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/shared/ui/pagination";
import { userCommentsFiltersSlice } from "@/app/(pages)/(user)/profile/[id]/comments-filters.slice";
import PostComment from "@/app/(pages)/(posts)/post/[id]/PostComment";
import Link from "next/link";

const UserComments = ({ userId }: {
  userId: number
}) => {
  const [page, setPage] = useState<number>(0);
  const { popularity, createdAt, showReplies } = useSelector(userCommentsFiltersSlice.selectors.filter);
  const {
    data,
    isLoading
  } = useGetCommentsByUserIdQuery({
    sortByPopularity: popularity ? popularity.toUpperCase() as SortOrder || undefined : undefined,
    sortByDate: createdAt ? createdAt.toUpperCase() as SortOrder || undefined : undefined,
    userId,
    isNotReply: !showReplies,
    skipPages: page
  });

  const onPaginate = (page: number) => () => {
    setPage(prevState => {
      const newValue = prevState + page;
      if (newValue >= 0
        && data?.userComments.totalPages
        && newValue < data.userComments.totalPages
      ) return newValue;

      return prevState;
    });
  };
  const onSetPage = (page: number) => () => {
    setPage(page);
  };
  console.log("ddash", data?.userComments.data[0]);
  return (
    <>
      {data?.userComments.data.length
        ?
        <>
          <Container className="flex flex-col gap-4" variant={"section"}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={onPaginate(-1)} />
                </PaginationItem>
                {
                  Array.from({ length: data?.userComments.totalPages }).map((value, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink href="#" onClick={onSetPage(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                }
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" onClick={onPaginate(1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            {data?.userComments.data.map(comment =>
              <div className="" key={comment.id}>
                <div className="mb-2 p-2 bg-muted rounded-md text-sm">
                  <Link href={`/post/${comment.postId}`} >
                    <div className="flex items-center mb-1 gap-2">
                      <CornerDownRight className="w-4 h-4" />
                      <StickyNote className="w-4 h-4" />
                      <span className="font-semibold">{comment.post.title}</span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">{comment.post.user.username}</p>

                  </Link>
                </div>
                <PostComment key={comment.id} comment={comment} />
              </div>
            )}
          </Container>
        </>
        : isLoading
          ?
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">
            "loading..."
          </h2>
          :
          <div
            className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
            <FileX className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Posts Found</h2>
            <p className="text-gray-600 max-w-md">
              We couldn't find any posts at the moment. Check back later or try a different search.
            </p>
          </div>
      }

    </>
  );
};

export default UserComments;