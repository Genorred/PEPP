import { graphql } from "@/shared/api/graphql";

const getUserProfileInfo = graphql(`
    query getUserProfileInfo($id: Int!) {
        user(findOneUserInput: {
            id: $id
        }) {
            id
            createdAt
            img
            updatedAt
            occupation
            username
        }
    }
`);