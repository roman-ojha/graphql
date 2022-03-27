import React from "react";
import BookList from "./react-components/BookList";
import AddBook from "./react-components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

/*
  -> now here we want to make graphQL mutation to add book to database
  -> for that reason we will make another query on 'queries.js' file
*/

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
