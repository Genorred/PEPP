"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { UserCommentsFilterState } from "@/app/(pages)/(user)/profile/[id]/domain";
import { userCommentsFiltersSlice } from "./comments-filters.slice";
import { Checkbox } from "@/shared/ui/checkbox";

const UserCommentsFilter = () => {
  const { control, handleSubmit, watch, setValue } = useForm<UserCommentsFilterState>({
    defaultValues: {
      createdAt: null,
      popularity: null,
      showReplies: null
    }
  });
  const dispatch = useDispatch();
  const onSubmit = (data: UserCommentsFilterState) => {
    dispatch(userCommentsFiltersSlice.actions.setFilters(data));
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
          name="popularity"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                console.log("ddddaaash", value);
                field.onChange(value);
              }
              }
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
        <Controller
          name="showReplies"
          control={control}
          render={({ field }) => (
            <>
              <Checkbox id="showReplies" onCheckedChange={field.onChange}
                        checked={!!field.value}
              />
              <label
                htmlFor="showReplies"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Replies
              </label>
            </>
          )}
        />
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
};

export default UserCommentsFilter;