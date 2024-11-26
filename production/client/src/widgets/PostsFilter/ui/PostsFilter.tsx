"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { ChevronDown, Search, X } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Badge } from "@/shared/ui/badge";
import { Controller, useForm } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";
import { useDispatch } from "react-redux";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { useFiltersForm } from "@/widgets/PostsFilter/vm/useFiltersForm";
import TopicsSelector from "@/widgets/PostsFilter/ui/TopicsSelector";

// This would typically come from an API or a larger dataset
const allTopics = [
  'React', 'Node.js', 'GraphQL', 'TypeScript', 'JavaScript', 'CSS', 'HTML',
  'Next.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redux', 'Vue.js', 'Angular',
  'Svelte', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'DevOps',
  'CI/CD', 'Machine Learning', 'Artificial Intelligence', 'Blockchain',
  'Cybersecurity', 'Data Science', 'Big Data', 'IoT', 'Mobile Development',
  'iOS', 'Android', 'React Native', 'Flutter', 'Xamarin', 'Unity', 'Game Development'
]

export function PostsFilter() {


  const {control, setValue, handleSubmit, watchedTopics} = useFiltersForm()


  const dispatch = useDispatch()
  const onSubmit = (data: FilterState) => {
    dispatch(filtersSlice.actions.setFilters(data))
  }
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
        <Controller
          name="createdAtDesc"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="createdAtDesc"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="createdAtDesc">Newest</Label>
            </div>
          )}
        />
        <Controller
          name="ratingDesc"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ratingDesc"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="ratingDesc">Top Rated</Label>
            </div>
          )}
        />
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
                  const newTopics = watchedTopics.filter((t: string) => t !== topic)
                  setValue('topics', newTopics)
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </form>
  )
}

export default PostsFilter