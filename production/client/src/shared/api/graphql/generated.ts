import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetcher } from '@/shared/api/base';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  skipPages?: InputMaybe<Scalars['Int']['input']>;
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
  algoPosts: Recommendations;
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

export type Recommendations = {
  __typename?: 'Recommendations';
  data: Array<Post>;
  totalPages: Scalars['Int']['output'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

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


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', body: Array<any>, createdAt: any, title: string, rating?: number | null, minutes?: number | null, version: number, commentsQuantity?: number | null, reviewsQuantity?: number | null, description?: string | null, user: { __typename?: 'User', username: string, img: string, id: number }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null } };

export type TopicsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', title: string }> };

export type PostRecommendationsQueryVariables = Exact<{
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  skipPages?: InputMaybe<Scalars['Int']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostRecommendationsQuery = { __typename?: 'Query', algoPosts: { __typename?: 'Recommendations', totalPages: number, data: Array<{ __typename?: 'Post', id: number, rating?: number | null, commentsQuantity?: number | null, reviewsQuantity?: number | null, img?: string | null, minutes?: number | null, title: string, createdAt: any, userId: number, description?: string | null, version: number, updatedAt: any, user: { __typename?: 'User', username: string, occupation?: string | null, img: string }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null }> } };

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
      variables: PostsIdQueryVariables,
      options?: UseQueryOptions<PostsIdQuery, TError, TData>
    ) => {
    
    return useQuery<PostsIdQuery, TError, TData>(
      ['postsId', variables],
      fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, variables),
      options
    )};

usePostsIdQuery.document = PostsIdDocument;

usePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ['postsId', variables];

export const useInfinitePostsIdQuery = <
      TData = PostsIdQuery,
      TError = unknown
    >(
      variables: PostsIdQueryVariables,
      options?: UseInfiniteQueryOptions<PostsIdQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<PostsIdQuery, TError, TData>(
      ['postsId.infinite', variables],
      (metaData) => fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfinitePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ['postsId.infinite', variables];


usePostsIdQuery.fetcher = (variables: PostsIdQueryVariables, options?: RequestInit['headers']) => fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, variables, options);

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
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['createPost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
      options
    )};

useCreatePostMutation.getKey = () => ['createPost'];


useCreatePostMutation.fetcher = (variables: CreatePostMutationVariables, options?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables, options);

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
    >(options?: UseMutationOptions<CreateVersionPostMutation, TError, CreateVersionPostMutationVariables, TContext>) => {
    
    return useMutation<CreateVersionPostMutation, TError, CreateVersionPostMutationVariables, TContext>(
      ['createVersionPost'],
      (variables?: CreateVersionPostMutationVariables) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(CreateVersionPostDocument, variables)(),
      options
    )};

useCreateVersionPostMutation.getKey = () => ['createVersionPost'];


useCreateVersionPostMutation.fetcher = (variables: CreateVersionPostMutationVariables, options?: RequestInit['headers']) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(CreateVersionPostDocument, variables, options);

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
      variables: DraftQueryVariables,
      options?: UseQueryOptions<DraftQuery, TError, TData>
    ) => {
    
    return useQuery<DraftQuery, TError, TData>(
      ['draft', variables],
      fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, variables),
      options
    )};

useDraftQuery.document = DraftDocument;

useDraftQuery.getKey = (variables: DraftQueryVariables) => ['draft', variables];

export const useInfiniteDraftQuery = <
      TData = DraftQuery,
      TError = unknown
    >(
      variables: DraftQueryVariables,
      options?: UseInfiniteQueryOptions<DraftQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<DraftQuery, TError, TData>(
      ['draft.infinite', variables],
      (metaData) => fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfiniteDraftQuery.getKey = (variables: DraftQueryVariables) => ['draft.infinite', variables];


useDraftQuery.fetcher = (variables: DraftQueryVariables, options?: RequestInit['headers']) => fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, variables, options);

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
      variables?: DraftsQueryVariables,
      options?: UseQueryOptions<DraftsQuery, TError, TData>
    ) => {
    
    return useQuery<DraftsQuery, TError, TData>(
      variables === undefined ? ['drafts'] : ['drafts', variables],
      fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, variables),
      options
    )};

useDraftsQuery.document = DraftsDocument;

useDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ['drafts'] : ['drafts', variables];

