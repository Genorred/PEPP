import { Draft } from "../../entities/draft.entity";
import { RemovePostInputService } from "../../dto/posts/remove-post.input";
import { FindDraftInputService } from "../../dto/drafts/find-draft.input";
import { FindManyDraftsInput } from "../../dto/drafts/find-many-drafts.input";
import { CreateDraftInputService } from "../../dto/drafts/create-draft.input";
import { UpdateDraftInputService } from "../../dto/drafts/update-draft.input";

export abstract class DraftsRepository {
  abstract create(createPostInput: CreateDraftInputService): Promise<Draft>

  abstract findOne(input: FindDraftInputService): Promise<Draft>;

  abstract findMany(input?: FindManyDraftsInput): Promise<Draft[]>;

  abstract update(input: UpdateDraftInputService): Promise<Draft>;

  abstract remove(input: RemovePostInputService): Promise<Draft>;
}
