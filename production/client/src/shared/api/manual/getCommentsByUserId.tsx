import { graphql } from "@/shared/api/graphql";

const getCommentsByUserId = graphql(`
    query getCommentsByUserId($userId: Int!, $skipPages: Int, $isNotReply: Boolean,
        $sortByDate: SortOrder, $sortByPopularity: SortOrder
    ) {
        userComments(getCommentsByUserInput: {
            userId: $userId
            skipPages: $skipPages
            isNotReply: $isNotReply
            sortByDate: $sortByDate
            sortByPopularity: $sortByPopularity
        }) {
            totalPages,
            data {
                id
                message
                likes
                dislikes
                repliesQuantity
                user {
                    username
                    img
                    id
                }
                createdAt
                updatedAt
                postId
                parentId
                post {
                    title
                    user {
                        username
                    }
                }
            }
        }
    }
`);