import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type CreatePostInput = {
  body: Scalars['JSONObject']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  google_id?: InputMaybe<Scalars['String']['input']>;
  img?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type CreateVersionPostInput = {
  body: Scalars['JSONObject']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  postId: Scalars['Float']['input'];
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FindAlgorithmPostsInput = {
  createdAtDesc?: InputMaybe<Scalars['Boolean']['input']>;
  cursorId?: InputMaybe<Scalars['Int']['input']>;
  ratingDesc?: InputMaybe<Scalars['Boolean']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FindAllPostsInput = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
};

export type FindManyUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  img?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FindOneUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type FindPostInput = {
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createVersionPost: Post;
  publish: Post;
  register: User;
  removePost: Post;
  removeUser: User;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateVersionPostArgs = {
  createVersionPostInput: CreateVersionPostInput;
};


export type MutationPublishArgs = {
  publishInput: Scalars['Int']['input'];
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
  body: Array<Scalars['JSON']['output']>;
  commentsQuantity?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  img?: Maybe<Scalars['String']['output']>;
  isArchived: Scalars['Boolean']['output'];
  isDraft: Scalars['Boolean']['output'];
  isPublished: Scalars['Boolean']['output'];
  minutes?: Maybe<Scalars['Int']['output']>;
  postId?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewsQuantity?: Maybe<Scalars['Int']['output']>;
  subTopics?: Maybe<Array<Topic>>;
  title: Scalars['String']['output'];
  topics?: Maybe<Array<Topic>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  version: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  algoPosts: Array<Post>;
  allPosts: Array<Post>;
  draft: Post;
  login: User;
  post: Post;
  topics: Array<Topic>;
  user: User;
  userDrafts: Array<Post>;
  userPosts: Array<Post>;
  users: Array<User>;
};


export type QueryAlgoPostsArgs = {
  findAlgorithmInput: FindAlgorithmPostsInput;
};


export type QueryAllPostsArgs = {
  findAllPostsInput: FindAllPostsInput;
};


export type QueryDraftArgs = {
  findDraft: FindPostInput;
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};


export type QueryPostArgs = {
  findOne: FindPostInput;
};


export type QueryTopicsArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  loginInput: FindOneUserInput;
};


export type QueryUserPostsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  findManyInput: FindManyUserInput;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['JSONObject']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  google_id?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  google_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  img: Scalars['String']['output'];
  occupation?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  posts: Array<Post>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type PostsIdQueryVariables = Exact<{
  token: Scalars['String']['input'];
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type PostsIdQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: number, version: number }> };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['JSONObject']['input'];
  title: Scalars['String']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  isDraft?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number } };

