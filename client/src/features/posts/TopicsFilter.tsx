import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { useDispatch, useSelector } from "react-redux";
import { usersSlice } from "@/features/posts/model/posts.slice";

const TopicsFilter = () => {
  const dispatch = useDispatch();
  const topics = ["yuve", "akine", "nuke73", "gl1n"]
  const selectedTopics = useSelector(usersSlice.selectors.topics)
  const onSelect = (index: number) => () => {
    dispatch(usersSlice.actions.addTopic(index))
  }
  return (
            <ToggleGroup type="multiple">
                {topics.map((topic, index) =>
                    <ToggleGroupItem value={topic} aria-label="Toggle bold" key={topic} onClick={onSelect(index)}>
                        {topic}
                    </ToggleGroupItem>
                )}
            </ToggleGroup>
  );
};

export default TopicsFilter;