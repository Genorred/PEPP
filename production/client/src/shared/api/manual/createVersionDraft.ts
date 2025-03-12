import { graphql } from "@/shared/api/graphql";

const createVersionDraft = graphql(`
    mutation createVersionDraft($body: JSONObject!, $title: String!, $postId: Int!, $topics: [String!], $subTopics: [String!]) {
        createDraft(createDraftInput: {
            body: $body
            title: $title
            postId: $postId
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);