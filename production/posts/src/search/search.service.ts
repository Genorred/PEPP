import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Mapping } from './mapping';
import { SearchQueryBuilderService } from "./searchQueryBuilder";

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly builderService: SearchQueryBuilderService) { }
  public async createIndex() {
    // create index if doesn't exist
    try {
      const index = process.env.ELASTIC_INDEX;
      const checkIndex = await this.esService.indices.exists({ index });
      if (checkIndex.statusCode === 404) {
        this.esService.indices.create({
            index,
            body: {
              mappings: Mapping,
              // settings: Settings,
            },
          },
          (err: any) => {
            if (err) {
              error(err, 'SearchService -> createIndex');
              throw err;
            }
          },
        );
      }
    } catch (err) {
      throw err;
    }
  }
  public async indexData(payload: any) {
    try {
      return await this.esService.index({
        index: process.env.ELASTIC_INDEX,
        id: uuid(),
        body: payload,
      });
    } catch (err) {
      throw err;
    }
  }
  public async search(searchParam: SearchDtoParam) {
    try {
      const { body } = await this.esService.search<any>({
        index: process.env.ELASTIC_INDEX,
        body: this.builderService.buildSearchQuery(searchParam),
        from: 0,
        size: 1000,
      });
      const totalCount = body.hits.total.value;
      const hits = body.hits.hits;
      const data = hits.map((item: any) => item._source);
      return {
        totalCount,
        data,
      };
    } catch (err) {
      throw err;
    }
  }
}