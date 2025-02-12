import { Topic } from "../../entities/topic.entity";
import { TopicDto } from "./topic.dto";

export const mapTopicsToTopicsDto = (topics?: Topic[]): TopicDto[] => {
  return topics?.map(topic => (topic.title)) ?? [];
}