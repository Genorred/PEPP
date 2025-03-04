import { graphql } from "@/shared/api/graphql";

const sendFriendshipRequest = graphql(`
    mutation sendFriendshipRequest($receiverId: Int!) {
        sendFriendshipRequest(createFriendshipInput: {
            receiverId: $receiverId
        }) {
            receiverId
        }
    }
`);