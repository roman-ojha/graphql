const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

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
  // here we are defining root query of the graphql
  // and we have to define the name of that object type
  name: "RootQueryType",
  fields: {
    // here we will define what are the root query
    // to get reference please watch picture attached to the folder
    book: {
      // here 'book' is the name of query
      type: BookType,
      // 'type' is the return type that user will get after query
      args: {
        // and we have to pass the argument
        // so when someone query 'BookType' then that user need to pass some argument to get the particular data
        id: {
          // so we want user to pass id as the argument to get the book
          type: GraphQLString,
          /*
            query looks like:
              book(id:'123'){
                name,
                genre,
              }
          */
        },
      },
      resolve(parent, args) {
        // this resolve function where we write code to get whichever data that we need to from our database or some other source
        // in this case args parameter will have the id of the book
        // id = args.id
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // here we will pass some initial root query
  query: RootQuery,
});
