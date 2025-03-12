import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export type RemoveDraftDto = CurrentUserExtendT<{
  id: number;
}>
