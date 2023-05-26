import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../services/queries/queries";
const BookDetails = (props) => {
  console.log(props.bookId);
  const DisplayBookDetail = () => {
    const { book } = props.data;
    if (book) {
      // if we have a book
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by {book.author.name}</p>
          <ul className="other-book">
            {book.author.books.map((book) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <div>Select Book To See Detail </div>;
  };
  return (
    <>
      <div id="book-details">
        <DisplayBookDetail />
      </div>
    </>
  );
};

export default graphql(getBookQuery, {
  options: (props) => {
    // to pass id on query variable what we can do is to pass option parameter which is going to be a function
    // so, when we will update the value of props then we will refire this function
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
