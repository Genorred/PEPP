import { Injectable } from "@nestjs/common";
import { QueryDslQueryContainer, Sort } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import { ElasticKey, ElasticKeys, ElasticPost } from "./entities/elastic_post.entity";
import { SearchDto } from "./dto/search.dto";

@Injectable()
export class SearchQueryBuilderService {
  constructor() {
  }

  public sortSearchQuery(searchParams: SearchDto) {
    const { rating, createdAt } = searchParams;
    return [{ rating }, { createdAt }] as Sort;
  }

  public buildSearchQuery(searchParams: Omit<SearchDto, "page" | "createdAt" | "rating">) {
    try {
      const {
        likedPosts, dislikedPosts, searchValue,
        topics, recentlyShowedPosts, pressedPosts
      } = searchParams;
      let query: QueryDslQueryContainer["bool"][] = [] as QueryDslQueryContainer["bool"][];

      if (likedPosts.length || pressedPosts.length) {
        query.push(
          {
            should: {
              more_like_this: {
                fields: ["topics", "subTopics"],
                like: [...likedPosts, ...pressedPosts].map(post => ({
                  _id: post // extra field toString()
                })),
                unlike: (dislikedPosts && dislikedPosts.map(post => ({
                  _id: post
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
              fields: ["title", "description"] as ElasticKeys,
              query: searchValue,
              tie_breaker: 0.3
            }
          }
        });
      }

      if (topics.length) {
        // one match is must and others are useful
        query.push({
          must: {
            bool: {
              should: topics.map(topic => ({
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
          boost_mode: "multiply",
          functions: [
            {
              field_value_factor: {
                field: "rating" as ElasticKey,
                factor: 1,
                modifier: "none",
                missing: 2.5
              }
            },
            ...recentlyShowedPosts.map(([_id, index]) => ({
                filter: {
                  terms: {
                    _id
                  }
                },
                weight: Number(index) * 0.95
              }
            ))
          ]
        }
      } as QueryDslQueryContainer;

    } catch (err) {

    }
  }
}