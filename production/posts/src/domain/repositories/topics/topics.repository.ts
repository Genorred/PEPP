import { Topic } from "../../entities/topic.entity";

export abstract class TopicsRepository {
  abstract findMany(search: string): Promise<Topic[]>;
}