import { graphql } from "@/shared/api/graphql";

const getPostsId = graphql(`
    query postsId ($token: String!) {
        allPosts(findAllPostsInput: {
            token: $token
        })
        {
            id
        }
    }
`);
