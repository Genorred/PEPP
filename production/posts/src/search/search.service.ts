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
      const {id, body, ...data} = payload;
      // map draft children
      const text = this.dbToEs(body);

      return await this.esService.index({
        index,
        id: id.toString(),
        document: {
          ...data,
          text
        } as ElasticPost
      });
    } catch (err) {
      throw err;
    }
  }
  public async updatePost(payload: IndexDto) {
    try {
      const {id, body, ...data} = payload;
      // map draft children
      const text = this.dbToEs(body);

      return await this.esService.update({
          index,
          id: id.toString(),
          ...{
            ...data,
            text
          } as ElasticPost
        }
      );
    } catch (err) {
      throw err;
    }
  }
  public async search(searchParam: SearchDto) {
    try {
      const pageSize = 10
      const { hits: parentHits } = await this.esService.search<ElasticPost>({
        index,
        query: this.builderService.buildSearchQuery(searchParam),
        from: searchParam.page ? searchParam.page * pageSize : 0,
        size: 50
      });
      const totalCount = parentHits.total;
      const hits = parentHits.hits;
      const data = hits.map((item) => item._source);
      return {
        totalCount,
        data
      };
    } catch (err) {
      throw err;
    }
  }

  public dbToEs (body: any[]) {
    return body.slice(2)
      .map((block) => block.children.text)
      .join(" ");
  }
}