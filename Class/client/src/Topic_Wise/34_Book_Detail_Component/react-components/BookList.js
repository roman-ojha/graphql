import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../services/queries/queries";
import BookDetails from "./BookDetails";
const BookList = (props) => {
  const DisplayBooks = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Books...</div>;
    }
    return (
      <div>
        {data.books.map((book, index) => {
          return <li key={book.id}>{book.name}</li>;
        })}
      </div>
    );
  };
  return (
    <>
      <ul id="book-list">
        <DisplayBooks />
        <BookDetails />
      </ul>
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
