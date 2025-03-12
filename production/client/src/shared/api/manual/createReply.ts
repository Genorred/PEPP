import { graphql } from "@/shared/api/graphql";

const createReply = graphql(`

    mutation createReply($message: String!, $parentId: Int!, $postId: Int!, $respondedCommentId: Int) {
        createReply(createReplyInput: {
            message: $message
            postId: $postId
            parentId: $parentId
            respondedCommentId: $respondedCommentId
        }) {
            id
        }
    }
`);