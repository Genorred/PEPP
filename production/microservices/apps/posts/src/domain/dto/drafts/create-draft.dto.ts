import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export type CreateDraftDto = CurrentUserExtendT<{
  title: string;
  description?: string;
  body: any;
  topics?: string[];
  subTopics?: string[];
  postId?: number;
  version?: number;
}>
