import { graphql } from "@/shared/api/graphql";

const updatePost = graphql(`
    mutation updatePost($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!], $isPublished: Boolean) {
        updatePost(updatePostInput: {
            id: $id
            topics: $topics
            subTopics: $subTopics
            isPublished: $isPublished
            body: $body
            title: $title
        }) {
            id
        }
    }
`);
