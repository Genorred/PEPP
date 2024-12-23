import { graphql } from "@/shared/api/graphql";

const createComment = graphql(`

    mutation createComment($message: String!, $parentId: Int, $postId: Int!, $respondedCommentId: Int) {
        createComment(createCommentInput: {
            message: $message
            postId: $postId
            parentId: $parentId
            respondedCommentId: $respondedCommentId
        }) {
            id
        }
    }
`);