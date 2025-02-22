/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type CreateCommentInput = {
  message: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};

export type CreateDraftInput = {
  body: Scalars['JSONObject']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreatePostInput = {
  body: Scalars['JSONObject']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isHidden?: InputMaybe<Scalars['Boolean']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateReplyInput = {
  message: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
  respondedCommentId?: InputMaybe<Scalars['Int']['input']>;
};

export type FindAlgorithmPostsInput = {
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  searchValue?: InputMaybe<Scalars['String']['input']>;
  skipPages?: InputMaybe<Scalars['Int']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FindAllPostsInput = {
  token: Scalars['String']['input'];
};

export type FindByPostInput = {
  postId: Scalars['Int']['input'];
};

export type FindDraftInput = {
  id: Scalars['Int']['input'];
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

export type FindOneVersionInput = {
  id: Scalars['Int']['input'];
};

export type FindPostInput = {
  id: Scalars['Int']['input'];
};

export type FindUserPostsInput = {
  skipPages?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type GetByParentCommentInput = {
  parentId: Scalars['Int']['input'];
  skipPages?: InputMaybe<Scalars['Int']['input']>;
};

export type GetByPostInput = {
  postId: Scalars['Int']['input'];
  skipPages?: InputMaybe<Scalars['Int']['input']>;
};

export type GqlCreateVersionInput = {
  body: Scalars['JSONObject']['input'];
  postId: Scalars['Int']['input'];
  subTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type RemovePostInput = {
  id: Scalars['Int']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateCommentInput = {
  id: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateDraftInput = {
  body?: InputMaybe<Scalars['JSONObject']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
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

export type PostsIdQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type PostsIdQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: number }> };

export type ConfirmUserEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmUserEmailMutation = { __typename?: 'Mutation', confirmUserEmail: { __typename?: 'UserResponse', username: string, email: string, id: number, createdAt: any } };

export type CreateCommentMutationVariables = Exact<{
  message: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number } };

export type CreateDraftMutationVariables = Exact<{
  body: Scalars['JSONObject']['input'];
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft: { __typename?: 'Draft', id: number } };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['JSONObject']['input'];
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number } };

export type CreateReplyMutationVariables = Exact<{
  message: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
  respondedCommentId: Scalars['Int']['input'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Comment', id: number } };

export type CreateVersionDraftMutationVariables = Exact<{
  body: Scalars['JSONObject']['input'];
  title: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateVersionDraftMutation = { __typename?: 'Mutation', createDraft: { __typename?: 'Draft', id: number } };

export type CreateVersionPostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  body: Scalars['JSONObject']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateVersionPostMutation = { __typename?: 'Mutation', createVersion: { __typename?: 'Post', id: number } };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
  skipPages?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', comments: { __typename?: 'CommentsByPost', totalPages: number, data: Array<{ __typename?: 'Comment', id: number, message: string, likes: number, dislikes: number, repliesQuantity: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', username: string, img: string } }> } };

export type DraftQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DraftQuery = { __typename?: 'Query', draft: { __typename?: 'Draft', id: number, body: Array<any>, createdAt: any, img?: string | null, title: string, updatedAt: any, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null } };

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = { __typename?: 'Query', userDrafts: Array<{ __typename?: 'Draft', id: number, createdAt: any, img?: string | null, title: string, updatedAt: any }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', body: Array<any>, createdAt: any, title: string, rating?: number | null, minutes?: number | null, version: number, commentsQuantity?: number | null, reviewsQuantity?: number | null, description?: string | null, user: { __typename?: 'User', username: string, img: string, id: number }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null } };

export type GetRepliesQueryVariables = Exact<{
  parentId: Scalars['Int']['input'];
  skipPages?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetRepliesQuery = { __typename?: 'Query', replies: { __typename?: 'CommentsByPost', totalPages: number, data: Array<{ __typename?: 'Comment', respondedCommentId?: number | null, id: number, message: string, likes: number, dislikes: number, repliesQuantity: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', username: string, img: string } }> } };

export type TopicsQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', title: string }> };

export type GetUserPostsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  skipPages?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', userPosts: { __typename?: 'Recommendations', totalPages: number, data: Array<{ __typename?: 'Post', id: number, rating?: number | null, commentsQuantity?: number | null, reviewsQuantity?: number | null, img?: string | null, minutes?: number | null, title: string, createdAt: any, userId: number, description?: string | null, version: number, updatedAt: any, user: { __typename?: 'User', username: string, occupation?: string | null, img: string }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null }> } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', username: string, email: string, id: number, createdAt: any } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type PostRecommendationsQueryVariables = Exact<{
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  skipPages?: InputMaybe<Scalars['Int']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostRecommendationsQuery = { __typename?: 'Query', postsRecommendations: { __typename?: 'Recommendations', totalPages: number, data: Array<{ __typename?: 'Post', id: number, rating?: number | null, commentsQuantity?: number | null, reviewsQuantity?: number | null, img?: string | null, minutes?: number | null, title: string, createdAt: any, userId: number, description?: string | null, version: number, updatedAt: any, user: { __typename?: 'User', username: string, occupation?: string | null, img: string }, topics?: Array<{ __typename?: 'Topic', title: string }> | null, subTopics?: Array<{ __typename?: 'Topic', title: string }> | null }> } };

export type PublishDraftMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body?: InputMaybe<Scalars['JSONObject']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type PublishDraftMutation = { __typename?: 'Mutation', publishDraft: { __typename?: 'Post', id: number } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type UpdateDraftMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body?: InputMaybe<Scalars['JSONObject']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  subTopics?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdateDraftMutation = { __typename?: 'Mutation', updateDraft: { __typename?: 'Draft', id: number } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const PostsIdDocument = new TypedDocumentString(`
    query postsId($token: String!) {
  allPosts(findAllPostsInput: {token: $token}) {
    id
  }
}
    `) as unknown as TypedDocumentString<PostsIdQuery, PostsIdQueryVariables>;
export const ConfirmUserEmailDocument = new TypedDocumentString(`
    mutation confirmUserEmail($token: String!) {
  confirmUserEmail(confirmUserEmailInput: $token) {
    username
    email
    id
    createdAt
  }
}
    `) as unknown as TypedDocumentString<ConfirmUserEmailMutation, ConfirmUserEmailMutationVariables>;
export const CreateCommentDocument = new TypedDocumentString(`
    mutation createComment($message: String!, $postId: Int!) {
  createComment(createCommentInput: {message: $message, postId: $postId}) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateDraftDocument = new TypedDocumentString(`
    mutation createDraft($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!]) {
  createDraft(
    createDraftInput: {body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateDraftMutation, CreateDraftMutationVariables>;
export const CreatePostDocument = new TypedDocumentString(`
    mutation createPost($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!]) {
  createPost(
    createPostInput: {body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreatePostMutation, CreatePostMutationVariables>;
export const CreateReplyDocument = new TypedDocumentString(`
    mutation createReply($message: String!, $parentId: Int!, $postId: Int!, $respondedCommentId: Int!) {
  createReply(
    createReplyInput: {message: $message, postId: $postId, parentId: $parentId, respondedCommentId: $respondedCommentId}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateReplyMutation, CreateReplyMutationVariables>;
export const CreateVersionDraftDocument = new TypedDocumentString(`
    mutation createVersionDraft($body: JSONObject!, $title: String!, $postId: Int!, $topics: [String!], $subTopics: [String!]) {
  createDraft(
    createDraftInput: {body: $body, title: $title, postId: $postId, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateVersionDraftMutation, CreateVersionDraftMutationVariables>;
export const CreateVersionPostDocument = new TypedDocumentString(`
    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String, $subTopics: [String!], $topics: [String!]) {
  createVersion(
    createVersionInput: {postId: $postId, body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateVersionPostMutation, CreateVersionPostMutationVariables>;
export const GetCommentsByPostIdDocument = new TypedDocumentString(`
    query getCommentsByPostId($postId: Int!, $skipPages: Int) {
  comments(getCommentsByPostInput: {postId: $postId, skipPages: $skipPages}) {
    totalPages
    data {
      id
      message
      likes
      dislikes
      repliesQuantity
      user {
        username
        img
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>;
export const DraftDocument = new TypedDocumentString(`
    query draft($id: Int!, $version: Int) {
  draft(findDraftInput: {id: $id}) {
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
    `) as unknown as TypedDocumentString<DraftQuery, DraftQueryVariables>;
export const DraftsDocument = new TypedDocumentString(`
    query drafts {
  userDrafts {
    id
    createdAt
    img
    title
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<DraftsQuery, DraftsQueryVariables>;
export const PostDocument = new TypedDocumentString(`
    query post($id: Int!) {
  post(findPostInput: {id: $id}) {
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
    `) as unknown as TypedDocumentString<PostQuery, PostQueryVariables>;
export const GetRepliesDocument = new TypedDocumentString(`
    query getReplies($parentId: Int!, $skipPages: Int) {
  replies(getRepliesByCommentInput: {parentId: $parentId, skipPages: $skipPages}) {
    totalPages
    data {
      respondedCommentId
      id
      message
      likes
      dislikes
      repliesQuantity
      user {
        username
        img
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetRepliesQuery, GetRepliesQueryVariables>;
export const TopicsDocument = new TypedDocumentString(`
    query topics($title: String) {
  topics(title: $title) {
    title
  }
}
    `) as unknown as TypedDocumentString<TopicsQuery, TopicsQueryVariables>;
export const GetUserPostsDocument = new TypedDocumentString(`
    query getUserPosts($userId: Int!, $skipPages: Int) {
  userPosts(findUserPostsInput: {userId: $userId, skipPages: $skipPages}) {
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
    `) as unknown as TypedDocumentString<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const LoginDocument = new TypedDocumentString(`
    mutation login($password: String!, $email: String!) {
  login(loginInput: {email: $email, password: $password}) {
    username
    email
    id
    createdAt
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = new TypedDocumentString(`
    mutation logout {
  logout
}
    `) as unknown as TypedDocumentString<LogoutMutation, LogoutMutationVariables>;
export const PostRecommendationsDocument = new TypedDocumentString(`
    query postRecommendations($createdAt: SortOrder, $rating: SortOrder, $skipPages: Int, $topics: [String!], $search: String) {
  postsRecommendations(
    postRecommendationsInput: {createdAt: $createdAt, rating: $rating, skipPages: $skipPages, topics: $topics, searchValue: $search}
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
    `) as unknown as TypedDocumentString<PostRecommendationsQuery, PostRecommendationsQueryVariables>;
export const PublishDraftDocument = new TypedDocumentString(`
    mutation publishDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
  publishDraft(
    publishDraftInput: {id: $id, body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<PublishDraftMutation, PublishDraftMutationVariables>;
export const RegisterDocument = new TypedDocumentString(`
    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {
  register(
    registerInput: {username: $username, email: $email, password: $password, returnUrl: $returnUrl}
  )
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const UpdateDraftDocument = new TypedDocumentString(`
    mutation updateDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
  updateDraft(
    updateDraftInput: {id: $id, topics: $topics, subTopics: $subTopics, body: $body, title: $title}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateDraftMutation, UpdateDraftMutationVariables>;