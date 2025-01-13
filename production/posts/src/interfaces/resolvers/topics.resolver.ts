import { Args, Query, Resolver } from "@nestjs/graphql";
import { TopicsService } from "../../infrastructure/topics/topics.service";
import { Topic } from "../../domain/entities/topic.entity";

@Resolver(() => Topic)
export class TopicsResolver {
  constructor(private readonly topicsService: TopicsService) {
  }

  // @Mutation(() => Topic)
  // createTopic(@Args('createTopicInput') createTopicInput: CreateTopicInput) {
  //   return this.topicsService.create(createTopicInput);
  // }

  @Query(() => [Topic], { name: "topics" })
  findAll(@Args("title", { nullable: true }) title?: string) {
    return this.topicsService.findAll(title);
  }

  // @Query(() => Topic, { name: 'topic' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.topicsService.findOne(id);
  // }
  //
  // @Mutation(() => Topic)
  // updateTopic(@Args('updateTopicInput') updateTopicInput: UpdateTopicInput) {
  //   return this.topicsService.update(updateTopicInput.id, updateTopicInput);
  // }
  //
  // @Mutation(() => Topic)
  // removeTopic(@Args('id', { type: () => Int }) id: number) {
  //   return this.topicsService.remove(id);
  // }
}
