import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DraftsService } from '../../drafts/drafts.service';
import { Draft } from '../../drafts/entities/draft.entity';
import { CreateDraftInput } from '../../drafts/dto/create-draft.input';
import { UpdateDraftInput } from '../../drafts/dto/update-draft.input';

@Resolver(() => Draft)
export class DraftsResolver {
  constructor(private readonly draftsService: DraftsService) {}

  @Mutation(() => Draft)
  createDraft(@Args('createDraftInput') createDraftInput: CreateDraftInput) {
    return this.draftsService.create(createDraftInput);
  }

  @Query(() => [Draft], { name: 'drafts' })
  findAll() {
    return this.draftsService.findAll();
  }

  @Query(() => Draft, { name: 'draft' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.draftsService.findOne(id);
  }

  @Mutation(() => Draft)
  updateDraft(@Args('updateDraftInput') updateDraftInput: UpdateDraftInput) {
    return this.draftsService.update(updateDraftInput.id, updateDraftInput);
  }

  @Mutation(() => Draft)
  removeDraft(@Args('id', { type: () => Int }) id: number) {
    return this.draftsService.remove(id);
  }
}