export type CreateVersionPostMutationVariables = Exact<{
  body: Scalars['JSONObject']['input'];
  title: Scalars['String']['input'];
  postId: Scalars['Float']['input'];
  published: Scalars['Boolean']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateVersionPostMutation = { __typename?: 'Mutation', createVersionPost: { __typename?: 'Post', id: number } };

export type DraftQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DraftQuery = { __typename?: 'Query', draft: { __typename?: 'Post', id: number, body: Array<any>, createdAt: any, img?: string | null, title: string, updatedAt: any, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null } };

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = { __typename?: 'Query', userDrafts: Array<{ __typename?: 'Post', id: number, createdAt: any, img?: string | null, title: string, updatedAt: any }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', body: Array<any>, createdAt: any, title: string, user: { __typename?: 'User', username: string, img: string, id: number }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null } };

export type TopicsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', title: string }> };

export type PostRecommendationsQueryVariables = Exact<{
  createdAtDesc?: InputMaybe<Scalars['Boolean']['input']>;
  ratingDesc?: InputMaybe<Scalars['Boolean']['input']>;
  cursorId?: InputMaybe<Scalars['Int']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type PostRecommendationsQuery = { __typename?: 'Query', algoPosts: Array<{ __typename?: 'Post', id: number, rating?: number | null, commentsQuantity?: number | null, reviewsQuantity?: number | null, img?: string | null, minutes?: number | null, title: string, createdAt: any, userId: number, description?: string | null, version: number, updatedAt: any, user: { __typename?: 'User', username: string, occupation?: string | null, img: string }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null }> };

export type PublishDraftMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type PublishDraftMutation = { __typename?: 'Mutation', publish: { __typename?: 'Post', id: number } };

export type PublishPostVersionMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type PublishPostVersionMutation = { __typename?: 'Mutation', publish: { __typename?: 'Post', id: number } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', username: string, email: string, id: number, createdAt: any } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body?: InputMaybe<Scalars['JSONObject']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number } };



export const PostsIdDocument = `
    query postsId($token: String!, $isArchived: Boolean) {
  allPosts(findAllPostsInput: {token: $token, isArchived: $isArchived}) {
    id
    version
  }
}
    `;

export const usePostsIdQuery = <
      TData = PostsIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostsIdQueryVariables,
      options?: UseQueryOptions<PostsIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<PostsIdQuery, TError, TData>(
      ['postsId', variables],
      fetcher<PostsIdQuery, PostsIdQueryVariables>(client, PostsIdDocument, variables, headers),
      options
    )};

usePostsIdQuery.document = PostsIdDocument;

usePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ['postsId', variables];

export const useInfinitePostsIdQuery = <
      TData = PostsIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostsIdQueryVariables,
      options?: UseInfiniteQueryOptions<PostsIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<PostsIdQuery, TError, TData>(
      ['postsId.infinite', variables],
      (metaData) => fetcher<PostsIdQuery, PostsIdQueryVariables>(client, PostsIdDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfinitePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ['postsId.infinite', variables];


usePostsIdQuery.fetcher = (client: GraphQLClient, variables: PostsIdQueryVariables, headers?: RequestInit['headers']) => fetcher<PostsIdQuery, PostsIdQueryVariables>(client, PostsIdDocument, variables, headers);

export const CreatePostDocument = `
    mutation createPost($body: JSONObject!, $title: String!, $isPublished: Boolean, $topics: [String!], $subTopics: [String!], $isDraft: Boolean) {
  createPost(
    createPostInput: {body: $body, isDraft: $isDraft, isPublished: $isPublished, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['createPost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    )};

useCreatePostMutation.getKey = () => ['createPost'];


useCreatePostMutation.fetcher = (client: GraphQLClient, variables: CreatePostMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers);

export const CreateVersionPostDocument = `
    mutation createVersionPost($body: JSONObject!, $title: String!, $postId: Float!, $published: Boolean!, $topics: [String!], $subTopics: [String!]) {
  createVersionPost(
    createVersionPostInput: {body: $body, title: $title, postId: $postId, isPublished: $published, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `;

export const useCreateVersionPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateVersionPostMutation, TError, CreateVersionPostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateVersionPostMutation, TError, CreateVersionPostMutationVariables, TContext>(
      ['createVersionPost'],
      (variables?: CreateVersionPostMutationVariables) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(client, CreateVersionPostDocument, variables, headers)(),
      options
    )};

useCreateVersionPostMutation.getKey = () => ['createVersionPost'];


useCreateVersionPostMutation.fetcher = (client: GraphQLClient, variables: CreateVersionPostMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(client, CreateVersionPostDocument, variables, headers);

export const DraftDocument = `
    query draft($id: Int!, $version: Int) {
  draft(findDraft: {id: $id, version: $version}) {
    id
    body
    createdAt
    img
    title
    updatedAt
    topics {
      title
    }
    subTopics {
      title
    }
  }
}
    `;

export const useDraftQuery = <
      TData = DraftQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: DraftQueryVariables,
      options?: UseQueryOptions<DraftQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<DraftQuery, TError, TData>(
      ['draft', variables],
      fetcher<DraftQuery, DraftQueryVariables>(client, DraftDocument, variables, headers),
      options
    )};

useDraftQuery.document = DraftDocument;

useDraftQuery.getKey = (variables: DraftQueryVariables) => ['draft', variables];

export const useInfiniteDraftQuery = <
      TData = DraftQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: DraftQueryVariables,
      options?: UseInfiniteQueryOptions<DraftQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<DraftQuery, TError, TData>(
      ['draft.infinite', variables],
      (metaData) => fetcher<DraftQuery, DraftQueryVariables>(client, DraftDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfiniteDraftQuery.getKey = (variables: DraftQueryVariables) => ['draft.infinite', variables];


useDraftQuery.fetcher = (client: GraphQLClient, variables: DraftQueryVariables, headers?: RequestInit['headers']) => fetcher<DraftQuery, DraftQueryVariables>(client, DraftDocument, variables, headers);

export const DraftsDocument = `
    query drafts {
  userDrafts {
    id
    createdAt
    img
    title
    updatedAt
  }
}
    `;

export const useDraftsQuery = <
      TData = DraftsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DraftsQueryVariables,
      options?: UseQueryOptions<DraftsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<DraftsQuery, TError, TData>(
      variables === undefined ? ['drafts'] : ['drafts', variables],
      fetcher<DraftsQuery, DraftsQueryVariables>(client, DraftsDocument, variables, headers),
      options
    )};

useDraftsQuery.document = DraftsDocument;

useDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ['drafts'] : ['drafts', variables];

export const useInfiniteDraftsQuery = <
      TData = DraftsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DraftsQueryVariables,
      options?: UseInfiniteQueryOptions<DraftsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<DraftsQuery, TError, TData>(
      variables === undefined ? ['drafts.infinite'] : ['drafts.infinite', variables],
      (metaData) => fetcher<DraftsQuery, DraftsQueryVariables>(client, DraftsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfiniteDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ['drafts.infinite'] : ['drafts.infinite', variables];


useDraftsQuery.fetcher = (client: GraphQLClient, variables?: DraftsQueryVariables, headers?: RequestInit['headers']) => fetcher<DraftsQuery, DraftsQueryVariables>(client, DraftsDocument, variables, headers);

export const PostDocument = `
    query post($id: Int!, $version: Int) {
  post(findOne: {id: $id, version: $version}) {
    body
    createdAt
    title
    user {
      username
      img
      id
    }
    topics {
      title
    }
    subTopics {
      title
    }
  }
}
    `;

export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<PostQuery, TError, TData>(
      ['post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers),
      options
    )};

usePostQuery.document = PostDocument;

usePostQuery.getKey = (variables: PostQueryVariables) => ['post', variables];

export const useInfinitePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseInfiniteQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<PostQuery, TError, TData>(
      ['post.infinite', variables],
      (metaData) => fetcher<PostQuery, PostQueryVariables>(client, PostDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfinitePostQuery.getKey = (variables: PostQueryVariables) => ['post.infinite', variables];


usePostQuery.fetcher = (client: GraphQLClient, variables: PostQueryVariables, headers?: RequestInit['headers']) => fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers);

export const TopicsDocument = `
    query topics($title: String) {
  topics(title: $title) {
    title
  }
}
    `;

export const useTopicsQuery = <
      TData = TopicsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TopicsQueryVariables,
      options?: UseQueryOptions<TopicsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<TopicsQuery, TError, TData>(
      variables === undefined ? ['topics'] : ['topics', variables],
      fetcher<TopicsQuery, TopicsQueryVariables>(client, TopicsDocument, variables, headers),
      options
    )};

useTopicsQuery.document = TopicsDocument;

useTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ['topics'] : ['topics', variables];

export const useInfiniteTopicsQuery = <
      TData = TopicsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TopicsQueryVariables,
      options?: UseInfiniteQueryOptions<TopicsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<TopicsQuery, TError, TData>(
      variables === undefined ? ['topics.infinite'] : ['topics.infinite', variables],
      (metaData) => fetcher<TopicsQuery, TopicsQueryVariables>(client, TopicsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfiniteTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ['topics.infinite'] : ['topics.infinite', variables];


useTopicsQuery.fetcher = (client: GraphQLClient, variables?: TopicsQueryVariables, headers?: RequestInit['headers']) => fetcher<TopicsQuery, TopicsQueryVariables>(client, TopicsDocument, variables, headers);

export const PostRecommendationsDocument = `
    query postRecommendations($createdAtDesc: Boolean, $ratingDesc: Boolean, $cursorId: Int, $topics: [String!], $subTopics: [String!]) {
  algoPosts(
    findAlgorithmInput: {createdAtDesc: $createdAtDesc, ratingDesc: $ratingDesc, cursorId: $cursorId, topics: $topics, subTopics: $subTopics}
  ) {
    id
    rating
    commentsQuantity
    reviewsQuantity
    img
    minutes
    title
    createdAt
    userId
    description
    version
    updatedAt
    user {
      username
      occupation
      img
    }
    topics {
      title
    }
    subTopics {
      title
    }
  }
}
    `;

export const usePostRecommendationsQuery = <
      TData = PostRecommendationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostRecommendationsQueryVariables,
      options?: UseQueryOptions<PostRecommendationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<PostRecommendationsQuery, TError, TData>(
      variables === undefined ? ['postRecommendations'] : ['postRecommendations', variables],
      fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(client, PostRecommendationsDocument, variables, headers),
      options
    )};

usePostRecommendationsQuery.document = PostRecommendationsDocument;

usePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ['postRecommendations'] : ['postRecommendations', variables];

export const useInfinitePostRecommendationsQuery = <
      TData = PostRecommendationsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostRecommendationsQueryVariables,
      options?: UseInfiniteQueryOptions<PostRecommendationsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<PostRecommendationsQuery, TError, TData>(
      variables === undefined ? ['postRecommendations.infinite'] : ['postRecommendations.infinite', variables],
      (metaData) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(client, PostRecommendationsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    )};

useInfinitePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ['postRecommendations.infinite'] : ['postRecommendations.infinite', variables];


usePostRecommendationsQuery.fetcher = (client: GraphQLClient, variables?: PostRecommendationsQueryVariables, headers?: RequestInit['headers']) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(client, PostRecommendationsDocument, variables, headers);

export const PublishDraftDocument = `
    mutation publishDraft($postId: Int!) {
  publish(publishInput: $postId) {
    id
  }
}
    `;

export const usePublishDraftMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>(
      ['publishDraft'],
      (variables?: PublishDraftMutationVariables) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(client, PublishDraftDocument, variables, headers)(),
      options
    )};

usePublishDraftMutation.getKey = () => ['publishDraft'];


usePublishDraftMutation.fetcher = (client: GraphQLClient, variables: PublishDraftMutationVariables, headers?: RequestInit['headers']) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(client, PublishDraftDocument, variables, headers);

export const PublishPostVersionDocument = `
    mutation publishPostVersion($postId: Int!) {
  publish(publishInput: $postId) {
    id
  }
}
    `;

export const usePublishPostVersionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PublishPostVersionMutation, TError, PublishPostVersionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<PublishPostVersionMutation, TError, PublishPostVersionMutationVariables, TContext>(
      ['publishPostVersion'],
      (variables?: PublishPostVersionMutationVariables) => fetcher<PublishPostVersionMutation, PublishPostVersionMutationVariables>(client, PublishPostVersionDocument, variables, headers)(),
      options
    )};

usePublishPostVersionMutation.getKey = () => ['publishPostVersion'];


usePublishPostVersionMutation.fetcher = (client: GraphQLClient, variables: PublishPostVersionMutationVariables, headers?: RequestInit['headers']) => fetcher<PublishPostVersionMutation, PublishPostVersionMutationVariables>(client, PublishPostVersionDocument, variables, headers);

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

export const UpdatePostDocument = `
    mutation updatePost($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!], $isPublished: Boolean) {
  updatePost(
    updatePostInput: {id: $id, topics: $topics, subTopics: $subTopics, isPublished: $isPublished, body: $body, title: $title}
  ) {
    id
  }
}
    `;

export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      ['updatePost'],
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
      options
    )};

useUpdatePostMutation.getKey = () => ['updatePost'];


useUpdatePostMutation.fetcher = (client: GraphQLClient, variables: UpdatePostMutationVariables, headers?: RequestInit['headers']) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers);


      export type PossibleTypesResultData = {
  "possibleTypes": {}
};
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    