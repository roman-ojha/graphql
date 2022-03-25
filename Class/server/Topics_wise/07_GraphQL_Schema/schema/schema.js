const graphql = require("graphql");

/*
    -> schema will describe the data on this kind of graph
    -> it describe object types

    -> for this project we will going to create to object types:
        -> books
        -> Authors
*/

const { GraphQLObjectType, GraphQLString } = graphql;

// now we will define new graphql type
const BookType = new GraphQLObjectType({
  // now here we have to define what this book type is all about
  name: "Book",
  //   need to give name
  fields: () => ({
    //   now here we will define all the field related to 'books' object type
    id: {
      type: GraphQLString,
      // we have to use graphql string
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
  }),
});
