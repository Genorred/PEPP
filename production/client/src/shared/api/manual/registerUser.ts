import { graphql } from "@/shared/api/graphql";

const registerUser = graphql(`
    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {
        register(registerInput: {
            username: $username
            email: $email
            password: $password
            returnUrl: $returnUrl
        })
    }
`);