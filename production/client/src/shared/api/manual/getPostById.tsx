import { graphql } from "@/shared/api/graphql";

const getPostById = graphql(`
    query post($id: Int!, $version: Int) {
        post(findPostInput: {
            id: $id,
        }) {
            body
            createdAt
            title
            user {
                username
                img
                id
            }
            topics {
                title
            }
            subTopics {
                title
            }
            rating
            minutes
            version
            commentsQuantity
            reviewsQuantity
            description
        }
    }
`);