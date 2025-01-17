import { Injectable } from "@nestjs/common";

// NO MORE THAN 5 TOPICS
const biggestIndex = 4;

@Injectable()
export class TopicsRepository {
  resetTopics(topics?: string[], subTopics?: string[]) {
    const connectOrCreateTopicsData = this.connectOrCreateTopics(topics, subTopics);
    return {
      topics: (connectOrCreateTopicsData.topics ? {
        set: [],
        connectOrCreate: this.connectOrCreate(topics)
      } : {}),
      subTopics: (connectOrCreateTopicsData.subTopics ? {
        set: [],
        connectOrCreate: this.connectOrCreate(subTopics)
      } : {})
    };
  }

  connectOrCreateTopics(topics?: string[], subTopics?: string[]) {
    return {
      topics: (topics ? {
        connectOrCreate: this.connectOrCreate(topics)
      } : {}),
      subTopics: (subTopics ? {
        connectOrCreate: this.connectOrCreate(subTopics)
      } : {})
    };
  }

  connectOrCreate(topics: string[]) {
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