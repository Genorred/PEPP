import { graphql } from "@/shared/api/graphql";

const getUserPosts = graphql(`
    query getUserPosts($createdAt: SortOrder, $rating: SortOrder,
        $skipPages: Int, $userId: Int!, $topics: [String!], $subTopics: [String!], $topicsOrSubTopics: [String!]) {

        userPosts (findUserPostsInput: {
            createdAt: $createdAt,
            rating: $rating,
            skipPages: $skipPages,
            userId: $userId
            topics: $topics,
            subTopics: $subTopics,
            topicsOrSubTopics: $topicsOrSubTopics
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