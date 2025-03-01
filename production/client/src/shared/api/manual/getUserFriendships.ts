import { graphql } from "@/shared/api/graphql";

const getUserFriendships = graphql(`
    query getUserFriendships($userId: Int!, $cursorid: Int) {
        userFriends(findFriendsByUserInput: {
            userId: $userId
            cursorId: $cursorid
        }) {
            senderId
            receiverId
            anotherUser {
                id
                username
                img
            }
        }
    }
`);