import { graphql } from "@/shared/api/graphql";

const getUserFriendshipsCount = graphql(`
    query getUserFriendshipsCount($userId: Int!) {
        userFriendsQuantity(countFriendshipInput: {
            userId: $userId
        })
    }
`);