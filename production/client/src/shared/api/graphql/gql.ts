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
    "\n    mutation createPost($body: JSONObject!, $title: String!, $isPublished: Boolean, $topics: [String!], $subTopics: [String!]) {\n        createPost(createPostInput: {\n            body: $body\n            published: $isPublished\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreatePostDocument,
    "\n    mutation createVersionPost($body: JSONObject!, $title: String!, $postId: Float!, $published: Boolean!, $topics: [String!], $subTopics: [String!]) {\n        createVersionPost(createVersionPostInput: {\n            body: $body\n            title: $title\n            postId: $postId\n            published: $published\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n": types.CreateVersionPostDocument,
    "\n    query draft($id: Int!) {\n        draft(id: $id) {\n            id\n            body\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n": types.DraftDocument,
    "\n    query drafts {\n        userDrafts {\n            id\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n": types.DraftsDocument,
    "\n    query post($id: Int!) {\n        post(id: $id) {\n            body\n            createdAt\n            user {\n                username\n                img\n                id\n            }\n        }\n    }\n": types.PostDocument,
    "\n    mutation publishDraft($postId: Int!) {\n        publish(publishInput: $postId) {\n            id\n        }\n    }\n": types.PublishDraftDocument,
    "\n    mutation register($username: String!, $password: String!, $email: String!) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n": types.RegisterDocument,
    "\n    mutation updatePost($id: Int!, $body: JSONObject, $title: String) {\n        updatePost(updatePostInput: {\n            id: $id\n            body: $body\n            title: $title\n        }) {\n            id\n        }\n    }\n": types.UpdatePostDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPost($body: JSONObject!, $title: String!, $isPublished: Boolean, $topics: [String!], $subTopics: [String!]) {\n        createPost(createPostInput: {\n            body: $body\n            published: $isPublished\n            title: $title\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreatePostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createVersionPost($body: JSONObject!, $title: String!, $postId: Float!, $published: Boolean!, $topics: [String!], $subTopics: [String!]) {\n        createVersionPost(createVersionPostInput: {\n            body: $body\n            title: $title\n            postId: $postId\n            published: $published\n            topics: $topics\n            subTopics: $subTopics\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateVersionPostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query draft($id: Int!) {\n        draft(id: $id) {\n            id\n            body\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n"): typeof import('./graphql').DraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query drafts {\n        userDrafts {\n            id\n            createdAt\n            img\n            title\n            updatedAt\n        }\n    }\n"): typeof import('./graphql').DraftsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query post($id: Int!) {\n        post(id: $id) {\n            body\n            createdAt\n            user {\n                username\n                img\n                id\n            }\n        }\n    }\n"): typeof import('./graphql').PostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation publishDraft($postId: Int!) {\n        publish(publishInput: $postId) {\n            id\n        }\n    }\n"): typeof import('./graphql').PublishDraftDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation register($username: String!, $password: String!, $email: String!) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updatePost($id: Int!, $body: JSONObject, $title: String) {\n        updatePost(updatePostInput: {\n            id: $id\n            body: $body\n            title: $title\n        }) {\n            id\n        }\n    }\n"): typeof import('./graphql').UpdatePostDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
