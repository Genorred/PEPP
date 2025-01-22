import { graphql } from "@/shared/api/graphql";

const getReplies = graphql(`
    query getReplies($parentId: Int!, $skipPages: Int) {
        replies(getRepliesByCommentInput: {
            parentId: $parentId
            skipPages: $skipPages
        }) {
            totalPages,
            data {
                respondedCommentId
                id
                message
                likes
                dislikes
                repliesQuantity
                user {
                    username
                    img
                }
                createdAt
                updatedAt
            }
        }
    }
`);