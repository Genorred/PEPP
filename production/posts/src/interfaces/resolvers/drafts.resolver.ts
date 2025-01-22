import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Draft } from "../../domain/entities/draft.entity";
import { DraftsUseCase } from "../../application/drafts.use-case";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import { CreateDraftInputService } from "../../domain/dto/drafts/create-draft.input";
import { UpdateDraftInput, UpdateDraftInputService } from "../../domain/dto/drafts/update-draft.input";
import { Post } from "../../domain/entities/post.entity";
import { DraftsRepository } from "../../domain/repositories/drafts/drafts.repository";
import { RemovePostInput } from "../../domain/dto/posts/remove-post.input";
import { FindDraftInput } from "../dto/drafts/find-draft.input";
import { CreateDraftInput } from "../dto/drafts/create-draft.input";

@Resolver(() => Draft)
export class DraftsResolver {
  constructor(private readonly draftsService: DraftsUseCase,
              private readonly draftsRepository: DraftsRepository) {
  }

  @Mutation(() => Draft)
  createDraft(@Args("createDraftInput") createDraftInput: CreateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsService.createDraft({ ...createDraftInput, userId: user?.sub });
  }

  @Mutation(() => Post)
  publishDraft(@Args("publishDraftInput") publishDraftInput: UpdateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Post> {
    return this.draftsService.publishDraft({ ...publishDraftInput, userId: user?.sub });
  }

  @Query(() => [Draft], { name: "userDrafts" })
  findByUser(@CurrentUser() user: CurrentUserI): Promise<Draft[]> {
    return this.draftsRepository.findMany({ userId: user?.sub });
  }

  @Query(() => Draft, { name: "draft" })
  findOne(@Args("findDraftInput") findOneInput: FindDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.findOne({ ...findOneInput, userId: user?.sub });
  }

  @Mutation(() => Draft)
  updateDraft(@Args("updateDraftInput") updateDraftInput: UpdateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.update({ ...updateDraftInput, userId: user?.sub });
  }

  @Mutation(() => Draft)
  removeDraft(@Args("removeDraftInput") removeInput: RemovePostInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.remove({ ...removeInput, userId: user?.sub });
  }
}
