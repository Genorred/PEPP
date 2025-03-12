import { graphql } from "@/shared/api/graphql";

const updateDraft = graphql(`
    mutation updateDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
        updateDraft(updateDraftInput: {
            id: $id
            topics: $topics
            subTopics: $subTopics
            body: $body
            title: $title
        }) {
            id
        }
    }
`);
