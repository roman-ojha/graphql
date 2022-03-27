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
  -> in this we will first get the id of the book that we click and store as the state
  -> and then we will pass that id to the 'BookDetail.js' component
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
