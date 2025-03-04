import { graphql } from "@/shared/api/graphql";

const createVersionPost = graphql(`
    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String, $subTopics: [String!], $topics: [String!]) {
        createVersion(createVersionInput: {
            postId: $postId
            body: $body
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);
