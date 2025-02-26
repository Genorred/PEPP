import { graphql } from "@/shared/api/graphql";

const getUserPosts = graphql(`
    query getUserPosts($createdAt: SortOrder, $rating: SortOrder,
        $skipPages: Int, $topics: [String!], $userId: Int!) {

        userPosts (findUserPostsInput: {
            createdAt: $createdAt,
            rating: $rating,
            skipPages: $skipPages,
            topics: $topics,
            userId: $userId
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