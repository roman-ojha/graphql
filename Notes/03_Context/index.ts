/*
    In GraphQL, a context is an object shared by all the resolvers of a specific execution. It's useful for keeping data such as authentication info, the current user, database connection, data sources and other things you need for running your business logic.
*/

const resolvers = {
  Query: {
    myQuery(root, args, context, info) {
      // you can use context to access database
      // context.findOne()
    },
  },
};

/*
    GraphQL Modules follow the same approach, so context is shared across modules. That's why there's no API for context building in GraphQL Modules, it's managed by GraphQL server implementation.
    You can manage your own context object based on your needs. Usually, it's done by the server implementation, since the context object is created and filled with the HTTP request information (request), which is a layer that comes before the actual GraphQL engine.
*/

// Example:
// https://github.com/roman-ojha/graphql-examples/blob/main/01_Express_GraphQL/02/index.ts#L19-L24
// https://github.com/roman-ojha/graphql-examples/blob/main/01_Express_GraphQL/02/graphql/schema.ts#L58-L67
