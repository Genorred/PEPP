import { graphql } from "@/shared/api/graphql";

const createDraft = graphql(`
    mutation createDraft($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {
        createDraft(createDraftInput: {
            body: $body
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);