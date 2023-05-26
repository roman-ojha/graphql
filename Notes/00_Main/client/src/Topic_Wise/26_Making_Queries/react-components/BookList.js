import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

/*
  -> to make query on component first we need to construct the query in graphql and we take that query and bind it to the component so that inside the component we have access to all the data that comes back from the query
*/

// constructing the query
// NOTE: GraphQL query language is not Javascript
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;
// now this is the way that we make query
// now first is completed we have now made this query now we have to bind this query to this component so that we can access the data that comes back from the query

const BookList = (props) => {
  // and the graphQL response data will store on the props
  console.log(props);
  return (
    <>
      <ul id="book-list">
        <li>Book Name</li>
      </ul>
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
// now here we are binding the query to component
