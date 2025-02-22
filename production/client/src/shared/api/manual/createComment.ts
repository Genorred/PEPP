import { graphql } from "@/shared/api/graphql";

const createComment = graphql(`

    mutation createComment($message: String!, $postId: Int!) {
        createComment(createCommentInput: {
            message: $message
            postId: $postId
        }) {
            id
        }
    }
`);