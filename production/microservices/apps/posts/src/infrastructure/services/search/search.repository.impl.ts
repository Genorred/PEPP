import { Inject, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping } from "./mapping";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { SearchPost } from "../../../domain/entities/search_post.entity";
import { SearchDto } from "../../../domain/dto/search_posts/search.dto";
import { IndexDto } from "../../../domain/dto/search_posts/index.dto";
import { RedisClientConnectionType } from "@keyv/redis";
import { REDIS_CLIENT } from "../../../interfaces/modules/redis.module";
import { SearchRepository } from "../../../domain/repositories/posts/search.repository";
import { mapTopicsToTopicsDto } from "../../../domain/dto/topics/map-topics-to-topics.dto";

const index = "posts";

@Injectable()
export class SearchRepositoryImpl implements SearchRepository {
  constructor(
    private readonly esService: ElasticsearchService,
    @Inject(REDIS_CLIENT) private redisClient: RedisClientConnectionType,
    private readonly builderService: SearchQueryBuilderService) {
  }

  public async createIndex() {
    // create index if doesn't exist
    try {
      const checkIndex = await this.esService.indices.exists({ index });
      if (!checkIndex) {
        await this.esService.indices.create({
          index,
          mappings: Mapping,
          settings: {
            analysis: {
              tokenizer: {
                edge_ngram_tokenizer: {
                  type: "edge_ngram",
                  min_gram: 3,
                  max_gram: 10,
                  token_chars: ["letter", "digit"]
                }
              },
              analyzer: {
                edge_ngram_analyzer: {
                  type: "custom",
                  tokenizer: "edge_ngram_tokenizer",
                  filter: ["lowercase"]
                }
              }
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }


  public async indexPost(payload: IndexDto) {
    try {
      const { id, topics, subTopics, userId, title, createdAt, description } = payload;
      console.log("topics", topics);
      return await this.esService.index({
        index,
        id: id.toString(),
        document: {
          topics: topics && mapTopicsToTopicsDto(topics),
          subTopics: subTopics && mapTopicsToTopicsDto(subTopics),
          title,
          createdAt,
          description,
          userId
        } as SearchPost
      });
    } catch (err) {
      throw err;
    }
  }

  public deletePost(id: number) {
    return this.esService.delete({
      index,
      id: id.toString()
    });
  }

  public async updatePost(payload: IndexDto) {
    try {
      const { id, topics, subTopics, userId, title, createdAt, description } = payload;
      // map draft children
      return await this.esService.update({
          index,
          id: id.toString(),
          doc: {
            topics: mapTopicsToTopicsDto(topics),
            subTopics: mapTopicsToTopicsDto(subTopics),
            title,
            createdAt,
            description,
            userId
          } as SearchPost
        }
      );
    } catch (err) {
      throw err;
    }
  }

  public async search(searchParam: SearchDto) {
    console.log(searchParam);
    try {
      const pageSize = 20;
      console.log("sort", this.builderService.sortSearchQuery(searchParam));
      const { hits: parentHits } = await this.esService.search<SearchPost>({
        index,
        sort: this.builderService.sortSearchQuery(searchParam),
        query: this.builderService.buildSearchQuery(searchParam),
        from: searchParam.skipPages ? searchParam.skipPages * pageSize : 0,
        size: 80
      });
      const totalCount = parentHits.total;
      const hits = parentHits.hits;
      const data = hits.map((item) => (
        { ...item._source, id: item._id }
      ));
      return {
        // @ts-ignore
        totalPages: Math.ceil((totalCount?.value ?? totalCount) / pageSize),
        data
      };
    } catch (err) {
      throw err;
    }
  }
}