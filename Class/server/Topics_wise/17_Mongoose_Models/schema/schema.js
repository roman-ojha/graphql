const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require("lodash");
var books = [
  {
    name: "Alchemist",
    genre: "Fiction",
    id: "1",
    authorId: "1",
  },
  {
    name: "Rich dad Poor dad",
    genre: "Self-Help",
    id: "2",
    authorId: "2",
  },
  {
    name: "As a Man Thinketh",
    genre: "Self-Help",
    id: "3",
    authorId: "3",
  },
  {
    name: "Eleven Minutes",
    genre: "Fiction",
    id: "4",
    authorId: "1",
  },
];

var authors = [
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
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
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
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
