import React from "react";
import BookList from "./react-components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

/*
  -> to interact with graphQL server we need a graphQL client and for that we will use 'Apollo'
    -> https://www.apollographql.com/
    -> https://www.apollographql.com/docs/

    -> npm install apollo-boost react-apollo graphql
      -> apollo-boost: will install several package that we need to work with apollo
      -> react-apollo: to bind react with apollo, to understand apollo by react
      -> graphql : javascript implementation of graphql
*/

// apollo client setup
const client = new ApolloClient({
  // while doing setup for apollo client it will need the endpoint that we are making request and query
  uri: "http://localhost:8080/graphql",
});

const Index = () => {
  return (
    <>
      {/* now here we have to wrap the component by the 'ApolloProvider' and to inject whatever data that we receive from the server into our application*/}
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Roman Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    </>
  );
};

export default Index;
