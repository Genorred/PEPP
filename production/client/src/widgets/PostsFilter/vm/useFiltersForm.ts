import { useForm } from "react-hook-form";
import { FilterState } from "@/widgets/PostsFilter/model/domain";

export const useFiltersForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FilterState>({
    defaultValues: {
      createdAt: null,
      rating: null,
      search: "",
      topics: []
    }
  });

  const watchedTopics = watch("topics");
  const watchedCreatedAt = watch("createdAt");
  const watchedRating = watch("rating");

  return {
    control, handleSubmit, watchedTopics, setValue, watchedRating, watchedCreatedAt
  };

};