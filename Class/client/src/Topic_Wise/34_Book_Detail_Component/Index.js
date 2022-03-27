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
   -> now here we want to get the detail information about book when we will click on the specific book from the list of books
   -> and we will also create a 'BookDetail.js' component to show the detail about book
   -> for that we need to create another query to get the book by passing the book id as the query variable:
      -> const getBookQuery = gql`
              query ($id: String) {
                book(id: $id) {
                  name
                  id
                  genre
                  author {
                    id
                    name
                    age
                    books {
                      name
                      genre
                      id
                    }
                  }
                }
              }
            `;
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
