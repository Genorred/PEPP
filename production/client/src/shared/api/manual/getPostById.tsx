import { graphql } from "@/shared/api/graphql";

const getPostById = graphql(`
    query post($id: Int!, $version: Int) {
        post(findOne: {id: $id, version: $version}) {
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