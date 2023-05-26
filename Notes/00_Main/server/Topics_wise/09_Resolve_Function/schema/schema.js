const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require("lodash");

// dummy data
var books = [
  {
    name: "Alchemist",
    id: "1",
  },
  {
    name: "Rich dad Poor dad",
    id: "2",
  },
  {
    name: "As a Man Thinketh",
    id: "3",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLString,
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
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // later we will use mongodb
        // right now we will use dummy data
        // and to query from that data we will use:
        // -> npm i lodash
        return _.find(books, { id: args.id });
        // this will look in the book array and try to find the book using id
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
