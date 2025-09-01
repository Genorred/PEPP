import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';

export const Mapping: MappingTypeMapping = {
  properties: {
    topics: {
      // boost: 3,
      // type: "keyword"
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    subTopics: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          ignore_above: 256,
        },
      },
    },
    title: {
      type: 'text',
      // boost: 3,
    },
    userId: {
      type: 'text',
      // boost: 3,
    },
    description: {
      type: 'text',
      // boost: 2,
    },
    rating: {
      type: 'float',
    },
    createdAt: {
      type: 'date',
    },
  },
};
