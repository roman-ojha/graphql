module.exports = {
  projects: {
    app: {
      schema: ["Tutorial/01_Object_Types/interface.graphql"],
      documents: ["Tutorial/01_Object_Types/interface.graphql"],
    },
    // db: {
    //   schema: "src/generated/db.graphql",
    //   documents: ["src/db/**/*.graphql", "my/fragments.graphql"],
    //   extensions: {
    //     codegen: [
    //       {
    //         generator: "graphql-binding",
    //         language: "typescript",
    //         output: {
    //           binding: "src/generated/db.ts",
    //         },
    //       },
    //     ],
    //   },
    // },
  },
};
