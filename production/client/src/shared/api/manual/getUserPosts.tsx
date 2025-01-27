import { graphql } from "@/shared/api/graphql";

const getUserPosts = graphql(`
    query getUserPosts($userId: Int!, $skipPages: Int) {
        userPosts(findUserPostsInput: {
            userId: $userId
            skipPages: $skipPages
        }) {
            totalPages,
            data {
                id,
                rating,
                commentsQuantity,
                reviewsQuantity,
                img,
                minutes,
                title,
                createdAt,
                userId,
                description,
                version,
                updatedAt
                user {
                    username
                    occupation
                    img
                }
                topics {
                    title
                }
                subTopics {
                    title
                }
            }
        }
    }
`);