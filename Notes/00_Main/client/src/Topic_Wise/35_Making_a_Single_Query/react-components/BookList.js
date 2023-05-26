import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../services/queries/queries";
import BookDetails from "./BookDetails";
const BookList = (props) => {
  const [selectId, setSelectedId] = useState(null);
  const DisplayBooks = () => {
    var data = props.data;
    if (data.loading) {
      return <div>Loading Books...</div>;
    }
    return (
      <div>
        {data.books.map((book, index) => {
          return (
            <li
              key={book.id}
              onClick={(e) => {
                setSelectedId(book.id);
              }}
            >
              {book.name}
            </li>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <ul id="book-list">
        <DisplayBooks />
        <BookDetails bookId={selectId} />
      </ul>
    </>
  );
};

export default graphql(getBooksQuery)(BookList);
