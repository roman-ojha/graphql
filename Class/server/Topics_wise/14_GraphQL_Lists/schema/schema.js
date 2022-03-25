const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require("lodash");

/*
  -> now we also want to query like this:
    -> author(id:1){
        name,
        age,
        book{
          name,
          genre,
        }
    }
  -> in this case we also have to defile book type in author object type
*/

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
    // the reason behind why we have to use function in here: https://youtu.be/jflhB57loAU?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&t=283
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
      // so here each author could have whole list of book so in this case we can't do
      // type: BookType // this will imply only one book type
      // so we have to use list of book type
      type: new GraphQLList(BookType),
      // new GraphQLList(<which_type_of_List>),
      resolve(parent, args) {
        // so in 'parent' we will get the author data and we now know the author id and we can search for all the book related to that author id
        return _.filter(books, { authorId: parent.id });
        // now we have to filter the array and return the new array which have all the book related to the authorId
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
