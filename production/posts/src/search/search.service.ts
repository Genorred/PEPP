import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping } from "./mapping";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { Post } from "../posts/entities/post.entity";
import { ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";

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

  public async indexPost(payload: Pick<Post, "id" | "body" | "description" | "topics" | "subTopics" | "title">) {
    try {
      const {id, body, ...data} = payload;
      // map draft children
      const text = body.slice(2)
        .map((block) => block.children.text)
        .join(" ");

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

  public async search(searchParam: SearchDto) {
    try {
      const pageSize = 10
      const { fields } = await this.esService.search<ElasticPost>({
        index,
        query: this.builderService.buildSearchQuery(searchParam),
        from: searchParam.page ? searchParam.page * pageSize : 0,
        size: 50
      });
      const totalCount = body.hits.total.value;
      const hits = body.hits.hits;
      const data = hits.map((item: any) => item._source);
      return {
        totalCount,
        data
      };
    } catch (err) {
      throw err;
    }
  }
}