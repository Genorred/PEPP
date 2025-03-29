import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from "@tanstack/react-query";
import { fetcher } from "@/shared/api/base";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
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

export type Comment = {
  __typename?: "Comment";
  createdAt: Scalars["DateTime"]["output"];
  dislikes: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  likes: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  post: Post;
  postId: Scalars["Int"]["output"];
  repliesQuantity: Scalars["Int"]["output"];
  respondedCommentId?: Maybe<Scalars["Int"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
};

export type CommentsByPost = {
  __typename?: "CommentsByPost";
  data: Array<Comment>;
  totalPages: Scalars["Int"]["output"];
};

export type CountUserFriendshipsInput = {
  isAccepted?: InputMaybe<Scalars["Boolean"]["input"]>;
  userId: Scalars["Int"]["input"];
};

export type CreateCommentInput = {
  message: Scalars["String"]["input"];
  postId: Scalars["Int"]["input"];
};

export type CreateDraftInput = {
  body: Scalars["JSONObject"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  postId?: InputMaybe<Scalars["Int"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CreateFriendshipInput = {
  receiverId: Scalars["Int"]["input"];
};

export type CreatePostInput = {
  body: Scalars["JSONObject"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  isHidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CreateReplyInput = {
  message: Scalars["String"]["input"];
  parentId: Scalars["Int"]["input"];
  postId: Scalars["Int"]["input"];
  respondedCommentId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateVersionInput = {
  body: Scalars["JSONObject"]["input"];
  postId: Scalars["Int"]["input"];
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type Draft = {
  __typename?: "Draft";
  body: Array<Scalars["JSON"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  minutes?: Maybe<Scalars["Int"]["output"]>;
  postId: Scalars["Int"]["output"];
  subTopics?: Maybe<Array<Topic>>;
  title: Scalars["String"]["output"];
  topics?: Maybe<Array<Topic>>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
  version: Scalars["Float"]["output"];
};

export type FindAlgorithmPostsInput = {
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  searchValue?: InputMaybe<Scalars["String"]["input"]>;
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type FindAllPostsInput = {
  token: Scalars["String"]["input"];
};

export type FindAllUsersInput = {
  token: Scalars["String"]["input"];
};

export type FindByPostInput = {
  postId: Scalars["Int"]["input"];
};

export type FindDraftInput = {
  id: Scalars["Int"]["input"];
};

export type FindOneUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type FindOneVersionInput = {
  id: Scalars["Int"]["input"];
};

export type FindPostInput = {
  id: Scalars["Int"]["input"];
  isHidden?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type FindUserFriendshipRequestsInput = {
  cursorId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type FindUserFriendshipsInput = {
  cursorId?: InputMaybe<Scalars["Int"]["input"]>;
  userId: Scalars["Int"]["input"];
};

export type FindUserPostsInput = {
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  topicsOrSubTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  userId: Scalars["Int"]["input"];
};

export type FindUsersFriendshipInput = {
  userId1: Scalars["Int"]["input"];
  userId2?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Friendship = {
  __typename?: "Friendship";
  anotherUser: User;
  createdAt: Scalars["DateTime"]["output"];
  currentUserId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  isAccepted: Scalars["Boolean"]["output"];
  receiver: User;
  receiverId: Scalars["Int"]["output"];
  sender: User;
  senderId: Scalars["Int"]["output"];
};

export type GetByParentCommentInput = {
  parentId: Scalars["Int"]["input"];
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetByPostInput = {
  postId: Scalars["Int"]["input"];
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GetByUserInput = {
  isNotReply?: InputMaybe<Scalars["Boolean"]["input"]>;
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  sortByDate?: InputMaybe<SortOrder>;
  sortByPopularity?: InputMaybe<SortOrder>;
  userId: Scalars["Int"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  acceptFriendshipRequest: Friendship;
  confirmUserEmail: UserResponse;
  createComment: Comment;
  createDraft: Draft;
  createPost: Post;
  createReply: Comment;
  createVersion: Post;
  expose: Post;
  hide: Post;
  login: UserResponse;
  logout: Scalars["String"]["output"];
  publishDraft: Post;
  register: Scalars["Boolean"]["output"];
  removeComment: Comment;
  removeDraft: Draft;
  removeFriendship: Friendship;
  removePost: Post;
  removeUser: User;
  sendFriendshipRequest: Friendship;
  updateComment: Comment;
  updateDraft: Draft;
  updateUser: User;
};


export type MutationAcceptFriendshipRequestArgs = {
  updateFriendshipInput: UpdateFriendshipInput;
};


export type MutationConfirmUserEmailArgs = {
  confirmUserEmailInput: Scalars["String"]["input"];
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateDraftArgs = {
  createDraftInput: CreateDraftInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateReplyArgs = {
  createReplyInput: CreateReplyInput;
};


export type MutationCreateVersionArgs = {
  createVersionInput: CreateVersionInput;
};


export type MutationExposeArgs = {
  exposePostInput: Scalars["Float"]["input"];
};


export type MutationHideArgs = {
  hidePostInput: Scalars["Float"]["input"];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationPublishDraftArgs = {
  publishDraftInput: UpdateDraftInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveCommentArgs = {
  id: Scalars["Int"]["input"];
};


export type MutationRemoveDraftArgs = {
  removeDraftInput: RemovePostInput;
};


export type MutationRemoveFriendshipArgs = {
  removeFriendshipInput: RemoveFriendshipInput;
};


export type MutationRemovePostArgs = {
  removePostInput: RemovePostInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars["Int"]["input"];
};


export type MutationSendFriendshipRequestArgs = {
  createFriendshipInput: CreateFriendshipInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateDraftArgs = {
  updateDraftInput: UpdateDraftInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserDto;
};

export type Post = {
  __typename?: "Post";
  body: Array<Scalars["JSON"]["output"]>;
  commentsQuantity?: Maybe<Scalars["Int"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  isHidden: Scalars["Boolean"]["output"];
  minutes?: Maybe<Scalars["Int"]["output"]>;
  rating?: Maybe<Scalars["Int"]["output"]>;
  reviewsQuantity?: Maybe<Scalars["Int"]["output"]>;
  subTopics?: Maybe<Array<Topic>>;
  title: Scalars["String"]["output"];
  topics?: Maybe<Array<Topic>>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
  version: Scalars["Float"]["output"];
};

export type Query = {
  __typename?: "Query";
  allPosts: Array<Post>;
  allUsers: Array<User>;
  comment: Comment;
  comments: CommentsByPost;
  draft: Draft;
  findByPost: Array<Version>;
  post: Post;
  postsRecommendations: Recommendations;
  replies: CommentsByPost;
  topics: Array<Topic>;
  user: User;
  userComments: CommentsByPost;
  userDrafts: Array<Draft>;
  userFriendRequests: Array<Friendship>;
  userFriendRequestsQuantity: Scalars["Int"]["output"];
  userFriends: Array<Friendship>;
  userFriendsQuantity: Scalars["Int"]["output"];
  userPosts: Recommendations;
  usersFriendship: Friendship;
  version: Array<Version>;
};


export type QueryAllPostsArgs = {
  findAllPostsInput: FindAllPostsInput;
};


export type QueryAllUsersArgs = {
  findManyInput: FindAllUsersInput;
};


export type QueryCommentArgs = {
  id: Scalars["Int"]["input"];
};


export type QueryCommentsArgs = {
  getCommentsByPostInput: GetByPostInput;
};


export type QueryDraftArgs = {
  findDraftInput: FindDraftInput;
};


export type QueryFindByPostArgs = {
  findVersionByPostInput: FindByPostInput;
};


export type QueryPostArgs = {
  findPostInput: FindPostInput;
};


export type QueryPostsRecommendationsArgs = {
  postRecommendationsInput: FindAlgorithmPostsInput;
};


export type QueryRepliesArgs = {
  getRepliesByCommentInput: GetByParentCommentInput;
};


export type QueryTopicsArgs = {
  title?: InputMaybe<Scalars["String"]["input"]>;
};


export type QueryUserArgs = {
  findOneUserInput: FindOneUserInput;
};


export type QueryUserCommentsArgs = {
  getCommentsByUserInput: GetByUserInput;
};


export type QueryUserFriendRequestsArgs = {
  findFriendsByUserInput: FindUserFriendshipRequestsInput;
};


export type QueryUserFriendRequestsQuantityArgs = {
  countFriendshipInput: CountUserFriendshipsInput;
};


export type QueryUserFriendsArgs = {
  findFriendsByUserInput: FindUserFriendshipsInput;
};


export type QueryUserFriendsQuantityArgs = {
  countFriendshipInput: CountUserFriendshipsInput;
};


export type QueryUserPostsArgs = {
  findUserPostsInput: FindUserPostsInput;
};


export type QueryUsersFriendshipArgs = {
  findUsersFriendship: FindUsersFriendshipInput;
};


export type QueryVersionArgs = {
  findVersionInput: FindOneVersionInput;
};

export type Recommendations = {
  __typename?: "Recommendations";
  data: Array<Post>;
  totalPages: Scalars["Int"]["output"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  returnUrl?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type RemoveFriendshipInput = {
  anotherUserId: Scalars["Int"]["input"];
};

export type RemovePostInput = {
  id: Scalars["Int"]["input"];
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC"
}

export type Topic = {
  __typename?: "Topic";
  createdAt: Scalars["DateTime"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type UpdateCommentInput = {
  id: Scalars["Int"]["input"];
  message?: InputMaybe<Scalars["String"]["input"]>;
  postId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateDraftInput = {
  body?: InputMaybe<Scalars["JSONObject"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type UpdateFriendshipInput = {
  requestId: Scalars["Int"]["input"];
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  google_id?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  img?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  google_id: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  occupation?: Maybe<Scalars["String"]["output"]>;
  password: Scalars["String"]["output"];
  posts: Array<Post>;
  role: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  google_id: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  occupation?: Maybe<Scalars["String"]["output"]>;
  role: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type Version = {
  __typename?: "Version";
  body: Array<Scalars["JSON"]["output"]>;
  commentsQuantity?: Maybe<Scalars["Int"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  img?: Maybe<Scalars["String"]["output"]>;
  minutes?: Maybe<Scalars["Int"]["output"]>;
  postId: Scalars["Int"]["output"];
  rating?: Maybe<Scalars["Int"]["output"]>;
  reviewsQuantity?: Maybe<Scalars["Int"]["output"]>;
  subTopics?: Maybe<Array<Topic>>;
  title: Scalars["String"]["output"];
  topics?: Maybe<Array<Topic>>;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
  version: Scalars["Float"]["output"];
};

export type PostsIdQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;


export type PostsIdQuery = { __typename?: "Query", allPosts: Array<{ __typename?: "Post", id: number }> };

export type UsersIdsQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;


export type UsersIdsQuery = { __typename?: "Query", allUsers: Array<{ __typename?: "User", id: number }> };

export type AcceptUserFriendRequestsMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;


export type AcceptUserFriendRequestsMutation = {
  __typename?: "Mutation",
  acceptFriendshipRequest: {
    __typename?: "Friendship",
    anotherUser: { __typename?: "User", id: number, username: string, img?: string | null }
  }
};

export type ConfirmUserEmailMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;


export type ConfirmUserEmailMutation = {
  __typename?: "Mutation",
  confirmUserEmail: {
    __typename?: "UserResponse",
    username: string,
    email: string,
    id: number,
    createdAt: any,
    occupation?: string | null,
    img?: string | null
  }
};

export type CreateCommentMutationVariables = Exact<{
  message: Scalars["String"]["input"];
  postId: Scalars["Int"]["input"];
}>;


export type CreateCommentMutation = { __typename?: "Mutation", createComment: { __typename?: "Comment", id: number } };

export type CreateDraftMutationVariables = Exact<{
  body: Scalars["JSONObject"]["input"];
  title: Scalars["String"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type CreateDraftMutation = { __typename?: "Mutation", createDraft: { __typename?: "Draft", id: number } };

export type CreatePostMutationVariables = Exact<{
  body: Scalars["JSONObject"]["input"];
  title: Scalars["String"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type CreatePostMutation = { __typename?: "Mutation", createPost: { __typename?: "Post", id: number } };

export type CreateReplyMutationVariables = Exact<{
  message: Scalars["String"]["input"];
  parentId: Scalars["Int"]["input"];
  postId: Scalars["Int"]["input"];
  respondedCommentId?: InputMaybe<Scalars["Int"]["input"]>;
}>;


export type CreateReplyMutation = { __typename?: "Mutation", createReply: { __typename?: "Comment", id: number } };

export type CreateVersionDraftMutationVariables = Exact<{
  body: Scalars["JSONObject"]["input"];
  title: Scalars["String"]["input"];
  postId: Scalars["Int"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type CreateVersionDraftMutation = { __typename?: "Mutation", createDraft: { __typename?: "Draft", id: number } };

export type CreateVersionPostMutationVariables = Exact<{
  postId: Scalars["Int"]["input"];
  body: Scalars["JSONObject"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type CreateVersionPostMutation = { __typename?: "Mutation", createVersion: { __typename?: "Post", id: number } };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars["Int"]["input"];
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
}>;


export type GetCommentsByPostIdQuery = {
  __typename?: "Query",
  comments: {
    __typename?: "CommentsByPost",
    totalPages: number,
    data: Array<{
      __typename?: "Comment",
      id: number,
      message: string,
      likes: number,
      dislikes: number,
      repliesQuantity: number,
      createdAt: any,
      updatedAt: any,
      user: { __typename?: "User", username: string, img?: string | null, id: number }
    }>
  }
};

export type GetCommentsByUserIdQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  isNotReply?: InputMaybe<Scalars["Boolean"]["input"]>;
  sortByDate?: InputMaybe<SortOrder>;
  sortByPopularity?: InputMaybe<SortOrder>;
}>;


export type GetCommentsByUserIdQuery = {
  __typename?: "Query",
  userComments: {
    __typename?: "CommentsByPost",
    totalPages: number,
    data: Array<{
      __typename?: "Comment",
      id: number,
      message: string,
      likes: number,
      dislikes: number,
      repliesQuantity: number,
      createdAt: any,
      updatedAt: any,
      postId: number,
      parentId?: number | null,
      user: { __typename?: "User", username: string, img?: string | null, id: number },
      post: { __typename?: "Post", title: string, user: { __typename?: "User", username: string } }
    }>
  }
};

export type DraftQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;


export type DraftQuery = {
  __typename?: "Query",
  draft: {
    __typename?: "Draft",
    id: number,
    body: Array<any>,
    createdAt: any,
    img?: string | null,
    title: string,
    updatedAt: any,
    topics?: Array<{ __typename?: "Topic", title: string }> | null,
    subTopics?: Array<{ __typename?: "Topic", title: string }> | null
  }
};

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = {
  __typename?: "Query",
  userDrafts: Array<{
    __typename?: "Draft",
    id: number,
    createdAt: any,
    img?: string | null,
    title: string,
    updatedAt: any
  }>
};

export type PostQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;


export type PostQuery = {
  __typename?: "Query",
  post: {
    __typename?: "Post",
    body: Array<any>,
    createdAt: any,
    title: string,
    rating?: number | null,
    minutes?: number | null,
    version: number,
    commentsQuantity?: number | null,
    reviewsQuantity?: number | null,
    description?: string | null,
    user: { __typename?: "User", username: string, img?: string | null, id: number },
    topics?: Array<{ __typename?: "Topic", title: string }> | null,
    subTopics?: Array<{ __typename?: "Topic", title: string }> | null
  }
};

export type GetRepliesQueryVariables = Exact<{
  parentId: Scalars["Int"]["input"];
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
}>;


export type GetRepliesQuery = {
  __typename?: "Query",
  replies: {
    __typename?: "CommentsByPost",
    totalPages: number,
    data: Array<{
      __typename?: "Comment",
      respondedCommentId?: number | null,
      id: number,
      message: string,
      likes: number,
      dislikes: number,
      repliesQuantity: number,
      createdAt: any,
      updatedAt: any,
      user: { __typename?: "User", id: number, username: string, img?: string | null }
    }>
  }
};

export type TopicsQueryVariables = Exact<{
  title?: InputMaybe<Scalars["String"]["input"]>;
}>;


export type TopicsQuery = { __typename?: "Query", topics: Array<{ __typename?: "Topic", title: string }> };

export type GetUserFriendRequestsQueryVariables = Exact<{
  cursorId?: InputMaybe<Scalars["Int"]["input"]>;
}>;


export type GetUserFriendRequestsQuery = {
  __typename?: "Query",
  userFriendRequests: Array<{
    __typename?: "Friendship",
    id: number,
    anotherUser: { __typename?: "User", id: number, username: string, img?: string | null }
  }>
};

export type GetUserFriendRequestsCountQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
}>;


export type GetUserFriendRequestsCountQuery = { __typename?: "Query", userFriendRequestsQuantity: number };

export type GetUserFriendsQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
  cursorid?: InputMaybe<Scalars["Int"]["input"]>;
}>;


export type GetUserFriendsQuery = {
  __typename?: "Query",
  userFriends: Array<{
    __typename?: "Friendship",
    anotherUser: { __typename?: "User", id: number, username: string, img?: string | null }
  }>
};

export type GetUserFriendsCountQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
}>;


export type GetUserFriendsCountQuery = { __typename?: "Query", userFriendsQuantity: number };

export type GetUserPostsQueryVariables = Exact<{
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  userId: Scalars["Int"]["input"];
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  topicsOrSubTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type GetUserPostsQuery = {
  __typename?: "Query",
  userPosts: {
    __typename?: "Recommendations",
    totalPages: number,
    data: Array<{
      __typename?: "Post",
      id: number,
      rating?: number | null,
      commentsQuantity?: number | null,
      reviewsQuantity?: number | null,
      img?: string | null,
      minutes?: number | null,
      title: string,
      createdAt: any,
      userId: number,
      description?: string | null,
      version: number,
      updatedAt: any,
      user: { __typename?: "User", username: string, occupation?: string | null, img?: string | null },
      topics?: Array<{ __typename?: "Topic", title: string }> | null,
      subTopics?: Array<{ __typename?: "Topic", title: string }> | null
    }>
  }
};

export type GetUserProfileInfoQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;


export type GetUserProfileInfoQuery = {
  __typename?: "Query",
  user: {
    __typename?: "User",
    id: number,
    createdAt: any,
    img?: string | null,
    updatedAt: any,
    occupation?: string | null,
    username: string,
    posts: Array<{
      __typename?: "Post",
      topics?: Array<{ __typename?: "Topic", title: string }> | null,
      subTopics?: Array<{ __typename?: "Topic", title: string }> | null
    }>
  }
};

export type GetUsersFriendshipQueryVariables = Exact<{
  userId1: Scalars["Int"]["input"];
  userId2: Scalars["Int"]["input"];
}>;


export type GetUsersFriendshipQuery = {
  __typename?: "Query",
  usersFriendship: { __typename?: "Friendship", isAccepted: boolean }
};

export type LoginMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
}>;


export type LoginMutation = {
  __typename?: "Mutation",
  login: { __typename?: "UserResponse", username: string, email: string, id: number, createdAt: any }
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: "Mutation", logout: string };

export type PostRecommendationsQueryVariables = Exact<{
  createdAt?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  skipPages?: InputMaybe<Scalars["Int"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;


export type PostRecommendationsQuery = {
  __typename?: "Query",
  postsRecommendations: {
    __typename?: "Recommendations",
    totalPages: number,
    data: Array<{
      __typename?: "Post",
      id: number,
      rating?: number | null,
      commentsQuantity?: number | null,
      reviewsQuantity?: number | null,
      img?: string | null,
      minutes?: number | null,
      title: string,
      createdAt: any,
      userId: number,
      description?: string | null,
      version: number,
      updatedAt: any,
      user: { __typename?: "User", username: string, occupation?: string | null, img?: string | null },
      topics?: Array<{ __typename?: "Topic", title: string }> | null,
      subTopics?: Array<{ __typename?: "Topic", title: string }> | null
    }>
  }
};

export type PublishDraftMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  body?: InputMaybe<Scalars["JSONObject"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type PublishDraftMutation = { __typename?: "Mutation", publishDraft: { __typename?: "Post", id: number } };

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  returnUrl?: InputMaybe<Scalars["String"]["input"]>;
}>;


export type RegisterMutation = { __typename?: "Mutation", register: boolean };

export type RemoveFriendshipMutationVariables = Exact<{
  anotherUserId: Scalars["Int"]["input"];
}>;


export type RemoveFriendshipMutation = {
  __typename?: "Mutation",
  removeFriendship: { __typename?: "Friendship", receiverId: number, id: number }
};

export type SendFriendshipRequestMutationVariables = Exact<{
  receiverId: Scalars["Int"]["input"];
}>;


export type SendFriendshipRequestMutation = {
  __typename?: "Mutation",
  sendFriendshipRequest: { __typename?: "Friendship", receiverId: number }
};

export type UpdateDraftMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  body?: InputMaybe<Scalars["JSONObject"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  topics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
  subTopics?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>;
}>;


export type UpdateDraftMutation = { __typename?: "Mutation", updateDraft: { __typename?: "Draft", id: number } };


export const PostsIdDocument = `
    query postsId($token: String!) {
  allPosts(findAllPostsInput: {token: $token}) {
    id
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
    ["postsId", variables],
    fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, variables),
    options
  );
};

usePostsIdQuery.document = PostsIdDocument;

usePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ["postsId", variables];

export const useInfinitePostsIdQuery = <
  TData = PostsIdQuery,
  TError = unknown
>(
  variables: PostsIdQueryVariables,
  options?: UseInfiniteQueryOptions<PostsIdQuery, TError, TData>
) => {

  return useInfiniteQuery<PostsIdQuery, TError, TData>(
    ["postsId.infinite", variables],
    (metaData) => fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfinitePostsIdQuery.getKey = (variables: PostsIdQueryVariables) => ["postsId.infinite", variables];


usePostsIdQuery.fetcher = (variables: PostsIdQueryVariables, options?: RequestInit["headers"]) => fetcher<PostsIdQuery, PostsIdQueryVariables>(PostsIdDocument, variables, options);

export const UsersIdsDocument = `
    query usersIds($token: String!) {
  allUsers(findManyInput: {token: $token}) {
    id
  }
}
    `;

export const useUsersIdsQuery = <
  TData = UsersIdsQuery,
  TError = unknown
>(
  variables: UsersIdsQueryVariables,
  options?: UseQueryOptions<UsersIdsQuery, TError, TData>
) => {

  return useQuery<UsersIdsQuery, TError, TData>(
    ["usersIds", variables],
    fetcher<UsersIdsQuery, UsersIdsQueryVariables>(UsersIdsDocument, variables),
    options
  );
};

useUsersIdsQuery.document = UsersIdsDocument;

useUsersIdsQuery.getKey = (variables: UsersIdsQueryVariables) => ["usersIds", variables];

export const useInfiniteUsersIdsQuery = <
  TData = UsersIdsQuery,
  TError = unknown
>(
  variables: UsersIdsQueryVariables,
  options?: UseInfiniteQueryOptions<UsersIdsQuery, TError, TData>
) => {

  return useInfiniteQuery<UsersIdsQuery, TError, TData>(
    ["usersIds.infinite", variables],
    (metaData) => fetcher<UsersIdsQuery, UsersIdsQueryVariables>(UsersIdsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteUsersIdsQuery.getKey = (variables: UsersIdsQueryVariables) => ["usersIds.infinite", variables];


useUsersIdsQuery.fetcher = (variables: UsersIdsQueryVariables, options?: RequestInit["headers"]) => fetcher<UsersIdsQuery, UsersIdsQueryVariables>(UsersIdsDocument, variables, options);

export const AcceptUserFriendRequestsDocument = `
    mutation acceptUserFriendRequests($id: Int!) {
  acceptFriendshipRequest(updateFriendshipInput: {requestId: $id}) {
    anotherUser {
      id
      username
      img
    }
  }
}
    `;

export const useAcceptUserFriendRequestsMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<AcceptUserFriendRequestsMutation, TError, AcceptUserFriendRequestsMutationVariables, TContext>) => {

  return useMutation<AcceptUserFriendRequestsMutation, TError, AcceptUserFriendRequestsMutationVariables, TContext>(
    ["acceptUserFriendRequests"],
    (variables?: AcceptUserFriendRequestsMutationVariables) => fetcher<AcceptUserFriendRequestsMutation, AcceptUserFriendRequestsMutationVariables>(AcceptUserFriendRequestsDocument, variables)(),
    options
  );
};

useAcceptUserFriendRequestsMutation.getKey = () => ["acceptUserFriendRequests"];


useAcceptUserFriendRequestsMutation.fetcher = (variables: AcceptUserFriendRequestsMutationVariables, options?: RequestInit["headers"]) => fetcher<AcceptUserFriendRequestsMutation, AcceptUserFriendRequestsMutationVariables>(AcceptUserFriendRequestsDocument, variables, options);

export const ConfirmUserEmailDocument = `
    mutation confirmUserEmail($token: String!) {
  confirmUserEmail(confirmUserEmailInput: $token) {
    username
    email
    id
    createdAt
    occupation
    img
  }
}
    `;

export const useConfirmUserEmailMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<ConfirmUserEmailMutation, TError, ConfirmUserEmailMutationVariables, TContext>) => {

  return useMutation<ConfirmUserEmailMutation, TError, ConfirmUserEmailMutationVariables, TContext>(
    ["confirmUserEmail"],
    (variables?: ConfirmUserEmailMutationVariables) => fetcher<ConfirmUserEmailMutation, ConfirmUserEmailMutationVariables>(ConfirmUserEmailDocument, variables)(),
    options
  );
};

useConfirmUserEmailMutation.getKey = () => ["confirmUserEmail"];


useConfirmUserEmailMutation.fetcher = (variables: ConfirmUserEmailMutationVariables, options?: RequestInit["headers"]) => fetcher<ConfirmUserEmailMutation, ConfirmUserEmailMutationVariables>(ConfirmUserEmailDocument, variables, options);

export const CreateCommentDocument = `
    mutation createComment($message: String!, $postId: Int!) {
  createComment(createCommentInput: {message: $message, postId: $postId}) {
    id
  }
}
    `;

export const useCreateCommentMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) => {

  return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
    ["createComment"],
    (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
    options
  );
};

useCreateCommentMutation.getKey = () => ["createComment"];


useCreateCommentMutation.fetcher = (variables: CreateCommentMutationVariables, options?: RequestInit["headers"]) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options);

export const CreateDraftDocument = `
    mutation createDraft($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!]) {
  createDraft(
    createDraftInput: {body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `;

export const useCreateDraftMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<CreateDraftMutation, TError, CreateDraftMutationVariables, TContext>) => {

  return useMutation<CreateDraftMutation, TError, CreateDraftMutationVariables, TContext>(
    ["createDraft"],
    (variables?: CreateDraftMutationVariables) => fetcher<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, variables)(),
    options
  );
};

useCreateDraftMutation.getKey = () => ["createDraft"];


useCreateDraftMutation.fetcher = (variables: CreateDraftMutationVariables, options?: RequestInit["headers"]) => fetcher<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, variables, options);

export const CreatePostDocument = `
    mutation createPost($body: JSONObject!, $title: String!, $topics: [String!], $subTopics: [String!]) {
  createPost(
    createPostInput: {body: $body, title: $title, topics: $topics, subTopics: $subTopics}
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
    ["createPost"],
    (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
    options
  );
};

useCreatePostMutation.getKey = () => ["createPost"];


useCreatePostMutation.fetcher = (variables: CreatePostMutationVariables, options?: RequestInit["headers"]) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables, options);

export const CreateReplyDocument = `
    mutation createReply($message: String!, $parentId: Int!, $postId: Int!, $respondedCommentId: Int) {
  createReply(
    createReplyInput: {message: $message, postId: $postId, parentId: $parentId, respondedCommentId: $respondedCommentId}
  ) {
    id
  }
}
    `;

export const useCreateReplyMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<CreateReplyMutation, TError, CreateReplyMutationVariables, TContext>) => {

  return useMutation<CreateReplyMutation, TError, CreateReplyMutationVariables, TContext>(
    ["createReply"],
    (variables?: CreateReplyMutationVariables) => fetcher<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, variables)(),
    options
  );
};

useCreateReplyMutation.getKey = () => ["createReply"];


useCreateReplyMutation.fetcher = (variables: CreateReplyMutationVariables, options?: RequestInit["headers"]) => fetcher<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, variables, options);

export const CreateVersionDraftDocument = `
    mutation createVersionDraft($body: JSONObject!, $title: String!, $postId: Int!, $topics: [String!], $subTopics: [String!]) {
  createDraft(
    createDraftInput: {body: $body, title: $title, postId: $postId, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `;

export const useCreateVersionDraftMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<CreateVersionDraftMutation, TError, CreateVersionDraftMutationVariables, TContext>) => {

  return useMutation<CreateVersionDraftMutation, TError, CreateVersionDraftMutationVariables, TContext>(
    ["createVersionDraft"],
    (variables?: CreateVersionDraftMutationVariables) => fetcher<CreateVersionDraftMutation, CreateVersionDraftMutationVariables>(CreateVersionDraftDocument, variables)(),
    options
  );
};

useCreateVersionDraftMutation.getKey = () => ["createVersionDraft"];


useCreateVersionDraftMutation.fetcher = (variables: CreateVersionDraftMutationVariables, options?: RequestInit["headers"]) => fetcher<CreateVersionDraftMutation, CreateVersionDraftMutationVariables>(CreateVersionDraftDocument, variables, options);

export const CreateVersionPostDocument = `
    mutation createVersionPost($postId: Int!, $body: JSONObject!, $title: String, $subTopics: [String!], $topics: [String!]) {
  createVersion(
    createVersionInput: {postId: $postId, body: $body, title: $title, topics: $topics, subTopics: $subTopics}
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
    ["createVersionPost"],
    (variables?: CreateVersionPostMutationVariables) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(CreateVersionPostDocument, variables)(),
    options
  );
};

useCreateVersionPostMutation.getKey = () => ["createVersionPost"];


useCreateVersionPostMutation.fetcher = (variables: CreateVersionPostMutationVariables, options?: RequestInit["headers"]) => fetcher<CreateVersionPostMutation, CreateVersionPostMutationVariables>(CreateVersionPostDocument, variables, options);

export const GetCommentsByPostIdDocument = `
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
        id
      }
      createdAt
      updatedAt
    }
  }
}
    `;

export const useGetCommentsByPostIdQuery = <
  TData = GetCommentsByPostIdQuery,
  TError = unknown
>(
  variables: GetCommentsByPostIdQueryVariables,
  options?: UseQueryOptions<GetCommentsByPostIdQuery, TError, TData>
) => {

  return useQuery<GetCommentsByPostIdQuery, TError, TData>(
    ["getCommentsByPostId", variables],
    fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, variables),
    options
  );
};

useGetCommentsByPostIdQuery.document = GetCommentsByPostIdDocument;

useGetCommentsByPostIdQuery.getKey = (variables: GetCommentsByPostIdQueryVariables) => ["getCommentsByPostId", variables];

export const useInfiniteGetCommentsByPostIdQuery = <
  TData = GetCommentsByPostIdQuery,
  TError = unknown
>(
  variables: GetCommentsByPostIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetCommentsByPostIdQuery, TError, TData>
) => {

  return useInfiniteQuery<GetCommentsByPostIdQuery, TError, TData>(
    ["getCommentsByPostId.infinite", variables],
    (metaData) => fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetCommentsByPostIdQuery.getKey = (variables: GetCommentsByPostIdQueryVariables) => ["getCommentsByPostId.infinite", variables];


useGetCommentsByPostIdQuery.fetcher = (variables: GetCommentsByPostIdQueryVariables, options?: RequestInit["headers"]) => fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, variables, options);

export const GetCommentsByUserIdDocument = `
    query getCommentsByUserId($userId: Int!, $skipPages: Int, $isNotReply: Boolean, $sortByDate: SortOrder, $sortByPopularity: SortOrder) {
  userComments(
    getCommentsByUserInput: {userId: $userId, skipPages: $skipPages, isNotReply: $isNotReply, sortByDate: $sortByDate, sortByPopularity: $sortByPopularity}
  ) {
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
        id
      }
      createdAt
      updatedAt
      postId
      parentId
      post {
        title
        user {
          username
        }
      }
    }
  }
}
    `;

export const useGetCommentsByUserIdQuery = <
  TData = GetCommentsByUserIdQuery,
  TError = unknown
>(
  variables: GetCommentsByUserIdQueryVariables,
  options?: UseQueryOptions<GetCommentsByUserIdQuery, TError, TData>
) => {

  return useQuery<GetCommentsByUserIdQuery, TError, TData>(
    ["getCommentsByUserId", variables],
    fetcher<GetCommentsByUserIdQuery, GetCommentsByUserIdQueryVariables>(GetCommentsByUserIdDocument, variables),
    options
  );
};

useGetCommentsByUserIdQuery.document = GetCommentsByUserIdDocument;

useGetCommentsByUserIdQuery.getKey = (variables: GetCommentsByUserIdQueryVariables) => ["getCommentsByUserId", variables];

export const useInfiniteGetCommentsByUserIdQuery = <
  TData = GetCommentsByUserIdQuery,
  TError = unknown
>(
  variables: GetCommentsByUserIdQueryVariables,
  options?: UseInfiniteQueryOptions<GetCommentsByUserIdQuery, TError, TData>
) => {

  return useInfiniteQuery<GetCommentsByUserIdQuery, TError, TData>(
    ["getCommentsByUserId.infinite", variables],
    (metaData) => fetcher<GetCommentsByUserIdQuery, GetCommentsByUserIdQueryVariables>(GetCommentsByUserIdDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetCommentsByUserIdQuery.getKey = (variables: GetCommentsByUserIdQueryVariables) => ["getCommentsByUserId.infinite", variables];


useGetCommentsByUserIdQuery.fetcher = (variables: GetCommentsByUserIdQueryVariables, options?: RequestInit["headers"]) => fetcher<GetCommentsByUserIdQuery, GetCommentsByUserIdQueryVariables>(GetCommentsByUserIdDocument, variables, options);

export const DraftDocument = `
    query draft($id: Int!) {
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
    `;

export const useDraftQuery = <
  TData = DraftQuery,
  TError = unknown
>(
  variables: DraftQueryVariables,
  options?: UseQueryOptions<DraftQuery, TError, TData>
) => {

  return useQuery<DraftQuery, TError, TData>(
    ["draft", variables],
    fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, variables),
    options
  );
};

useDraftQuery.document = DraftDocument;

useDraftQuery.getKey = (variables: DraftQueryVariables) => ["draft", variables];

export const useInfiniteDraftQuery = <
  TData = DraftQuery,
  TError = unknown
>(
  variables: DraftQueryVariables,
  options?: UseInfiniteQueryOptions<DraftQuery, TError, TData>
) => {

  return useInfiniteQuery<DraftQuery, TError, TData>(
    ["draft.infinite", variables],
    (metaData) => fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteDraftQuery.getKey = (variables: DraftQueryVariables) => ["draft.infinite", variables];


useDraftQuery.fetcher = (variables: DraftQueryVariables, options?: RequestInit["headers"]) => fetcher<DraftQuery, DraftQueryVariables>(DraftDocument, variables, options);

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
    variables === undefined ? ["drafts"] : ["drafts", variables],
    fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, variables),
    options
  );
};

useDraftsQuery.document = DraftsDocument;

useDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ["drafts"] : ["drafts", variables];

export const useInfiniteDraftsQuery = <
  TData = DraftsQuery,
  TError = unknown
>(
  variables?: DraftsQueryVariables,
  options?: UseInfiniteQueryOptions<DraftsQuery, TError, TData>
) => {

  return useInfiniteQuery<DraftsQuery, TError, TData>(
    variables === undefined ? ["drafts.infinite"] : ["drafts.infinite", variables],
    (metaData) => fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteDraftsQuery.getKey = (variables?: DraftsQueryVariables) => variables === undefined ? ["drafts.infinite"] : ["drafts.infinite", variables];


useDraftsQuery.fetcher = (variables?: DraftsQueryVariables, options?: RequestInit["headers"]) => fetcher<DraftsQuery, DraftsQueryVariables>(DraftsDocument, variables, options);

export const PostDocument = `
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
    `;

export const usePostQuery = <
  TData = PostQuery,
  TError = unknown
>(
  variables: PostQueryVariables,
  options?: UseQueryOptions<PostQuery, TError, TData>
) => {

  return useQuery<PostQuery, TError, TData>(
    ["post", variables],
    fetcher<PostQuery, PostQueryVariables>(PostDocument, variables),
    options
  );
};

usePostQuery.document = PostDocument;

usePostQuery.getKey = (variables: PostQueryVariables) => ["post", variables];

export const useInfinitePostQuery = <
  TData = PostQuery,
  TError = unknown
>(
  variables: PostQueryVariables,
  options?: UseInfiniteQueryOptions<PostQuery, TError, TData>
) => {

  return useInfiniteQuery<PostQuery, TError, TData>(
    ["post.infinite", variables],
    (metaData) => fetcher<PostQuery, PostQueryVariables>(PostDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfinitePostQuery.getKey = (variables: PostQueryVariables) => ["post.infinite", variables];


usePostQuery.fetcher = (variables: PostQueryVariables, options?: RequestInit["headers"]) => fetcher<PostQuery, PostQueryVariables>(PostDocument, variables, options);

export const GetRepliesDocument = `
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
        id
        username
        img
      }
      createdAt
      updatedAt
    }
  }
}
    `;

export const useGetRepliesQuery = <
  TData = GetRepliesQuery,
  TError = unknown
>(
  variables: GetRepliesQueryVariables,
  options?: UseQueryOptions<GetRepliesQuery, TError, TData>
) => {

  return useQuery<GetRepliesQuery, TError, TData>(
    ["getReplies", variables],
    fetcher<GetRepliesQuery, GetRepliesQueryVariables>(GetRepliesDocument, variables),
    options
  );
};

useGetRepliesQuery.document = GetRepliesDocument;

useGetRepliesQuery.getKey = (variables: GetRepliesQueryVariables) => ["getReplies", variables];

export const useInfiniteGetRepliesQuery = <
  TData = GetRepliesQuery,
  TError = unknown
>(
  variables: GetRepliesQueryVariables,
  options?: UseInfiniteQueryOptions<GetRepliesQuery, TError, TData>
) => {

  return useInfiniteQuery<GetRepliesQuery, TError, TData>(
    ["getReplies.infinite", variables],
    (metaData) => fetcher<GetRepliesQuery, GetRepliesQueryVariables>(GetRepliesDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetRepliesQuery.getKey = (variables: GetRepliesQueryVariables) => ["getReplies.infinite", variables];


useGetRepliesQuery.fetcher = (variables: GetRepliesQueryVariables, options?: RequestInit["headers"]) => fetcher<GetRepliesQuery, GetRepliesQueryVariables>(GetRepliesDocument, variables, options);

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
    variables === undefined ? ["topics"] : ["topics", variables],
    fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables),
    options
  );
};

useTopicsQuery.document = TopicsDocument;

useTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ["topics"] : ["topics", variables];

export const useInfiniteTopicsQuery = <
  TData = TopicsQuery,
  TError = unknown
>(
  variables?: TopicsQueryVariables,
  options?: UseInfiniteQueryOptions<TopicsQuery, TError, TData>
) => {

  return useInfiniteQuery<TopicsQuery, TError, TData>(
    variables === undefined ? ["topics.infinite"] : ["topics.infinite", variables],
    (metaData) => fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteTopicsQuery.getKey = (variables?: TopicsQueryVariables) => variables === undefined ? ["topics.infinite"] : ["topics.infinite", variables];


useTopicsQuery.fetcher = (variables?: TopicsQueryVariables, options?: RequestInit["headers"]) => fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables, options);

export const GetUserFriendRequestsDocument = `
    query getUserFriendRequests($cursorId: Int) {
  userFriendRequests(findFriendsByUserInput: {cursorId: $cursorId}) {
    anotherUser {
      id
      username
      img
    }
    id
  }
}
    `;

export const useGetUserFriendRequestsQuery = <
  TData = GetUserFriendRequestsQuery,
  TError = unknown
>(
  variables?: GetUserFriendRequestsQueryVariables,
  options?: UseQueryOptions<GetUserFriendRequestsQuery, TError, TData>
) => {

  return useQuery<GetUserFriendRequestsQuery, TError, TData>(
    variables === undefined ? ["getUserFriendRequests"] : ["getUserFriendRequests", variables],
    fetcher<GetUserFriendRequestsQuery, GetUserFriendRequestsQueryVariables>(GetUserFriendRequestsDocument, variables),
    options
  );
};

useGetUserFriendRequestsQuery.document = GetUserFriendRequestsDocument;

useGetUserFriendRequestsQuery.getKey = (variables?: GetUserFriendRequestsQueryVariables) => variables === undefined ? ["getUserFriendRequests"] : ["getUserFriendRequests", variables];

export const useInfiniteGetUserFriendRequestsQuery = <
  TData = GetUserFriendRequestsQuery,
  TError = unknown
>(
  variables?: GetUserFriendRequestsQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFriendRequestsQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserFriendRequestsQuery, TError, TData>(
    variables === undefined ? ["getUserFriendRequests.infinite"] : ["getUserFriendRequests.infinite", variables],
    (metaData) => fetcher<GetUserFriendRequestsQuery, GetUserFriendRequestsQueryVariables>(GetUserFriendRequestsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserFriendRequestsQuery.getKey = (variables?: GetUserFriendRequestsQueryVariables) => variables === undefined ? ["getUserFriendRequests.infinite"] : ["getUserFriendRequests.infinite", variables];


useGetUserFriendRequestsQuery.fetcher = (variables?: GetUserFriendRequestsQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserFriendRequestsQuery, GetUserFriendRequestsQueryVariables>(GetUserFriendRequestsDocument, variables, options);

export const GetUserFriendRequestsCountDocument = `
    query getUserFriendRequestsCount($userId: Int!) {
  userFriendRequestsQuantity(
    countFriendshipInput: {userId: $userId, isAccepted: false}
  )
}
    `;

export const useGetUserFriendRequestsCountQuery = <
  TData = GetUserFriendRequestsCountQuery,
  TError = unknown
>(
  variables: GetUserFriendRequestsCountQueryVariables,
  options?: UseQueryOptions<GetUserFriendRequestsCountQuery, TError, TData>
) => {

  return useQuery<GetUserFriendRequestsCountQuery, TError, TData>(
    ["getUserFriendRequestsCount", variables],
    fetcher<GetUserFriendRequestsCountQuery, GetUserFriendRequestsCountQueryVariables>(GetUserFriendRequestsCountDocument, variables),
    options
  );
};

useGetUserFriendRequestsCountQuery.document = GetUserFriendRequestsCountDocument;

useGetUserFriendRequestsCountQuery.getKey = (variables: GetUserFriendRequestsCountQueryVariables) => ["getUserFriendRequestsCount", variables];

export const useInfiniteGetUserFriendRequestsCountQuery = <
  TData = GetUserFriendRequestsCountQuery,
  TError = unknown
>(
  variables: GetUserFriendRequestsCountQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFriendRequestsCountQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserFriendRequestsCountQuery, TError, TData>(
    ["getUserFriendRequestsCount.infinite", variables],
    (metaData) => fetcher<GetUserFriendRequestsCountQuery, GetUserFriendRequestsCountQueryVariables>(GetUserFriendRequestsCountDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserFriendRequestsCountQuery.getKey = (variables: GetUserFriendRequestsCountQueryVariables) => ["getUserFriendRequestsCount.infinite", variables];


useGetUserFriendRequestsCountQuery.fetcher = (variables: GetUserFriendRequestsCountQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserFriendRequestsCountQuery, GetUserFriendRequestsCountQueryVariables>(GetUserFriendRequestsCountDocument, variables, options);

export const GetUserFriendsDocument = `
    query getUserFriends($userId: Int!, $cursorid: Int) {
  userFriends(findFriendsByUserInput: {userId: $userId, cursorId: $cursorid}) {
    anotherUser {
      id
      username
      img
    }
  }
}
    `;

export const useGetUserFriendsQuery = <
  TData = GetUserFriendsQuery,
  TError = unknown
>(
  variables: GetUserFriendsQueryVariables,
  options?: UseQueryOptions<GetUserFriendsQuery, TError, TData>
) => {

  return useQuery<GetUserFriendsQuery, TError, TData>(
    ["getUserFriends", variables],
    fetcher<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, variables),
    options
  );
};

useGetUserFriendsQuery.document = GetUserFriendsDocument;

useGetUserFriendsQuery.getKey = (variables: GetUserFriendsQueryVariables) => ["getUserFriends", variables];

export const useInfiniteGetUserFriendsQuery = <
  TData = GetUserFriendsQuery,
  TError = unknown
>(
  variables: GetUserFriendsQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFriendsQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserFriendsQuery, TError, TData>(
    ["getUserFriends.infinite", variables],
    (metaData) => fetcher<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserFriendsQuery.getKey = (variables: GetUserFriendsQueryVariables) => ["getUserFriends.infinite", variables];


useGetUserFriendsQuery.fetcher = (variables: GetUserFriendsQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, variables, options);

export const GetUserFriendsCountDocument = `
    query getUserFriendsCount($userId: Int!) {
  userFriendsQuantity(countFriendshipInput: {userId: $userId, isAccepted: true})
}
    `;

export const useGetUserFriendsCountQuery = <
  TData = GetUserFriendsCountQuery,
  TError = unknown
>(
  variables: GetUserFriendsCountQueryVariables,
  options?: UseQueryOptions<GetUserFriendsCountQuery, TError, TData>
) => {

  return useQuery<GetUserFriendsCountQuery, TError, TData>(
    ["getUserFriendsCount", variables],
    fetcher<GetUserFriendsCountQuery, GetUserFriendsCountQueryVariables>(GetUserFriendsCountDocument, variables),
    options
  );
};

useGetUserFriendsCountQuery.document = GetUserFriendsCountDocument;

useGetUserFriendsCountQuery.getKey = (variables: GetUserFriendsCountQueryVariables) => ["getUserFriendsCount", variables];

export const useInfiniteGetUserFriendsCountQuery = <
  TData = GetUserFriendsCountQuery,
  TError = unknown
>(
  variables: GetUserFriendsCountQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserFriendsCountQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserFriendsCountQuery, TError, TData>(
    ["getUserFriendsCount.infinite", variables],
    (metaData) => fetcher<GetUserFriendsCountQuery, GetUserFriendsCountQueryVariables>(GetUserFriendsCountDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserFriendsCountQuery.getKey = (variables: GetUserFriendsCountQueryVariables) => ["getUserFriendsCount.infinite", variables];


useGetUserFriendsCountQuery.fetcher = (variables: GetUserFriendsCountQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserFriendsCountQuery, GetUserFriendsCountQueryVariables>(GetUserFriendsCountDocument, variables, options);

export const GetUserPostsDocument = `
    query getUserPosts($createdAt: SortOrder, $rating: SortOrder, $skipPages: Int, $userId: Int!, $topics: [String!], $subTopics: [String!], $topicsOrSubTopics: [String!]) {
  userPosts(
    findUserPostsInput: {createdAt: $createdAt, rating: $rating, skipPages: $skipPages, userId: $userId, topics: $topics, subTopics: $subTopics, topicsOrSubTopics: $topicsOrSubTopics}
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

export const useGetUserPostsQuery = <
  TData = GetUserPostsQuery,
  TError = unknown
>(
  variables: GetUserPostsQueryVariables,
  options?: UseQueryOptions<GetUserPostsQuery, TError, TData>
) => {

  return useQuery<GetUserPostsQuery, TError, TData>(
    ["getUserPosts", variables],
    fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, variables),
    options
  );
};

useGetUserPostsQuery.document = GetUserPostsDocument;

useGetUserPostsQuery.getKey = (variables: GetUserPostsQueryVariables) => ["getUserPosts", variables];

export const useInfiniteGetUserPostsQuery = <
  TData = GetUserPostsQuery,
  TError = unknown
>(
  variables: GetUserPostsQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserPostsQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserPostsQuery, TError, TData>(
    ["getUserPosts.infinite", variables],
    (metaData) => fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserPostsQuery.getKey = (variables: GetUserPostsQueryVariables) => ["getUserPosts.infinite", variables];


useGetUserPostsQuery.fetcher = (variables: GetUserPostsQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, variables, options);

export const GetUserProfileInfoDocument = `
    query getUserProfileInfo($id: Int!) {
  user(findOneUserInput: {id: $id}) {
    id
    createdAt
    img
    updatedAt
    occupation
    username
    posts {
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

export const useGetUserProfileInfoQuery = <
  TData = GetUserProfileInfoQuery,
  TError = unknown
>(
  variables: GetUserProfileInfoQueryVariables,
  options?: UseQueryOptions<GetUserProfileInfoQuery, TError, TData>
) => {

  return useQuery<GetUserProfileInfoQuery, TError, TData>(
    ["getUserProfileInfo", variables],
    fetcher<GetUserProfileInfoQuery, GetUserProfileInfoQueryVariables>(GetUserProfileInfoDocument, variables),
    options
  );
};

useGetUserProfileInfoQuery.document = GetUserProfileInfoDocument;

useGetUserProfileInfoQuery.getKey = (variables: GetUserProfileInfoQueryVariables) => ["getUserProfileInfo", variables];

export const useInfiniteGetUserProfileInfoQuery = <
  TData = GetUserProfileInfoQuery,
  TError = unknown
>(
  variables: GetUserProfileInfoQueryVariables,
  options?: UseInfiniteQueryOptions<GetUserProfileInfoQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUserProfileInfoQuery, TError, TData>(
    ["getUserProfileInfo.infinite", variables],
    (metaData) => fetcher<GetUserProfileInfoQuery, GetUserProfileInfoQueryVariables>(GetUserProfileInfoDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUserProfileInfoQuery.getKey = (variables: GetUserProfileInfoQueryVariables) => ["getUserProfileInfo.infinite", variables];


useGetUserProfileInfoQuery.fetcher = (variables: GetUserProfileInfoQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUserProfileInfoQuery, GetUserProfileInfoQueryVariables>(GetUserProfileInfoDocument, variables, options);

export const GetUsersFriendshipDocument = `
    query getUsersFriendship($userId1: Int!, $userId2: Int!) {
  usersFriendship(findUsersFriendship: {userId1: $userId1, userId2: $userId2}) {
    isAccepted
  }
}
    `;

export const useGetUsersFriendshipQuery = <
  TData = GetUsersFriendshipQuery,
  TError = unknown
>(
  variables: GetUsersFriendshipQueryVariables,
  options?: UseQueryOptions<GetUsersFriendshipQuery, TError, TData>
) => {

  return useQuery<GetUsersFriendshipQuery, TError, TData>(
    ["getUsersFriendship", variables],
    fetcher<GetUsersFriendshipQuery, GetUsersFriendshipQueryVariables>(GetUsersFriendshipDocument, variables),
    options
  );
};

useGetUsersFriendshipQuery.document = GetUsersFriendshipDocument;

useGetUsersFriendshipQuery.getKey = (variables: GetUsersFriendshipQueryVariables) => ["getUsersFriendship", variables];

export const useInfiniteGetUsersFriendshipQuery = <
  TData = GetUsersFriendshipQuery,
  TError = unknown
>(
  variables: GetUsersFriendshipQueryVariables,
  options?: UseInfiniteQueryOptions<GetUsersFriendshipQuery, TError, TData>
) => {

  return useInfiniteQuery<GetUsersFriendshipQuery, TError, TData>(
    ["getUsersFriendship.infinite", variables],
    (metaData) => fetcher<GetUsersFriendshipQuery, GetUsersFriendshipQueryVariables>(GetUsersFriendshipDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfiniteGetUsersFriendshipQuery.getKey = (variables: GetUsersFriendshipQueryVariables) => ["getUsersFriendship.infinite", variables];


useGetUsersFriendshipQuery.fetcher = (variables: GetUsersFriendshipQueryVariables, options?: RequestInit["headers"]) => fetcher<GetUsersFriendshipQuery, GetUsersFriendshipQueryVariables>(GetUsersFriendshipDocument, variables, options);

export const LoginDocument = `
    mutation login($password: String!, $email: String!) {
  login(loginInput: {email: $email, password: $password}) {
    username
    email
    id
    createdAt
  }
}
    `;

export const useLoginMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => {

  return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ["login"],
    (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
    options
  );
};

useLoginMutation.getKey = () => ["login"];


useLoginMutation.fetcher = (variables: LoginMutationVariables, options?: RequestInit["headers"]) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options);

export const LogoutDocument = `
    mutation logout {
  logout
}
    `;

export const useLogoutMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>) => {

  return useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    ["logout"],
    (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables)(),
    options
  );
};

useLogoutMutation.getKey = () => ["logout"];


useLogoutMutation.fetcher = (variables?: LogoutMutationVariables, options?: RequestInit["headers"]) => fetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options);

export const PostRecommendationsDocument = `
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
    `;

export const usePostRecommendationsQuery = <
  TData = PostRecommendationsQuery,
  TError = unknown
>(
  variables?: PostRecommendationsQueryVariables,
  options?: UseQueryOptions<PostRecommendationsQuery, TError, TData>
) => {

  return useQuery<PostRecommendationsQuery, TError, TData>(
    variables === undefined ? ["postRecommendations"] : ["postRecommendations", variables],
    fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, variables),
    options
  );
};

usePostRecommendationsQuery.document = PostRecommendationsDocument;

usePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ["postRecommendations"] : ["postRecommendations", variables];

export const useInfinitePostRecommendationsQuery = <
  TData = PostRecommendationsQuery,
  TError = unknown
>(
  variables?: PostRecommendationsQueryVariables,
  options?: UseInfiniteQueryOptions<PostRecommendationsQuery, TError, TData>
) => {

  return useInfiniteQuery<PostRecommendationsQuery, TError, TData>(
    variables === undefined ? ["postRecommendations.infinite"] : ["postRecommendations.infinite", variables],
    (metaData) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, { ...variables, ...(metaData.pageParam ?? {}) })(),
    options
  );
};

useInfinitePostRecommendationsQuery.getKey = (variables?: PostRecommendationsQueryVariables) => variables === undefined ? ["postRecommendations.infinite"] : ["postRecommendations.infinite", variables];


usePostRecommendationsQuery.fetcher = (variables?: PostRecommendationsQueryVariables, options?: RequestInit["headers"]) => fetcher<PostRecommendationsQuery, PostRecommendationsQueryVariables>(PostRecommendationsDocument, variables, options);

export const PublishDraftDocument = `
    mutation publishDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
  publishDraft(
    publishDraftInput: {id: $id, body: $body, title: $title, topics: $topics, subTopics: $subTopics}
  ) {
    id
  }
}
    `;

export const usePublishDraftMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>) => {

  return useMutation<PublishDraftMutation, TError, PublishDraftMutationVariables, TContext>(
    ["publishDraft"],
    (variables?: PublishDraftMutationVariables) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(PublishDraftDocument, variables)(),
    options
  );
};

usePublishDraftMutation.getKey = () => ["publishDraft"];


usePublishDraftMutation.fetcher = (variables: PublishDraftMutationVariables, options?: RequestInit["headers"]) => fetcher<PublishDraftMutation, PublishDraftMutationVariables>(PublishDraftDocument, variables, options);

export const RegisterDocument = `
    mutation register($username: String!, $password: String!, $email: String!, $returnUrl: String) {
  register(
    registerInput: {username: $username, email: $email, password: $password, returnUrl: $returnUrl}
  )
}
    `;

export const useRegisterMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) => {

  return useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ["register"],
    (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
    options
  );
};

useRegisterMutation.getKey = () => ["register"];


useRegisterMutation.fetcher = (variables: RegisterMutationVariables, options?: RequestInit["headers"]) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables, options);

export const RemoveFriendshipDocument = `
    mutation removeFriendship($anotherUserId: Int!) {
  removeFriendship(removeFriendshipInput: {anotherUserId: $anotherUserId}) {
    receiverId
    id
  }
}
    `;

export const useRemoveFriendshipMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<RemoveFriendshipMutation, TError, RemoveFriendshipMutationVariables, TContext>) => {

  return useMutation<RemoveFriendshipMutation, TError, RemoveFriendshipMutationVariables, TContext>(
    ["removeFriendship"],
    (variables?: RemoveFriendshipMutationVariables) => fetcher<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>(RemoveFriendshipDocument, variables)(),
    options
  );
};

useRemoveFriendshipMutation.getKey = () => ["removeFriendship"];


useRemoveFriendshipMutation.fetcher = (variables: RemoveFriendshipMutationVariables, options?: RequestInit["headers"]) => fetcher<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>(RemoveFriendshipDocument, variables, options);

export const SendFriendshipRequestDocument = `
    mutation sendFriendshipRequest($receiverId: Int!) {
  sendFriendshipRequest(createFriendshipInput: {receiverId: $receiverId}) {
    receiverId
  }
}
    `;

export const useSendFriendshipRequestMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<SendFriendshipRequestMutation, TError, SendFriendshipRequestMutationVariables, TContext>) => {

  return useMutation<SendFriendshipRequestMutation, TError, SendFriendshipRequestMutationVariables, TContext>(
    ["sendFriendshipRequest"],
    (variables?: SendFriendshipRequestMutationVariables) => fetcher<SendFriendshipRequestMutation, SendFriendshipRequestMutationVariables>(SendFriendshipRequestDocument, variables)(),
    options
  );
};

useSendFriendshipRequestMutation.getKey = () => ["sendFriendshipRequest"];


useSendFriendshipRequestMutation.fetcher = (variables: SendFriendshipRequestMutationVariables, options?: RequestInit["headers"]) => fetcher<SendFriendshipRequestMutation, SendFriendshipRequestMutationVariables>(SendFriendshipRequestDocument, variables, options);

export const UpdateDraftDocument = `
    mutation updateDraft($id: Int!, $body: JSONObject, $title: String, $topics: [String!], $subTopics: [String!]) {
  updateDraft(
    updateDraftInput: {id: $id, topics: $topics, subTopics: $subTopics, body: $body, title: $title}
  ) {
    id
  }
}
    `;

export const useUpdateDraftMutation = <
  TError = unknown,
  TContext = unknown
>(options?: UseMutationOptions<UpdateDraftMutation, TError, UpdateDraftMutationVariables, TContext>) => {

  return useMutation<UpdateDraftMutation, TError, UpdateDraftMutationVariables, TContext>(
    ["updateDraft"],
    (variables?: UpdateDraftMutationVariables) => fetcher<UpdateDraftMutation, UpdateDraftMutationVariables>(UpdateDraftDocument, variables)(),
    options
  );
};

useUpdateDraftMutation.getKey = () => ["updateDraft"];


useUpdateDraftMutation.fetcher = (variables: UpdateDraftMutationVariables, options?: RequestInit["headers"]) => fetcher<UpdateDraftMutation, UpdateDraftMutationVariables>(UpdateDraftDocument, variables, options);


export type PossibleTypesResultData = {
  "possibleTypes": {}
};
const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
export default result;
    