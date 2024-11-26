import { graphql } from "@/shared/api/graphql";

const getPostsRecommendations = graphql(`
    query postRecommendations($createdAtDesc: Boolean, $ratingDesc: Boolean,
        $cursorId: Int, $topics: [String!], $subTopics: [String!]) {
       
        algoPosts (findAlgorithmInput: {
            createdAtDesc: $createdAtDesc,
            ratingDesc: $ratingDesc,
            cursorId: $cursorId,
            topics: $topics,
            subTopics: $subTopics
        }) {
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
`);
