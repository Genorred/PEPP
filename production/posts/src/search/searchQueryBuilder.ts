import { Injectable } from "@nestjs/common";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import { ElasticKey, ElasticKeys, ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";

@Injectable()
export class SearchQueryBuilderService {
  constructor() {
  }

  public buildSearchQuery(searchParams: SearchDto) {
    try {
      const {
        recommendationPostIds, searchValue, page,
        createdAtDesc, ratingDesc, topics, subTopics
      } = searchParams;
      let isRandom = true;

      let query: QueryDslQueryContainer["bool"][] = [] as QueryDslQueryContainer["bool"][];
      if (recommendationPostIds) {
        query.push(
          {
            must: {
              more_like_this: {
                like: recommendationPostIds.map(postId => ({
                  _id: postId
                }))
              }
            }
          }
        );
        isRandom = false;
      }

      if (searchValue) {
        query.push({
          must: {
            multi_match: {
              fields: ["title", "description", "text"] as ElasticKeys,
              query: searchValue,
              tie_breaker: 0.3
            }
          }
        })
        isRandom = false;
      }

      const topicsArray = [...topics, ...subTopics];
      if (topicsArray.length > 0) {
        // one match is must and others are useful
        query.push({
          must: {
            bool: {
              should: topicsArray.map(topic => ({
                bool: {
                  should:[
                    {
                      term: {
                        'topics.keyword': topic
                      }
                    },
                    {
                      term: {
                        'subTopics.keyword': topic
                      }
                    }
                  ]
                }
                } as QueryDslQueryContainer
              ))
            },
            }
        })
      }

      return isRandom ? {} : {
        function_score: {
          query: {
            bool: query
          },
          functions: [
            {
              field_value_factor: {
                field: "rating" as ElasticKey,
                factor: 1,
                modifier: "none",
                missing: 2.5
              }
            }
          ]
        }
      } as QueryDslQueryContainer;

    } catch (err) {

    }
  }
}