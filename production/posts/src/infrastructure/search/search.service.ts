import { Inject, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping } from "../../domain/repositories/elastic/mapping";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { Post } from "../../domain/entities/post.entity";
import { ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";
import { IndexDto } from "./dto/index.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import KeyvRedis, { RedisClientConnectionType } from "@keyv/redis";
import { REDIS_CLIENT } from "../../domain/kernel/redis.module";

const index = "posts";

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    @Inject(REDIS_CLIENT) private redisClient: RedisClientConnectionType,
    private readonly builderService: SearchQueryBuilderService) {
  }

  public async createIndex() {
    // create index if doesn't exist
    try {
      console.log('gh');
      // @ts-ignore
      console.log('j', this.redisClient);
      const checkIndex = await this.esService.indices.exists({ index });
      if (!checkIndex) {
        this.esService.indices.create({
          index,
          mappings: Mapping
        });
      }
    } catch (e) {

    }
  }


  public async indexPost(payload: IndexDto) {
    try {
      const {id, ...data} = payload;
      // map draft children
      console.log('createdAt', data.createdAt);
      return await this.esService.index({
        index,
        id: id.toString(),
        document: data as ElasticPost
      });
    } catch (err) {
      throw err;
    }
  }
  public deletePost(id: number) {
    return this.esService.delete({
      index,
      id: id.toString()
    })
  }
  public async updatePost(payload: IndexDto) {
    try {
      const {id, ...data} = payload;
      // map draft children
      return await this.esService.update({
          index,
          id: id.toString(),
          ...data as ElasticPost
        }
      );
    } catch (err) {
      throw err;
    }
  }
  public async search(searchParam: SearchDto) {
    try {
      const pageSize = 20
      const { hits: parentHits } = await this.esService.search<ElasticPost>({
        index,
        sort: this.builderService.sortSearchQuery(searchParam),
        query: this.builderService.buildSearchQuery(searchParam),
        from: searchParam.page ? searchParam.page * pageSize : 0,
        size: 80
      });
      const totalCount = parentHits.total;
      const hits = parentHits.hits;
      const data = hits.map((item) => (
        {...item._source, id: item._id}
      ));
      return {
        // @ts-ignore
        totalCount: totalCount?.value ?? totalCount,
        data
      };
    } catch (err) {
      throw err;
    }
  }
}