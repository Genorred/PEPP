export interface UserCommentTemplateI {
  username: string;
  img?: string | null;
}

export interface CommentPropsI {
  id: number;
  user: UserCommentTemplateI;
  createdAt: string;
  message: string;
}
