import { graphql } from "@/shared/api/graphql";

const getDrafts = graphql(`
    query drafts {
        userDrafts {
            id
            createdAt
            img
            title
            updatedAt
        }
    }
`);