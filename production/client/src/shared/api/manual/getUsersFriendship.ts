import { graphql } from "@/shared/api/graphql";

const getUsersFriendship = graphql(`
    query getUsersFriendship($userId1: Int!, $userId2: Int!) {
        usersFriendship(findUsersFriendship: {
            userId1: $userId1
            userId2: $userId2
        }) {
            isAccepted
        }
    }
`);