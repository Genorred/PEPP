import { IndexDto } from "../../dto/search_posts/index.dto";
import { SearchDto } from "../../dto/search_posts/search.dto";
import { SearchDtoResponse } from "../../dto/search_posts/search.dto.response";

export abstract class SearchRepository {
  abstract createIndex(): Promise<unknown>

  abstract indexPost(payload: IndexDto): Promise<unknown>

  abstract deletePost(id: number): Promise<unknown>

  abstract updatePost(payload: IndexDto): Promise<unknown>

  abstract search(searchParam: SearchDto): Promise<SearchDtoResponse>
}
