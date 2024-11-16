import { graphql } from "@/shared/api/graphql";

const getPostById = graphql(`
    query post($id: Int!) {
        post(id: $id) {
            body
            createdAt
            user {
                username
                img
                id
            }
        }
    }
`);