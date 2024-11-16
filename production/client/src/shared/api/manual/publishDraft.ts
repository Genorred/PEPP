import { graphql } from "@/shared/api/graphql";

const publishDraft =  graphql(`
    mutation publishDraft($postId: Int!) {
        publish(publishInput: $postId) {
            id
        }
    }
`)