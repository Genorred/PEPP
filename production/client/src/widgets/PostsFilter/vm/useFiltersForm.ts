import { useForm } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";
import { useEffect } from "react";

export const useFiltersForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FilterState>({
    defaultValues: {
      createdAt: null,
      rating: null,
      search: '',
      topics: []
    }
  })

  const watchedTopics = watch('topics')

  return {
    control, handleSubmit, watchedTopics, setValue
  }

}