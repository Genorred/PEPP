import { graphql } from "@/shared/api/graphql";

const removeFriendshipRequest = graphql(`
    mutation removeFriendship($anotherUserId: Int!) {
        removeFriendship(removeFriendshipInput: {
            anotherUserId: $anotherUserId
        }) {
            receiverId
        }
    }
`)