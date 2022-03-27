import React from "react";
import BookList from "./react-components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

/*
  -> now we want to request/query all the books and render data on 'BookList' Components
*/

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

const Index = () => {
  return (
    <>
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
