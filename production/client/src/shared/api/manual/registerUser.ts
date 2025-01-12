import { graphql } from "@/shared/api/graphql";

const registerUser = graphql(`
    mutation register($username: String!, $password: String!, $email: String!) {
        register(registerInput: {
            username: $username
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