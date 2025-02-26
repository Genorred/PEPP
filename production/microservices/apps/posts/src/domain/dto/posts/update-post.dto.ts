import { CreatePostDto } from "./create-post.dto";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export interface UpdatePostDto extends Partial<CreatePostDto> {
  id: number;
  version?: number
}
export type UpdatePostInputService = CurrentUserExtendT<UpdatePostDto>;
