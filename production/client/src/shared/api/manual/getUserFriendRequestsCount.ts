import { graphql } from "@/shared/api/graphql";

const getUserFriendRequestsCount = graphql(`
    query getUserFriendRequestsCount($userId: Int!) {
        userFriendRequestsQuantity(countFriendshipInput: {
            userId: $userId
            isAccepted: false
        })
    }
`);