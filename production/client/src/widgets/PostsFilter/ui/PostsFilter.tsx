"use client";
import React from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ChevronDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Badge } from "@/shared/ui/badge";
import { Controller } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";
import { useDispatch } from "react-redux";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useFiltersForm } from "@/widgets/PostsFilter/vm/useFiltersForm";
import TopicsSelector from "@/widgets/PostsFilter/ui/TopicsSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

// This would typically come from an API or a larger dataset
const allTopics = [
  "React", "Node.js", "GraphQL", "TypeScript", "JavaScript", "CSS", "HTML",
  "Next.js", "Express", "MongoDB", "PostgreSQL", "Redux", "Vue.js", "Angular",
  "Svelte", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "DevOps",
  "CI/CD", "Machine Learning", "Artificial Intelligence", "Blockchain",
  "Cybersecurity", "Data Science", "Big Data", "IoT", "Mobile Development",
  "iOS", "Android", "React Native", "Flutter", "Xamarin", "Unity", "Game Development"
];

export function PostsFilter() {


  const { control, setValue, handleSubmit, watchedTopics, watchedRating, watchedCreatedAt } = useFiltersForm();

  const getSortLabel = (sort: FilterState["rating"], type: "createdAt" | "rating") => {
    if (type === "createdAt") {
      return sort === "DESC" ? "Newest" : "Oldest";
    } else {
      return sort === "DESC" ? "Highest Rated" : "Lowest Rated";
    }
  };
  const dispatch = useDispatch();
  const onSubmit = (data: FilterState) => {
    dispatch(filtersSlice.actions.setFilters(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-background shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search posts..."
                {...field}
                className="w-full"
              />
            </div>
          )}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-2">
            <DropdownMenuLabel>Choose options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Controller
              name="createdAt"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <SelectTrigger className="my-1.5 w-full">
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
                  <SelectTrigger className="my-1.5 w-full">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DESC">Highest Rated</SelectItem>
                    <SelectItem value="ASC">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <TopicsSelector watchedTopics={watchedTopics} control={control} />
        <Button type="submit">Apply Filters</Button>
      </div>
      {(watchedTopics.length > 0 || watchedCreatedAt || watchedRating) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {watchedCreatedAt && (
            <Badge variant="secondary" className="text-xs">
              {getSortLabel(watchedCreatedAt, "createdAt")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => setValue("createdAt", null)}
              />
            </Badge>
          )}
          {watchedRating && (
            <Badge variant="secondary" className="text-xs">
              {getSortLabel(watchedRating, "rating")}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => setValue("rating", null)}
              />
            </Badge>
          )}
          {watchedTopics.map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newTopics = watchedTopics.filter((t: string) => t !== topic);
                  setValue("topics", newTopics);
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </form>
  );
}

export default PostsFilter;