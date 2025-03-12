import { graphql } from "@/shared/api/graphql";

const getUserFriendRequests = graphql(`
    query getUserFriendRequests($cursorId: Int) {
        userFriendRequests(findFriendsByUserInput: {
            cursorId: $cursorId
        }) {
            anotherUser {
                id
                username
                img
            }
            id
        }
    }
`);