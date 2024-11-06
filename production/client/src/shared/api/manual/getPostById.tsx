import { graphql } from "@/shared/api/graphql";

const getPostById = graphql(`
    query post($id: Int!) {
        post(id: $id) {
            body
            published
        }
    }
`);