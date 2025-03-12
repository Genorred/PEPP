import { graphql } from "@/shared/api/graphql";

const getPostsIds = graphql(`
    query postsId ($token: String!) {
        allPosts(findAllPostsInput: {
            token: $token
        })
        {
            id
        }
    }
`);
