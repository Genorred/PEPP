import { CurrentUserExtendT } from '@_shared/auth-guard/CurrentUserExtendT';

export type UpdateDraftDto = CurrentUserExtendT<{
  title?: string;
  description?: string;
  body?: any;
  topics?: string[];
  subTopics?: string[];
  id: number;
}>;
