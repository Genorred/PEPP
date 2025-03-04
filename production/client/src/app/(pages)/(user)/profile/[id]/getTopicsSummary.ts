import { GetUserProfileInfoQuery } from "@/shared/api/graphql/generated";

export const getTopicsSummary = (data: GetUserProfileInfoQuery) => {
  const posts = data.user.posts;
  const topics = new Map<string, number>();
  const subTopics = new Map<string, number>();
  posts.forEach((post) => (post.topics?.forEach(topic => {
    const { title } = topic;
    topics.set(title, (topics.get(title) ?? 0) + 1);
  })));
  posts.forEach((post) => (post.subTopics?.forEach(topic => {
    const { title } = topic;
    subTopics.set(title, (subTopics.get(title) ?? 0) + 1);
  })));
  const allTopics = new Set([...topics.keys(), ...subTopics.keys()]);

  const topicsArray: [string, number][] = [];
  const subTopicsArray: [string, number][] = [];
  const topicsAndSubTopicsArray: [string, number][] = [];

  for (const topic of allTopics) {
    const isTopic = topics.has(topic);
    const isSubTopic = subTopics.has(topic);
    console.log(isTopic, isSubTopic);
    if (isTopic && isSubTopic) {
      topicsAndSubTopicsArray.push([topic, topics.get(topic)! + subTopics.get(topic)!]);
    } else if (isTopic) {
      topicsArray.push([topic, topics.get(topic)!]);
    } else {
      subTopicsArray.push([topic, subTopics.get(topic)!]);
    }
  }

  return {
    topicsAndSubTopicsArray,
    subTopicsArray,
    topicsArray,
    allTopics
  };
};