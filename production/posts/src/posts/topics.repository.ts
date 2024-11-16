import { Injectable } from "@nestjs/common";

@Injectable()
export class TopicsRepository {

  connectOrCreateTopics(topics: string[], subTopics: string[]) {
    return {
      topics: {
        connectOrCreate: topics.map(title => ({
          where: {
            title
          },
          create: {
            title
          }
        }))
      },
      subTopics: {
        connectOrCreate: subTopics.map(title => ({
          where: {
            title
          },
          create: {
            title
          }
        }))
      }
    };
  }
}