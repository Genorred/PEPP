"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { getTopicsSummary } from "@/app/(pages)/(user)/profile/[id]/getTopicsSummary";
import { userFiltersSlice } from "@/app/(pages)/(user)/profile/[id]/filters.slice";
import { UserFilterState } from "@/app/(pages)/(user)/profile/[id]/domain";
import UserTopicToChoose from "@/app/(pages)/(user)/profile/[id]/UserTopicToChoose";

const UserPostsFilters = ({ topicsSummary }: {
  topicsSummary: ReturnType<typeof getTopicsSummary>
}) => {
  const { allTopics, topicsAndSubTopicsArray, topicsArray, subTopicsArray } = topicsSummary;
  const { control, handleSubmit, watch, setValue } = useForm<UserFilterState>({
    defaultValues: {
      createdAt: null,
      rating: null,
      topics: [],
      subTopics: [],
      topicsAndSubTopics: []
    }
  });
  console.log("topicsSummary", topicsSummary.allTopics.size);
  const filters = useSelector(userFiltersSlice.selectors.filter);

  const watchedTopics = watch("topics");
  const watchedSubTopics = watch("subTopics");
  const watchedTopicsAndSubTopics = watch("topicsAndSubTopics");

  const getSortLabel = (sort: UserFilterState["rating"], type: "createdAt" | "rating") => {
    if (type === "createdAt") {
      return sort === "DESC" ? "Newest" : "Oldest";
    } else {
      return sort === "DESC" ? "Highest Rated" : "Lowest Rated";
    }
  };
  const dispatch = useDispatch();
  const onSubmit = (data: UserFilterState) => {
    dispatch(userFiltersSlice.actions.setFilters(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-background shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <Controller
          name="createdAt"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || undefined}
            >
              <SelectTrigger className="my-1.5 w-fit">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DESC">Newest</SelectItem>
                <SelectItem value="ASC">Oldest</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value || undefined}
            >
              <SelectTrigger className="my-1.5 w-fit">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DESC">Highest Rated</SelectItem>
                <SelectItem value="ASC">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" className="h-10 px-4 py-2">
              Topics ({watchedTopics.length + watchedSubTopics.length + watchedTopicsAndSubTopics.length})
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <ScrollArea className="h-[300px]">
              <div className="p-4">
                {
                  topicsArray.map(([topic, count]) => (
                    <UserTopicToChoose topic={topic} count={count} control={control} name={"topics"} key={topic} />
                  ))
                }
                {
                  subTopicsArray.map(([topic, count]) => (
                    <UserTopicToChoose topic={topic} count={count} control={control} name={"subTopics"} key={topic} />
                  ))
                }
                {
                  topicsAndSubTopicsArray.map(([topic, count]) => (
                    <UserTopicToChoose topic={topic} count={count} control={control} name={"topicsAndSubTopics"}
                                       key={topic} />
                  ))
                }
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
};

export default UserPostsFilters;