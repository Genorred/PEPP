import { baseFetch } from "@/shared/api/base";
import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";
import {PostId} from "@/features/posts/model/domain";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const postsBaseKey = ["posts"];
export const getPostsQueryOptions = () => {
    return queryOptions({
        queryKey: [...postsBaseKey, "list"],
        queryFn: () =>
            baseFetch("posts").then((res) => UserDtoSchema.array().parse(res)),
        staleTime: 5 * 1000 * 60,
    });
};

export const getPostQueryOptions = (postId: PostId) => {
    return queryOptions({
        queryKey: [...postsBaseKey, postId],
        queryFn: () =>
            baseFetch(`posts/${postId}`).then((res) => UserDtoSchema.parse(res)),
    });
};

export const deleteUser = (postId: PostId) =>
    baseFetch(`posts/${postId}`, { method: "DELETE" });