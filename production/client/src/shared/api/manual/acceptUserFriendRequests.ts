import { graphql } from "@/shared/api/graphql";

const acceptUserFriendRequests = graphql(`
    mutation acceptUserFriendRequests($id: Int!) {
        acceptFriendshipRequest(updateFriendshipInput: {
            requestId: $id
        }) {
            anotherUser {
                id
                username
                img
            }
        }
    }
`);