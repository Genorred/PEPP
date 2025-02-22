import { graphql } from "@/shared/api/graphql";

const confirmUserEmail = graphql(`
    mutation confirmUserEmail($token: String!) {
        confirmUserEmail(confirmUserEmailInput: $token)
        {
            username
            email
            id
            createdAt
        }
    }
`);