import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export class CreatePostDto {
  title: string;
  description?: string;
  body: any;
  topics?: string[];
  subTopics?: string[];
  isHidden?: boolean;
}

export type CreatePostServiceDto = CurrentUserExtendT<CreatePostDto>