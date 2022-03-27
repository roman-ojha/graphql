const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

/*
  *) What is Mutation in GraphQL?
    -> Mutation allow us to mutate or change our data. adding data, deleting data, editing data.
    -> in graphQl we have to explicitly define our mutation 

    -> now we are mutation request to graphql we have to do:
      -> mutation{
        addAuthor(name:"Paulo Coelho",age:44){
          // here we have to pass which data that we want it back after handling the mutation
          name,
          age,
        }
      }
*/

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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this would let us store the different kind of mutations that we want to make
    // Like: adding author, deleting author etc..
    addAuthor: {
      type: AuthorType,
      args: {
        // when user make a mutation query from the front end the we expect to get argument
        name: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
        // these are to to parameter that we would get on backend when user request to addAuthor
      },
      async resolve(parent, args) {
        let author = new Author({
          // now here we are creating new Author document to store in mongodb
          name: args.name,
          age: args.age,
        });
        const res = await author.save();
        console.log(res);
        return res;
      },
    },
    // this will allow us to add author to a database
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  // now here we also have to pass mutation
});
