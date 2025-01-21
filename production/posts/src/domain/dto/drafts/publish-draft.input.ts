import { UpdatePostInputService } from "../posts/update-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateDraftInputService } from "./create-draft.input";

export interface PublishDraftInputService extends CurrentUserExtendT<CreateDraftInputService> {
}