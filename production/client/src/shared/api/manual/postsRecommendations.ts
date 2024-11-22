import { graphql } from "@/shared/api/graphql";

const getPostsRecommendations = graphql(`
    query postRecomendations($id: Int!, $version: Int) {
        algoPosts(findAlgorithmPostsInput: {: $id, version: $version}) {
            body
            createdAt
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
