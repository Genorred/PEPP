import { Injectable } from "@nestjs/common";

const biggestIndex = 4;

@Injectable()
export class TopicsPrismaRepository {
  resetTopics = {
    topics: {
      set: []
    },
    subTopics: {
      set: []
    }
  };

  connectOrCreate(topics?: string[], subTopics?: string[]) {
    return {
      topics: (topics ? {
        connectOrCreate: this.mapConnectOrCreate(topics)
      } : undefined),
      subTopics: (subTopics ? {
        connectOrCreate: this.mapConnectOrCreate(subTopics)
      } : undefined)
    };
  }

  private mapConnectOrCreate(topics: string[]) {
    return topics.slice(0, biggestIndex).map(title => ({
      where: {
        title
      },
      create: {
        title
      }
    }));
  }
}