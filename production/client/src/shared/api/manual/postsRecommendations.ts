import { graphql } from "@/shared/api/graphql";

const getPostsRecommendations = graphql(`
    query postRecommendations($createdAt: SortOrder, $rating: SortOrder,
        $page: Int, $topics: [String!]) {

        algoPosts (findAlgorithmInput: {
            createdAt: $createdAt,
            rating: $rating,
            page: $page,
            topics: $topics,
        }) {
            totalCount,
            posts {
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
