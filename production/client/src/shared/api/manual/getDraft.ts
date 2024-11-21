import { graphql } from "@/shared/api/graphql";

const getDraft = graphql(`
    query draft($id: Int!, $version: Int) {
        draft(findDraft: {
            id: $id
            version: $version
        }) {
            id
            body
            createdAt
            img
            title
            updatedAt
        }
    }
`);