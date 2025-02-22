import { graphql } from "@/shared/api/graphql";

const loginUser = graphql(`
    mutation login($password: String!, $email: String!) {
        login(loginInput: {
            email: $email
            password: $password
        }) {
            username
            email
            id
            createdAt
        }
    }
`);