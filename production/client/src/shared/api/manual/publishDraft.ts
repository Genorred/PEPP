import { graphql } from "@/shared/api/graphql";

const publishDraft = graphql(`
    mutation publishDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
        publishDraft(publishDraftInput: {
            id: $id
            body: $body
            title: $title
            topics: $topics
            subTopics: $subTopics
        }) {
            id
        }
    }
`);