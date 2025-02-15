import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export interface FindDraftInput {
  id: number
}
export type FindDraftInputService = CurrentUserExtendT<FindDraftInput>