export const useInfiniteDraftsQuery = <
      TData = DraftsQuery,
      TError = unknown
    >(
      variables?: DraftsQueryVariables,
      options?: UseInfiniteQueryOptions<DraftsQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<DraftsQuery, TError, TData>(
      variables === undefined ? ['drafts.infinite'] : ['drafts.infinite', variables],
      (metaData) => fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfiniteDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ['drafts.infinite'] : ['drafts.infinite', variables];


useDraftsQuery.fetcher = (variables?: DraftsQueryVariables, options?: RequestInit['headers']) => fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, variables, options);

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
    rating
    minutes
    version
    commentsQuantity
    reviewsQuantity
    description
  }
}
    `;

export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>
    ) => {
    
    return useQuery<PostQuery, TError, TData>(
      ['post', variables],
      fetcher<PostQuery, PostQueryVariables>(PostDocument, variables),
      options
    )};

usePostQuery.document = PostDocument;

usePostQuery.getKey = (variables: PostQueryVariables) => ['post', variables];

export const useInfinitePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      variables: PostQueryVariables,
      options?: UseInfiniteQueryOptions<PostQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<PostQuery, TError, TData>(
      ['post.infinite', variables],
      (metaData) => fetcher<PostQuery, PostQueryVariables>(PostDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfinitePostQuery.getKey = (variables: PostQueryVariables) => ['post.infinite', variables];


usePostQuery.fetcher = (variables: PostQueryVariables, options?: RequestInit['headers']) => fetcher<PostQuery, PostQueryVariables>(PostDocument, variables, options);

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
      variables?: TopicsQueryVariables,
      options?: UseQueryOptions<TopicsQuery, TError, TData>
    ) => {
    
    return useQuery<TopicsQuery, TError, TData>(
      variables === undefined ? ['topics'] : ['topics', variables],
      fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables),
      options
    )};

useTopicsQuery.document = TopicsDocument;

useTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ['topics'] : ['topics', variables];

export const useInfiniteTopicsQuery = <
      TData = TopicsQuery,
      TError = unknown
    >(
      variables?: TopicsQueryVariables,
      options?: UseInfiniteQueryOptions<TopicsQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<TopicsQuery, TError, TData>(
      variables === undefined ? ['topics.infinite'] : ['topics.infinite', variables],
      (metaData) => fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfiniteTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ['topics.infinite'] : ['topics.infinite', variables];


useTopicsQuery.fetcher = (variables?: TopicsQueryVariables, options?: RequestInit['headers']) => fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables, options);

export const PostRecommendationsDocument = `
    query postRecommendations($createdAt: SortOrder, $rating: SortOrder, $skipPages: Int, $topics: [String!], $search: String) {
  algoPosts(
    findAlgorithmInput: {createdAt: $createdAt, rating: $rating, skipPages: $skipPages, topics: $topics, searchValue: $search}
  ) {
    totalPages
    data {
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
}
    `;

export const usePostRecommendationsQuery = <
      TData = PostRecommendationsQuery,
      TError = unknown
    >(
      variables?: PostRecommendationsQueryVariables,
      options?: UseQueryOptions<PostRecommendationsQuery, TError, TData>
    ) => {
    
    return useQuery<PostRecommendationsQuery, TError, TData>(
      variables === undefined ? ['postRecommendations'] : ['postRecommendations', variables],
      fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, variables),
      options
    )};

usePostRecommendationsQuery.document = PostRecommendationsDocument;

usePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ['postRecommendations'] : ['postRecommendations', variables];

export const useInfinitePostRecommendationsQuery = <
      TData = PostRecommendationsQuery,
      TError = unknown
    >(
      variables?: PostRecommendationsQueryVariables,
      options?: UseInfiniteQueryOptions<PostRecommendationsQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<PostRecommendationsQuery, TError, TData>(
      variables === undefined ? ['postRecommendations.infinite'] : ['postRecommendations.infinite', variables],
      (metaData) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

useInfinitePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ['postRecommendations.infinite'] : ['postRecommendations.infinite', variables];


usePostRecommendationsQuery.fetcher = (variables?: PostRecommendationsQueryVariables, options?: RequestInit['headers']) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, variables, options);

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
    >(options?: UseMutationOptions<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>) => {
    
    return useMutation<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>(
      ['publishDraft'],
      (variables?: PublishDraftMutationVariables) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(PublishDraftDocument, variables)(),
      options
    )};

usePublishDraftMutation.getKey = () => ['publishDraft'];


usePublishDraftMutation.fetcher = (variables: PublishDraftMutationVariables, options?: RequestInit['headers']) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(PublishDraftDocument, variables, options);

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
    >(options?: UseMutationOptions<PublishPostVersionMutation, TError, PublishPostVersionMutationVariables, TContext>) => {
    
    return useMutation<PublishPostVersionMutation, TError, PublishPostVersionMutationVariables, TContext>(
      ['publishPostVersion'],
      (variables?: PublishPostVersionMutationVariables) => fetcher<PublishPostVersionMutation, PublishPostVersionMutationVariables>(PublishPostVersionDocument, variables)(),
      options
    )};

usePublishPostVersionMutation.getKey = () => ['publishPostVersion'];


usePublishPostVersionMutation.fetcher = (variables: PublishPostVersionMutationVariables, options?: RequestInit['headers']) => fetcher<PublishPostVersionMutation, PublishPostVersionMutationVariables>(PublishPostVersionDocument, variables, options);

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
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) => {
    
    return useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['register'],
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    )};

useRegisterMutation.getKey = () => ['register'];


useRegisterMutation.fetcher = (variables: RegisterMutationVariables, options?: RequestInit['headers']) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables, options);

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
    >(options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>) => {
    
    return useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      ['updatePost'],
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, variables)(),
      options
    )};

useUpdatePostMutation.getKey = () => ['updatePost'];


useUpdatePostMutation.fetcher = (variables: UpdatePostMutationVariables, options?: RequestInit['headers']) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, variables, options);


      export type PossibleTypesResultData = {
  "possibleTypes": {}
};
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    