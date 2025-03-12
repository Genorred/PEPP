import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export type FindDraftDto = CurrentUserExtendT<{
  id: number;
}>