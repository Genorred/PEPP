import { graphql } from "@/shared/api/graphql";

const getCommentsByPostId = graphql(`
    query getCommentsByPostId($postId: Int!, $skipPages: Int) {
        comments(postComments: {
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