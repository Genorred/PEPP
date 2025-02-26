import { graphql } from "@/shared/api/graphql";

const getUsersIds = graphql(`
    query usersIds ($token: String!) {
        allUsers(findManyInput: {
            token: $token
        })
        {
            id
        }
    }
`);
