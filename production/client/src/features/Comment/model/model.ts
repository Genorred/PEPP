export interface UserCommentTemplateI {
  username: string;
  id: number;
  img?: string | null;
}

export interface CommentTemplateI {
  id: number;
  user: UserCommentTemplateI;
  postId: number;
  createdAt: string | number;
  message: string;
}