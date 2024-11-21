import { Injectable } from "@nestjs/common";

@Injectable()
export class TopicsRepository {

  connectOrCreateTopics(topics?: string[], subTopics?: string[]) {
    return {
      topics: (topics ? {
        connectOrCreate: topics.map(title => ({
          where: {
            title
          },
          create: {
            title
          }
        }))
      } : {}),
      subTopics: (subTopics ? {
        connectOrCreate: subTopics.map(title => ({
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