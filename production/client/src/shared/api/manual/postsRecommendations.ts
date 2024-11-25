import { graphql } from "@/shared/api/graphql";

const getPostsRecommendations = graphql(`
    query postRecommendations {
        algoPosts {
            body
            createdAt
            updatedAt
            version
            title
            user {
                username
                img
                id
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
