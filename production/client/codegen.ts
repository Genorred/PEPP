import type { CodegenConfig } from '@graphql-codegen/cli'

const gatewayUrl = "http://localhost:8080/graphql"
const config: CodegenConfig = {
  schema: gatewayUrl,
  watch: true,
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query', 'fragment-matcher'],
      config: {
        legacyMode: false,
        addInfiniteQuery: true,
        fetcher: 'graphql-request',
        exposeFetcher: true,
        exposeMutationKeys: true,
        exposeQueryKeys: true,
        exposeDocument:true,
        useExplicitTyping: true
      },
      },
    './src/graphql/': {
      preset: 'client',
      config: {
        useExplicitTyping: true,
        documentMode: 'string'
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}

export default config