import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export class FindPostDto {
  id: number;
  isHidden?: boolean
}
export type FindPostInputService = CurrentUserExtendT<FindPostDto>