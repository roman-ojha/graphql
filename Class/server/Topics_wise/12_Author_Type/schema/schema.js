const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;
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

var authors = [
  // now we have define the another data with authors
  {
    name: "Paulo Coelho",
    age: 44,
    id: "1",
  },
  {
    name: "Robert Kiyosaki",
    age: 44,
    id: "2",
  },
  {
    name: "James Allen",
    age: 44,
    id: "3",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  // now we will create the new graphql type object and we will define all the file related that graphQL
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
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
    author: {
      // now here we will define another endpoint for query which will be 'author'
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
        // now here we will return the author by finding through id
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
