import { graphql } from "@/shared/api/graphql";

const getCommentsByPostId = graphql(`
    query getCommentsByPostId($postId: Int!, $skipPages: Int) {
        comments(getCommentsByPostInput: {
            postId: $postId
            skipPages: $skipPages
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
            }
        }
    }
`);