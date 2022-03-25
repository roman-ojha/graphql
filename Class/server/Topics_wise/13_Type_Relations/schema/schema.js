const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;
const _ = require("lodash");

/*
  -> Now here we will going to make a Type relation
  -> so when we want to query book at that time we also want to pass the author on that query and grab the author data
*/

var books = [
  {
    name: "Alchemist",
    genre: "Fiction",
    id: "1",
    authorId: "1",
    // 'Paulo Coelho' wrote the book so the author id of the book is '1' based on 'authors' db
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
    // now here we want to get the author based on the id that are associated to the 'book'
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // now here in this case the 'parent' parameter comes
        // so when we have to nested data we already have to parent data the book we just found that the user requested
        // and we have the data in 'parent'
        /*
          Example parent could have:
            -> {
              name: "Rich dad Poor dad",
              genre: "Self-Help",
              id: "2",
              authorId: "2",
            },
        */
        //  now through 'parent' we can retrieve the authorId property and return the author associated to that id on 'authors' db/object
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
        // now here we have to book with author id now
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
        // now here we will return the author by finding through id
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
