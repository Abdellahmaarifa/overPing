import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:9000/graphql",
  documents: "src/data/gql/queries/*.graphql",
  generates: {
    "src/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
      },
    },
  },
};

export default config;
