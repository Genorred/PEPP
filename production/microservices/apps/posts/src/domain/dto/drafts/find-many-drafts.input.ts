import { Post } from "../../entities/post.entity";
import { Draft } from "../../entities/draft.entity";

export interface FindManyDraftsInput extends Omit<Partial<Draft>, 'body' | 'topics' | 'subTopics'> {
}