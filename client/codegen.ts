import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://10.14.55.249:5500/graphql",
  documents: "src/data/gql/queries/*.graphql",
  generates: {
    "src/data/gql/index.ts": {
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
