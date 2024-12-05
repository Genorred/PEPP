import { Injectable } from "@nestjs/common";
import { QueryDslQueryContainer, Sort } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import { ElasticKey, ElasticKeys, ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";

@Injectable()
export class SearchQueryBuilderService {
  constructor() {
  }

  public sortSearchQuery (searchParams: SearchDto) {
    const { rating, createdAt } = searchParams;
    return [{rating}, {createdAt}] as Sort;
  }

  public buildSearchQuery(searchParams: SearchDto) {
    try {
      const {
        likedPosts, dislikedPosts, searchValue, topics, subTopics
      } = searchParams;
      let query: QueryDslQueryContainer["bool"][] = [] as QueryDslQueryContainer["bool"][];

      if (likedPosts) {
        query.push(
          {
            must: {
              more_like_this: {
                like: likedPosts.map(postId => ({
                  _id: postId.toString()
                })),
                unlike: (dislikedPosts && dislikedPosts.map(postId => ({
                  _id: postId.toString()
                })))
              }
            }
          }
        );
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
        });
      }

      const topicsArray = [...topics, ...subTopics];
      if (topicsArray.length > 0) {
        // one match is must and others are useful
        query.push({
          must: {
            bool: {
              should: topicsArray.map(topic => ({
                  bool: {
                    should: [
                      {
                        term: {
                          "topics.keyword": topic
                        }
                      },
                      {
                        term: {
                          "subTopics.keyword": topic
                        }
                      }
                    ]
                  }
                } as QueryDslQueryContainer
              ))
            }
          }
        });
      }

      return {
        function_score: {
          query: (query.length > 1 ? {
            bool: query
          } : undefined),
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