import { Injectable } from "@nestjs/common";

const biggestIndex = 4;

@Injectable()
export class TopicsPrismaRepository {
  resetTopics(topics?: string[], subTopics?: string[]) {
    const connectOrCreateTopicsData = this.connectOrCreate(topics, subTopics);
    return {
      topics: (connectOrCreateTopicsData.topics ? {
        set: [],
        connectOrCreate: this.mapConnectOrCreate(topics)
      } : {}),
      subTopics: (connectOrCreateTopicsData.subTopics ? {
        set: [],
        connectOrCreate: this.mapConnectOrCreate(subTopics)
      } : {})
    };
  }

  connectOrCreate(topics?: string[], subTopics?: string[]) {
    return {
      topics: (topics ? {
        connectOrCreate: this.mapConnectOrCreate(topics)
      } : {}),
      subTopics: (subTopics ? {
        connectOrCreate: this.mapConnectOrCreate(subTopics)
      } : {})
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