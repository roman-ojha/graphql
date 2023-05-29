module.exports = {
  projects: {
    app: {
      schema: ["./Practice/01_Prisma_and_GraphQL_with_Apollo/schema/*.graphql"],
      documents: [
        "./Practice/01_Prisma_and_GraphQL_with_Apollo/schema/*.graphql",
      ],
    },
    db: {
      schema: "src/generated/db.graphql",
      documents: ["src/db/**/*.graphql", "my/fragments.graphql"],
      extensions: {
        codegen: [
          {
            generator: "graphql-binding",
            language: "typescript",
            output: {
              binding: "src/generated/db.ts",
            },
          },
        ],
      },
    },
  },
};
