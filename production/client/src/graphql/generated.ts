import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreatePostInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  google_id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type FindManyUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FindOneUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  register: User;
  removePost: Post;
  removeUser: User;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationRegisterArgs = {
  registerInput: CreateUserInput;
};


export type MutationRemovePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  /** Example field (placeholder) */
  exampleField: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  login: User;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  loginInput: FindOneUserInput;
};


export type QueryUsersArgs = {
  findManyInput: FindManyUserInput;
};

export type UpdatePostInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  google_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', username: string, email: string, id: string, createdAt: any } };



export const RegisterDocument = `
    mutation register($username: String!, $password: String!, $email: String!) {
  register(
    registerInput: {username: $username, email: $email, password: $password}
  ) {
    username
    email
    id
    createdAt
  }
}
    `;

export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    )};

useRegisterMutation.getKey = () => ['register'];


useRegisterMutation.fetcher = (client: GraphQLClient, variables: RegisterMutationVariables, headers?: RequestInit['headers']) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers);


      export type PossibleTypesResultData = {
  "possibleTypes": {}
};
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    