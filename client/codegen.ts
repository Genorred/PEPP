import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:1488/graphql',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        addInfiniteQuery: true,
        fetcher: 'graphql-request',
        exposeFetcher: true,
        exposeMutationKeys: true,
        exposeQueryKeys: true,
        exposeDocument:true,
      },
      },
    './src/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    // './schema.graphql': {
    //   plugins: ['schema-ast'],
    //   config: {
    //     includeDirectives: true
    //   }
    // }
  }
}

export default config