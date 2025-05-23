import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Draft } from "../../domain/entities/draft.entity";
import { DraftsUseCase } from "../../application/drafts.use-case";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import { Post } from "../../domain/entities/post.entity";
import { DraftsRepository } from "../../domain/repositories/drafts/drafts.repository";
import { FindDraftInput } from "../dto/drafts/find-draft.input";
import { CreateDraftInput } from "../dto/drafts/create-draft.input";
import useAuth from "@_shared/auth-guard/useAuth";
import { RemovePostInput } from "../dto/posts/remove-post.input";
import { UpdateDraftInput } from "../dto/drafts/update-draft.input";

@Resolver(() => Draft)
export class DraftsResolver {
  constructor(private readonly draftsService: DraftsUseCase,
              private readonly draftsRepository: DraftsRepository) {
  }

  @useAuth()
  @Mutation(() => Draft)
  createDraft(@Args("createDraftInput") createDraftInput: CreateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsService.createDraft({ ...createDraftInput, userId: user?.sub });
  }

  @useAuth()
  @Mutation(() => Post)
  publishDraft(@Args("publishDraftInput") publishDraftInput: UpdateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Post> {
    return this.draftsService.publishDraft({ ...publishDraftInput, userId: user?.sub });
  }

  @useAuth()
  @Query(() => [Draft], { name: "userDrafts" })
  findByUser(@CurrentUser() user: CurrentUserI): Promise<Draft[]> {
    return this.draftsRepository.findMany({ userId: user?.sub });
  }

  @useAuth()
  @Query(() => Draft, { name: "draft" })
  findOne(@Args("findDraftInput") findOneInput: FindDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.findOne({ ...findOneInput, userId: user?.sub });
  }

  @useAuth()
  @Mutation(() => Draft)
  updateDraft(@Args("updateDraftInput") updateDraftInput: UpdateDraftInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.update({ ...updateDraftInput, userId: user?.sub });
  }

  @useAuth()
  @Mutation(() => Draft)
  removeDraft(@Args("removeDraftInput") removeInput: RemovePostInput, @CurrentUser() user: CurrentUserI): Promise<Draft> {
    return this.draftsRepository.remove({ ...removeInput, userId: user?.sub });
  }
}
