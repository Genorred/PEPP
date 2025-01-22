import { graphql } from "@/shared/api/graphql";

const createVersionPost = graphql(`
    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String) {
        createVersion(createVersionInput: {
            postId: $postId 
            body: $body
            title: $title
        }) {
            id
        }
    }
`);
