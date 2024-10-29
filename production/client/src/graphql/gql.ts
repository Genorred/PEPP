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
    "\n    mutation register($username: String!, $password: String!, $email: String!) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n": types.RegisterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation register($username: String!, $password: String!, $email: String!) {\n        register(registerInput: {\n            username: $username\n            email: $email\n            password: $password\n        }) {\n            username\n            email\n            id\n            createdAt\n        }\n    }\n"): typeof import('./graphql').RegisterDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
