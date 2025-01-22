import { graphql } from "@/shared/api/graphql";

const getPostsRecommendations = graphql(`
    query postRecommendations($createdAt: SortOrder, $rating: SortOrder,
        $skipPages: Int, $topics: [String!], $search: String) {

        postsRecommendations (postRecommendationsInput: {
            createdAt: $createdAt,
            rating: $rating,
            skipPages: $skipPages,
            topics: $topics,
            searchValue: $search
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
