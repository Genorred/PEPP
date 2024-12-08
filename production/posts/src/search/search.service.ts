import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping } from "./mapping";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { Post } from "../posts/entities/post.entity";
import { ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";
import { IndexDto } from "./dto/index.dto";

const index = "posts";

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly builderService: SearchQueryBuilderService) {
  }

  public async createIndex() {
    // create index if doesn't exist
    try {
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
        totalCount,
        data
      };
    } catch (err) {
      throw err;
    }
  }
}