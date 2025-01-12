import { graphql } from "@/shared/api/graphql";

const createPost = graphql(`
    mutation createPost($body: JSONObject!, $title: String!, $isPublished: Boolean, $topics: [String!], $subTopics: [String!], $isDraft: Boolean) {
        createPost(createPostInput: {
            body: $body
            isDraft: $isDraft
            isPublished: $isPublished
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);