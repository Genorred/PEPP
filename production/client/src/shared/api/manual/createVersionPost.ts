import { graphql } from "@/shared/api/graphql";

const createVersionPost =  graphql(`
    mutation createVersionPost($body: JSONObject!, $title: String!, $postId: Float!, $published: Boolean!, $topics: [String!], $subTopics: [String!]) {
        createVersionPost(createVersionPostInput: {
            body: $body
            title: $title
            postId: $postId
            isPublished: $published
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`)