import { graphql } from "@/shared/api/graphql";

const updatePost = graphql(`
    mutation updatePost($id: Int!, $body: JSONObject, $title: String) {
        updatePost(updatePostInput: {
            id: $id
            body: $body
            title: $title
        }) {
            id
        }
    }
`);
