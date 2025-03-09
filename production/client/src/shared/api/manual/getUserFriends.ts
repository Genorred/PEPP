import { graphql } from "@/shared/api/graphql";

const getUserFriends = graphql(`
    query getUserFriends($userId: Int!, $cursorid: Int) {
        userFriends(findFriendsByUserInput: {
            userId: $userId
            cursorId: $cursorid
        }) {
            anotherUser {
                id
                username
                img
            }
        }
    }
`);