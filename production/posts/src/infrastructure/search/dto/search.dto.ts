import { FindAlgorithmPostsInput } from "../../posts/dto/find-algorithm-posts.input";
import { PreferencesRepository } from "../../../domain/repositories/elastic/preferences.repository";

export type SearchDto = FindAlgorithmPostsInput &
  Awaited<ReturnType<PreferencesRepository['get']>>