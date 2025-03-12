import { Draft } from "../../entities/draft.entity";
import { FindDraftDto } from "../../dto/drafts/find-draft.dto";
import { FindManyDraftsDto } from "../../dto/drafts/find-many-drafts.dto";
import { CreateDraftDto } from "../../dto/drafts/create-draft.dto";
import { UpdateDraftDto } from "../../dto/drafts/update-draft.dto";
import { RemoveDraftDto } from "../../dto/drafts/remove-draft.dto";

export abstract class DraftsRepository {
  abstract create(createPostInput: CreateDraftDto): Promise<Draft>

  abstract findOne(input: FindDraftDto): Promise<Draft>;

  abstract findMany(input?: FindManyDraftsDto): Promise<Draft[]>;

  abstract update(input: UpdateDraftDto): Promise<Draft>;

  abstract remove(input: RemoveDraftDto): Promise<Draft>;
}
