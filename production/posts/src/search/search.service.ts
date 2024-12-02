import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping } from "./mapping";
import { SearchQueryBuilderService } from "./searchQueryBuilder";
import { Post } from "../posts/entities/post.entity";

const index = "posts";
interface ElasticPost extends Pick<Post, "body" | "description" | "topics" | "subTopics" | "title"> {
  text: string
}

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

  public async search(searchParam: {search: string}) {
    try {
      const { body } = await this.esService.search<any>({
        index,
        query: this.builderService.buildSearchQuery(searchParam),
        from: 0,
        size: 1000
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