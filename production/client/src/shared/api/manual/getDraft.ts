import { graphql } from "@/shared/api/graphql";

const getDraft = graphql(`
    query draft($id: Int!, $version: Int) {
        draft(findDraftInput: {
            id: $id
        }) {
            id
            body
            createdAt
            img
            title
            updatedAt
            topics {
                title
            }
            subTopics {
                title
            }
        }
    }
`);