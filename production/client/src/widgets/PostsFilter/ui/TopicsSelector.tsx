import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Label } from "@/shared/ui/label";
import { Checkbox } from "@/shared/ui/checkbox";
import { Control, Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { useTopicsQuery } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { FilterState } from "@/widgets/PostsFilter/model/domain";

const TopicsSelector = ({ watchedTopics, control }:
                        {
                          watchedTopics: string[]
                          control: Control<FilterState, any>
                        }) => {
  const [topicSearch, setTopicSearch] = useState("");
  const { refetch, data: filteredTopics, isLoading } = useTopicsQuery({
    title: topicSearch
  });

  useEffect(() => {
    void refetch();
  }, [topicSearch]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="h-10 px-4 py-2">
          Topics ({watchedTopics.length})
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 opacity-50" />
            <Input
              placeholder="Filter topics..."
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-4">
            {filteredTopics?.topics
              ?
              filteredTopics.topics.map((topic) => (
                <Controller
                  key={topic.title}
                  name="topics"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={`topic-${topic}`}
                        checked={field.value.includes(topic.title)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, topic]);
                          } else {
                            field.onChange(field.value.filter((t: string) => t !== topic.title));
                          }
                        }}
                      />
                      <Label htmlFor={`topic-${topic}`}>{topic.title}</Label>
                    </div>
                  )}
                />
              ))
              :
              <p className="text-sm text-muted-foreground">No topics found</p>
            }
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default TopicsSelector;