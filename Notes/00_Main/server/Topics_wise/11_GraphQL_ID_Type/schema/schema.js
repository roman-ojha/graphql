const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
const _ = require("lodash");

// dummy data
var books = [
  {
    name: "Alchemist",
    genre: "Fiction",
    id: "1",
  },
  {
    name: "Rich dad Poor dad",
    genre: "Self-Help",
    id: "2",
  },
  {
    name: "As a Man Thinketh",
    genre: "Self-Help",
    id: "3",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
      // so previously we have use 'GraphQLString' as the id but rather then that we can use 'GraphQLID' as the type which is provided by graphql
      // because of that now if we will pass id as 'string' or without the string it will work
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
