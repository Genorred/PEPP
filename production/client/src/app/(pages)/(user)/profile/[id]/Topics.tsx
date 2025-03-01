import React from "react";
import { GetUserProfileInfoQuery } from "@/shared/api/graphql/generated";
import { Badge } from "@/shared/ui/badge";

const Topics = ({ data }: {
  data: GetUserProfileInfoQuery
}) => {
  console.log('dash', data.user.posts[0]);
  const posts = data.user.posts
  const topics = new Map<string, number>();
  const subTopics = new Map<string, number>();
  posts.forEach((post) => (post.topics?.forEach( topic => {
    const {title} = topic
    topics.set(title, (topics.get(title) ?? 0) + 1 )
  }) ))
  posts.forEach((post) => (post.subTopics?.forEach( topic => {
    const {title} = topic
    subTopics.set(title, (subTopics.get(title) ?? 0) + 1 )
  }) ))
  const topicsAndSubTopics = new Set<string>();
  for (const topic in topics.keys()) {
      topicsAndSubTopics.add(topic)
  }
  for (const topic in subTopics.keys()) {
    topicsAndSubTopics.add(topic)
  }
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Topics</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from(topics).map((topic) => (
          <Badge key={topic[0]} variant="secondary">
            {topic}
          </Badge>
        ))}
        {Array.from(subTopics).map((topic) => (
          <Badge key={topic[0]} variant="secondary">
            {topic}
          </Badge>
        ))}
        {Array.from(topicsAndSubTopics).map((topic) => (
          <Badge key={topic[0]} variant="secondary">
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Topics;