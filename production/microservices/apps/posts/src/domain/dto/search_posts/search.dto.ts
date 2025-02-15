import { FindAlgorithmPostsInput } from "../posts/find-algorithm-posts.input";
import { PreferencesRepositoryImpl } from "../../../infrastructure/repository-impls/preferences.repository.impl";
import { Preferences } from "../../entities/preferences.entity";

export type SearchDto = FindAlgorithmPostsInput & Preferences