"use client";
import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { getTopicsSummary } from "../lib/getTopicsSummary";
import { useDispatch } from "react-redux";
import { initialUserFiltersState, userFiltersSlice } from "@/widgets/Profile/model/user-posts-filters.slice";

const Topics = ({ topicsSummary, className }: {
  topicsSummary: ReturnType<typeof getTopicsSummary>
  className?: string
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
    <div className={className}>
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
          <Badge key={topic} variant="default" onClick={onClick(topic)} className="cursor-pointer">
            {topic} {count}
          </Badge>
        ))}
        {topicsAndSubTopicsArray.map(([topic, count]) => (
          <div key={topic} onClick={onClick(topic)} className="cursor-pointer">
            <Badge variant="default" className="pr-6">
              {topic} {count}
            </Badge>
            <Badge className="-ml-4" variant="secondary">
              + Sub {count}
            </Badge>
          </div>
        ))}
        {subTopicsArray.map(([topic, count]) => (
          <Badge key={topic} variant="secondary" onClick={onClick(topic)} className="cursor-pointer">
            {topic} {count}
          </Badge>
        ))}
      </Card>
    </div>
  );
};

export default Topics;