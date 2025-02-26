import { FindAlgorithmPostsDto } from "../posts/find-algorithm-posts.dto";
import { PreferencesRepositoryImpl } from "../../../infrastructure/repository-impls/preferences.repository.impl";
import { Preferences } from "../../entities/preferences.entity";

export type SearchDto = FindAlgorithmPostsDto & Preferences