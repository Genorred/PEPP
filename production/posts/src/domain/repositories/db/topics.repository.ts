import { Injectable } from "@nestjs/common";

// NO MORE THAN 5 TOPICS
const biggestIndex = 4;

@Injectable()
export class TopicsRepository {

  connectOrCreateTopics(topics?: string[], subTopics?: string[]) {
    return {
      topics: (topics ? {
        connectOrCreate: topics.slice(0, biggestIndex).map(title => ({
          where: {
            title
          },
          create: {
            title
          }
        }))
      } : {}),
      subTopics: (subTopics ? {
        connectOrCreate: subTopics.slice(0, biggestIndex).map(title => ({
          where: {
            title
          },
          create: {
            title
          }
        }))
      } : {})
    };
  }
}