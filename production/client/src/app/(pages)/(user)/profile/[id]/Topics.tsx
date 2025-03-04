"use client";
import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { getTopicsSummary } from "./getTopicsSummary";
import { useDispatch } from "react-redux";
import { initialUserFiltersState, userFiltersSlice } from "@/app/(pages)/(user)/profile/[id]/filters.slice";

const Topics = ({ topicsSummary }: {
  topicsSummary: ReturnType<typeof getTopicsSummary>
}) => {
  const { subTopicsArray, topicsAndSubTopicsArray, topicsArray } = topicsSummary;
  const dispatch = useDispatch();

  const onClick = (topic: string) => () => {
    dispatch(userFiltersSlice.actions.setFilters({
      ...initialUserFiltersState.filters,
      topics: [topic]
    }));
  };
  return (
    <div>
      <h3 className="flex gap-2 font-semibold mb-2 text-lg items-center">
        User's
        <Badge className="text-lg">
          Topics
        </Badge>
        &
        <Badge className="text-lg" variant="secondary">
          Sub Topics
        </Badge>
      </h3>
      <Card className="flex flex-wrap gap-2 p-4">
        {topicsArray.map(([topic, count]) => (
          <Badge key={topic[0]} variant="default" onClick={onClick(topic)} className="cursor-pointer">
            {topic} {count}
          </Badge>
        ))}
        {topicsAndSubTopicsArray.map(([topic, count]) => (
          <div key={topic[0]} onClick={onClick(topic)} className="cursor-pointer">
            <Badge variant="default" className="pr-6">
              {topic} {count}
            </Badge>
            <Badge className="-ml-4" key={topic[0]} variant="secondary">
              + Sub {count}
            </Badge>
          </div>
        ))}
        {subTopicsArray.map(([topic, count]) => (
          <Badge key={topic[0]} variant="secondary" onClick={onClick(topic)} className="cursor-pointer">
            {topic} {count}
          </Badge>
        ))}
      </Card>
    </div>
  );
};

export default Topics;