import { graphql } from "@/shared/api/graphql";

const createPost = graphql(`
    mutation createPost($body: JSONObject!, $title: String!, $isPublished: Boolean, $topics: [String!], $subTopics: [String!]) {
        createPost(createPostInput: {
            body: $body
            published: $isPublished
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);