import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export class RemovePostDto {
  id: number;
}

export interface RemovePostInputService extends CurrentUserExtendT<RemovePostDto> {
}