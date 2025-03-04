import React, { useState } from "react";
import { SortOrder, useGetUserPostsQuery } from "@/shared/api/graphql/generated";
import { useSelector } from "react-redux";
import { FileX } from "lucide-react";
import Container from "@/shared/ui/Container";
import { Post } from "@/entities/Post";
import { userFiltersSlice } from "@/app/(pages)/(user)/profile/[id]/filters.slice";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/shared/ui/pagination";

const UserPosts = ({ userId }: {
  userId: number
}) => {
  const [page, setPage] = useState<number>(0);
  const { rating, createdAt, ...other } = useSelector(userFiltersSlice.selectors.filter);
  const {
    data,
    isLoading
  } = useGetUserPostsQuery({
    ...other,
    rating: rating ? rating.toUpperCase() as SortOrder || undefined : undefined,
    createdAt: createdAt ? createdAt.toUpperCase() as SortOrder || undefined : undefined,
    userId,
    skipPages: page
  });

  const onPaginate = (page: number) => () => {
    setPage(prevState => {
      const newValue = prevState + page;
      if (newValue >= 0
        && data?.userPosts.totalPages
        && newValue < data.userPosts.totalPages
      ) return newValue;

      return prevState;
    });
  };
  const onSetPage = (page: number) => () => {
    setPage(page);
  };
  return (
    <>
      {data?.userPosts.totalPages
        ?
        <>
          <Container className="flex gap-4 flex-wrap" variant={"section"}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={onPaginate(-1)} />
                </PaginationItem>
                {
                  Array.from({ length: data?.userPosts.totalPages }).map((value, index) => (
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
            {data?.userPosts.data.map(post =>
              <Post key={post.id} {...post} />
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

export default UserPosts;