import { graphql } from "@/shared/api/graphql";

const createPost = graphql(`
    mutation createPost($userId: Int!, $body: JSONObject!) {
        createPost(createPostInput: {
            body: $body
            userId: $userId
        }) {
            id
        }
    }
`);