import React from "react";
import BookList from "./react-components/BookList";
import AddBook from "./react-components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

/*
  -> now rather then create query on same file component we will create another file 'queries.js' and put all the queries on that file
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
          <AddBook />
        </div>
      </ApolloProvider>
    </>
  );
};

export default Index;
