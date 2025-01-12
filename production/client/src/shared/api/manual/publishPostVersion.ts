import { graphql } from "@/shared/api/graphql";

const createVersionPost = graphql(`
    mutation publishPostVersion($postId: Int!) {
        publish(publishInput: $postId) {
            id
        }
    }
`);