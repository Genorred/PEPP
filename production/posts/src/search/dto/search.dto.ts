import { FindAlgorithmPostsInput } from "../../posts/dto/find-algorithm-posts.input";
import { PreferencesService } from "../../posts/preferences.service";

export type SearchDto = FindAlgorithmPostsInput &
  Awaited<ReturnType<PreferencesService['get']>>