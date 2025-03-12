import { graphql } from "@/shared/api/graphql";

const createPost = graphql(`
    mutation createPost($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {
        createPost(createPostInput: {
            body: $body
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);