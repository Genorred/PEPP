import { graphql } from "@/shared/api/graphql";

const getDraft = graphql(`
    query draft($id: Int!) {
        draft(id: $id) {
            id
            body
            createdAt
            img
            title
            updatedAt
        }
    }
`);