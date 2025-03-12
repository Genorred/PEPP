import { graphql } from "@/shared/api/graphql";

const getUserFriendsCount = graphql(`
    query getUserFriendsCount($userId: Int!) {
        userFriendsQuantity(countFriendshipInput: {
            userId: $userId
            isAccepted: true
        })
    }
`);