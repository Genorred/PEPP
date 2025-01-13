import { FindAlgorithmPostsInput } from "../posts/find-algorithm-posts.input";
import { PreferencesRepository } from "../../../infrastructure/repositories/redis/preferences.repository";

export type SearchDto = FindAlgorithmPostsInput &
  Awaited<ReturnType<PreferencesRepository["get"]>>