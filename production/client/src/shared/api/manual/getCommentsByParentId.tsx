import { graphql } from "@/shared/api/graphql";

const getCommentsByParentId = graphql(`
    query getCommentsByParentId($parentId: Int!, $skipPages: Int) {
        replies(postComments: {
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
                postVersion
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