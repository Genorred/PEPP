"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { ChevronDown, Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select";
import { Badge } from "@/shared/ui/badge";
import { Controller, useForm } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";
import { useDispatch } from "react-redux";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useFiltersForm } from "@/widgets/PostsFilter/vm/useFiltersForm";
import TopicsSelector from "@/widgets/PostsFilter/ui/TopicsSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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


  const { control, setValue, handleSubmit, watchedTopics } = useFiltersForm();


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
            <Button variant="outline" className="min-w-[150px]">
              Sort by
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Choose options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Controller
                name="createdAt"
                control={control}
                render={({ field }) => (
                  <div className="min-w-[150px]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='none'>Newest</SelectItem>
                        <SelectItem value="desc">Newest</SelectItem>
                        <SelectItem value="asc">Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <div className="min-w-[150px]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='none'>Newest</SelectItem>
                        <SelectItem value="desc">Highest Rated</SelectItem>
                        <SelectItem value="asc">Lowest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TopicsSelector watchedTopics={watchedTopics} control={control} />
        <Button type="submit">Apply Filters</Button>
      </div>
      {watchedTopics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
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