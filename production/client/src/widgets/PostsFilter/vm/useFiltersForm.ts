import { useForm } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";
import { useEffect } from "react";

export const useFiltersForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FilterState>({
    defaultValues: {
      createdAtDesc: false,
      ratingDesc: false,
      search: '',
      topics: []
    }
  })

  const watchedTopics = watch('topics')

  return {
    control, handleSubmit, watchedTopics, setValue
  }

}