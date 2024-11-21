import { graphql } from "@/shared/api/graphql";

const getPostsId = graphql(`
    query postsId ($token: String!, $isArchived: Boolean) {
        allPosts(findAllPostsInput: {
            token: $token
            isArchived: $isArchived
        })
        {
            id
            version
        }
    }
`);
