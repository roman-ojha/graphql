// https://www.apollographql.com/docs/apollo-server/workflow/generate-types/
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema/schema.graphql",
  generates: {
    "./graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
