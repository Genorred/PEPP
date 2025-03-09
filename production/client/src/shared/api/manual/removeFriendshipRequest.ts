import { graphql } from "@/shared/api/graphql";

const removeFriendshipRequest = graphql(`
    mutation removeFriendship($receiverId: Int!) {
        removeFriendship(removeFriendshipInput: {
            receiverId: $receiverId
        }) {
            receiverId
        }
    }
`);