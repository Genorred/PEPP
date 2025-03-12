import { Draft } from "../../entities/draft.entity";

export interface FindManyDraftsDto extends Omit<Partial<Draft>, "body" | "topics" | "subTopics"> {
}