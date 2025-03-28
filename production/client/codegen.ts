import type { CodegenConfig } from "@graphql-codegen/cli";

const gatewayUrl = "http://localhost:8080/graphql";
const config: CodegenConfig = {
  schema: gatewayUrl,
  watch: true,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/shared/api/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-query", "fragment-matcher"],
      config: {
        legacyMode: false,
        addInfiniteQuery: true,
        fetcher: "@/shared/api/base#fetcher",
        exposeFetcher: true,
        exposeMutationKeys: true,
        exposeQueryKeys: true,
        exposeDocument: true,
        useExplicitTyping: true
      }
    },
    "./src/shared/api/graphql/": {
      preset: "client",
      config: {
        useExplicitTyping: true,
        documentMode: "string"
      }
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true
      }
    }
  }
};

export default config;