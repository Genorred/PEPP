import { Injectable } from '@nestjs/common';
import {
  QueryDslQueryContainer,
  SortCombinations,
} from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import {
  SearchPostKey,
  SearchPostKeys,
} from '../../../domain/entities/search_post.entity';
import { SearchDto } from '../../../domain/dto/search_posts/search.dto';

@Injectable()
export class SearchQueryBuilderService {
  constructor() {}

  public sortSearchQuery(searchParams: SearchDto) {
    const { rating, createdAt } = searchParams;
    const sort: SortCombinations[] = [];
    if (rating)
      sort.push({
        _doc: {
          order: rating?.toLowerCase() as 'asc',
        },
      });
    if (createdAt)
      sort.push({
        _doc: {
          order: createdAt?.toLowerCase() as 'asc',
        },
      });
    return sort;
  }

  public buildSearchQuery(
    searchParams: Omit<SearchDto, 'skipPages' | 'createdAt' | 'rating'>,
  ) {
    const {
      likedPosts,
      dislikedPosts,
      searchValue,
      topics,
      recentlyShowedPosts,
      pressedPosts,
    } = searchParams;
    const mustQueries: QueryDslQueryContainer['bool']['must'][] = [];
    const shouldQueries: QueryDslQueryContainer['bool']['should'][] = [];
    const filterQueries: QueryDslQueryContainer['bool']['filter'][] = [];
    const query: QueryDslQueryContainer['bool'][] =
      [] as QueryDslQueryContainer['bool'][];

    if (likedPosts.length || pressedPosts.length) {
      shouldQueries.push({
        more_like_this: {
          fields: ['topics^2', 'subTopics'],
          like: [...likedPosts, ...pressedPosts].map((post) => ({ _id: post })),
          unlike: dislikedPosts.map((post) => ({ _id: post })),
        },
      });
    }

    if (searchValue) {
      mustQueries.push({
        multi_match: {
          fields: [
            'title^2',
            'description',
            'topics',
            'subTopics',
          ] as SearchPostKeys,
          query: searchValue,
          fuzziness: 'AUTO',
          tie_breaker: 0.3,
        },
      });
    }

    if (topics?.length) {
      // one match is must and others are useful
      mustQueries.push({
        bool: {
          should: topics.map((topic) => ({
            bool: {
              should: [
                {
                  term: {
                    topics: {
                      value: topic,
                      boost: 2,
                    },
                  },
                },
                { term: { subTopics: topic } },
              ],
            },
          })),
        },
      });
    }

    console.log('query array ', query);
    return {
      function_score: {
        query: {
          bool: {
            must: mustQueries,
            should: shouldQueries,
            filter: filterQueries,
          },
        },
        boost_mode: 'multiply',
        functions: [
          {
            field_value_factor: {
              field: 'rating' as SearchPostKey,
              factor: 1,
              modifier: 'none',
              missing: 2.5,
            },
          },
          ...Object.entries(
            recentlyShowedPosts.reduce<Record<string, string[]>>(
              (acc, [postId, occurrences]) => {
                (acc[occurrences] ||= []).push(postId);
                return acc;
              },
              {},
            ),
          ).map(([occurrences, postIds]) => ({
            filter: {
              ids: { values: postIds },
            },
            weight: Number(occurrences) * 0.95,
          })),
        ],
      },
    } as QueryDslQueryContainer;
  }
}
