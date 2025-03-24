/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query postsId ($token: String!) {\n        allPosts(findAllPostsInput: {\n            token: $token\n        })\n        {\n            id\n        }\n    }\n": types.PostsIdDocument,
    "\n    query usersIds ($token: String!) {\n        allUsers(findManyInput: {\n            token: $token\n        })\n        {\n            id\n        }\n    }\n": types.UsersIdsDocument,
    "\n    mutation acceptUserFriendRequests($id: Int!) {\n        acceptFriendshipRequest(updateFriendshipInput: {\n            requestId: $id\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n        }\n    }\n": types.AcceptUserFriendRequestsDocument,
    "\n    mutation confirmUserEmail($token: String!) {\n        confirmUserEmail(confirmUserEmailInput: $token)\n        {\n            username\n            email\n            id\n            createdAt\n            occupation\n            img\n        }\n    }\n": types.ConfirmUserEmailDocument,
    "\n\n    mutation createComment($message: String!, $postId: Int!) {\n        createComment(createCommentInput: {\n            message: $message\n            postId: $postId\n        }) {\n            id\n        }\n    }\n": types.CreateCommentDocument,
    "\n    mutation createDraft($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {\n        createDraft(createDraftInput: {\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreateDraftDocument,
    "\n    mutation createPost($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {\n        createPost(createPostInput: {\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreatePostDocument,
    "\n\n    mutation createReply($message: String!, $parentId: Int!, $postId: Int!, $respondedCommentId: Int) {\n        createReply(createReplyInput: {\n            message: $message\n            postId: $postId\n            parentId: $parentId\n            respondedCommentId: $respondedCommentId\n        }) {\n            id\n        }\n    }\n": types.CreateReplyDocument,
    "\n    mutation createVersionDraft($body: JSONObject!, $title: String!, $postId: Int!, $topics: [String!], $subTopics: [String!]) {\n        createDraft(createDraftInput: {\n            body: $body\n            title: $title\n            postId: $postId\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreateVersionDraftDocument,
    "\n    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String, $subTopics: [String!], $topics: [String!]) {\n        createVersion(createVersionInput: {\n            postId: $postId\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreateVersionPostDocument,
    "\n    query getCommentsByPostId($postId: Int!, $skipPages: Int) {\n        comments(getCommentsByPostInput: {\n            postId: $postId\n            skipPages: $skipPages\n        }) {\n            totalPages,\n            data {\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    username\n                    img\n                    id\n                }\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.GetCommentsByPostIdDocument,
    "\n    query getCommentsByUserId($userId: Int!, $skipPages: Int, $isNotReply: Boolean,\n        $sortByDate: SortOrder, $sortByPopularity: SortOrder\n    ) {\n        userComments(getCommentsByUserInput: {\n            userId: $userId\n            skipPages: $skipPages\n            isNotReply: $isNotReply\n            sortByDate: $sortByDate\n            sortByPopularity: $sortByPopularity\n        }) {\n            totalPages,\n            data {\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    username\n                    img\n                    id\n                }\n                createdAt\n                updatedAt\n                postId\n                parentId\n                post {\n                    title\n                    user {\n                        username\n                    }\n                }\n            }\n        }\n    }\n": types.GetCommentsByUserIdDocument,
    "\n    query draft($id: Int!) {\n        draft(findDraftInput: {\n            id: $id\n        }) {\n            id\n            body\n            createdAt\n            img\n            title\n            updatedAt\n            topics {\n                title\n            }\n            subTopics {\n                title\n            }\n        }\n    }\n": types.DraftDocument,
    "\n    query drafts {\n        userDrafts {\n            id\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n": types.DraftsDocument,
    "\n    query post($id: Int!) {\n        post(findPostInput: {\n            id: $id,\n        }) {\n            body\n            createdAt\n            title\n            user {\n                username\n                img\n                id\n            }\n            topics {\n                title\n            }\n            subTopics {\n                title\n            }\n            rating\n            minutes\n            version\n            commentsQuantity\n            reviewsQuantity\n            description\n        }\n    }\n": types.PostDocument,
    "\n    query getReplies($parentId: Int!, $skipPages: Int) {\n        replies(getRepliesByCommentInput: {\n            parentId: $parentId\n            skipPages: $skipPages\n        }) {\n            totalPages,\n            data {\n                respondedCommentId\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    id\n                    username\n                    img\n                }\n                createdAt\n                updatedAt\n            }\n        }\n    }\n": types.GetRepliesDocument,
    "\n    query topics($title: String) {\n        topics(title: $title) {\n            title\n        }\n    }\n": types.TopicsDocument,
    "\n    query getUserFriendRequests($cursorId: Int) {\n        userFriendRequests(findFriendsByUserInput: {\n            cursorId: $cursorId\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n            id\n        }\n    }\n": types.GetUserFriendRequestsDocument,
    "\n    query getUserFriendRequestsCount($userId: Int!) {\n        userFriendRequestsQuantity(countFriendshipInput: {\n            userId: $userId\n            isAccepted: false\n        })\n    }\n": types.GetUserFriendRequestsCountDocument,
    "\n    query getUserFriends($userId: Int!, $cursorid: Int) {\n        userFriends(findFriendsByUserInput: {\n            userId: $userId\n            cursorId: $cursorid\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n        }\n    }\n": types.GetUserFriendsDocument,
    "\n    query getUserFriendsCount($userId: Int!) {\n        userFriendsQuantity(countFriendshipInput: {\n            userId: $userId\n            isAccepted: true\n        })\n    }\n": types.GetUserFriendsCountDocument,
    "\n    query getUserPosts($createdAt: SortOrder, $rating: SortOrder,\n        $skipPages: Int, $userId: Int!, $topics: [String!], $subTopics: [String!], $topicsOrSubTopics: [String!]) {\n\n        userPosts (findUserPostsInput: {\n            createdAt: $createdAt,\n            rating: $rating,\n            skipPages: $skipPages,\n            userId: $userId\n            topics: $topics,\n            subTopics: $subTopics,\n            topicsOrSubTopics: $topicsOrSubTopics\n        }) {\n            totalPages,\n            data {\n                id,\n                rating,\n                commentsQuantity,\n                reviewsQuantity,\n                img,\n                minutes,\n                title,\n                createdAt,\n                userId,\n                description,\n                version,\n                updatedAt\n                user {\n                    username\n                    occupation\n                    img\n                }\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n\n\n        }\n    }\n": types.GetUserPostsDocument,
    "\n    query getUserProfileInfo($id: Int!) {\n        user(findOneUserInput: {\n            id: $id\n        }) {\n            id\n            createdAt\n            img\n            updatedAt\n            occupation\n            username\n            posts {\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n        }\n    }\n": types.GetUserProfileInfoDocument,
    "\n    query getUsersFriendship($userId1: Int!, $userId2: Int!) {\n        usersFriendship(findUsersFriendship: {\n            userId1: $userId1\n            userId2: $userId2\n        }) {\n            isAccepted\n        }\n    }\n": types.GetUsersFriendshipDocument,
    "\n    mutation login($password: String!, $email: String!) {\n        login(loginInput: {\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n": types.LoginDocument,
    "\n    mutation logout {\n        logout\n    }\n": types.LogoutDocument,
    "\n    query postRecommendations($createdAt: SortOrder, $rating: SortOrder,\n        $skipPages: Int, $topics: [String!], $search: String) {\n\n        postsRecommendations (postRecommendationsInput: {\n            createdAt: $createdAt,\n            rating: $rating,\n            skipPages: $skipPages,\n            topics: $topics,\n            searchValue: $search\n        }) {\n            totalPages,\n            data {\n                id,\n                rating,\n                commentsQuantity,\n                reviewsQuantity,\n                img,\n                minutes,\n                title,\n                createdAt,\n                userId,\n                description,\n                version,\n                updatedAt\n                user {\n                    username\n                    occupation\n                    img\n                }\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n\n\n        }\n    }\n": types.PostRecommendationsDocument,
    "\n    mutation publishDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {\n        publishDraft(publishDraftInput: {\n            id: $id\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.PublishDraftDocument,
    "\n    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n            returnUrl: $returnUrl\n        })\n    }\n": types.RegisterDocument,
    "\n    mutation removeFriendship($anotherUserId: Int!) {\n        removeFriendship(removeFriendshipInput: {\n            anotherUserId: $anotherUserId\n        }) {\n            receiverId\n            id\n        }\n    }\n": types.RemoveFriendshipDocument,
    "\n    mutation sendFriendshipRequest($receiverId: Int!) {\n        sendFriendshipRequest(createFriendshipInput: {\n            receiverId: $receiverId\n        }) {\n            receiverId\n        }\n    }\n": types.SendFriendshipRequestDocument,
    "\n    mutation updateDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {\n        updateDraft(updateDraftInput: {\n            id: $id\n            topics: $topics\n            subTopics: $subTopics\n            body: $body\n            title: $title\n        }) {\n            id\n        }\n    }\n": types.UpdateDraftDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query postsId ($token: String!) {\n        allPosts(findAllPostsInput: {\n            token: $token\n        })\n        {\n            id\n        }\n    }\n"): typeof import('./graphql').PostsIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query usersIds ($token: String!) {\n        allUsers(findManyInput: {\n            token: $token\n        })\n        {\n            id\n        }\n    }\n"): typeof import('./graphql').UsersIdsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation acceptUserFriendRequests($id: Int!) {\n        acceptFriendshipRequest(updateFriendshipInput: {\n            requestId: $id\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n        }\n    }\n"): typeof import('./graphql').AcceptUserFriendRequestsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation confirmUserEmail($token: String!) {\n        confirmUserEmail(confirmUserEmailInput: $token)\n        {\n            username\n            email\n            id\n            createdAt\n            occupation\n            img\n        }\n    }\n"): typeof import('./graphql').ConfirmUserEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    mutation createComment($message: String!, $postId: Int!) {\n        createComment(createCommentInput: {\n            message: $message\n            postId: $postId\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateCommentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createDraft($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {\n        createDraft(createDraftInput: {\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateDraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPost($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!] ) {\n        createPost(createPostInput: {\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreatePostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\n    mutation createReply($message: String!, $parentId: Int!, $postId: Int!, $respondedCommentId: Int) {\n        createReply(createReplyInput: {\n            message: $message\n            postId: $postId\n            parentId: $parentId\n            respondedCommentId: $respondedCommentId\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateReplyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createVersionDraft($body: JSONObject!, $title: String!, $postId: Int!, $topics: [String!], $subTopics: [String!]) {\n        createDraft(createDraftInput: {\n            body: $body\n            title: $title\n            postId: $postId\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateVersionDraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String, $subTopics: [String!], $topics: [String!]) {\n        createVersion(createVersionInput: {\n            postId: $postId\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateVersionPostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCommentsByPostId($postId: Int!, $skipPages: Int) {\n        comments(getCommentsByPostInput: {\n            postId: $postId\n            skipPages: $skipPages\n        }) {\n            totalPages,\n            data {\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    username\n                    img\n                    id\n                }\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): typeof import('./graphql').GetCommentsByPostIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCommentsByUserId($userId: Int!, $skipPages: Int, $isNotReply: Boolean,\n        $sortByDate: SortOrder, $sortByPopularity: SortOrder\n    ) {\n        userComments(getCommentsByUserInput: {\n            userId: $userId\n            skipPages: $skipPages\n            isNotReply: $isNotReply\n            sortByDate: $sortByDate\n            sortByPopularity: $sortByPopularity\n        }) {\n            totalPages,\n            data {\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    username\n                    img\n                    id\n                }\n                createdAt\n                updatedAt\n                postId\n                parentId\n                post {\n                    title\n                    user {\n                        username\n                    }\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').GetCommentsByUserIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query draft($id: Int!) {\n        draft(findDraftInput: {\n            id: $id\n        }) {\n            id\n            body\n            createdAt\n            img\n            title\n            updatedAt\n            topics {\n                title\n            }\n            subTopics {\n                title\n            }\n        }\n    }\n"): typeof import('./graphql').DraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query drafts {\n        userDrafts {\n            id\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n"): typeof import('./graphql').DraftsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query post($id: Int!) {\n        post(findPostInput: {\n            id: $id,\n        }) {\n            body\n            createdAt\n            title\n            user {\n                username\n                img\n                id\n            }\n            topics {\n                title\n            }\n            subTopics {\n                title\n            }\n            rating\n            minutes\n            version\n            commentsQuantity\n            reviewsQuantity\n            description\n        }\n    }\n"): typeof import('./graphql').PostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getReplies($parentId: Int!, $skipPages: Int) {\n        replies(getRepliesByCommentInput: {\n            parentId: $parentId\n            skipPages: $skipPages\n        }) {\n            totalPages,\n            data {\n                respondedCommentId\n                id\n                message\n                likes\n                dislikes\n                repliesQuantity\n                user {\n                    id\n                    username\n                    img\n                }\n                createdAt\n                updatedAt\n            }\n        }\n    }\n"): typeof import('./graphql').GetRepliesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query topics($title: String) {\n        topics(title: $title) {\n            title\n        }\n    }\n"): typeof import('./graphql').TopicsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserFriendRequests($cursorId: Int) {\n        userFriendRequests(findFriendsByUserInput: {\n            cursorId: $cursorId\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n            id\n        }\n    }\n"): typeof import('./graphql').GetUserFriendRequestsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserFriendRequestsCount($userId: Int!) {\n        userFriendRequestsQuantity(countFriendshipInput: {\n            userId: $userId\n            isAccepted: false\n        })\n    }\n"): typeof import('./graphql').GetUserFriendRequestsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserFriends($userId: Int!, $cursorid: Int) {\n        userFriends(findFriendsByUserInput: {\n            userId: $userId\n            cursorId: $cursorid\n        }) {\n            anotherUser {\n                id\n                username\n                img\n            }\n        }\n    }\n"): typeof import('./graphql').GetUserFriendsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserFriendsCount($userId: Int!) {\n        userFriendsQuantity(countFriendshipInput: {\n            userId: $userId\n            isAccepted: true\n        })\n    }\n"): typeof import('./graphql').GetUserFriendsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserPosts($createdAt: SortOrder, $rating: SortOrder,\n        $skipPages: Int, $userId: Int!, $topics: [String!], $subTopics: [String!], $topicsOrSubTopics: [String!]) {\n\n        userPosts (findUserPostsInput: {\n            createdAt: $createdAt,\n            rating: $rating,\n            skipPages: $skipPages,\n            userId: $userId\n            topics: $topics,\n            subTopics: $subTopics,\n            topicsOrSubTopics: $topicsOrSubTopics\n        }) {\n            totalPages,\n            data {\n                id,\n                rating,\n                commentsQuantity,\n                reviewsQuantity,\n                img,\n                minutes,\n                title,\n                createdAt,\n                userId,\n                description,\n                version,\n                updatedAt\n                user {\n                    username\n                    occupation\n                    img\n                }\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n\n\n        }\n    }\n"): typeof import('./graphql').GetUserPostsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUserProfileInfo($id: Int!) {\n        user(findOneUserInput: {\n            id: $id\n        }) {\n            id\n            createdAt\n            img\n            updatedAt\n            occupation\n            username\n            posts {\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').GetUserProfileInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUsersFriendship($userId1: Int!, $userId2: Int!) {\n        usersFriendship(findUsersFriendship: {\n            userId1: $userId1\n            userId2: $userId2\n        }) {\n            isAccepted\n        }\n    }\n"): typeof import('./graphql').GetUsersFriendshipDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login($password: String!, $email: String!) {\n        login(loginInput: {\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation logout {\n        logout\n    }\n"): typeof import('./graphql').LogoutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query postRecommendations($createdAt: SortOrder, $rating: SortOrder,\n        $skipPages: Int, $topics: [String!], $search: String) {\n\n        postsRecommendations (postRecommendationsInput: {\n            createdAt: $createdAt,\n            rating: $rating,\n            skipPages: $skipPages,\n            topics: $topics,\n            searchValue: $search\n        }) {\n            totalPages,\n            data {\n                id,\n                rating,\n                commentsQuantity,\n                reviewsQuantity,\n                img,\n                minutes,\n                title,\n                createdAt,\n                userId,\n                description,\n                version,\n                updatedAt\n                user {\n                    username\n                    occupation\n                    img\n                }\n                topics {\n                    title\n                }\n                subTopics {\n                    title\n                }\n            }\n\n\n        }\n    }\n"): typeof import('./graphql').PostRecommendationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation publishDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {\n        publishDraft(publishDraftInput: {\n            id: $id\n            body: $body\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').PublishDraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n            returnUrl: $returnUrl\n        })\n    }\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeFriendship($anotherUserId: Int!) {\n        removeFriendship(removeFriendshipInput: {\n            anotherUserId: $anotherUserId\n        }) {\n            receiverId\n            id\n        }\n    }\n"): typeof import('./graphql').RemoveFriendshipDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation sendFriendshipRequest($receiverId: Int!) {\n        sendFriendshipRequest(createFriendshipInput: {\n            receiverId: $receiverId\n        }) {\n            receiverId\n        }\n    }\n"): typeof import('./graphql').SendFriendshipRequestDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {\n        updateDraft(updateDraftInput: {\n            id: $id\n            topics: $topics\n            subTopics: $subTopics\n            body: $body\n            title: $title\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').UpdateDraftDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
